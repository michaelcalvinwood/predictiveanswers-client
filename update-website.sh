#!/bin/bash

npm run build
clear
cd ./build
rsync -a . root@predictiveanswers.com:/var/www/predictiveanswers.com/curBuild
cd ..
