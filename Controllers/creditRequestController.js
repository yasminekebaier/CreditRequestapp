const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const CreditRequest = require('../models/creditRequest');
const nodemailer = require("nodemailer");
const { mailTransport } = require('../utils/mail')


// Register credit Request => /creditRequest/new
exports.registerRequest = catchAsyncErrors(async (req, res, next) => {
    console.log("request body",req.body);
    
    // cretae a request in the data base 
    const creditRequest = await CreditRequest.create(req.body); 
    console.log(creditRequest)
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
//update request by id => /creditRequest/update/:id 
//update request by id => /creditRequest/update/:id 


const sendStatusEmail = async (email, status ,comment) => {
    try {
        const transporter = mailTransport();
        console.log('Sending email to:', email);
      const mailOptions = {
        from: 'kebaieryasmine0@gmail.com',
        to: email,
        subject: 'Credit Request Status',
        html: `<h3>Hello,</h3><p>Your credit request status is: ${status}</p><p>Cause: ${comment}</p>`,
      };
      console.log('Mail options:', mailOptions);
      const info = await transporter.sendMail(mailOptions);
      mailTransport().sendMail(mailOptions,info);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
exports.updateRequestById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, email, comment } = req.body; // Assuming you send the new status and client email in the request body
      console.log('Updating request with ID:', id);
      console.log('New status:', status);
      console.log('Client email:', email);
      console.log('Comment:', comment);
  
      const updatedCreditRequest = await CreditRequest.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
          useFindAndModify: true,
        }
      );
  
      if (!updatedCreditRequest) {
        return next(new ErrorHandler('creditRequest not Found', 404));
      }
  
      // Send email to the client
      await sendStatusEmail(email, status,comment);
  
      res.status(200).json({
        success: true,
        message: 'Status updated and email sent.',
        creditRequest: updatedCreditRequest,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating status and sending email.',
      });
    }
  };
