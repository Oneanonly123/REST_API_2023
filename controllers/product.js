const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // if user requsted for something doesn't exist
  const { company, name, feature, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);
  if (sort) {
    let sortfix = select.split(",").join(" ");
    apiData = apiData.sort(sortfix);
  }

  // select specific data
  if (select) {
    // let selectfix = select.replace(",", " ");
    // if we are searching for more than one data we
    // split it and join it
    let selectfix = select.split(",").join(" ");
    apiData = apiData.select(selectfix);
  }

  if (feature) {
    queryObject.feature = feature;
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 2;

  // using this formula we are skipping the data
  // based on our limit
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);
  const myData = await apiData;
  res.status(200).json({
    myData,
    nbHits: myData.length,
  });
};

const getAllProductsTesting = async (req, res) => {
  // adding sort functionality here // by-default - ascen
  const myData = await Product.find(req.query).select("name");
  console.log(req.query);
  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
