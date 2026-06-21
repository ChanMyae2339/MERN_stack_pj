FROM node:22-alpine AS deps

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Use Node.js AS the base image
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL


COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the project files 
COPY . .


RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose the port Nginx runs on (usually 80)
EXPOSE 80

# Start the application
CMD [ "nginx", "-g", "daemon off;" ]