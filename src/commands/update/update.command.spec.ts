/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { UpdateCommand } from './update.command'

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
            { input: '2.0.0-beta.15', expRes: 'v2.0.0-beta.15' },
            { input: '12.0.0-beta.15', expRes: 'v12.0.0-beta.15' },
            { input: 'v12.0.0-beta.15', expRes: 'v12.0.0-beta.15' },
            { input: '12.60.0-beta.15', expRes: 'v12.60.0-beta.15' },
            { input: 'v12.60.0-beta.15', expRes: 'v12.60.0-beta.15' },
            { input: '2.0.80-beta.15', expRes: 'v2.0.80-beta.15' },
            { input: 'v2.0.80-beta.15', expRes: 'v2.0.80-beta.15' },
            { input: '112.440.3280-beta.15', expRes: 'v112.440.3280-beta.15' },
            { input: 'v112.440.3280-beta.15', expRes: 'v112.440.3280-beta.15' },
        ])('Should return the parsed version for all accepted inputs', ({ input, expRes }) => {
            if (!expRes) {
                // @ts-expect-error
                const res = () => service.getVersion(input)
                expect(res).toThrowError(`Invalid version: ${input}`)
                return
            }

            // @ts-expect-error
            const res = service.getVersion(input)
            expect(res).toEqual(expRes)
        })
    })
})
