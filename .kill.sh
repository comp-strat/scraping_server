#!/bin/bash

echo THIS SCRIPT KILLS ALL DOCKERS, PYTHON PROCESSES, NODE PROCESSES ON THIS MACHINE
docker rm -f $(docker ps -a -q)
ps -ax | grep -w python | awk -F ' ' '{print $1}' | xargs sudo kill -9
ps -ax | grep -w node | awk -F ' ' '{print $1}' | xargs sudo kill -9

# Kills all docker images stored in storage
#docker system prune -a
