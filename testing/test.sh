#!/bin/bash
cd ..
./.build.sh
npm install -g newman
wait-on tcp:5000 && wait-on tcp:27017 && wait-on tcp:8000
newman run testing/postman_tests.json
./.kill.sh
