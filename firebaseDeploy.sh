#!/bin/bash
set -ev

echo "Starting firebase scripts"

## Deploys the `build` directoy automatically
firebase deploy --token "$FIREBASETOKEN" || echo "Error deploying site"

## Purges the entire MaxCDN cache
npm install maxcdn-purge
node ./node_modules/maxcdn-purge/purge.js --alias referralsaasquat --key $MAXCDN_KEY  --secret $MAXCDN_SECRET --pull 136632

echo "Done deploy script"