#!/bin/bash

# Angular Microfrontend Startup Script
# This script starts both the remote and shell applications

echo "🚀 Starting Angular Microfrontend Applications..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Function to check if dependencies are installed
check_dependencies() {
    local dir=$1
    if [ ! -d "$dir/node_modules" ]; then
        echo "📦 Installing dependencies for $dir..."
        cd "$dir" && npm install
        cd ..
    fi
}

# Check and install dependencies
echo "🔍 Checking dependencies..."
check_dependencies "remote"
check_dependencies "shell"

echo ""
echo "🎯 Starting applications..."
echo "   Remote App: http://localhost:4201"
echo "   Shell App:  http://localhost:4200"
echo ""
echo "📋 Instructions:"
echo "   1. Remote application will start first (required)"
echo "   2. Shell application will start after remote is ready"
echo "   3. Access the main app at http://localhost:4200"
echo ""
echo "⚠️  Important: Keep both terminals running!"
echo ""

# Start remote application in background
echo "🔄 Starting Remote Application (Port 4201)..."
cd remote
npm start &
REMOTE_PID=$!
cd ..

# Wait for remote to be ready
echo "⏳ Waiting for remote application to start..."
sleep 10

# Start shell application
echo "🔄 Starting Shell Application (Port 4200)..."
cd shell
npm start &
SHELL_PID=$!
cd ..

echo ""
echo "✅ Both applications are starting!"
echo "🌐 Open http://localhost:4200 to view the application"
echo ""
echo "To stop both applications, press Ctrl+C"

# Wait for user to stop
wait $REMOTE_PID $SHELL_PID
