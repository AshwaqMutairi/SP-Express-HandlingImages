const Category = require("../../db/models/Category");
const Product = require("../../db/models/Product");

//get catrgory list
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//creat
exports.categoryCreate = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//product update
exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const product = await Product.findByIdAndUpdate(
      req.product,
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    return res.status(200).json(product);
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

    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newProduct = await Product.create(req.body);

    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $push: { products: newProduct._id } }
    );

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
