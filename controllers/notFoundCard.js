const NotFoundCard = require('../models').NotFoundCard;
const mail = require('../common/mail');
const easyCopy = require('easy-copy');
const HttpError = require('some-http-error');
const NotFoundCardController = {};

NotFoundCardController.addCard = (req, res, next) => {
	const card = req.body;
	const data = easyCopy(card, ['studentId', 'email']);
	Object.getOwnPropertyNames(data).forEach(key => {
		if(!data[key]){
			throw new HttpError.BadRequestError('缺少信息' + key);
		}
	});	
	NotFoundCard.createCard(new NotFoundCard(data)).then(card => {
		mail.message1(card);
		res.success(card, 201);
	}).catch(next);
}

NotFoundCardController.getCards = (req, res, next) => {
	NotFoundCard.getAllCards().then(cards => {
		res.success(cards, 200);
	}).catch(next);
}

NotFoundCardController.removeCardById = (req, res, next) => {
	const cardid = req.params.cardid;
	NotFoundCard.removeCard(cardid).then(() => {
		res.success(null, 204);
	}).catch(next);
}
module.exports = NotFoundCardController;