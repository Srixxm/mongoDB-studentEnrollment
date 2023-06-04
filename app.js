require('dotenv').config()
const express = require('express')
const app = express()
const PORT= 3880
const Stud = require("./routes/students")
const mongoose = require('mongoose')

app.use(express.json())

mongoose.connect(process.env.my_db)
const db = mongoose.connection
db.on('error', errorMessage => console.log(errorMessage))
db.once('open', ()=> console.log('connection established'))



app.get(('/'), (request, response) => {
    response.send("welcome")
})

app.use('/api/v1/students', Stud)


app.listen(PORT, console.log('listening on port http://localhost:3880/'))