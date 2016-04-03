var express=require('express');
var app = express();
var sqlite = require('sqlite3');
app.set('view engine', 'ejs');
var db = new sqlite.Database('mydb.sqlite');
app.use(express.static(__dirname + '/public'));
var http = require("http");
var https = require("https");

var menu;
app.get('/', function(req, res){
	db.all('select * from categories', function (error,data){
		menu = data;
	});
	db.all('select * from content', function (error,data){
			res.render('home', {
				data:data,
				menu:menu,
				current:'/'
			});
	});
});
app.get('/category', function(req, res){
	db.all('select * from categories', function (error,data){
		menu = data;
	});
	db.all("select * from content where category="+req.query.id, function (error,data){
		res.render('home', {
			data:data,
			menu:menu,
			current:req.query.id
		});
	});
});

app.post('/new', function(req, res){
	db.run("insert into content (src, category) values('"+req.query.src+"',"+req.query.category+");", function (){
		res.send('ok');
	});
});

app.get('/getLastAddedKey', function(req, res) {
	var execquery = 'SELECT id FROM content ORDER BY id DESC LIMIT 0,1';
	db.get(execquery, [] ,
		function(err, row) {
			res.end(JSON.stringify({ id: row.id }));
		}
	);
});


app.post('/remove', function(req, res){
	db.run("delete from content where id ="+req.query.id, function (){
		console.log("remove"+req.query.id)
		res.send('ok');
	})
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log('Listening on port '+PORT);
});
