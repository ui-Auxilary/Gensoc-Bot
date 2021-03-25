const host = 'localhost';
const port = 3000;

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
  console.log("Server started.......");
});

const config = require('./config.json');
const fs = require('fs');
//Extract the client class from discord.js
const PREFIX = '$';
const {Client,Collection, MessageEmbed} = require('discord.js');
const client = new Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Collection();

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  //Sets a new item in the collection, key and command pair
  client.commands.set(command.name, command);
}
// Bot methods

client.on('ready', () => {
  console.log(`${client.user.username} has logged in...`)
});

client.on('guildMemberAdd', (member) => {
    console.log('User ' + member.user.username + ' has joined the server!');
    // defaultRole = member.guild.roles.cache.find(role => role.name === "unverified");
    // member.roles.add(defaultRole);
    client.commands.get('verify').execute(MessageEmbed, client);
});

client.on('message', (message) => {
  if (message.author.bot) return;
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

client.login(config.token);
