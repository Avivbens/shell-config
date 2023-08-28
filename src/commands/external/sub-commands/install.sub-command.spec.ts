import { Test, TestingModule } from '@nestjs/testing'
import { LoggerService } from '@services/logger.service'
import { InstallSubCommand } from './install.sub-command'

describe('InstallSubCommand', () => {
    let service: InstallSubCommand

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InstallSubCommand,
                {
                    provide: LoggerService,
                    useValue: { setContext: jest.fn() },
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
        ])(
            'should grab the name of the external with the extension of .sh',
            ({ input, expRes }) => {
                // @ts-ignore
                const res = service.parseExternalName(input)
                expect(res).toEqual(expRes)
            },
        )
    })
})
