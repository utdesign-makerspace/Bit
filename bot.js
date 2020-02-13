require("dotenv").config();
const { AkairoClient } = require("discord-akairo");

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

client.on("raw", event => {
  const reactionRoles = {
    Nodejs: "669010113440251944",
    IOT: "669010161444323358",
    Drones: "669010205832511489",
    Python: "669010258857033749",
    Arduino: "669010402901884957",
    React: "669010450645516328"
  };
  if (
    ["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(event.t) &&
    ["nodejs", "ruby"].includes(event.d.emoji.name)
  ) {
    const { user_id, guild_id, emoji } = event.d;

    switch (event.t) {
      case "MESSAGE_REACTION_ADD":
        client.guilds.get(guild_id).roles.forEach(item => {
          console.log(`'${item.name}': '${item.id}',`);
        });
        client.guilds
          .get(guild_id)
          .members.get(user_id)
          .addRole("669010113440251944");
        break;
    }
  }
  
});
client.login(process.env.DISCORD_TOKEN);
