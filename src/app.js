//add modules
const express = require('express');
const hbs = require('hbs');
const path = require('path');

const forecast = require('./utils/forecast.js');
const app = express();
//----------edit path
app.use(express.static(path.join(__dirname, '../public')));

const partialsDirectory = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsDirectory);

const viewsDirectory = path.join(__dirname, '../templates/views')
app.set("view engine", "hbs");
app.set("views", viewsDirectory)

//body
app.get('', (req, res) => {
    res.render('home')
})

app.get('/weather', (req, res) => {
    if (req.query.query) {
        forecast(req.query.query, (error, data) => {
            if (error) res.send({error: error});
            else res.send(data);
        })
    }
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('*', (req, res) => {
    res.send("404 not found page")
})

//set port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is up")
})