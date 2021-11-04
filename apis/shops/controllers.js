const Shop = require("../../db/models/Shop");
const Product = require("../../db/models/Product");

//get catrgory list
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//creat
exports.shopCreate = async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//product update
exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      // req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.product.update(req.body);
    // const product = await Product.findByIdAndUpdate(
    //   req.product,
    //   req.body,
    //   { new: true, runValidators: true } // returns the updated product
    // );
    // return res.status(200).json(product);
    const product = await Product.findById(req.product._id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//product creat
exports.productCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const shopId = req.params.shopId;
    req.body = { ...req.body, shop: shopId };
    const newProduct = await Product.create(req.body);

    await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      { $push: { products: newProduct._id } }
    );

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
