// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser')
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/softkity');
var LogEntry = require('./app/models/log_entry');
var Tag = require('./app/models/tag');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here
router.route("/logEntry")
	.post(function(req,res) {
		var logEntry = new LogEntry();
		var tags = req.body.tags;
		console.log("request", req.body);
		logEntry.name = req.body.name;
		logEntry.rating = req.body.rating;
		logEntry.tags = tags
		logEntry.message = req.body.message;

		logEntry.save(function(err) {
			console.log("Saving logEntry", logEntry);
			if (err) {
				console.log("Error saving logEntry: ", err);
				res.status(400).send(err);
			}
			res.json({message: 'logEntry created'});
		})

		Tag.findOne({name: tags}, function(err, tag) {
			console.log("tag found: ", tag);
			if (err) {
				log.console("Error finding distinct tags: ", tag);
			}
			else if (tag == null) {
				console.log("saving tags: ", tags);
				var t = new Tag();
				t.name = tags;
				t.save(function(err) {
					if (err) {
						console.log("Error saving tag: ", tags)
						res.status(400).send(err);
					}
				});
			}
			else {
				console.log("Tag already exists: ", tag);
			}

		});
	})
	.get(function(req,res) {
		LogEntry.find(function(err, logEntries) {
			if (err) {
				log.console("Error getting all logEntries");
				res.send(err)
			}
			res.json(logEntries);
		});
	});	

router.route("/tags") 
	.get(function(req,res) {
	});	


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get("*", function(req, res) {
	res.sendfile("./public/index.html");
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
