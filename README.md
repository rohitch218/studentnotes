# Student Notes Application

A full-stack application for storing, editing, deleting, and viewing study notes with JWT authentication.

## Features

- ✅ User login (JWT authentication)
- ✅ Create note (title + description)
- ✅ View all notes
- ✅ Edit note
- ✅ Delete note

## Tech Stack

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- Angular 16
- HTTP Client for API calls
- JWT Token Management

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json
│   ├── angular.json
│   └── Dockerfile
└── Jenkinsfile
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (optional)

### Notes
- `GET /api/notes` - Get all notes (requires authentication)
- `POST /api/notes` - Create a new note (requires authentication)
- `PUT /api/notes/:id` - Update a note (requires authentication)
- `DELETE /api/notes/:id` - Delete a note (requires authentication)

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or remote)
- Docker (for containerization)
- Jenkins (for CI/CD)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/student-notes
JWT_SECRET=your-secret-key-change-in-production
```

4. Start the server:
```bash
npm start
# or for development
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/app/services/auth.service.ts` and `src/app/services/notes.service.ts` if needed (default: `http://localhost:3000/api`)

4. Start the development server:
```bash
npm start
```

5. Open browser at `http://localhost:4200`

## Docker Build

### Build Backend Image
```bash
cd backend
docker build -t student-notes-backend:latest .
```

### Build Frontend Image
```bash
cd frontend
docker build -t student-notes-frontend:latest .
```

### Run Backend Container
```bash
docker run -d -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/student-notes \
  -e JWT_SECRET=your-secret-key \
  --name student-notes-backend \
  student-notes-backend:latest
```

### Run Frontend Container
```bash
docker run -d -p 80:80 \
  --name student-notes-frontend \
  student-notes-frontend:latest
```

## Jenkins CI/CD

The `Jenkinsfile` includes:
- Building Docker images for both backend and frontend
- Pushing images to Docker registry (if configured)
- Running basic health checks

### Jenkins Setup

1. Create a new Pipeline job in Jenkins
2. Point it to the `Jenkinsfile` in the repository
3. Configure credentials (optional):
   - `docker-registry`: Docker registry URL
   - `mongodb-uri`: MongoDB connection string
   - `jwt-secret`: JWT secret key

### Running the Pipeline

The pipeline will:
1. Checkout the code
2. Build backend Docker image
3. Build frontend Docker image
4. Push images to registry (if configured)
5. Run health checks

## Environment Variables

### Backend
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend
- API URL is configured in the service files (default: `http://localhost:3000/api`)

## Notes

- For production, ensure MongoDB is accessible from your containers
- Update JWT_SECRET to a strong random string
- Configure CORS settings if frontend and backend are on different domains
- The frontend Dockerfile uses nginx to serve the Angular app
- The nginx config includes API proxy configuration (optional)

## License

MIT

