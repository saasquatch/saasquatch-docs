#!/bin/bash
set -ev

echo "Starting firebase scripts"

firebase deploy --token "$FIREBASETOKEN" || echo "Error deploying site"

## TODO: Add MaxCDN purge step: https://github.com/MaxCDN/maxcli/tree/master/maxpurge

echo "Done deploy script"