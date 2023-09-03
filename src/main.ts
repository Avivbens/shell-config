import { CommandFactory, CompletionFactory } from 'nest-commander'
import { AppModule } from './app.module'

const packageJson = require('../package.json')

;(async () => {
    const app = await CommandFactory.createWithoutRunning(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
        version: packageJson.version,
    })

    const cliCommand = 'shell-config'
    const cliExecutable = '$HOME/shell-config/executable/shell-config'

    CompletionFactory.registerCompletionCommand(app, {
        cmd: cliCommand,
        fig: true,
        nativeShell: {
            executablePath: cliExecutable,
        },
    })

    app.enableShutdownHooks()

    await CommandFactory.runApplication(app)
})()
