const express = require("express");
const router = express.Router();

const {
  shopCreate,
  getShops,
  productUpdate,
  productCreate,
} = require("./controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");

router.get("/", getShops);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);
router.put(
  "/:shopId/products/productId",
  upload.single("image"),
  productUpdate
);
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
