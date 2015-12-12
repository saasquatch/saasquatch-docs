#!/bin/bash
set -ev

echo "Starting firebase scripts"

firebase deploy --token "$FIREBASETOKEN" || echo "Error deploying site"

echo "Done deploy script"