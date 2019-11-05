var express = require('express');
var app = express();
const path = require('path');
let mongoose = require('./dbconnect');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

var timer=10;
var timeSoccerGame=10;

// Bootstrap 4 y librerías necesarias
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));

//Configuracion rutas
const homeRoute = require('./routes/home'); // Imports routes for the team
const teamRoute = require('./routes/team'); // Imports routes for the team
const playerRoute = require('./routes/player'); // Imports routes for the team
const detail_matchRoute = require('./routes/detail_match'); // Imports routes for the detail_match
const tournament_resultRoute = require('./routes/tournament_results'); // Imports routes for the tournament_results
const tournament_standingsRoute = require('./routes/tournament_standings'); // Imports routes for the tournament_standings
const eventRoute = require('./routes/event'); // Imports routes for the event

app.use('/', homeRoute);
app.use('/teams', teamRoute);
app.use('/players', playerRoute);
app.use('/events', eventRoute);
app.use('/detail_matchs', detail_matchRoute);
app.use('/tournament_results', tournament_resultRoute);
app.use('/tournament_standings', tournament_standingsRoute);


/* Socket *********************************************/
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  }); 
});

let team = require('./controllers/teams').Team;
team.watch().on('change', function(data){
  team.find({},(err, teams)=> {
    if (err) console.log(err);
    io.emit('updateTeam', teams);
  }).sort({position : -1});  
  console.log(new Date(),'Hubo un cambio en la tabla teams');
});

let tournamentStanding = require('./controllers/tournament_standings').TournamentStanding;
tournamentStanding.watch().on('change', function(data){
  tournamentStanding.findById(data.documentKey._id,(err, tr)=> {
    if (err) console.log(err);
    if (data.operationType=='update') {
      io.emit('updateTournamentStand', tr);
    }else if (data.operationType=='insert') {
      io.emit('insertTournamentStand', tr);
    }
  }).sort({total_points : -1}).populate('team');
  console.log(new Date(),'Hubo un cambio en la tabla tournament_standings');
});

let tournamentResult = require('./controllers/tournament_results').TournamentResult;
tournamentResult.watch().on('change', function(data){
  tournamentResult.findById(data.documentKey._id,(err, tr)=> {
    if (err) console.error(err);

    if (data.operationType=='update') {
      var current_time = data.updateDescription.updatedFields.current_time;
      if (current_time==(timeSoccerGame/2) || current_time>=timeSoccerGame) {
        io.emit("time", current_time>=timeSoccerGame?'END_GAME':'FIRST_TIME');
      }
      io.emit('updateTournamentResult', tr);
    } else if (data.operationType=='insert') {
      io.emit('insertTournamentResult', tr);
    }
  }).sort({current_time : 1}).populate(['local_team','visitor_team']);
  console.log(new Date(),'Hubo un cambio en la tabla tournament_results');
});

let detail_match = require('./controllers/detail_match').DetailMatch;
  detail_match.watch().on('change', function(data){
  detail_match.findById(data.documentKey._id, (err, detail_match) =>{
    if (err) return console.error(err);
      io.emit('changeDetailMatch', detail_match);
  }).populate({
    path: 'player',
    populate: { path: 'team' }
  });
  console.log(new Date(),'Hubo un cambio en la tabla detail_match');
  
});
/******************************************************/
/* Timer **********************************************/
function updateTimeMatch() {
  tournamentResult.updateMany({ is_playing: true }, { $inc: { current_time: 1 } }, (err, data)=> {if (err) console.error(err);}) 
}
setInterval(updateTimeMatch, timer*1000);

/******************************************************/

http.listen(3000, function(){
    console.log('server is running on port :3000');
});