const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.use("/apiweather", require("./routes/index.js"))
// Enable cors
app.use(cors())
app.use(express.static('public'))



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



// console.log(process.env);
