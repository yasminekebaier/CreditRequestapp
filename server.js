const connectDatabase = require('./config/database');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const http = require('http');   
const userRoutes = require('./Routes/userRoutes');
const creditRequest = require('./Routes/creditRequestRoutes'); 
const cors =require('cors')

// cors config  
const allowedOrigins = ['http://127.0.0.1:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

dotenv.config();
//create an express app 
const app = express();

// handle uncaught exceptions 
process.on('uncaughtException', err => {
    console.log(`error: ${err.stack}`);
    console.log("shutting down due to uncaught exceptions ");
    process.exit(1)
})
connectDatabase();
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Process is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload({
    useTempFiles: true
}));
app.use('',userRoutes); 
app.use('',creditRequest ); 