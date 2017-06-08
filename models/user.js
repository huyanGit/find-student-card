const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	cardId: {type: String},
	stduentId: {type: String},
	clazz: {type: String},
	faculty: {type: String},
	create_at: {type: Date, default: Date.now}
});

UserSchema.statics = {
	createOneUser: function(user){
		return user.save();
	},
	getUsers: function(){
		return this.find({}).exec();
	}
}

const User = mongoose.model('User', UserSchema);

module.exports = User;