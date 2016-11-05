var pw = "";














var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var methodOverride = require('method-override')

var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : pw,
  database : 'dayplanner_db'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

})

//root get route
app.get('/', function(req,res) {

    connection.query('SELECT * FROM allplans', function(err, data) {
      if (err) throw err;

      res.render('index', {plans : data});
    });
});

app.post('/create', function(req,res) {

    connection.query('INSERT INTO allplans (plan) VALUES (?)', [req.body.newPlan], function(err, data) {
      if (err) throw err;
      res.redirect('/');
    });
});

app.post('/delete', function(req,res) {

    connection.query('DELETE FROM allplans WHERE ID = ?', [req.body.id], function(err, data) {
      if (err) throw err;
      res.redirect('/');
    });
});

app.post('/update', function(req,res) {

    connection.query('UPDATE allplans SET plan = ? WHERE ID = ?', [req.body.updatePlan, req.body.updateID], function(err, data) {
      if (err) throw err;
      res.redirect('/');
    });
});

var port = 3000;
app.listen(port);
