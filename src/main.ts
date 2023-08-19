import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'
;(async () => {
    const app = await CommandFactory.createWithoutRunning(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
    })

    app.enableShutdownHooks()

    await CommandFactory.runApplication(app)
})()
