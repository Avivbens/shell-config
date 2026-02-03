#! /usr/bin/env zsh

# create aliases only if kubectl exists
if command -v kubectl &>/dev/null; then
    # List pods
    alias kgp='kubectl get pods'

    # List contexts
    alias kctx='kubectx'

    # Connect to pod shell (pass pod name as argument)
    function kexec() {
        local pod_name=$1

        if [ -z "$pod_name" ]; then
            echo "Please provide a pod name"
            return 1
        fi

        kubectl exec -it "$pod_name" -- /bin/sh
    }
fi
