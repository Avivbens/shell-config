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

# Usage: _netwatch_name <iface> [name]
function _netwatch_name() {
  local iface=$1 ssid=$2

  if [ -n "$ssid" ]; then
    echo "$ssid"
    return 0
  fi

  # macOS 15+ prints the SSID as <redacted> unless `sudo ipconfig setverbose 1` was run once
  ssid=$(ipconfig getsummary "$iface" | awk -F ' SSID : ' '/ SSID : / {print $2}' | head -1)
  if [ -n "$ssid" ] && [ "$ssid" != "<redacted>" ]; then
    echo "$ssid"
  fi
}

# Usage: netwatch [name]
function netwatch() {
  local iface target threshold fails ssid

  target="1.1.1.1"
  threshold=2
  fails=0

  # Resolve the Wi-Fi device name dynamically — it isn't always en0 (Ethernet
  # adapters, Thunderbolt bridges, etc. can shift the numbering).
  iface=$(networksetup -listallhardwareports | awk '/Hardware Port: Wi-Fi/{getline; print $2}')
  ssid=$(_netwatch_name "$iface" "$1")

  if [ -z "$ssid" ] && [ -z "$(ipconfig getifaddr "$iface")" ]; then
    echo "Not connected to a Wi-Fi network"
    return 1
  fi

  if [ -n "$ssid" ]; then
    echo "Watching '$ssid' via $iface"
  else
    echo "Watching the current Wi-Fi via $iface"
    echo "macOS hides the network name - run 'netwatch <name>', or 'sudo ipconfig setverbose 1' once, to rejoin a specific network"
  fi

  while true; do
    # macOS ping: -W is milliseconds (Linux uses seconds). 1000ms = 1s timeout.
    if ping -c 1 -W 1000 "$target" > /dev/null 2>&1; then
      fails=0
    else
      ((fails++))
      echo "[$(date +%H:%M:%S)] ping failed ($fails/$threshold)"
    fi

    if [ "$fails" -ge "$threshold" ]; then
      echo "[$(date +%H:%M:%S)] reconnecting to '${ssid:-the current Wi-Fi}'..."
      # Bounce the radio first: a stale scan cache makes `-setairportnetwork`
      # fail with "Could not find network" even when the SSID is in range.
      networksetup -setairportpower "$iface" off
      sleep 1
      networksetup -setairportpower "$iface" on
      sleep 2
      # Explicitly target the captured SSID so we rejoin the original network
      # rather than whatever known network macOS happens to pick first.
      if [ -n "$ssid" ]; then
        networksetup -setairportnetwork "$iface" "$ssid"
      fi
      fails=0
      sleep 3
    fi

    sleep 1
  done
}

alias netinfo="networksetup -getinfo "Wi-Fi""
alias pubip="curl -s http://whatismyip.akamai.com"