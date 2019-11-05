#!/bin/bash
cd /var/www/seminario/realtime-nodejs/ || exit
echo "Download changes to git"
git pull origin master
echo "update libs"
npm install
echo "Restart server s"
pm2 restart app
