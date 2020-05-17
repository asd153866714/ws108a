const L = module.exports = {}
const mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    user_id : String,
    password : String 
});

const Login = mongoose.model('user',userSchema);

L.findOne = async function(){
    Login.findOne({'user_id': 'bill'})
}
