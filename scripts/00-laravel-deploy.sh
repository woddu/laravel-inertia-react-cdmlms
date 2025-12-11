#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html
composer require fakerphp/faker --working-dir=/var/www/html

echo "Installing frontend dependencies..."
npm install --prefix /var/www/html

echo "Building frontend assets..."
npm run build --prefix /var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed --force

echo "Fixing SQLite permissions..."
chown www-data:www-data /var/www/html/database/database.sqlite
chmod 664 /var/www/html/database/database.sqlite
chown www-data:www-data /var/www/html/database
chmod 775 /var/www/html/database
