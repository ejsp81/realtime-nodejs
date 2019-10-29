const Player = require('../Models/players').PlayerModel;

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Test controller player');
};
exports.createPlayer=function(name,team){
    var player = new Player({
        name: name,
        team: team
    });
    player.save()
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
    });
}
exports.getPlayer=function() {
    return new Promise((resolve, reject) => {
        Player.find((err, docs) => {
        if(err) {
            console.error(err)
            return reject(err)
        }        
        resolve(docs)
        }).populate('team')
    })
} 


exports.player_details = function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err) return next(err);
        res.send(player);
    })
};

exports.player_update = function (req, res) {
    Player.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, player) {
        if (err) return next(err);
        res.send('Player udpated.');
    });
};

exports.player_delete = function (req, res) {
    Player.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


