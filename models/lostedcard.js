const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LostedcardShema = new Schema({
	num: {type: Number},
	cardid:{type: String},
	lostedplace:{type: String},
	create_at: {type: Date, default: Date.now}
});

LostedcardShema.statics = {
	getLostedcards: function() {
		return this.find({}).exec();
	},
	searchcard: function(cardid) {
		return this.find({'cardid':cardid}).exec();
	},
	removecardbyid: function(cardid){
		return this.remove({'_id': cardid}).exec();
	},
	updateLostedcard: function (lostedcard) {
		return lostedcard.save();
	}
}

const Lostedcard = mongoose.model('Lostedcard', LostedcardShema);

module.exports = Lostedcard;