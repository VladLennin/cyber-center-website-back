# Use Node.js as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port on which the Nest.js application runs
EXPOSE 15001

# Command to start the application
CMD ["npm", "run", "start:prod"]
