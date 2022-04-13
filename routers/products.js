const express = require("express");
const Products = require("../models/products")
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/products/:id", async (req, res) => {
    try {
      const products = await Products.find({id: req.params.id});
      res.send(products);
    } catch (e) {
      res.status(500).send(e);
    }
  });

module.exports = router;
