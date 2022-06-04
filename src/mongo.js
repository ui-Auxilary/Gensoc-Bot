const mongoose = require('mongoose');
const mongoPath = process.env.DB_PATH
module.exports = async () => {
  await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
  }).then((value) => {
    console.log('Connected to Mongo!');
  }
);
  return mongoose;
}
