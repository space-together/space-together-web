FROM node:23

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Run the build script.
RUN npm run build


# Expose the port that the application listens on.
EXPOSE 20044
ENV PORT=20044
# Run the application.
CMD npm run dev
