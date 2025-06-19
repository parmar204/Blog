const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./configs/db')
const adminRouter = require('./routes/adminRoutes')
const path = require("path")
const blogRouter = require('./routes/blogRoutes')

const app = express()
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// routes
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 8000 

app.listen(PORT, () => console.log(`server is running on ${PORT}`))
