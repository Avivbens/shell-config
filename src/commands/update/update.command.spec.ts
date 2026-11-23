/* eslint-disable @typescript-eslint/ban-ts-comment */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { CheckUpdateService } from '@services/check-update.service'
import { loggerMockCreator } from '@services/logger/testing/logger.mock'
import { UpdateCommand } from './update.command'

describe('UpdateCommand', () => {
    let service: UpdateCommand
    const checkUpdateServiceMock = { checkForUpdates: vi.fn() }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCommand,
                loggerMockCreator(UpdateCommand.name),
                {
                    provide: CheckUpdateService,
                    useValue: checkUpdateServiceMock,
                },
            ],
        }).compile()

        service = module.get<UpdateCommand>(UpdateCommand)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should inject CheckUpdateService by its type, which needs decorator metadata from the test transform', () => {
        expect(service['checkUpdateService']).toBe(checkUpdateServiceMock)
    })

    describe('getVersion', () => {
        it.each([
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
            // @ts-expect-error
            const res = service.getVersion(input)
            expect(res).toEqual(expRes)
        })

        it('Should throw for an input that is not a version', () => {
            // @ts-expect-error
            const res = () => service.getVersion('no-version')
            expect(res).toThrow('Invalid version: no-version')
        })
    })
})
