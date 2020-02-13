const { Command } = require('discord-akairo');

class MinecraftBotAuthCommand extends Command {
    constructor() {
        super('Minecraft Account Authorization', { //Official dicord command name TBD
           aliases: ['MAA','Minecraft Account Authorization'] 
        });
    }

    async exec(message) {
        var userMsg = message.content
        console.log(userMsg)

        message.reply('A minecraft account is trying to be authorized for '+message.author.username); // Add in the user
        console.log("\nA minecraft account is trying to be authorized")
        message.reply('\n\nThe message was:\n\''+message.content+"\'")


        
        return
    }
}

module.exports = MinecraftBotAuthCommand;

//https://www.youtube.com/watch?v=bxEFqIQbRlc

//I think to solve the other teams problem they may need to setup a reaction collector
//
//https://discord.js.org/#/docs/main/11.5.1/class/ReactionCollector