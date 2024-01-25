const mongoose = require('mongoose');
const dotenv=require('dotenv'); 

DB_URI='mongodb+srv://user:aPL0lubQkvMCZ9lS@creditrequest.1t3ihrw.mongodb.net/'
// process.env.DB_URL
dotenv.config(); 
const connectDatabase = () => {
    
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: false
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
})
}
module.exports = connectDatabase; 