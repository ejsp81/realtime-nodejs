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

var timer=5;
var timeSoccerGame=90;

// Bootstrap 4 y librerías necesarias
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/toast', express.static(__dirname + '/node_modules/jquery-toast-plugin/dist'));
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
    console.log(data.operationType);
    console.log(tr);
    if (data.operationType=='update' || data.operationType=='replace') {
      io.emit('updateTournamentStand', tr);
    }else if (data.operationType=='insert') {
      io.emit('insertTournamentStand', tr);
    }
  }).populate('team');
  console.log(new Date(),'Hubo un cambio en la tabla tournament_standings');
});

let tournamentResult = require('./controllers/tournament_results').TournamentResult;
tournamentResult.watch().on('change', function(data){
  tournamentResult.findById(data.documentKey._id,async (err, tr)=> {
    if (err) console.error(err);
    if (data.operationType=='update') {
      var current_time = data.updateDescription.updatedFields.current_time;
      if (current_time==(timeSoccerGame/2) || current_time==timeSoccerGame) {
        if (current_time==timeSoccerGame) {   
          let tsLocal,tsVisitor;
          let won_matches=0,lost_matches=0,drawn_matches=0,total_points=0;
          let won_matchesV=0,lost_matchesV=0,drawn_matchesV=0,total_pointsV=0;
          if (tr.local_goals==tr.visitor_goals) {
            total_points=1;
            total_pointsV=1;
            drawn_matches=1;
            drawn_matchesV=1;
          } else {
            if (tr.local_goals>tr.visitor_goals) {
              won_matches=1;
              won_matchesV=0;
              lost_matches=0;
              lost_matchesV=1;
              total_points=3;
              total_pointsV=0;
            } else {
              won_matches=0;
              won_matchesV=1;
              lost_matches=1;
              lost_matchesV=0;
              total_points=0;
              total_pointsV=3;
            }
          }
          //let tournamentStanding = require('./controllers/tournament_standings').TournamentStanding;
          tournamentStanding.find(({ team: tr.local_team._id}),async (err, tsL) => {
            if(err) {
                console.error(err)
                return reject(err)
            } 
            tsLocal= await tsL;
            tournamentStanding.findOne({
              team: tsLocal[0].team._id
            })
            .then((tsLR) => {              
              tsLR.total_matches= tsLocal[0].total_matches+1,
              tsLR.won_matches= tsLocal[0].won_matches+won_matches,
              tsLR.lost_matches= tsLocal[0].lost_matches+lost_matches,
              tsLR.drawn_matches= tsLocal[0].drawn_matches+drawn_matches,
              tsLR.total_points= tsLocal[0].total_points+total_points;
              tsLR
                .save()
                .then(() => {
                  console.log('resultado............')
                  console.log(tsLR)
                });
            });
          }).populate('team')
          tournamentStanding.find(({ team: tr.visitor_team._id}),async (err, tsV) => {
            if(err) {
                console.error(err)
                return reject(err)
            } 
            tsVisitor= await tsV;
            tournamentStanding.findOne({
              team: tsVisitor[0].team._id
            })
            .then((tsLR) => {              
              tsLR.total_matches= tsVisitor[0].total_matches+1,
              tsLR.won_matches= tsVisitor[0].won_matches+won_matchesV,
              tsLR.lost_matches= tsVisitor[0].lost_matches+lost_matchesV,
              tsLR.drawn_matches= tsVisitor[0].drawn_matches+drawn_matchesV,
              tsLR.total_points= tsVisitor[0].total_points+total_pointsV;
              tsLR
                .save()
                .then(() => {
                  console.log('resultado............')
                  console.log(tsLR)
                });
            });
          }).populate('team')         
          detail_match.create({
            tournament_result: tr._id, 
            type_event: 'END_GAME', 
            player: null, 
            time: null, 
            isLocalEvent:null}, function (err, dm) {
            if (err) return handleError(err);
              console.log('DetailMatch created successfully')
              console.log(dm)
          })
        }else{
          detail_match.create({
            tournament_result: tr._id, 
            type_event: 'FIRST_TIME', 
            player: null, 
            time: null, 
            isLocalEvent:null}, function (err, dm) {
            if (err) return handleError(err);
              console.log('DetailMatch created successfully')
          })
        }
      }
      io.emit('updateTournamentResult', tr);
    } else if (data.operationType=='insert') {
      io.emit('insertTournamentResult', tr);
      console.log(tr)
    }
  }).sort({current_time : 1}).populate(['local_team','visitor_team']);
  console.log(new Date(),'Hubo un cambio en la tabla tournament_results');
});

let detail_match = require('./controllers/detail_match').DetailMatch;
  detail_match.watch().on('change', function(data){
    console.log(data)
  detail_match.findById(data.documentKey._id, (err, detail_match) =>{
    if (err) return console.error(err);
      io.emit('changeDetailMatch', detail_match);
  }).populate({
    path: 'tournament_result',
    populate: { path: 'local_team' }
  }).populate({
    path: 'tournament_result',
    populate: { path: 'visitor_team' }
  }).populate({
    path: 'detail_match',
    populate: { path: 'team' }
  }).populate({
    path: 'player',
    populate: { path: 'team' }
  })
  console.log(new Date(),'Hubo un cambio en la tabla detail_match');
  
});
/******************************************************/
/* Timer **********************************************/
function updateTimeMatch() {
  tournamentResult.updateMany({ is_playing: true }, { $inc: { current_time: 1 } }, (err, data)=> {if (err) console.error(err);}) 
  tournamentResult.updateMany({ is_playing: true, current_time: { $gte: timeSoccerGame } }, { is_playing: false }, (err, data)=> {
    if (err) console.error(err);
  })
}
setInterval(updateTimeMatch, timer*1000);

/******************************************************/

http.listen(3000, function(){
    console.log('server is running on port :3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/layout');
});

app.get('/reset', function(req, res){
  tournamentStanding.updateMany(({}),{$set: {
    total_matches:0,
    won_matches:0,
    lost_matches:0,
    drawn_matches:0,
    total_points:0
  }},{multi: true}, function (err) {
    if (err) return next(err);
    res.send('Update successfully!');
  }); 

  detail_match.deleteMany(({}), function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  }) 
  tournamentResult.deleteMany(({}), function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })

});

