#!/bin/bash

docker rm -f $(docker ps -a -q)
pkill python
pkill node
# Kills all docker images stored in storage
#docker system prune -a
