require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

// no need to export .json file , we can directly import it
const ProductJson = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
