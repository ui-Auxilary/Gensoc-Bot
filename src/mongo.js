const mongoose = require('mongoose');
const mongoPath = "mongodb+srv://Gensoc:UHcFGTJ3MBVedH1C@gensocdb.pkjz1.mongodb.net/GensocDB?retryWrites=true&w=majority"
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
