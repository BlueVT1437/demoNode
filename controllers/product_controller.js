const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductController {
	getProducts = async (req, res) => {
		try {
			const { page, limit } = req.body;
			const listProducts = await prisma.product.findMany({
				skip: (page - 1) * limit,
				take: limit,
				include: {
					type: true
				}
			});

			if (listProducts.length === 0) {
				return res
					.status(200)
					.json({ success: true, message: "list products are empty" });
			}
			return res.status(200).json({ data: listProducts });
		} catch (err) {
			return res.json({ success: false, error: err.message });
		} finally {
			async () => await prisma.$disconnect();
		}
	};

	createProduct = async (req, res) => {
		try {
			const { name, price, type_id } = req.body;

			const newProduct = await prisma.product.create({
				data: {
					name: name,
					price: price,
					status: "bidding",
					type_id,
				},
			});
			return res.json({ ok: true, data: newProduct });
		} catch (err) {
			return res.json({ success: false, message: err.message });
		} finally {
			async () => await prisma.$disconnect();
		}
	};

	deleteProduct = async (req, res) => {
		try {
			await prisma.product.delete({
				where: {
					id: req.params.id
				}
			})

			return res.json({ success: true })
		} catch (err) {
			return res.json({ success: false, message: err.message })
		} finally {
			async () => await prisma.$disconnect();
		}
	}
}

module.exports = new ProductController();
