# Build Instructions

## Building Docker Images

### Backend Image

```bash
cd backend
docker build -t student-notes-backend:latest .
```

### Frontend Image

```bash
cd frontend
docker build -t student-notes-frontend:latest .
```

## Running Containers

### Prerequisites
- MongoDB must be running and accessible
- For local MongoDB: `mongodb://localhost:27017/student-notes`
- For Docker MongoDB: `mongodb://host.docker.internal:27017/student-notes`
- For remote MongoDB: Use your MongoDB connection string

### Run Backend Container

```bash
docker run -d \
  --name student-notes-backend \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/student-notes \
  -e JWT_SECRET=your-secret-key-change-this \
  student-notes-backend:latest
```

### Run Frontend Container

```bash
docker run -d \
  --name student-notes-frontend \
  -p 80:80 \
  student-notes-frontend:latest
```

**Note:** Update the API URL in frontend service files if backend is not on `localhost:3000`

## Creating Initial User

### Option 1: Using Register Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Option 2: Using Script (if running locally)
```bash
cd backend
npm run create-user admin admin123
```

## Jenkins Pipeline

The Jenkinsfile will automatically:
1. Build both Docker images
2. Tag them with build number and latest
3. Push to registry (if configured)
4. Run health checks

### Jenkins Credentials (Optional)
- `docker-registry`: Docker registry URL (e.g., `registry.example.com`)
- `mongodb-uri`: MongoDB connection string
- `jwt-secret`: JWT secret key

If credentials are not configured, the pipeline will still build images but skip pushing to registry.

