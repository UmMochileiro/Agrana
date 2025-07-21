#!/bin/bash
# EasyPanel startup script

echo "🚀 Starting Agrana application..."

# Install serve if not available
npm install -g serve

# Start the application
echo "📂 Serving from www directory..."
serve -s www -p 4200 --cors --single
