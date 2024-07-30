#! /usr/bin/env zsh

function netconnect() {
  local name=$1
  local password=$2

  if [ -z $name ]; then
    echo "Please provide a network name"
    return 1
  fi

  if [ -z $password ]; then
    echo "Please provide a network password"
    return 1
  fi

  networksetup -setairportnetwork en0 $name $password
}

alias netinfo="networksetup -getinfo "Wi-Fi""
