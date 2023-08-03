const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const CreditRequest = require('../models/creditRequest');


// Register credit Request => /registerRequest
exports.registerRequest = catchAsyncErrors(async (req, res, next) => {
    
    // cretae a request in the data base 
    const creditRequest = await CreditRequest.create(req.body); 
        res.status(200).json({
            success: true , 
            message : 'creditRequest Created successfully',
            creditRequest, 
       
    })
});
// get All Requests  => /creditRequests
module.exports.getAllRequests = async (req, res) => {
    const creditRequests = await CreditRequest.find()
    res.send(creditRequests)
}

//find creditRequest by id => /creditRequest/id 
exports.getRequestById = async (req,res,next) => {
    const creditRequest = await CreditRequest.findById(req.params.id)
    if (!creditRequest) {
        return next(new ErrorHandler('creditRequest not Found', 404));
    }
    res.status(200).json({
        success:true, 
         creditRequest:creditRequest
    })
}