import { BASE_PATH, CURL_COMMAND } from '@common/constants'
import { TELL_TERMINAL_EXECUTE_SCRIPT } from '@common/utils'

export const DOWNLOAD_SCRIPT_LATEST = `
mkdir -p "${BASE_PATH}/downloads"
${CURL_COMMAND} "https://api.github.com/repos/Avivbens/shell-config/releases/latest" \
| grep "browser_download_url.*cli-v.*.zip" \
| cut -d : -f 2,3 \
| xargs ${CURL_COMMAND} -A "Mozilla/5.0" -o "$HOME/shell-config/downloads/cli-update.zip"
`

/**
 * @param version - target version
 * @example
 * ```typescript
 * DOWNLOAD_SCRIPT_CUSTOM('v1.1.1')
 * ```
 * @returns a bash command to download the target version
 */
export const DOWNLOAD_SCRIPT_CUSTOM = (version: string) => `
mkdir -p "${BASE_PATH}/downloads"
${CURL_COMMAND} "https://github.com/Avivbens/shell-config/releases/download/${version}/cli-${version}.zip" -s -A "Mozilla/5.0" -o ${BASE_PATH}/downloads/cli-update.zip
`

export const UNZIP_SCRIPT = `
unzip -q "${BASE_PATH}/downloads/cli-update.zip" -d "${BASE_PATH}/downloads"
filename="$(basename ${BASE_PATH}/downloads/bin/*)"
mv "${BASE_PATH}/downloads/bin/$filename" "${BASE_PATH}/downloads/$filename"
echo $filename

rm "${BASE_PATH}/downloads/cli-update.zip"
rm -rf "${BASE_PATH}/downloads/bin"
`

export const DOWNLOAD_FILE_PATH = (filename: string) => `${BASE_PATH}/downloads/${filename.replace(/\n/g, '')}`

export const MIGRATE_SCRIPT = (filename: string) => `
ln -f "${DOWNLOAD_FILE_PATH(filename)}" "${BASE_PATH}/executable/shell-config"
`

/**
 * @description Dynamically generated script to init shell-config setup
 * @see {@link [script](src/commands/init-script/config/init-script.config.ts)}
 */
export const INIT_SCRIPT = `
shell-config --version
${TELL_TERMINAL_EXECUTE_SCRIPT('source <(shell-config init-script)')}
` as const
