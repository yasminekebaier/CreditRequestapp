const mongoose = require('mongoose');
const dotenv=require('dotenv'); 

dotenv.config(); 
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: false
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
})
}
module.exports = connectDatabase; 