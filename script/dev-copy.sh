#!/usr/bin/env bash

set -e

if [ $# -eq 0 ]
  then
    echo "Usage: dev-copy.sh <target directory>"
fi

echo "Copying files to '$1'..."

cp -rf ui "$1"
cp betternpcsheet-dark.css "$1"
cp dark-mode.css "$1"
cp dnd5edark.css "$1"
cp dnd5edark.js "$1"
cp module.json "$1"

echo "Done."
