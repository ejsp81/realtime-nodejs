let mongoose = require('mongoose')
let team=require('./teams');

let tournament_resultSchema = new mongoose.Schema({
    local_team: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team'
    },
    visitor_team:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team'
    },
    local_goals:Number,
    visitor_goals:Number,
    is_playing:Boolean,
    current_time:Number
});
const TournamentResultModel = mongoose.model('Tournament_result', tournament_resultSchema);

module.exports.TournamentResultModel=TournamentResultModel;