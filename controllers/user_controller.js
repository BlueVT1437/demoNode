const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();

      if (users.length === 0) {
        return res
          .status(200)
          .json({ success: false, message: "list users are empty" });
      }
      return res.send(users);
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    } finally {
      async () => await prisma.$disconnect();
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: Number(req.params.id) },
      });
      if (user) {
        return res.json({ ok: true, data: user });
      }
      return res.status(400).json({ ok: false, message: "User not exist" });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    } finally {
      async () => await prisma.$disconnect();
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ ok: false, message: "Please enter data" });
      }
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        return res.status(400).json({ ok: false, message: "Email was exist" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const userNew = await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: hashPassword,
          },
        });
        return res.json({ ok: true, data: userNew });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Something went wrong!",
      });
    }
  };
}

module.exports = new UserController();
