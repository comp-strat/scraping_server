#!/bin/bash

git clone --branch alyssa_branch git@github.com:URAP-charter/web_scraping.git
cd flaskserver
./.build.sh
cd ../server
npm install
npm run prod &
