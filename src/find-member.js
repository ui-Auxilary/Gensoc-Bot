const mongo = require('./mongo');
const memberDataSchema = require('./schemas/new-member-schema.js');

//Newest changes
module.exports = client => {
  client.on('guildMemberAdd', async (member) => {
    console.log("Activating");
    console.log('User ' + member.user.username + ' has joined the server!');
    defaultRole = member.guild.roles.cache.find(role => role.name === "verified");
    console.log(member.user.id);
    const result = await memberDataSchema.find({
      _id: member.user.id
    })
    console.log(result)
    if (result.length > 0) {
      member.roles.add(defaultRole);
    } else {
      console.log("No role added");
      return;
    }
  });
}
