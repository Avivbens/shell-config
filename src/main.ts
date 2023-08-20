import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'

const packageJson = require('../package.json')

;(async () => {
    const app = await CommandFactory.createWithoutRunning(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
        version: packageJson.version,
    })

    app.enableShutdownHooks()

    await CommandFactory.runApplication(app)
})()
