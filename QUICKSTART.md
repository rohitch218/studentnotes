# Quick Start Guide

## Local Development

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use your local MongoDB installation
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # Edit .env with your MongoDB URI
npm start
```

Backend will run on `http://localhost:3000`

### 3. Create Initial User

```bash
# Option 1: Using register endpoint
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Option 2: Using script
cd backend
npm run create-user admin admin123
```

### 4. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:4200`

### 5. Login and Use the App

1. Open `http://localhost:4200`
2. Login with your credentials
3. Start creating notes!

## Docker Deployment

### Build Images

```bash
# Backend
cd backend
docker build -t student-notes-backend:latest .

# Frontend
cd frontend
docker build -t student-notes-frontend:latest .
```

### Run Containers

```bash
# Backend (update MONGODB_URI as needed)
docker run -d \
  --name student-notes-backend \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/student-notes \
  -e JWT_SECRET=your-secret-key \
  student-notes-backend:latest

# Frontend
docker run -d \
  --name student-notes-frontend \
  -p 80:80 \
  student-notes-frontend:latest
```

**Note:** If frontend and backend are on different hosts, update the API URL in:
- `frontend/src/app/services/auth.service.ts`
- `frontend/src/app/services/notes.service.ts`

Change `http://localhost:3000/api` to your backend URL.

## Jenkins CI/CD

1. Create a new Pipeline job in Jenkins
2. Point to the `Jenkinsfile` in your repository
3. Configure environment variables (optional):
   - `DOCKER_REGISTRY`: Your Docker registry URL
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: JWT secret key
4. Run the pipeline

The pipeline will:
- Build Docker images for both backend and frontend
- Tag images with build number and latest
- Push to registry (if configured)
- Run health checks

## Troubleshooting

### Backend can't connect to MongoDB
- Check MongoDB is running
- Verify MONGODB_URI in .env file
- For Docker: Use `host.docker.internal` instead of `localhost`

### Frontend can't connect to Backend
- Check backend is running on port 3000
- Update API URL in frontend service files
- Check CORS settings in backend (should allow all origins in dev)

### Authentication fails
- Verify user exists in database
- Check JWT_SECRET matches between backend instances
- Clear browser localStorage and try again

### Docker build fails
- Ensure Docker is running
- Check Dockerfile syntax
- Verify all required files are present

