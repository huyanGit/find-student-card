const User = require('../models').User;
const easyCopy = require('easy-copy');
const HttpError = require('some-http-error');

const userController = {};

userController.createUser = (req, res, next) => {
	const body = req.body;
	data = easyCopy(body,['cardId', 'studentId', 'clazz', 'faculty']);
	Object.getOwnPropertyNames(data).forEach(key => {
		if(!data[key]){
			throw new HttpError.BadRequestError('缺少信息' + key);
		}
	})
	User.createOneUser(new User(data)).then(user => {
		res.success(user, 201);
	}).catch(next);
}

userController.findAllUsers = (req, res, next) => {
	User.getUsers().then(users => {
		res.success(users, 200);
	}).catch(next);
}

module.exports = userController;