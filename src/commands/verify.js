module.exports = {
  name: 'verify',
  description: 'Verifies new users into the server',
  async execute(message,args, MessageEmbed, client) {
    const channelID = '822423063697948692';
    const testRole = message.guild.roles.cache.find(role => role.name === "verified");

    let embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Dear Traveller ~ Welcome to Teyvat!')
      .setDescription('Please react to the green tick and follow the steps in your DM to get verified and access the rest of the server.')

      let messageEmbed = await message.channel.send(embed);
      messageEmbed.react('✅');

      client.on('messageReactionAdd', async (reaction,user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channelID) {
          if (reaction.emoji.name === '✅' && !user.bot) {
            await reaction.message.guild.members.cache.get(user.id).send("Hello there ~ ! 😊💛, please do us a favour and fill out the form here: https://forms.gle/JvB68fChAEBdwDor9");
            setTimeout(function(){
              reaction.message.guild.members.cache.get(user.id).roles.add(testRole);
            }, 3*60*1000);
          } else {
            return;
          }
        }
      });

      client.on('messageReactionRemove', async (reaction,user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channelID) {
          if (reaction.emoji.name === '✅' && !user.bot) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(testRole);
          } else {
            return;
          }
        }
      });
  }
}
