#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html
composer require fakerphp/faker --working-dir=/var/www/html

echo "Ensuring SQLite database file exists..."
# Make sure the database directory exists
mkdir -p /var/www/html/database
# Create the sqlite file if it doesn't exist
if [ ! -f /var/www/html/database/database.sqlite ]; then
    touch /var/www/html/database/database.sqlite
fi

echo "Fixing SQLite permissions..."
chown www-data:www-data /var/www/html/database/database.sqlite
chmod 664 /var/www/html/database/database.sqlite
chown www-data:www-data /var/www/html/database
chmod 775 /var/www/html/database

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed --force
