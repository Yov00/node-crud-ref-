const express = require('express');
const fileUpload = require('express-fileupload');
const bodyPareser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const PORT = 6119;


const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
// CREACTE DB CONNECTION
const dbCredentials ={
    host:'localhost',
    user:'root',
    password:'unibg11',
    database:'socka'
}

const db = mysql.createConnection(dbCredentials);


// CONNECT TO DB

db.connect((err)=>{
    if(err) throw err;
    console.log('Connected to database')
});
global.db = db;

// configuring middleware
app.set('port',process.env.process || PORT); // set express to use port
app.set('views',__dirname+'/views'); // set express to look in this folder for views
app.set('view engine','ejs');// configure template engine
app.use(bodyPareser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public'))); // configure express to use the public folder
app.use(fileUpload());// configure file upload


app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});


