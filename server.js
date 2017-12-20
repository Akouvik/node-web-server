//to run things in the terminal and view it inthe browser
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.use is how you register middleware. it take a fn
app.use((req, res, next) => {
    var now = new Date().toString();
    //logs all the requests that come in to the server
    var log =  `${now}: ${req.method} ${req.url}`
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log')
        }
    })
    //next allows you to tell express when your middleware fn is done. 
    next();
});
//
//app.use((req, res) => {
//    res.render('maintenance.hbs') 
//    
//});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

// handler for http get request: 2 things to pass to express(1st url), (fn to send to the person that makes the request);
app.get('/', (req,res) => {
//    res.send('<h1>hello Express</h1>');
    res.render('home.hbs',{
               pageTitle: 'Home Sweet Home',
               welcomeMessage: 'Welcome to my Website'
               })
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});
app.get('/projects', (req, res) =>{
    res.render('projects.hbs')
})

app.get('/bad', (req, res) =>{
    res.send('<h1>error handling request</h1>');
})

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});
