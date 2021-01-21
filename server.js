const express = require('express'); // invoke express js server
const bodyParser = require('body-parser'); // invoke body parser to pass body content through server
const bcrypt = require('bcrypt-nodejs'); // invoke bcrypt for password encrypt
const cors = require('cors'); // invoke cors for site cross scripting
const knex = require('knex'); // invoke knex for connection to PostgreSQL DB

const signin = require('./controllers/signin'); // signin function page
const register = require('./controllers/register'); // register function page
const profile = require('./controllers/profile'); // profile function page
const image = require('./controllers/image'); // image function page

// db connection - local host
/*
const db = knex({ // for connecting to PostgreSQL
    client: 'pg', // type of db
    connection: { 
      host : '127.0.0.1', // localhost 
      user : 'postgres', // superuser
      password : 'test', // superuser pass
      database : 'smartbrain' // db to connect to
    }
  });
*/

// db connection - remote heroku
const db = knex({ // for connecting to PostgreSQL
  client: 'pg', // type of db
  connection: { 
    connectionString: process.env.DATABASE_URL, // dynamic database value for heroku    
    ssl: {
      rejectUnauthorized: false
    }
  }
});

//console.log(db.select('*').from('users')); //test connection to db is working




const app = express(); // express js server
app.use(cors()); // use 'app.use' as is middleware
app.use(bodyParser.json()); // use 'app.use' as is middleware


//user database function
//app.get('/', (req, res)=> { res.send(db.users) })
app.get('/', (req, res)=> { res.send('its is working!') })


//sign-in function
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) }) // dependency injection, passing 'db' and 'bcrypt' to register.js

//register function
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // dependency injection, passing 'db' and 'bcrypt' to signin.js

// profile function
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) }) // dependency injection, passing 'db' to profile.js

// image upload count function
app.put('/image', (req, res) => { image.handleImage(req, res, db)}) // dependency injection, passing 'db' to image.js
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)}) // clairfi update as moved from frontend to backend to hide api key


// server - express js?
//app.listen(3001, () => { // run server on port 3001
//    console.log('app is running on port 3001'); // server message on success
//})

app.listen(process.env.PORT || 3001, () => { // use dynamic port value or 3001
  console.log('app is running on port ${process.env.PORT}'); // server message on success
})


