# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build Angular app
RUN npm run build 

# ---- Production Stage ----
FROM nginx:alpine

# Copy build output (adjust dist/project-name)
COPY --from=builder /app/dist/student-notes /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
