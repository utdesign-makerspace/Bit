const { Command } = require('discord-akairo');

class MinecraftAuthCommand extends Command {
   constructor() {
       super('Minecraft Account Authorization', { //Official dicord command name TBD
          aliases: ['MAA','Minecraft Account Authorization'] 
       });
   }

   async exec(message) {
      const userMsg = message.content;
      let userInfo = {
        uuid = null,
        username = null
      }

      let token = message.content.match(/?(*)/);
      token = token[1];
      console.log(userMsg);
       
      message.reply('A minecraft account is trying to be authorized for '+message.author.username); // Add in the user
      console.log("\nA minecraft account is trying to be authorized");

      fetch('https://mc-oauth.net/api/api?token', {
         method: "GET",
         headers: {
            "token": token
         }
      }).then(response => {
         return response.json();
      }).then(json => {
         if(json.status === 'success'){
            userInfo.uuid = json.uuid; 
            userInfo.username = json.username;
            message.reply('Thank you ' + userInfo.username);
         }
         else{
            message.reply('error');
         }
      });
   }
}

module.exports = MinecraftAuthCommand;