import { resolveBundledAsset } from '@common/utils'
import { readFile } from 'node:fs/promises'
import { ReplacementTemplate } from './models/replacement.enum'

export async function replaceInTemplate(
    filePath: string,
    replacementObject: Record<ReplacementTemplate, string>,
): Promise<string> {
    const path = resolveBundledAsset(__dirname, filePath)
    const file = await readFile(path, 'utf-8')

    let newFile: string = file
    const entires = Object.entries(replacementObject)

    for (const [key, value] of entires) {
        newFile = newFile.replace(new RegExp(key, 'g'), value)
    }

    return newFile
}
