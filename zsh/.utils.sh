#! /usr/bin/env zsh

function performance_mark() {
    # if `gdate` not exists, install
    if ! command -v gdate &>/dev/null; then
        printf "\n\033[1;33mWARNING: gdate not found, installing...\033[0m\n"
        brew install coreutils
        printf "\n\033[1;33mWARNING: gdate installed, please reload the shell\033[0m\n"
        exit 1
    fi

    local performance_mark_dir="/tmp/performance_mark/$TERMINAL_INSTANCE_ID"
    mkdir -p $performance_mark_dir

    local marker_name="$1"
    local file_name_start="PERF_${marker_name}_START"
    local tmp_file="$performance_mark_dir/$file_name_start.tmp"

    local now=$(gdate +%s%N)

    if [ -z "$marker_name" ]; then
        echo "Usage: performance_mark <marker_name>"
        return 1
    fi

    # check if start time already exists, and calculate time
    if [ -f $tmp_file ]; then
        local start_time=$(cat $tmp_file)
        local end_time=$(($now - $start_time))
        local end_time_ms=$(($end_time / 1000000))
        echo "Time taken for $marker_name: $end_time_ms ms"
        rm $tmp_file
    else
        echo $now >$tmp_file
    fi
}

# Usage: wait_for_input "key"
# Usage: wait_for_input "key" "custom message to display"
function wait_for_input() {
    local TRIGGER_KEY=$1
    local CUSTOM_MESSAGE=$2
    local MESSAGE="Press $TRIGGER_KEY to continue ✨"

    if [ -n "$CUSTOM_MESSAGE" ]; then
        MESSAGE=$CUSTOM_MESSAGE
    fi

    printf "\x1b[31m$MESSAGE\x1b[0m\n"

    while read line; do
        if [[ "$line" == $TRIGGER_KEY ]]; then
            break
        fi
    done
}

function sourceIf() {
    if [ -f "$1" ]; then
        source $1
    fi
}
