const router = require('express').Router();
const HttpError = require('some-http-error');
const lostedcardController = require('./lostedcard');
const userController = require('./user');

router.route('/')
	.get(function (req, res, next) {
		res.redirect('/lostedcard');
	})
	.all(() => {throw new HttpError.MethodNotAllowedError()});
router.route('/lostedcard')
	.get(lostedcardController.getAllLostedcards)
	.post(lostedcardController.addLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/lostedcard/count')
	.get(lostedcardController.getCardCount)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/lostedcard/search')
	.get(lostedcardController.getOneLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/lostedcard/:cardid')
	.delete(lostedcardController.deleteLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/user')
	.post(userController.createUser)
	.get(userController.findAllUsers)
	.all(() => {throw new HttpError.MethodNotAllowedError()});
		
module.exports = router;