# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Bundle your app's source code inside the Docker image
COPY . .

# The command to run your application
CMD ["yarn", "start"]
