const connectdb = require("./db/connect")
require("dotenv").config()
const Products = require("./models/product")
const jsonProducts = require('./products.json')

const start = async ()=>{
    try {
        await connectdb(process.env.QUERY_DEPLOY)
        await Products.deleteMany({})
        await Products.create(jsonProducts)
        console.log("Cloning Successed");
        process.exit(0)
    } catch (error) {
        console.log("errrrr");
        process.exit(1)
    }
}
start()