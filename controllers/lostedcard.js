const Lostedcard = require('../models').Lostedcard;
const easyCopy = require('easy-copy');
const HttpError = require('some-http-error');
const lostedcardController = {};
//添加丢卡信息
lostedcardController.addLostedcard = (req, res, next) => {
	const lostedcard = req.body;
	//console.log(lostedcard);
	const data = easyCopy(lostedcard, ['num', 'cardid', 'lostedplace']);
	//console.log(data);
	Object.getOwnPropertyNames(data).forEach(key => {
		if(!data[key]){
			throw new HttpError.BadRequestError('缺少信息' + key);
		}
	});
	Lostedcard.updateLostedcard(new Lostedcard(data)).then(lostedcard => {
		return res.success(lostedcard, 200);
	}).catch(next);
};
//获取所有丢卡信息，返回数组
lostedcardController.getAllLostedcards = (req, res, next) => {
	Lostedcard.getLostedcards().then(lostedcards => {
		res.success(lostedcards, 200);
	})
};
//获取通过学号检索的单个丢卡信息，返回数组
lostedcardController.getOneLostedcard = (req, res, next) => {
	const cardid = req.query.search;
	if(!cardid){
		throw new HttpError.BadRequestError("请输入学号");
	}
	Lostedcard.searchcard(cardid).then(lostedcard => {
		console.log(!lostedcard.length);
		if(!lostedcard.length){
			res.end('学号无效或者未找到该卡！');
		}
		res.success(lostedcard, 200);
	})
};
//删除丢卡信息，返回null
lostedcardController.deleteLostedcard = (req, res, next) => {
	const lostedcard = req.params.cardid;
	Lostedcard.removecardbyid(lostedcard).then(() => {
		res.success(null, 204);
	}).catch(next);
}
module.exports = lostedcardController;