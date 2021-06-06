// const config = require('./config.json');
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
  console.log(`${client.user.username} has logged in...`);
});

client.on('guildMemberAdd', (member) => {
    console.log('User ' + member.user.username + ' has joined the server!');
    defaultRole = member.guild.roles.cache.find(role => role.name === "Traveller");
    member.roles.add(defaultRole);
});

client.on('message', (message) => {
  if (message.channel.id == 822423063697948693) {
    console.log(message.guild.id);
    verified_role = message.guild.roles.cache.find(role => role.name === "verified");
    console.log(verified_role);
    let embed = message.embeds[0], field, text, number;
    if (!embed) return;
    console.log(embed);

    //Extracts DISCORD_ID from the google form
    const discord_name = embed.description.split("\n").pop();

    member = message.guild.members.cache.find(v => v.user.tag == discord_name);
    console.log(member.user.id);
    member.roles.add(verified_role);



    // for (embed.description) {
    //   console.log(f);
    //   if (f.name == "**What is your Discord ID? (e.g JohnSmith#1234)**\n") {
    //     field = f;
    //     console.log(field);
    //     break;
    //   }
    // }
    // if (!field) {
    //   return;
    // }
    //
    // text = field.value;
    // console.log(text);
  }
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
