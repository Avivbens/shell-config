import { execSync } from 'node:child_process';
import { env } from 'node:process';

const remoteOrigin =
  env.GITHUB_SERVER_URL && env.GITHUB_REPOSITORY
    ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}.git`
    : execSync('git remote get-url origin').toString().trim();

export const remoteBaseURL = new URL(remoteOrigin).origin;

export const repositoryLink = remoteOrigin.replace(/\.git$/m, '');

export const repositoryFullname = env.GITHUB_REPOSITORY || remoteOrigin.match(/^https:\/\/.*\/(.*\/.*).git$/m)?.[1];

// TODO: dynamically get the default branch
export const remoteDefaultBranch = 'master';

if (!remoteBaseURL) {
  throw new Error('Could not find remote base URL!');
} else if (!repositoryLink) {
  throw new Error('Could not find repository link!');
} else if (!repositoryFullname) {
  throw new Error('Could not find repository fullname!');
} else if (!remoteDefaultBranch) {
  throw new Error('Could not find remote default branch!');
}
