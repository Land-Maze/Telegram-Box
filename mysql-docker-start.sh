#!/bin/sh

docker run \
--name mysql-telegram-drive \
-e MYSQL_DATABASE=telegram-drive \
-e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
-d -p 3306:3306 mysql:8