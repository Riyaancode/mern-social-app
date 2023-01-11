const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({

  firstName:{
    type: String,
    required: true,
    
    max:50
  },
  lastName:{
    type: String,
    required: true,
    
    max:50
  },
  email:{
    type: String,
    required: true,
    max:50,
    unique:true
  },
  password:{
    type: String,
    required: true,
    min:50
  },
  image:{
    type: String,
    default: ""
  },
  friends:{
    type: Array,
    default:[]
  },
 location: String,
 occupation: String,
 dateofBirth: Date,
},{timestamps:true});

const Users = mongoose.model("users", UsersSchema);

Users.createIndexes();

module.exports = Users;