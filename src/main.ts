import { CommandFactory } from 'nest-commander'
import { BASE_PATH, PACKAGE_VERSION } from '@common/constants'
import { AppModule } from './app.module'

;(async () => {
    const cliCommand = 'shell-config'
    const cliExecutable = `${BASE_PATH}/executable/shell-config`

    const app = await CommandFactory.createWithoutRunning(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
        version: PACKAGE_VERSION,
        completion: {
            cmd: cliCommand,
            fig: false,
            nativeShell: {
                executablePath: cliExecutable,
            },
        },
    })

    await CommandFactory.runApplication(app)
})()
