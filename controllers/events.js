const Event = require('../models/events').EventModel;

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Test controller Event');
};
module.exports.Event=Event;
exports.createEvent=function(req, res){
    let event = new Event(req.body);
    event.save(function (err) {
      if (err) {
          return next(err);
      }
      res.send('Event created successfully')
  })
}

/* 
exports.getEvent=function() {
  return new Promise((resolve, reject) => {
      Event.find((err, docs) => {
      if(err) {
          console.error(err)
          return reject(err)
      }        
      resolve(docs)
      })
  })
} */


exports.get=function(req, res) {
  Event.find((err, event) => {
    if(err) {
        console.error(err)
        return reject(err)
    }        
    res.send(event)
  })
}

exports.event_details = function (req, res) {
  Event.findById(req.params.id, function (err, event) {
      if (err) return next(err);
      res.send(event);
  })
};

exports.event_update = function (req, res) {
  Event.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, event) {
      if (err) return next(err);
      res.send('Event udpated.');
  });
};

exports.event_delete = function (req, res) {
  Event.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
  })
};

exports.updateAll = function (req, res) {
  Event.update(({}),{$set: req.body},{multi: true}, function (err) {
    if (err) return next(err);
    res.send('Update successfully!');
  })
};

