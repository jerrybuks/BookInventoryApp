var express = require('express');
var app = express();
var http = require('http');
var cors = require('cors');
var morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
var port = process.env.PORT || 8080;
var databaseconfig = require('./config/db');
var appRoutes = require('./routes');
var Router = require('express').Router();

var corsOptions = {
	origin: ['*'],
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }))

const server = http.createServer(app);

app.use('/api', appRoutes(Router, app));
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
server.listen(port, () => {
	console.log('listening on port', port);
});

server.on('listening', () => databaseconfig() );

