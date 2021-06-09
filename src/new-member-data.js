const mongo = require('./mongo.js');
const memberDataSchema = require('./schemas/new-member-schema.js');

module.exports = client => {
  client.on('message', (message) => {
    const { author } = message;
    const { id } = author;
    if (message.channel.id == 822423063697948693) {
      verified_role = message.guild.roles.cache.find(role => role.name === "verified");
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

      d_id = filtered_array[filtered_array.length -1];
      console.log(name, email_or_phone, arc_member, zid, d_id);
      //Extracts DISCORD_ID from the google form
      const discord_name = embed.description.split("\n").pop();

      member = message.guild.members.cache.find(v => v.user.tag == d_id);
      console.log(member.user.id);
      const result = memberDataSchema.find({
        _id: member.user.id
      })
      if (result.length > 1) {
        member.roles.add(verified_role);
      } else {
        return;
      }
    }

    memberDataSchema.findOneAndUpdate(
        {
          _id: member.user.id,
        },
        {
          _id: member.user.id,
          name: name,
          email_or_phone: email_or_phone,
          arc_member: arc_member,
          zid: zid,
          discord_id: d_id,
        },
        {   // If it does exist update, if it doesn't create it
          upsert: true,
        }
      ).exec()
  });
}
