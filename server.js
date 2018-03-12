const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
            
        }

    });
    next();
});

app.use((req, res) => {
    res.render('caution.hbs');

});

app.use(express.static(__dirname + "/public"));


hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        message: 'Welcome to my website',
        pageTitle: 'Home Page',
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });

});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});