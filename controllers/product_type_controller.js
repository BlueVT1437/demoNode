const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

class ProductTypeController {
	getAllProductType = async (req, res) => {
		try {
			const productTypes = await prisma.productType.findMany()
			res.status(200).json({data: productTypes})
		} catch (err) {
			return err
		} finally {
			async () => await prisma.$disconnect();
		}
	}

	createProductType = async (req, res) => {
		const { type } = req.body
		const result = await prisma.$queryRaw`SELECT * FROM ProductType;`;	

		const typeExisted = await prisma.productType.findFirst({
			where: { type }
		})

		if (typeExisted) {
			return res.status(400).json({ ok: false, message: "Type was exist" });
		} else {
				await prisma.productType.create({
					data: {
						type: type
					}
				})
				
				res.status(201).json({ message: "Success!" });
		}
	}
}

module.exports = new ProductTypeController()