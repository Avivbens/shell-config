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

function netwatch() {
  local iface target threshold fails ssid

  target="1.1.1.1"
  threshold=2
  fails=0

  # Resolve the Wi-Fi device name dynamically — it isn't always en0 (Ethernet
  # adapters, Thunderbolt bridges, etc. can shift the numbering).
  iface=$(networksetup -listallhardwareports | awk '/Hardware Port: Wi-Fi/{getline; print $2}')

  # `networksetup -getairportnetwork` is unreliable on recent macOS (often
  # reports "not associated" while connected). `ipconfig getsummary` reads the
  # live interface state and is the modern source of truth for the SSID.
  ssid=$(ipconfig getsummary "$iface" | awk -F ' SSID : ' '/ SSID : / {print $2}' | head -1)

  if [ -z "$ssid" ]; then
    echo "Not connected to a Wi-Fi network"
    return 1
  fi

  echo "Watching '$ssid' via $iface"

  while true; do
    # macOS ping: -W is milliseconds (Linux uses seconds). 1000ms = 1s timeout.
    if ping -c 1 -W 1000 "$target" > /dev/null 2>&1; then
      fails=0
    else
      ((fails++))
      echo "[$(date +%H:%M:%S)] ping failed ($fails/$threshold)"
    fi

    if [ "$fails" -ge "$threshold" ]; then
      echo "[$(date +%H:%M:%S)] reconnecting to '$ssid'..."
      # Bounce the radio first: a stale scan cache makes `-setairportnetwork`
      # fail with "Could not find network" even when the SSID is in range.
      networksetup -setairportpower "$iface" off
      sleep 1
      networksetup -setairportpower "$iface" on
      sleep 2
      # Explicitly target the captured SSID so we rejoin the original network
      # rather than whatever known network macOS happens to pick first.
      networksetup -setairportnetwork "$iface" "$ssid"
      fails=0
      sleep 3
    fi

    sleep 1
  done
}

alias netinfo="networksetup -getinfo "Wi-Fi""
alias pubip="curl -s http://whatismyip.akamai.com"