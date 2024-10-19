# Use the official Node.js image as the base image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . /app

# Add the wait-for-it.sh script to the container
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it

# Make wait-for-it.sh executable
RUN chmod +x /usr/local/bin/wait-for-it

# Build the application
RUN npm run build

# Command to run when the container starts, waiting for Kafka before starting the dev server
CMD ["wait-for-it", "kafka:9092", "--", "npm", "run", "dev"]
