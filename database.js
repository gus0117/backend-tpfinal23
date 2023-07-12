const mongoose = require('mongoose');
/* const URI = 'mongodb://127.0.0.1/proyectofinaldb'; */
const URI = process.env.MONGODB_CONNECT_URI;
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
module.exports = mongoose;