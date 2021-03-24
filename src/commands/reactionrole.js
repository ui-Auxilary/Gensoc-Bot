module.exports = {
  name: 'reactionrole',
  description: 'Sets up a reaction role message',
  async execute(message,args, MessageEmbed, client) {
    const channelID = '822423063697948692';
    const testRole = message.guild.roles.cache.find(role => role.name === "GenNews");

    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'Primogem');

    let embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('WANT SOME FREE PRIMOGEMS?')
      .setDescription('React to this role to look at Genshin Leaks and Twitter news!')

      let messageEmbed = await message.channel.send(embed);
      messageEmbed.react(reactionEmoji);

      client.on('messageReactionAdd', async (reaction,user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channelID) {
          if (reaction.emoji.name === 'Primogem' && !user.bot) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(testRole);
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
          if (reaction.emoji.name === 'Primogem' && !user.bot) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(testRole);
          } else {
            return;
          }
        }
      });
  }
}
