const TournamentStanding = require('../models/tournament_standings').TournamentStandingModel;
module.exports.TournamentStanding=TournamentStanding;


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Test controller TournamentStanding');
};

//Create
exports.createTournamentStanding=function(req, res){
    var tournamentStanding = new TournamentStanding(req.body);
    tournamentStanding.save(function (err) {
      if (err) {
          return next(err);
      }
      res.send('TournamentStanding created successfully')
    })
}

//list
exports.get = function(req, res) {
  TournamentStanding.find((err, tournamentStanding) => {
    if(err) {
        console.error(err)
        return reject(err)
    }        
    res.send(tournamentStanding)
  }).sort({total_points:-1}).populate('team')
}

//details
exports.tournament_standings_details = function (req, res) {
  TournamentStanding.findById(req.params.id, function (err, tournament_standings) {
      if (err) return next(err);
      res.send(tournament_standings);
  })
};

exports.getByTeam=function(req, res) {
  TournamentStanding.find(({ team: req.params.id }),(err, tournament_standings) => {
      if(err) {
          console.error(err)
          return reject(err)
      }        
      res.send(tournament_standings)
  }).populate('team')
} 

//update
exports.tournament_standings_update = function (req, res) {
  TournamentStanding.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, tournament_standings) {
      if (err) return next(err);
      res.send('tournament_standings udpated.');
  });
};

//delete
exports.tournament_standings_delete = function (req, res) {
  TournamentStanding.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
  })
};
