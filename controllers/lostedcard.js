const Lostedcard = require('../models').Lostedcard;
const easyCopy = require('easy-copy');
const HttpError = require('some-http-error');
const lostedcardController = {};

// add lostedcard
lostedcardController.addLostedcard = (req, res, next) => {
	const lostedcard = req.body;
	const data = easyCopy(lostedcard, ['cardid', 'lostedplace']);
	Object.getOwnPropertyNames(data).forEach(key => {
		if(!data[key]){
			throw new HttpError.BadRequestError('缺少信息' + key);
		}
	});
	Lostedcard.searchcard(data.cardid).then(lostedcard => {
		if(!lostedcard.length){
			Lostedcard.updateLostedcard(new Lostedcard(data)).then(lostedcard => {
				return res.success(lostedcard, 200);
			}).catch(next);
		}else{
			Lostedcard.removecardbyid(lostedcard[0]._id).then(() => {
				res.success(null, 204);
			}).catch(next);
		}
	}).catch(next);

};

//get lostedcards
lostedcardController.getAllLostedcards = (req, res, next) => {
	const pagination = req.pageObj;
	Lostedcard.getLostedcardsByQuery({}, pagination).then(lostedcards => {
		res.success(lostedcards, 200);
	}).catch(next);
};

//get card count 
lostedcardController.getCardCount = (req, res, next) => {
	Lostedcard.getNumOfCards().then(count => {
		return res.success(count, 200);
	}).catch(next);
}

//delete one lostedcard
lostedcardController.deleteLostedcard = (req, res, next) => {
	const lostedcard = req.params.cardid;
	Lostedcard.removecardbyid(lostedcard).then(() => {
		res.success(null, 204);
	}).catch(next);
}

module.exports = lostedcardController;