FROM node:14.16.0 AS development

WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE ${CLIENT_CONTAINER_PORT}
# Start the app
CMD [ "npm", "start" ]
# FROM node:14

# WORKDIR /app
# COPY package.json .

# RUN npm install

# CMD ["npm", "start"]
