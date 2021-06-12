// const config = require('./config.json');
const fs = require('fs');
//Extract the client class from discord.js
const PREFIX = '$';
const {Client,Collection, MessageEmbed} = require('discord.js');
const mongo = require('./mongo.js');
const client = new Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Collection();

// DB Functions imports
const messageCount = require('./message-counter.js');
const newMemberData = require('./new-member-data.js');
const findMember = require('./find-member.js');

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  //Sets a new item in the collection, key and command pair
  client.commands.set(command.name, command);
}
// Bot methods

client.on('ready', async() => {
  console.log(`${client.user.username} has logged in...`);
  console.log('Newest Edition');
  messageCount(client);
  findMember(client);
  newMemberData(client);
  await mongo();
});

// client.on('guildMemberAdd', (member) => {
//     console.log('User ' + member.user.username + ' has joined the server!');
//     defaultRole = member.guild.roles.cache.find(role => role.name === "Traveller");
//
// });

client.on('message', (message) => {
  if (message.author.bot && message.channel.id != 822423063697948693) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
    console.log(CMD_NAME);
    console.log(args);
    switch (CMD_NAME) {
      case 'verify': {
        client.commands.get('verify').execute(message,args, MessageEmbed, client);
        break;
      }
      case 'reactionrole': {
        client.commands.get('reactionrole').execute(message,args, MessageEmbed, client);
        break;
      }
      case 'kick': {
        client.commands.get('kick').execute(message,args);
        break;
      }
      case 'ban': {
        client.commands.get('ban').execute(message, args);
        break;
      }
    }
  }
})

client.login(process.env.DJS_TOKEN);
// client.login('ODIyNDE4MTM2Nzg2NTM0NDMw.YFR-kw.fJyONfdVq_-qWJbocovE1tjewIE');
