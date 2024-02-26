var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    default: '',
  },
  isVipAccount: {
    type: Boolean,
    default: false,
  },
  healthRecord: [{
    type: Schema.Types.ObjectId,
    ref: 'HealthRecord', // Assuming HealthRecord is another model
    default: null,
  }],
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role', // Assuming Role is another model
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
