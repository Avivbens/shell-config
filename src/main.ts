import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'
;(async () => {
    // listen to process errors
    process.on('uncaughtException', (err) => {
        console.error(err)
        process.exit(1)
    })
    process.on('unhandledRejection', (err) => {
        console.error(err)
        process.exit(1)
    })

    await CommandFactory.run(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
    })
})()
