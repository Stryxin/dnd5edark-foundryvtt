#!/usr/bin/env bash

set -e

echo "Creating release zip..."

zip dnd5e-dark-mode.zip ui betternpcsheet-dark.css dark-mode.css dnd5edark.css dnd5edark.js module.json

echo "Done."
