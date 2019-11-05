let mongoose = require('mongoose');
const dbUrl='mongodb+srv://ejsp81:COTONIELA@cluster0-espq4.mongodb.net/realtimesports?retryWrites=true&w=majority'

class Database {
  constructor() {
    this._connect()
  }  
_connect() {
    mongoose.connect(dbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error!!')
       })
  }
}
module.exports = new Database()
