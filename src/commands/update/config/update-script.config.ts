export const DOWNLOAD_SCRIPT = `
curl -s https://api.github.com/repos/Avivbens/shell-config/releases/latest \
| grep "browser_download_url.*cli-v.*.zip" \
| cut -d : -f 2,3 \
| tr -d \" \
| xargs curl -L -A "Mozilla/5.0" -o $HOME/shell-config/downloads/cli-update.zip
`

export const UNZIP_SCRIPT = `
unzip $HOME/shell-config/downloads/cli-update.zip -d $HOME/shell-config/downloads
filename=$(basename $HOME/shell-config/downloads/bin/*)
mv $HOME/shell-config/downloads/bin/* $HOME/shell-config/downloads
echo $filename

rm $HOME/shell-config/downloads/cli-update.zip
rm -rf $HOME/shell-config/downloads/bin
`

export const UPDATE_SCRIPT = `
ln -f "$HOME/shell-config/downloads/$filename" "$HOME/shell-config/executable/shell-config"
`
