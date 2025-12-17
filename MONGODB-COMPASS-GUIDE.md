# Viewing Data in MongoDB Compass

## Where Your Data is Stored

### Database Name
**`student-notes`** (from the connection string: `mongodb://localhost:27017/student-notes`)

### Collections (Tables)
1. **`users`** - Stores all user accounts
   - Fields: `username`, `password` (hashed), `createdAt`, `updatedAt`
   
2. **`notes`** - Stores all study notes
   - Fields: `title`, `description`, `userId`, `createdAt`, `updatedAt`

## Connecting MongoDB Compass

### Step 1: Download MongoDB Compass
If you don't have it, download from: https://www.mongodb.com/try/download/compass

### Step 2: Connect to Your Database

1. **Open MongoDB Compass**

2. **Enter Connection String:**
   ```
   mongodb://localhost:27017
   ```
   Or click "Fill in connection fields individually" and enter:
   - **Host:** `localhost`
   - **Port:** `27017`

3. **Click "Connect"**

### Step 3: View Your Data

1. **Select Database:**
   - In the left sidebar, expand "Databases"
   - Click on **`student-notes`**

2. **View Collections:**
   - Click on **`users`** collection to see all users
   - Click on **`notes`** collection to see all notes

3. **View Documents:**
   - Each document (row) represents one user or note
   - Click on a document to see its details in JSON format

## Example Data Structure

### Users Collection
```json
{
  "_id": ObjectId("..."),
  "username": "admin",
  "password": "$2a$10$...",  // Hashed password
  "createdAt": ISODate("2024-01-01T10:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T10:00:00.000Z")
}
```

### Notes Collection
```json
{
  "_id": ObjectId("..."),
  "title": "My First Note",
  "description": "This is a sample note",
  "userId": ObjectId("..."),  // Reference to user
  "createdAt": ISODate("2024-01-01T10:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T10:00:00.000Z")
}
```

## Quick Actions in Compass

### View All Users
1. Click on `student-notes` database
2. Click on `users` collection
3. See all registered users in the list

### View All Notes
1. Click on `student-notes` database
2. Click on `notes` collection
3. See all created notes

### Search/Filter
- Use the filter bar at the top to search for specific documents
- Example: `{ "username": "admin" }` to find admin user

### Edit Data (Manual)
- Click on any document to edit it directly
- **Warning:** Be careful editing data manually, especially passwords!

## Troubleshooting

### Can't Connect?
- Make sure MongoDB is running
- Check if MongoDB service is started: `Get-Service MongoDB` (PowerShell)
- Verify port 27017 is not blocked by firewall

### Database Not Showing?
- The database is created automatically when you first save data
- If empty, create a user first using: `npm run register` in backend folder

### Collections Not Showing?
- Collections are created automatically when you save the first document
- Create a user and a note through the application first

