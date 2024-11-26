# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose the port Vite uses (default: 5173)
EXPOSE 5173

# Start the development server with host binding
CMD ["npm", "run", "dev", "--", "--host"]
