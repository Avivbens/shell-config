source ./project-scripts/create-fig-spec.sh

npm --prefix ./.fig/autocomplete run publish-spec \
  -- -n 'shell-config' \
  -p 'build/shell-config.js' \
  -s 'generate-fig-spec'