const list = (req, res, next) => {
	const query = req.query;
	if(query.page_size || query.page_no){
	  const pageSize = parseInt(req.query.page_size, 10) || 8;
		const pageNo = parseInt(req.query.page_no, 10) || 1;
		const pageObj = {
			skip:(pageNo - 1) * pageSize,
			limit:pageSize
		};
		req.pageObj = pageObj;		
	}
	else
		req.pageObj = {
			limit: 8
		};
	next();
};

module.exports = list;
