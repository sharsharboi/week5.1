let express = require('express');
let morgan = require('morgan');                                   //HTTP request logger middleware
let bodyParser = require('body-parser');                          //parses the data and makes it available under req.body 

let app = express();

//For the db
let db = [];

//For file rendering:
app.engine('html', require('ejs').renderFile);                   //configure the Express app to handle the engine
app.set('view engine', 'html');

//For static assets
app.use(express.static('images'));                              //code to serve images, CSS files, and JavaScript files in a directory named Images
app.use(express.static('css'));                                 //code to serve images, CSS files, and JavaScript files in a directory named css

//Enables us to navigate to the folder where the html files reside
app.use(express.static(__dirname + '/htmlFiles'));

app.use(bodyParser.urlencoded({                                 //parse application
    extended: false
}));

app.use(bodyParser.json());                                    //parse application/json


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/htmlFiles/home.html');
});


//Getting a new task...

app.get('/addTask', function (req, res) {
    res.sendFile(__dirname + '/htmlFiles/addTask.html');
});

//This method receives a html input
app.post('/addTask', function (req, res) {
    // let newTask = req.bodyParser.addTask;
    // let newDate = req.bodyParser.tDate;
    // let newDesc = req.bodyParser.tDesc;

    db.push({
        taskName: req.body.tTask,
        taskDate: req.body.tDate,
        taskDesc: req.body.tDesc                       //parsed data thats available
    })

});

app.get('/listAll', function (req, res) {
    res.render('listAll.html', { taskDb: db })                // two parameters. The first: HTML file name. The second: object that contains properties
});


app.listen(8080);