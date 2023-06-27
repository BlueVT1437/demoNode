const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          error: "Please type email and password",
        });
      }

      const existedAccount = await prisma.user.findFirst({
        where: { email },
      });

      const comparePassword = await bcrypt.compare(
        password,
        existedAccount.password
      );

      if (!existedAccount || !comparePassword) {
        return res
          .status(400)
          .json({ ok: false, message: "Email or password wrong!!" });
      }

      const secretKey = process.env.SECRET_JWT;
      const token = jwt.sign(
        {
          user_id: existedAccount.user_id,
          email: existedAccount.email,
          name: existedAccount.name,
        },
        secretKey
      );
      return res.json({ token });
    } catch (err) {
      return res.json({ success: false, mesage: err.message });
    }
  };
}

module.exports = new AuthController();
