# Use Node.js base image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Use NGINX base image for serving static files
FROM nginx:latest

# Copy the built files from the previous stage to NGINX's default serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy assets to the dist directory
COPY res /usr/share/nginx/html/res

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
