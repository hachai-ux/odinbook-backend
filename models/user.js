var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, maxLength: 100 },
    name: { type: String},
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    friend_list: { type: Schema.Types.ObjectId, ref: 'User' },
    friend_request: { type: Schema.Types.ObjectId, ref: 'User' },
    facebookId: { type: String },


})


// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);