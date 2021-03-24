module.exports = {
  name: 'kick',
  description: 'Kicks a specified user',
  execute(message, args) {
    const { member, mentions } = message;
    const target = mentions.users.first()
    console.log(member);
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to do that');
    if (args.length === 0) return message.reply('Please specify someone to kick!');

    if (target) {
      const targetMember = message.guild.members.cache.get(target.id); // Getting info about the user from the guild/server
      targetMember
        .kick()
        .then((member) => message.channel.send(`${member} was kicked.`))
        .catch((err) => message.channel.send('I do not have permissions to do that.'))
    } else {
      message.channel.send('That user was not found');
    }
  }
}
