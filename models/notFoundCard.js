const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotFoundCardSchema = new Schema ({
	studentId: {type: String},
	email: {type: String}
});

NotFoundCardSchema.statics = {
	createCard: function(card){
		return card.save();
	},
	getAllCards: function(){
		return this.find({}).exec();
	},
	searchCard: function(studentId) {
		return this.find({'studentId':studentId}).exec();
	},
	removeCard: function(id) {
		return this.remove({'_id': id}).exec();
	}
};

const NotFoundCard = mongoose.model('NotFoundCard', NotFoundCardSchema);

module.exports = NotFoundCard;