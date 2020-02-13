const { Command } = require('discord-akairo');

const fetch = require("node-fetch");

class MinecraftAuthCommand extends Command {
   constructor() {
       super('MAA', { //Official dicord command name TBD
          aliases: ['MAA','Minecraft Account Authorization'],
          args: [
            {
               id: 'token',
               type: 'string',
               
            }
          ]
       });
   }

   async exec(message, args) {    
      let userInfo = {
        uuid : null,
        username : null
      }
      let token = args.token;
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
            message.reply('Invalid Token and/or Error Occured');
         }
      });
   }
}

module.exports = MinecraftAuthCommand;