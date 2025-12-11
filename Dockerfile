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

# Copy application code
COPY . .

# Copy built assets from Node stage (Vite outputs to public/build)
COPY --from=node-build /app/public/build /var/www/html/public/build

# Install PHP dependencies once at build time
RUN composer install --no-dev --optimize-autoloader

# Image config
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV COMPOSER_ALLOW_SUPERUSER=1

CMD ["/start.sh"]
