import boxen from 'boxen'
import { homedir } from 'node:os'

export const AVAILABLE_ACTIONS = [
    { name: 'Create a new git profile', value: 'create_new_git_profile' },
    { name: 'Create a new npmrc profile', value: 'create_new_npmrc_profile' },
    { name: 'Create a new custom npmrc profile', value: 'create_new_custom_npmrc_profile' },
    { name: 'Exit', value: '' },
] as const
export type AvailableActionIds = (typeof AVAILABLE_ACTIONS)[number]['value']

export const GIT_PROFILES_TARGET = `${homedir()}/.gitprofiles`
export const NPM_PROFILES_TARGET = `${homedir()}/.npmrcs`

const EXPLAIN_FEATURE = `
This feature allows you to create profiles for git and npmrc files.

Switch between profiles by running the following commands:

## Git
swgit <profile-name>
swgit # show all profiles

## npmrc - requires npmrc npm package as a global
npmrc <profile-name>
npmrc # show all profiles
`

export const HELP_BOX_MESSAGE = boxen(EXPLAIN_FEATURE, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    title: 'Multi Profiles Manager',
    titleAlignment: 'center',
    textAlignment: 'left',
    float: 'center',
    backgroundColor: '#d38320',
    borderColor: 'yellow',
    dimBorder: true,
})
