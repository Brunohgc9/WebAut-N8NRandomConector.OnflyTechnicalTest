# Stage 1: Build TypeScript
FROM node:22 AS build

WORKDIR /project

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies without running scripts
RUN npm ci --ignore-scripts

# Copy all source files
COPY . .

# Build TypeScript to dist
RUN npm run build

# Stage 2: n8n + custom nodes
FROM n8nio/n8n:latest

WORKDIR /home/node/.n8n

# Copy compiled custom nodes from build stage
COPY --from=build /project/dist/TrueNumberGeneratorNode ./custom

# Mount volume for development (optional)
VOLUME ["/home/node/.n8n/custom"]

# Expose n8n port
EXPOSE 5678

# CMD default from n8n image will run n8n
