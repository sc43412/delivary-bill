//REQUIRE EXPRESS LIBERARY FOR PROJECT
const express = require('express');
//CALL THE EXPRESS
const app = express();
//DEFINING PORT
const port = 8080;


const path = require('path');
// REQUIRE DATABASE
//const db = require('./configs/mongoose');
//REQUIRE EXPRESS-SESSION
const session = require('express-session');
// ACCESS THE STATIC FILES
app.use(express.static('assets'));
// BODY PARSER CHANGE THE FORM THE DATA TO JSON
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// USE session
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));


// SET UP THE FLASH MESSAGE
const flash = require('connect-flash');
app.use(flash());
app.use(function (req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
});



// REQUIRE THE ROUTES
app.use('/', require('./router'));

//FIRE UP THE SERVER
app.listen(port, function (err) {

    if (err) { console.log("not connected") }
    console.log(`server is connected successfully at the ${port}`);
})