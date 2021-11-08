const { StatusCodes } = require("http-status-codes");

module.exports = (schema) => {
  return (req, res, next) => {
    const val = [];
    let checkMethod = ["body", "params", "query"];
    checkMethod.forEach((key) => {

        if(req[key]){
            if(schema[key]){
                let result = schema[key].validate(req[key])
                if(result.error){
                    val.push(result.error.details[0].message)
                }
            }
        }

    });

    if(val.length){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Validation Error",val})
    }
    next()
  };
};
