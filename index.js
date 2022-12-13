const express = require('express')
const app = express()

// add template engine
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// static files - CSS, JS, Images
app.use(express.static(path.join(__dirname, 'public')))

// use file system - red and write files
const fs = require('fs')

app.get('/', (req, res) => {
    fs.readFile('./tasks.json', 'utf-8', (err, jsonString) => {
        if(err){
            console.log('Error reading file: ', err)
            return
        }
        try {
            const tasks = JSON.parse(jsonString)
            res.render('index', {tasksData : tasks})
        } catch (err) {
            console.log('Error parsing JSON file: ', err)
        }
    })
})

app.listen(3002)