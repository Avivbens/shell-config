import boxen from 'boxen'
import { lastValueFrom } from 'rxjs'
import { clean, lt } from 'semver'
import { GITHUB_RELEASES_API_URL } from '@common/constants'
import type { IReleasesAPIRes } from '@models/releases-api.model'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import packageJson from '../../package.json'
import { LoggerService } from './logger.service'

@Injectable()
export class CheckUpdateService {
    constructor(
        private readonly http: HttpService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(CheckUpdateService.name)
    }

    public async checkForUpdates(): Promise<boolean> {
        try {
            const releases = await this.getGithubReleases()
            const latestMajorRelease = releases.find((release) => release.prerelease === false)
            const [latestOfAllReleases] = releases

            const { tag_name: latest } = latestMajorRelease
            const { tag_name: latestOfAll } = latestOfAllReleases
            const { version: currentVersion } = packageJson

            const isCurrentVersionBeta: boolean = currentVersion.includes('-beta')

            const latestVersionToCheck = isCurrentVersionBeta ? latestOfAll : latest

            const latestClean = clean(latestVersionToCheck)
            const currentVersionClean = clean(currentVersion)

            const updateNeeded: boolean = lt(currentVersionClean, latestClean)
            if (!updateNeeded) {
                this.logger.debug(`Current version: ${currentVersionClean}, latest version: ${latestClean}`)
                return false
            }

            const message = `Update available ${currentVersionClean} → ${latestClean}\nRun 'shell-config update' to update`
            console.log(
                boxen(message, {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'round',
                    title: 'Update Available!',
                    titleAlignment: 'center',
                    textAlignment: 'center',
                    float: 'center',
                    backgroundColor: '#d38320',
                    borderColor: 'yellow',
                    dimBorder: true,
                }),
            )

            return true
        } catch (error) {
            this.logger.debug(`Error checkForUpdates, error: ${error.stack}`)
            return false
        }
    }

    public async getGithubReleases(): Promise<IReleasesAPIRes[]> {
        try {
            const res = await lastValueFrom(this.http.get<IReleasesAPIRes[]>(GITHUB_RELEASES_API_URL))
            return res.data
        } catch (error) {
            this.logger.debug(`Error getGithubReleases, error: ${error.stack}`)
            throw error
        }
    }
}
