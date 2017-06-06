const Lostedcard = require('../models').Lostedcard;
const easyCopy = require('easy-copy');
const HttpError = require('some-http-error');
const lostedcardController = {};

// add lostedcard
lostedcardController.addLostedcard = (req, res, next) => {
	const lostedcard = req.body;
	const data = easyCopy(lostedcard, ['num', 'cardid', 'lostedplace']);
	Object.getOwnPropertyNames(data).forEach(key => {
		if(!data[key]){
			throw new HttpError.BadRequestError('缺少信息' + key);
		}
	});
	Lostedcard.updateLostedcard(new Lostedcard(data)).then(lostedcard => {
		return res.success(lostedcard, 200);
	}).catch(next);
};

//get lostedcards
lostedcardController.getAllLostedcards = (req, res, next) => {
	Lostedcard.getLostedcards().then(lostedcards => {
		res.render('index', {
			lostedcards: lostedcards
		});
		// res.success(lostedcards, 200);
	}).catch(next);
};


//search one lostedcard
lostedcardController.getOneLostedcard = (req, res, next) => {
	const cardid = req.query.search;
	if(!cardid){
		throw new HttpError.BadRequestError("请输入学号");
	}
	Lostedcard.searchcard(cardid).then(lostedcard => {
		res.render('card-detail',{
			lostedcard: lostedcard[0]
		});
	})
};


//delete one lostedcard
lostedcardController.deleteLostedcard = (req, res, next) => {
	const lostedcard = req.params.cardid;
	Lostedcard.removecardbyid(lostedcard).then(() => {
		res.success(null, 204);
	}).catch(next);
}

module.exports = lostedcardController;