# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Assuming your server's package.json and yarn.lock are inside the server directory
# Adjust these paths according to your project's structure
COPY server/package.json server/yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the server directory contents to the working directory
COPY server/ ./

# Copy the built React app (dist directory) into the public directory of your server
# Adjust this according to how your Express app serves static files
# This example assumes your Express app serves static files from a directory named 'public'
COPY dist /usr/src/dist

# The command to run your application
# Make sure the start script in your server's package.json is set up to start your Express app
CMD ["yarn", "start"]
