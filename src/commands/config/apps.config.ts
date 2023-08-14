import { IAppSetup } from 'src/models/app-setup.model';

const BREW_CASK = (app: string) => `brew install --cask ${app}`;
const BREW_INSTALL = (formula: string) => `brew install ${formula}`;
const BREW_TAP = (tapTo: string) => `brew tap ${tapTo}`;

const NODE_GLOBAL = (packageName: string) => `npm install -g ${packageName}`;

export const APPS_CONFIG: Readonly<IAppSetup[]> = [
  {
    name: 'Google Chrome',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('google-chrome')],
  },
  {
    name: 'google-cloud-sdk',
    group: 'cli-apps',
    default: true,
    commands: [BREW_CASK('google-cloud-sdk')],
  },
  {
    name: 'Alfred',
    group: 'apps',
    commands: [BREW_CASK('alfred')],
  },
  {
    name: 'Google Drive',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('google-drive')],
  },
  {
    name: 'Rectangle',
    group: 'apps',
    commands: [BREW_CASK('rectangle')],
  },
  {
    name: 'Visual Studio Code',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('visual-studio-code')],
  },
  {
    name: 'Dash',
    group: 'apps',
    commands: [BREW_CASK('dash')],
  },
  {
    name: 'Python',
    group: 'python',
    default: true,
    commands: [BREW_INSTALL('python')],
  },
  {
    name: 'Python PIP',
    group: 'python',
    default: true,
    commands: [
      'curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py',
      'python3 get-pip.py',
      'rm get-pip.py',
    ],
    description: 'Python package manager, Python is required',
    deps: ['Python'],
  },
  {
    name: 'Mongodb',
    group: 'cli-apps',
    default: true,
    commands: [
      BREW_TAP('mongodb/brew'),
      BREW_INSTALL('mongodb-community@6.0'),
      'mkdir -p ~/mongodb',
    ],
  },
  {
    name: 'Mongodb Compass',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('mongodb-compass')],
    description: 'MongoDB GUI, MongoDB is required',
    deps: ['Mongodb'],
  },
  {
    name: 'Redis',
    group: 'cli-apps',
    default: true,
    commands: [BREW_INSTALL('redis')],
  },
  {
    name: 'Another Redis Desktop Manager',
    group: 'apps',
    default: true,
    commands: [
      BREW_CASK('another-redis-desktop-manager'),
      'sudo xattr -rd com.apple.quarantine /Applications/Another Redis Desktop Manager.app',
    ],
    description: 'Redis GUI, Redis is required',
    deps: ['Redis'],
  },
  {
    name: 'Slack',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('slack')],
  },
  {
    name: 'UTM',
    group: 'apps',
    commands: [BREW_CASK('utm')],
  },
  {
    name: '1Password',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('1password')],
  },
  {
    name: 'Grammarly',
    group: 'apps',
    default: true,
    commands: [BREW_CASK('grammarly')],
  },
  {
    name: 'Cleanshot',
    group: 'apps',
    commands: [BREW_CASK('cleanshot')],
  },
  {
    name: 'VLC',
    group: 'apps',
    commands: [BREW_CASK('vlc')],
  },
  {
    name: 'Notion',
    group: 'apps',
    commands: [BREW_CASK('notion')],
  },
  {
    name: 'Webstorm',
    group: 'apps',
    commands: [BREW_CASK('webstorm')],
  },
  {
    name: 'Rancher',
    group: 'apps',
    commands: [BREW_CASK('rancher')],
  },
  {
    name: 'Postman',
    group: 'apps',
    commands: [BREW_CASK('postman')],
  },
  {
    name: 'Update Hosts File',
    group: 'ZI',
    commands: [
      'sudo chmod +a "user:$USER allow read,write,append,readattr,writeattr,readextattr,writeextattr,readsecurity" /etc/hosts && echo 127.0.0.1 dev.zoominfo.com >> /etc/hosts',
    ],
  },
  {
    name: 'Update MacOS version',
    group: 'MacOS',
    default: true,
    commands: ['softwareupdate -i -a --agree-to-license'],
    last: true,
  },
  {
    name: 'Fig',
    group: 'terminal',
    commands: [BREW_CASK('fig')],
  },
  {
    name: 'ZSH Terminal Syntax Highlighting and Autosuggestions',
    group: 'terminal',
    commands: [
      'git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions',
      'git clone https://github.com/zsh-users/zsh-completions.git ~/.zsh/zsh-completions',
      'git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting',
    ],
  },
  {
    name: 'Fig',
    group: 'terminal',
    commands: [BREW_CASK('fig')],
  },

  // NPM
  {
    name: '@angular/cli',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('@angular/cli')],
  },
  {
    name: '@githubnext/github-copilot-cli',
    group: 'node',
    commands: [NODE_GLOBAL('@githubnext/github-copilot-cli')],
  },
  {
    name: '@nestjs/cli',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('@nestjs/cli')],
  },
  {
    name: 'alfred-open-whatsapp',
    group: 'node',
    commands: [NODE_GLOBAL('alfred-open-whatsapp')],
  },
  {
    name: 'alfred-search-bookmark',
    group: 'node',
    commands: [NODE_GLOBAL('alfred-search-bookmark')],
  },
  {
    name: 'corepack',
    group: 'node',
    commands: [NODE_GLOBAL('corepack')],
  },
  {
    name: 'gulp-cli',
    group: 'node',
    commands: [NODE_GLOBAL('gulp-cli')],
  },
  {
    name: 'heroku',
    group: 'node',
    commands: [NODE_GLOBAL('heroku')],
  },
  {
    name: 'http-server',
    group: 'node',
    commands: [NODE_GLOBAL('http-server')],
  },
  {
    name: 'jest',
    group: 'node',
    commands: [NODE_GLOBAL('jest')],
  },
  {
    name: 'nodemon',
    group: 'node',
    commands: [NODE_GLOBAL('nodemon')],
  },
  {
    name: 'npkill',
    group: 'node',
    commands: [NODE_GLOBAL('npkill')],
  },
  {
    name: 'npmrc',
    group: 'node',
    commands: [NODE_GLOBAL('npmrc')],
  },
  {
    name: 'nx',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('nx')],
  },
  {
    name: 'prettier',
    group: 'node',
    commands: [NODE_GLOBAL('prettier')],
  },
  {
    name: 'pretty-quick',
    group: 'node',
    commands: [NODE_GLOBAL('pretty-quick')],
  },
  {
    name: 'ts-jest',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('ts-jest')],
  },
  {
    name: 'ts-node-dev',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('ts-node-dev')],
  },
  {
    name: 'ts-node',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('ts-node')],
  },
  {
    name: 'ttab',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('ttab')],
  },
  {
    name: 'typescript',
    group: 'node',
    default: true,
    commands: [NODE_GLOBAL('typescript')],
  },
  {
    name: 'vercel',
    group: 'node',
    commands: [NODE_GLOBAL('vercel')],
  },
  {
    name: 'verdaccio',
    group: 'node',
    commands: [NODE_GLOBAL('verdaccio')],
  },
] as const;
