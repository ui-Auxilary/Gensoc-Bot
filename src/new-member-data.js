const mongo = require('./mongo.js');
const memberDataSchema = require('./schemas/new-member-schema.js');

module.exports = client => {
  client.on('message', async (message) => {
    const { author } = message;
    const { id } = author;

    if (message.channel.id == 822423063697948693) {
      verified_role = message.guild.roles.cache.find(role => role.name === "Traveller");
      // console.log(verified_role);
      let embed = message.embeds[0], field, text, number;
      if (!embed) return;
      filtered_array = embed.description.split("\n").filter((word) => word.length > 1).slice(1);
      console.log(filtered_array);
      name = filtered_array[1];
      email_or_phone = filtered_array[3];
      arc_member = filtered_array[5];

      if (arc_member == "No") {
        if (filtered_array[7].startsWith("z") || filtered_array[7].match(/^\d/)) {
          zid = filtered_array[7];
        } else {
          zid = " ";
        }
      }
      if (arc_member == "Yes") {
        if (filtered_array[7].startsWith("z") || filtered_array[7].match(/^\d/)) {
          zid = filtered_array[7];
          console.log(zid)
        } else {
          zid = " ";
        }
      }

      discord_id = filtered_array[filtered_array.length -1];
      console.log(name, email_or_phone, arc_member, zid, discord_id);

      member = message.guild.members.cache.find(v => v.user.tag == discord_id);
      if (member) {
        member.roles.add(verified_role);
      } else if (discord_id) {

        await memberDataSchema.findOneAndUpdate(
            {
              discord_id: discord_id,
            },
            {
              name: name,
              email_or_phone: email_or_phone,
              arc_member: arc_member,
              zid: zid,
              discord_id: discord_id,
            },
            {   // If it does exist update, if it doesn't create it
              upsert: true,
            }
          ).exec()
          return;
      } else {
        return;
      }

    await memberDataSchema.findOneAndUpdate(
        {
          _id: member.user.id,
          email_or_phone: email_or_phone,
          discord_id: discord_id,
        },
        {
          _id: member.user.id,
          name: name,
          email_or_phone: email_or_phone,
          arc_member: arc_member,
          zid: zid,
          discord_id: discord_id,
        },
        {   // If it does exist update, if it doesn't create it
          upsert: true,
        }
      ).exec()
    }
  });
}
