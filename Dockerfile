# Use Bun official image
FROM oven/bun:1.2.18-slim

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY bun.lock ./
COPY package.json ./
COPY tsconfig.json ./
COPY astro.config.* ./

# Install dependencies
RUN bun install

# Copy the rest of your app source code
COPY . .

# Build the app (output: 'server' in astro.config.mjs)
RUN bun run build

# Expose the SSR server port (Astro default is 3000)
EXPOSE 4321

# Start the SSR server
CMD ["bun", "run", "preview","--host"]
