const Products = require("../models/product")
const {StatusCodes}= require('http-status-codes')
const getAllProducts = async (req,res)=>{
    const {sort,name,featured,company,select,numericFilter} = req.query 
    const filterObject = {}

try {
    //search by Company
    if(company){
        filterObject.company = company
    }
    //search by Name
    if(name){
        filterObject.name = {$regex:name , $options:'i'}
    }
    //search by featured
    if(featured){
        filterObject.featured = featured
    }
    //numericFilter
    if(numericFilter){

        const numericFilterMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
        }
        const regEx = /\b(>|>=|<|<=|=)\b/g
        let filter = numericFilter.replace(regEx,(match)=>`-${numericFilterMap[match]}-`)
        const options = ['price','rating']
        filter = filter.split(',').forEach((ele) => {
            const [field,opreation,value]=ele.split('-')
            if(options.includes(field)){
                filterObject[field]={[opreation]:Number(value)}
            }
        });
        console.log(filterObject);
    }

    //find by Object
    let result = Products.find(filterObject)

    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result.sort(sortList)
    }

    //select
    if(select){
        const selectedList = select.split(',').join(' ')
        result=result.select(selectedList)
    }
    //pagination

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    const products = await result

    //response

    res.status(StatusCodes.OK).json({message:"AllProducts",page,items:products.length,products})

} catch (error) {

    res.status(StatusCodes.NOT_FOUND).json({message:"Failed",error})
        
    }
}

const getAllProductsStatic = async (req,res)=>{
    try {
    const products = await Products.find({})
    res.status(StatusCodes.OK).json({count:products.length,products})
    } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({message:"Failed",error})
        
    }
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}