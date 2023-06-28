const jwt = require("jsonwebtoken");

const awaitHandler = (req, res, next) => {
	if (req.headers && req.headers.authorization) {
		const token = req.headers.authorization.slice("Bearer ".length);
		if (token) {
			const userInfo = jwt.verify(token, process.env.SECRET_JWT);
			if (userInfo) {
				req.user = userInfo;
				return next();
			}
		}
	}
	return res.json({ success: false, message: "Unauthorized!" });
};

module.exports = awaitHandler;
