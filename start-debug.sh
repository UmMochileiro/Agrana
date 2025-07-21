#!/bin/bash
echo "Starting Agrana app..."
cd /workspace
ls -la
echo "Contents of www:"
ls -la www/
echo "Starting server..."
npx serve -s www -p 4200 --cors
