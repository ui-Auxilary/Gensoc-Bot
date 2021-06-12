const mongo = require('./mongo');
const memberDataSchema = require('./schemas/new-member-schema.js');

//Newest changes
module.exports = client => {
  client.on('guildMemberAdd', async (member) => {
    console.log("Activating");
    console.log('User ' + member.user.username + ' has joined the server!');
    defaultRole = member.guild.roles.cache.find(role => role.name === "Traveller");
    console.log(member.user.id);
    const result = await memberDataSchema.find({
      discord_id: member.user.tag,
    })
    console.log(result)
    if (result.length > 0) {
      await memberDataSchema.findOneAndUpdate(
          {
            discord_id: member.user.tag,
          },
          {
            id: member.user.id,
          },
          {   // If it does exist update, if it doesn't create it
            upsert: true,
          }
        ).exec()
        member.roles.add(defaultRole);
        return;
    } else {
      console.log("No role added");
        return;
      }
  });
}
