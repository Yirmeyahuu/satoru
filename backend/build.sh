#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

# No migrations needed - using Firestore!
echo "✓ Build complete - using Firebase/Firestore"