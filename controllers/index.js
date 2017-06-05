const router = require('express').Router();
const HttpError = require('some-http-error');
const lostedcardController = require('./lostedcard');

router.route('/lostedcard')
	.get(lostedcardController.getAllLostedcards)
	.put(lostedcardController.addLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/lostedcard/search')
	.get(lostedcardController.getOneLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/lostedcard/:cardid')
	.delete(lostedcardController.deleteLostedcard)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

module.exports = router;