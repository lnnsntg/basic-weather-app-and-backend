const express = require('express')
const cors = require('cors')
const rateLimit = require("express-rate-limit")
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.set('trust proxy', 1)

app.use("/apiweather", require("./routes/index.js"))

// Enable cors
app.use(cors())

// Set static folder
app.use(express.static('public'))



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
