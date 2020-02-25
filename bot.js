require("dotenv").config();
const { AkairoClient } = require("discord-akairo");
const { Client } = require("discord.js");

const roleMessageID = '679090747026178068'; // TODO: Change to the ID of the message sent by the bot after calling the RoleDisplay command
const roleChannelID = '676607954891440152'; // TODO: Change to the ID of the channel where the role message was sent

const client = new AkairoClient(
  {
    ownerID: "",
    prefix: "?",
    commandDirectory: "./commands/"
  },
  {
    disableEveryone: true
  }
);

client.on('raw', event => {

  const eventName = event.t;

  if (eventName === 'MESSAGE_REACTION_ADD') {
    if (event.d.message_id === roleMessageID) {
      var reactionChannel = client.channels.get(event.d.channel_id);
      if (reactionChannel.messages.has(event.d.message_id)) {
        return;
      }
      else {
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          //console.log(msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id));
          //console.log(event.d.emoji.name + ":" + event.d.emoji.id);
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.d.user_id);
          client.emit('messageReactionAdd', msgReaction, user);
        })
        .catch(err => console.log(err));
      }
    }
  }

  else if (eventName === 'MESSAGE_REACTION_REMOVE') {
    if (event.d.message_id === roleMessageID) {
      var reactionChannel = client.channels.get(event.d.channel_id);
      if (reactionChannel.messages.has(event.d.message_id)) {
        return;
      }
      else {
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          //console.log(msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id));
          //console.log(event.d.emoji.name + ":" + event.d.emoji.id);
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.d.user_id);
          client.emit('messageReactionRemove', msgReaction, user);
        })
        .catch(err => console.log(err));
      }
    }
  }

});

client.on ('messageReactionAdd', (messageReaction, user) => {
  console.log("reaction found");
  var roleName = messageReaction.emoji.name;
  console.log(roleName);
  var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  if (role) {
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);
    if (member) {
      member.addRole(role.id);
      console.log("Success, role added!");
    }
  }
});

client.on ('messageReactionRemove', (messageReaction, user) => {
  console.log("reaction removed");
  var roleName = messageReaction.emoji.name;
  var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());

  if (role) {
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);
    if (member) {
      member.removeRole(role.id);
      console.log("Success, role removed!");
    }
  }
});

client.on('ready', () => {
  console.log("Logged in.");

  console.log(client.channels.get(roleChannelID));
  client.channels.get(roleChannelID).fetchMessage(roleMessageID);
});

client.login(process.env.DISCORD_TOKEN);
