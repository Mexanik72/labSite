var express=require('express');
var app = express();
var sqlite = require('sqlite3');
app.set('view engine', 'ejs');
var db = new sqlite.Database('mydb.sqlite');
app.use(express.static(__dirname + '/public'));

var menu;

app.get('/', function(req, res){
db.all('select * from categories', function (error,data){
		menu = data;
	});
	db.all('select * from content', function (error,data){
		res.render('home', {
			data:data,
			menu:menu
		});
	});
});


app.listen(3000, function() {
	console.log('Listening on port 3000');
});