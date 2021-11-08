const notFound = (req,res)=>{
res.status(404).send("This Route Doesn't Exist");
}
module.exports = notFound