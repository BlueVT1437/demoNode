const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductController {
  getProducts = async (req, res) => {
    try {
      const { page, limit } = req.body;
			const listProducts = await prisma.product.findMany({
				skip: (page - 1) * limit,
  			take: limit,
			})
			console.log('prisma', listProducts);

			if (listProducts.length === 0) {
        return res
          .status(200)
          .json({ ok: false, message: "list products are empty" });
      }
      return res.status(200).json({ data: listProducts });
    } catch (err) {
      return err;
    }
  };

	createProduct = async (req, res) => {
		try {
      const { name, price } = req.body;

			const newProduct = await prisma.product.create({
				data: {
					name: name,
					price: price,
					status: 'bidding',
				},
			});
			return res.json({ ok: true, data: newProduct });
    } catch (err) {
      return err;
    }
	};
}

module.exports = new ProductController();
