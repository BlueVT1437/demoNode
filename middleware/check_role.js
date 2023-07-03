const jwt = require("jsonwebtoken");

const checkRole = (req, res, next) => {
	if (req.headers && req.headers.authorization) {
		const token = req.headers.authorization.slice("Bearer ".length);
		if (token) {
			const userInfo = jwt.verify(token, process.env.SECRET_JWT);
			if (userInfo.role === "Admin") {
				return next();
			}
		}
	}
	return res.json({ success: false, message: "Not allowed!" });
};

module.exports = checkRole;