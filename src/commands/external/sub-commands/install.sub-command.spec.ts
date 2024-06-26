/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { CheckUpdateService } from '@services/check-update.service'
import { loggerMockCreator } from '@services/logger/testing/logger.mock'
import { InstallSubCommand } from './install.sub-command'

describe('InstallSubCommand', () => {
    let service: InstallSubCommand

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InstallSubCommand,
                loggerMockCreator(InstallSubCommand.name),
                {
                    provide: CheckUpdateService,
                    useValue: { checkForUpdates: jest.fn() },
                },
            ],
        }).compile()

        service = module.get<InstallSubCommand>(InstallSubCommand)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('parseExternalName', () => {
        it.each([
            { input: 'test-shell.txt', expRes: 'test-shell.txt.sh' },
            { input: 'test-shell.txt.sh', expRes: 'test-shell.txt.sh' },
            { input: 'test-shell.sh', expRes: 'test-shell.sh' },
            { input: 'test.sh-shell.sh', expRes: 'test.sh-shell.sh' },
            { input: 'test.sh-shell', expRes: 'test.sh-shell.sh' },
            { input: 'test-shell', expRes: 'test-shell.sh' },
        ])('should grab the name of the external with the extension of .sh', ({ input, expRes }) => {
            // @ts-expect-error
            const res = service.parseExternalName(input)
            expect(res).toEqual(expRes)
        })
    })
})
