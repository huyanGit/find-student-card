const Lostedcard = require('../models/lostedcard');
const render = {};

//render index page
render.renderIndex = (req, res, next) => {
	Lostedcard.find({}, {}, {limit: 8, sort: {'create_at': -1}}, (err, lostedcards) => {
		if(err) return next;
		res.render('index', {
			lostedcards: lostedcards
		});
	});
}
//render card-detail page
render.renderDetail= (req, res, next) => {
	const cardid = req.query.search;
	if(!cardid){
		throw new HttpError.BadRequestError("请输入学号");
	}
	Lostedcard.searchcard(cardid).then(lostedcard => {
		res.render('card-detail',{
			lostedcard: lostedcard[0]
		});
	}).catch(next);
};
module.exports = render; 