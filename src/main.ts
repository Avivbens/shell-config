import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'
;(async () => {
    await CommandFactory.run(AppModule, {
        errorHandler: (err) => {
            process.exit(1)
        },
    })
})()
