#!/bin/bash

# Todo: make all of the servers docker containers

cd flaskserver
chmod +x .build.sh
./.build.sh
cd ../server
npm install
npm install -g wait-on
wait-on tcp:5000 && wait-on tcp:27017 && npm run prod &
