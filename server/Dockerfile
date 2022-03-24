FROM node:14.16.0 AS development

WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE ${SERVER_CONTAINER_PORT}
# Start the app
CMD [ "npm", "run", "dev" ]
# FROM node:14

# ENV TZ=Europe/Helsinki

# WORKDIR /app
# COPY package.json .

# RUN npm install

# RUN apt-get update; apt-get -y install libfontenc1 libxfont1 xfonts-75dpi xfonts-base xfonts-encodings xfonts-utils xfonts-intl-european \
# 	&& wget -q "https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.stretch_amd64.deb" -O /tmp/wkhtmltox.deb \
# 	&& dpkg -i /tmp/wkhtmltox.deb && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*

# CMD ["npm", "run", "dev"]