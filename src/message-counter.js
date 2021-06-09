const mongo = require('./mongo');
const messageCountSchema = require('./schemas/message-count-schema');

module.exports = client => {
  client.on('message', async (message) => {
    
    const { author } = message;
    const { id } = author;
    await messageCountSchema.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $inc: {
            messageCount: 1,
          },
        },
        {   // If it does exist update, if it doesn't create it
          upsert: true,
        }
      ).exec()
  });
}
