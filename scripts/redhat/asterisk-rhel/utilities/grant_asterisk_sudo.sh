#!/bin/bash

# Ensure the script is run as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root."
   exit 1
fi

# Define the sudoers entry
SUDOERS_ENTRY="asterisk ALL=(ALL) NOPASSWD:ALL"

# Create the sudoers file for the 'asterisk' user
echo "$SUDOERS_ENTRY" > /etc/sudoers.d/asterisk

SUDOERS_ENTRY="rapidreach ALL=(ALL) NOPASSWD:ALL"

# Create the sudoers file for the 'rapidreach' user
echo "$SUDOERS_ENTRY" > /etc/sudoers.d/rapidreach

# Set the correct permissions
chmod 0440 /etc/sudoers.d/asterisk

# Validate the sudoers file
if visudo -cf /etc/sudoers.d/asterisk; then
    echo "Sudoers file is valid. Passwordless sudo privileges granted to 'asterisk' user."
else
    echo "Error: Invalid sudoers file. Changes have not been applied."
    rm /etc/sudoers.d/asterisk
    exit 1
fi
