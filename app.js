const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {getlogindetails} = require('./routes/loginr');

var loginr = require('./routes/loginr');
var userprofiler= require('./routes/userprofile');
var indexr=require('./routes/index');



// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5005;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arduino'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, '/public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// routes for the app


var count=0;

app.get('/', getHomePage);
app.get('/login', getlogindetails);
app.post('/login1', loginr.logincheck);
app.post('/registercheck',loginr.registerinsert);
app.get('/userprofile',userprofiler.userprofileaccess);
app.get('/mytest',loginr.mytestcheck);
app.post('/insertvalues',loginr.inserttest);
app.get('/farmerguide',loginr.farmerguide);
app.get('/allschemes',loginr.allschemes);
app.get('/flame',loginr.flamedetector);

//app.post('/insertvalues',loginr.gettestlvalues);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


function insertValueIntoDatabaseph(value) {
    const sql = 'INSERT INTO `ph` (`ph`) VALUES (?);';
    
    db.query(sql, [value], function (err, result) {
        if (err)
            console.error(err);
            console.log("1 row inserted successfully PH");
    });

}



function insertValueIntoDatabaseflame(value) {
    const sql = 'INSERT INTO `flame` (`flame`) VALUES (?);';

    db.query(sql, [value], function (err, result) {
        if (err)
            console.error(err);
            console.log("1 row inserted successfully flame");
            

            

        });
}


function insertValueIntoDatabasemoisture(value) {
    const sql = 'INSERT INTO `moisture` (`moisture`) VALUES (?);';
    
    db.query(sql, [value], function (err, result) {
        if (err)
            console.error(err);
            console.log("1 row inserted successfully MM");
            

            

        });
    
}


// ------------ Serial ------------ //

const SerialPort = require('serialport');

const baudRate = 9600;


SerialPort.list((err, ports) => {
if (err)
console.error(err);
if (ports.length == 0)
console.error("No Serial ports found");

// Iterate over all the serial ports, and look for an Arduino
let comName = null;
ports.some((port) => {
if (port.manufacturer
&& port.manufacturer.match(/Arduino/)) {
comName = port.comName;
console.log('Found Arduino');
console.log('\t' + port.comName);
console.log('\t\t' + port.pnpId);
console.log('\t\t' + port.manufacturer);
return true;
}
return false;
});

if (comName == null) {
comName = ports[0].comName;
console.warn('No Arduino found, selecting first COM port (' + comName + ')');
}

// Open the port
const port = new SerialPort(comName, { baudRate: baudRate },
(err) => {
if (err)
    console.error(err);
});

// Attach a callback function to handle incomming data
port.on('data', receiveSerial);
console.log("Connected to Arduino");

});

// A class for reading lines of text
class TextParser {
constructor() {
this.string = '';
}
static isEndMarker(char) {
return char == '\r' || char == '\n'; // New line characters (NL & CR)
}
parse(char) {
if (this.clear) {
this.string = '';
this.clear = false;
}
if (TextParser.isEndMarker(char)) {
if (this.string.length > 0) {
    this.clear = true;
    return true;
}
return false;
} else {
this.string += char;
}
}
get message() {
return this.string;
}
}

const parser = new TextParser;

function receiveSerial(dataBuf) {
let str = dataBuf.toString();
// Loop over all characters
for (let i = 0; i < str.length; i++) {
// Parse the character
if (parser.parse(str[i])) {
// If a complete line has been received,
// insert it into the database

if(parser.message==1)
{
    insertValueIntoDatabaseflame(parser.message);
}
if(parser.message>1&&parser.message<=14)
{
    insertValueIntoDatabaseph(parser.message);    
}
if(parser.message>100&&parser.message<=2000)
{
    insertValueIntoDatabasemoisture(parser.message);
}

count++;




}

}
}