# syntax=docker/dockerfile:1
# FROM node:18-alpine

# WORKDIR /cloudecommerce/
# COPY public/ /cloudecommerce/public
# COPY src/ /cloudecommerce/src
# COPY package.json /cloudecommerce/
# RUN npm install
# CMD ["npm", "start"]
# Dockerfile
 
# # Use an existing node alpine image as a base image.
# FROM node:18-alpine AS builder
# RUN addgroup app && adduser -S -G app app
# # Set the working directory.
# WORKDIR /app

# COPY public/ /app/public
# COPY src/ /app/src
# # Copy the package.json file.
# COPY package.json .

# RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install
# # Install application dependencies.
# RUN npm install

# # Copy the rest of the application files.
# COPY . .
#  ENV API_URL=http://api.app.test
# # Expose the port.
# EXPOSE 3000
 
# # Run the application.
# CMD [“npm”, “start”]

# FROM ngnix:1.19.0
# WORKDIR /usr/share/ngnix/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT [ "ngnix", "g","daemon off;" ]
#Stage 1
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn install
COPY . .
# Expose the port.
EXPOSE 3000
RUN yarn build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]