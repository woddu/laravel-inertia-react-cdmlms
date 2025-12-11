#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html
composer require fakerphp/faker --working-dir=/var/www/html

echo "Ensuring SQLite database file exists..."
mkdir -p /var/www/html/database
if [ ! -f /var/www/html/database/database.sqlite ]; then
    touch /var/www/html/database/database.sqlite
fi

echo "Fixing SQLite permissions..."
chown www-data:www-data /var/www/html/database/database.sqlite
chmod 664 /var/www/html/database/database.sqlite
chown www-data:www-data /var/www/html/database
chmod 775 /var/www/html/database

echo "Verifying SQLite file..."
if [ ! -f /var/www/html/database/database.sqlite ]; then
    echo "ERROR: SQLite database file still missing after setup!"
    ls -l /var/www/html/database   # show directory contents for debugging
    exit 1                         # abort deployment
fi

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed --force
