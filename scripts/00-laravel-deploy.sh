#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed --force

echo "Fixing SQLite permissions..."
# Adjust ownership to web server user (often www-data for Nginx/PHP-FPM)
sudo chown www-data:www-data /var/www/html/database/database.sqlite
sudo chmod 664 /var/www/html/database/database.sqlite
sudo chown www-data:www-data /var/www/html/database
sudo chmod 775 /var/www/html/database