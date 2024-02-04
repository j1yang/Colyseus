# Use Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 2567 (Colyseus default port)
EXPOSE 2567

# Command to run the server
CMD ["npm", "start"]