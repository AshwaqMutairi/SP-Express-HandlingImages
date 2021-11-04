const express = require("express");
const router = express.Router();

const {
  shopCreate,
  getShops,
  productUpdate,
  productCreate,
} = require("./controllers");
const upload = require("../../middleware/multer");

router.get("/", getShops);
router.post("/", shopCreate);
router.put(
  "/:shopId/products/productId",
  upload.single("image"),
  productUpdate
);
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
