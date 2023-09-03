import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'

const packageJson = require('../package.json')

;(async () => {
    const cliCommand = 'shell-config'
    const cliExecutable = '$HOME/shell-config/executable/shell-config'

    const app = await CommandFactory.createWithoutRunning(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
        version: packageJson.version,
        completion: {
            cmd: cliCommand,
            fig: true,
            nativeShell: {
                executablePath: cliExecutable,
            },
        },
    })

    await CommandFactory.runApplication(app)
})()
