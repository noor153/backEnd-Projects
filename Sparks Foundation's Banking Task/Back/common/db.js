const mongoose =require('mongoose')

const connection = () => {
    return mongoose.connect('mongodb+srv://NoorElDeen:123@firstcluster.cgslo.mongodb.net/SparksBankingSystem?retryWrites=true&w=majority')
    .then((result)=>{
        console.log("Db Connected");})
    .catch((err)=>{
        console.log("err");})
} 

module.exports = connection;