require('dotenv').config();
const express = require('express')

const path = require('path')
const mongoose = require('mongoose');


const methodoverride = require('method-override')
const ejsmate = require('ejs-mate')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const ee = require('./utils/expresserrors');


const hotelgrounds = require('./routes/hotelgrounds.js')
const reviews = require('./routes/reviews.js')
const userRoutes = require('./routes/users');

const session = require('express-session')
const flash = require('connect-flash')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection established");
    })
    .catch(err => {
        console.log('Error in connection establishment');
        console.log(err);
    })


const app = express();

app.engine('ejs', ejsmate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/hotels', hotelgrounds);
app.use('/hotels/:id/reviews', reviews);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render('home.ejs')
})


app.all('*', (req, res, next) => {
    next(new ee('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
