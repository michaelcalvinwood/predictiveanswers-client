#!/bin/bash

clear
cd ./build
rsync -a . root@predictiveanswers.com:/var/www/predictiveanswers.com/curBuild
cd ..
