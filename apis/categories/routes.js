const express = require("express");
const router = express.Router();

const {
  categoryCreate,
  getCategories,
  productUpdate,
  productCreate,
} = require("./controllers");
const upload = require("../../middleware/multer");

router.get("/", getCategories);
router.post("/", categoryCreate);
router.put(
  "/:categoryId/products/productId",
  upload.single("image"),
  productUpdate
);
router.post("/:categoryId/products", upload.single("image"), productCreate);

module.exports = router;
