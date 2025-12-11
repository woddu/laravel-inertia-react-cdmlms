# Stage 1: Build frontend assets
FROM node:18 AS node-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: PHP/Nginx container
FROM richarvey/nginx-php-fpm:latest
WORKDIR /var/www/html
COPY . .

# Copy built assets from Node stage
COPY --from=node-build /app/public/js /var/www/html/public/js
COPY --from=node-build /app/public/css /var/www/html/public/css

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

ENV WEBROOT /var/www/html/public
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]
