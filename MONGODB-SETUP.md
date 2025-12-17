# MongoDB Setup Guide

## Quick Fix: Install MongoDB on Windows

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or 6.0)
   - Platform: Windows
   - Package: MSI
3. Download and run the installer

### Step 2: Install MongoDB
1. Run the MSI installer
2. Choose "Complete" installation
3. **Important**: Check "Install MongoDB as a Service"
4. Check "Run service as Network Service user"
5. Complete the installation

### Step 3: Verify Installation
Open a new PowerShell/Command Prompt and run:
```powershell
mongosh --version
```

### Step 4: Start MongoDB Service
MongoDB should start automatically. If not:
```powershell
# Check if service is running
Get-Service MongoDB

# Start the service if it's stopped
Start-Service MongoDB
```

Or using Command Prompt (as Administrator):
```cmd
net start MongoDB
```

### Step 5: Test Connection
```powershell
mongosh
```

If you see the MongoDB shell prompt, you're good to go!

### Step 6: Restart Your Backend
```powershell
cd backend
node server.js
```

---

## Alternative: Use MongoDB Atlas (Cloud - Free)

If you don't want to install MongoDB locally:

1. **Sign up**: Go to https://www.mongodb.com/cloud/atlas/register
2. **Create a cluster**: Choose the free tier (M0)
3. **Create a database user**: 
   - Database Access → Add New User
   - Choose username and password
4. **Whitelist IP**: 
   - Network Access → Add IP Address
   - Click "Add Current IP Address" or use `0.0.0.0/0` for all IPs
5. **Get connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
6. **Update backend/.env**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student-notes?retryWrites=true&w=majority
   ```
   Replace `username`, `password`, and the cluster URL with your actual values.

---

## Verify MongoDB is Running

After setup, test the connection:
```powershell
# If MongoDB is installed locally
mongosh mongodb://localhost:27017

# Or test from Node.js
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/student-notes').then(() => console.log('Connected!')).catch(e => console.error(e));"
```

---

## Troubleshooting

### MongoDB service won't start
- Run PowerShell/CMD as Administrator
- Check Windows Event Viewer for errors
- Verify port 27017 is not in use: `netstat -an | findstr 27017`

### Connection refused error
- Ensure MongoDB service is running: `Get-Service MongoDB`
- Check firewall settings
- Verify MongoDB is listening on port 27017

### Can't find mongosh
- Add MongoDB bin directory to PATH:
  - Usually: `C:\Program Files\MongoDB\Server\7.0\bin`
  - Or reinstall MongoDB and check "Add to PATH" option

