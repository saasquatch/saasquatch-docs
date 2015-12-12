#!/bin/bash
echo "Starting firebase scripts"

echo "Confirming auth"
firebase list --token "$FIREBASETOKEN" || echo "Error confirming auth"

echo "Deploying site"
firebase deploy --token "$FIREBASETOKEN" || echo "Error deploying site"

echo "Done"