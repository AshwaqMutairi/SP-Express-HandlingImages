const Category = require("../../db/models/Category");

//get catrgory list
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
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

exports.productCreate = async (req, res) => {
  try {
    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $push: { products: newProduct._id } }
    );

    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
