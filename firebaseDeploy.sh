#!/bin/bash
set -ev

echo "Starting firebase scripts"

## Deploys the `build` directoy automatically
npm install -g firebase-tools || { echo "Couldn't install Firebase tools" ; exit 1; }
firebase deploy --token "$FIREBASETOKEN" || { echo "Error deploying site to Firebase" ; exit 1; }

## Purges the entire MaxCDN cache
npm install maxcdn-purge  || { echo "Error installing MaxCDN Purge" ; exit 1; }
node ./node_modules/maxcdn-purge/purge.js --alias referralsaasquat --key $MAXCDN_KEY  --secret $MAXCDN_SECRET --pull 136632 || { echo "Error Purging MaxCDN Cache" ; exit 1; }

echo "Done deploy script"