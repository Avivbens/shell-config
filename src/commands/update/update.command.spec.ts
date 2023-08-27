import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { UpdateCommand } from './update.command'
import { LoggerService } from '@services/logger.service'
import { CheckUpdateService } from '@services/check-update.service'

describe('UpdateCommand', () => {
    let service: UpdateCommand

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCommand,
                {
                    provide: LoggerService,
                    useValue: { setContext: jest.fn() },
                },
                {
                    provide: CheckUpdateService,
                    useValue: {},
                },
            ],
        }).compile()

        service = module.get<UpdateCommand>(UpdateCommand)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('getVersion', () => {
        it.each([
            { input: 'no-version', expRes: '' },
            { input: 'latest', expRes: 'latest' },
            { input: 'v2.0.0', expRes: 'v2.0.0' },
            { input: '2.0.0', expRes: 'v2.0.0' },
            { input: 'v2.0.0-beta.0', expRes: 'v2.0.0-beta.0' },
            { input: '2.0.0-beta.0', expRes: 'v2.0.0-beta.0' },
            { input: 'v2.0.0-beta.1', expRes: 'v2.0.0-beta.1' },
            { input: '2.0.0-beta.1', expRes: 'v2.0.0-beta.1' },
        ])('Should return the parsed version for all accepted inputs', ({ input, expRes }) => {
            if (!expRes) {
                // @ts-ignore
                const res = () => service.getVersion(input)
                expect(res).toThrowError(`Invalid version: ${input}`)
                return
            }

            // @ts-ignore
            const res = service.getVersion(input)
            expect(res).toEqual(expRes)
        })
    })
})
