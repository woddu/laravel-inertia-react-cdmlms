#!/usr/bin/env bash
set -e  # abort on any error

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
ls -l /var/www/html/database
if [ ! -s /var/www/html/database/database.sqlite ]; then
    echo "ERROR: SQLite database file missing or empty!"
    exit 1
fi

echo "Caching config..."
php artisan config:clear
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed --force
