#!/bin/bash

# Configuration
IP="103.176.178.110"
USER="root"
REMOTE="${USER}@${IP}"

echo "============================================="
echo "SSH Connection Helper for $REMOTE"
echo "============================================="

# Test if passwordless SSH is already working
echo "Checking if passwordless SSH is already configured..."
if ssh -o BatchMode=yes -o ConnectTimeout=3 -o PubkeyAuthentication=yes "$REMOTE" "echo 'OK'" >/dev/null 2>&1; then
    echo "✔ Passwordless SSH is already configured!"
    echo "Connecting to $REMOTE..."
    echo "---------------------------------------------"
    exec ssh "$REMOTE"
fi

echo "✗ Passwordless SSH is not set up yet."
echo ""
echo "Step 1: Checking for existing SSH keys locally..."

# Find existing public keys
KEY_PATH=""
for key in ~/.ssh/id_ed25519.pub ~/.ssh/id_rsa.pub ~/.ssh/id_ecdsa.pub; do
    if [ -f "$key" ]; then
        KEY_PATH="$key"
        break
    fi
done

if [ -n "$KEY_PATH" ]; then
    echo "✔ Found existing public key: $KEY_PATH"
else
    echo "✗ No existing SSH key found. Generating a new one (RSA 4096-bit)..."
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa
    KEY_PATH="$HOME/.ssh/id_rsa.pub"
    echo "✔ New key pair generated at: ~/.ssh/id_rsa"
fi

echo ""
echo "Step 2: Copying public key to remote server..."
echo "Please enter the root password when prompted below (this is the last time you will need to type it):"
echo "---------------------------------------------"

# Run ssh-copy-id
if ssh-copy-id -i "$KEY_PATH" "$REMOTE"; then
    echo "---------------------------------------------"
    echo "✔ SSH key successfully copied!"
    echo "From now on, you can log in by running this script or just typing: ssh $REMOTE"
    echo "Connecting to $REMOTE now..."
    echo "---------------------------------------------"
    exec ssh "$REMOTE"
else
    echo "---------------------------------------------"
    echo "✗ Failed to copy SSH key to the remote server."
    echo "Please check the password/IP and try again."
    exit 1
fi
