var express = require('express');
var app = express();
var port = 3000;

var middleware = {
	requireAuthentication: function(req, res, next){
		console.log('private route hit!');
		next();
	},
	logger: function(req, res, next){

		console.log('Request: '+ req.method + ' '+ req.originalUrl+ ' ## '+ new Date().toString());
		next();
	}
};

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(req, res){
	res.send('About us');
})

//app.use(middleware.requireAuthentication);//middleware should be up top

app.use(express.static(__dirname+'/public'));

app.listen(port, function(){
	console.log('Express server started at port '+port);
});