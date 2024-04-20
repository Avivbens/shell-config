#! /usr/bin/env zsh

# create ngrx files - first arg is the name of the module, second is the name of the facade
function ngrxcreate(){
    touch ./actions.ts
    touch ./reducers.ts
    touch ./selectors.ts

    # name for effects service
    ng g s "$1Effects" --skip-tests 
    mv ./*effects.service.ts ./effects.ts

    # default name for facade service
    ng g s ${2:-facade}

    echo "set store and effects on the related module"
}


# Load Angular CLI autocompletion.
if command -v ng &> /dev/null
then
    source <(ng completion script)
fi
