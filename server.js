const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dotenv = require("dotenv");

dotenv.config();

// import router
const userRouter = require("./routes/user_route");
const authRouter = require("./routes/auth_route");
const productRouter = require("./routes/product_route");
const productTypeRouter = require("./routes/product_type_route");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product-type", productTypeRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1", authRouter);

const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
