const router = require('express').Router();
const HttpError = require('some-http-error');
const lostedcardController = require('./lostedcard');
const render = require('./render')
const userController = require('./user');

router.route('/')
	.get(render.renderIndex)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/lostedcard')
	.get(render.renderDetail)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/api/lostedcard')
	.get(lostedcardController.getAllLostedcards)
	.post(lostedcardController.addLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/api/lostedcard/search')
	.get(lostedcardController.searchCard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/api/lostedcard/count')
	.get(lostedcardController.getCardCount)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/api/lostedcard/:cardid')
	.delete(lostedcardController.deleteLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/api/user')
	.post(userController.createUser)
	.get(userController.findAllUsers)
	.all(() => {throw new HttpError.MethodNotAllowedError()});
		
module.exports = router;