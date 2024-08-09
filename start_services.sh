#!/bin/bash

ROOT_PATH="/home/admin/intranet"

# Start Node.js Express proxy server
echo "Starting Node.js Express proxy server"
cd $ROOT_PATH/main
nohup sudo npm run start &

echo "Everything started!"
