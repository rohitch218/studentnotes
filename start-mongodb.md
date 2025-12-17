# Starting MongoDB

You have several options to start MongoDB:

## Option 1: Using Docker (Recommended)

Run MongoDB in a Docker container:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

This will:
- Start MongoDB in detached mode
- Expose port 27017
- Name the container "mongodb"

To stop MongoDB:
```bash
docker stop mongodb
```

To start it again:
```bash
docker start mongodb
```

## Option 2: Install MongoDB Locally

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install it
3. Start MongoDB service:
   - Open Services (services.msc)
   - Find "MongoDB" service
   - Start it

Or use command line:
```bash
net start MongoDB
```

## Option 3: Use MongoDB Atlas (Cloud)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-notes
```

## Verify MongoDB is Running

After starting MongoDB, verify it's accessible:
```bash
# Using Docker
docker ps | grep mongodb

# Or test connection
mongosh mongodb://localhost:27017
```

Then restart your backend server:
```bash
cd backend
node server.js
```

