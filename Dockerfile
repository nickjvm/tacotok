# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Set node environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies (including dev dependencies)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

# Copy built files and production dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Environment variables (set these in Railway's dashboard)
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

# Use node directly instead of npm for better signal handling
CMD ["node", "server.js"]