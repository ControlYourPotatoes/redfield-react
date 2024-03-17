# Build stage for compiling native dependencies
FROM node:14 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for dependency installation
COPY server/package.json server/yarn.lock ./

# Install all dependencies
RUN yarn install

# Copy over the rest of your server's code
COPY server/ ./

# Build stage for the final image
FROM node:14-slim

# Set the working directory in the slim container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock from the build stage
COPY --from=build /usr/src/app/package.json /usr/src/app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy built server files from the build stage
COPY --from=build /usr/src/app ./

# Copy the built React app (dist directory) into the appropriate directory
# This assumes your server serves static files from a directory named 'public'
# Adjust the destination path according to your server's static file serving configuration
COPY dist /usr/src/dist


# Expose the port your server listens on
EXPOSE $PORT
# Command to run your app (adjust as necessary)
CMD ["yarn", "start"]
