const Lostedcard = require('../models').Lostedcard;
const NotFoundCard = require('../models').NotFoundCard;
const mail = require('../common/mail');
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
			//this card are in notfoundcards
			NotFoundCard.searchCard(data.cardid).then(card => {
				if(card.length){
					mail.message2(card[0], data );
					console.log('find card: ' + card[0].studentId);
					//delete card in list
					NotFoundCard.removeCard(card[0]._id).then(() => {
						console.log('delete ' + card[0].studentId + ' success in notfoundcards list');
					}).catch(next);
				}
			})
			//not exist and add in list
			Lostedcard.updateLostedcard(new Lostedcard(data)).then(lostedcard => {
				return res.success(lostedcard, 200);
			}).catch(next);
		}else{
			//the same card and delete card in list
			Lostedcard.removecardbyid(lostedcard[0]._id).then(() => {
				res.success(null, 204);
			}).catch(next);
		}
	}).catch(next);

};

//get lostedcards
lostedcardController.getAllLostedcards = (req, res, next) => {
	const pagination = req.pageObj;
	const sort = {sort: {'create_at': -1}};
	const obt = Object.assign(pagination, sort);
	Lostedcard.getLostedcardsByQuery({}, obt).then(lostedcards => {
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

//search card 
lostedcardController.searchCard = (req, res, next) => {
	const cardid = req.query.cardid;
	if(!cardid){
		throw new HttpError.BadRequestError("请输入学号");
	}
	Lostedcard.searchcard(cardid).then(lostedcard => {
		res.success(lostedcard[0], 200);
	}).catch(next);
};

module.exports = lostedcardController;