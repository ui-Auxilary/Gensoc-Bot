module.exports = {
  name: 'kick',
  description: 'Bans a specified user',
  execute(message,args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to do that');
    if (args.length === 0) return message.reply('Please provide a valid user');
  }
}
