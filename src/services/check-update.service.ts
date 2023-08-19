import { GITHUB_RELEASES_API_URL } from '@common/constants'
import { HttpService } from '@nestjs/axios'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import boxen from 'boxen'
import { lastValueFrom } from 'rxjs'
import { clean, lt } from 'semver'
import { IReleasesAPIRes } from '../models/releases-api.model'
import { LoggerService } from './logger.service'

const packageJson = require('../../package.json')

@Injectable()
export class CheckUpdateService implements OnApplicationBootstrap {
    constructor(private readonly http: HttpService, private readonly logger: LoggerService) {}

    async onApplicationBootstrap() {
        await this.checkForUpdates()
    }

    private async checkForUpdates(): Promise<boolean> {
        try {
            const [release] = await this.getGithubReleases()
            const { tag_name: latest } = release
            const { version: currentVersion } = packageJson

            const latestClean = clean(latest)
            const currentVersionClean = clean(currentVersion)

            const updateNeeded: boolean = lt(currentVersionClean, latestClean)
            if (!updateNeeded) {
                this.logger.debug(
                    `Current version: ${currentVersionClean}, latest version: ${latestClean}`,
                )
                return false
            }

            const message = `Update available ${currentVersionClean} → ${latestClean}\nRun TODO to update`
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

    private async getGithubReleases(): Promise<IReleasesAPIRes[]> {
        try {
            const res = await lastValueFrom(
                this.http.get<IReleasesAPIRes[]>(GITHUB_RELEASES_API_URL),
            )
            return res.data
        } catch (error) {
            this.logger.debug(`Error getGithubReleases, error: ${error.stack}`)
        }
    }
}
