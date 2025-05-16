import boxen from 'boxen'
import { lastValueFrom } from 'rxjs'
import { clean, lt } from 'semver'
import { GITHUB_RELEASES_API_URL, PACKAGE_VERSION } from '@common/constants'
import type { IReleasesAPIRes } from '@models/releases-api.model'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectLogger } from './logger'
import { LoggerService } from './logger/logger.service'

@Injectable()
export class CheckUpdateService {
    constructor(
        private readonly http: HttpService,
        @InjectLogger(CheckUpdateService.name) private readonly logger: LoggerService,
    ) {}

    public async checkForUpdates(): Promise<boolean> {
        try {
            const releases = await this.getGithubReleases()
            const latestMajorRelease = releases.find((release) => release.prerelease === false)
            const [latestOfAllReleases] = releases

            const { tag_name: latest } = latestMajorRelease
            const { tag_name: latestOfAll } = latestOfAllReleases
            const currentVersion = PACKAGE_VERSION

            const isCurrentVersionBeta: boolean = currentVersion.includes('-beta')

            const latestVersionToCheck = isCurrentVersionBeta ? latestOfAll : latest

            const latestClean = clean(latestVersionToCheck)
            const currentVersionClean = clean(currentVersion)

            const updateNeeded: boolean = lt(currentVersionClean, latestClean)
            this.logger.debug(`Current version: ${currentVersionClean}, latest version: ${latestClean}`)
            if (!updateNeeded) {
                return false
            }

            const message = `Update available ${currentVersionClean} → ${latestClean}\nRun 'shell-config update' to update\n\nRun 'shell-config info' to view the release notes 🚀`
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
            this.logger.debug(`Error checkForUpdates, error: ${error}`)
            return false
        }
    }

    public async getGithubReleases(): Promise<IReleasesAPIRes[]> {
        try {
            const res = await lastValueFrom(this.http.get<IReleasesAPIRes[]>(GITHUB_RELEASES_API_URL))
            return res.data
        } catch (error) {
            this.logger.debug(`Error getGithubReleases, error: ${error}`)
            throw error
        }
    }
}
