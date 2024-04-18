import { CommandFactory } from 'nest-commander'
import packageJson from '../package.json'
import { AppModule } from './app.module'

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
            fig: false,
            nativeShell: {
                executablePath: cliExecutable,
            },
        },
    })

    await CommandFactory.runApplication(app)
})()
