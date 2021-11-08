const { getAllProducts, getAllProductsStatic } = require("../controllers/products");
const ProductServer = require("express").Router()

ProductServer.get("/",getAllProducts)
ProductServer.get("/static",getAllProductsStatic)

module.exports = ProductServer;