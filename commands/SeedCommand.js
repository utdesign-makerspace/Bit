const { Command } = require('discord-akairo');

class SeedCommand extends Command {
    constructor() {
        super('seed', {
           aliases: ['seed'] 
        });
    }

    async exec(message) {
        console.log('SEED command')
        console.log(message.channel.guild.emojis.map( (item, index) => {
            return {id: item.id, name: item.name};
        }))
        let reactionMessage = await message.channel.fetchMessage('669036087477272596')
        reactionMessage.react('669204391105921034')
    }
}

module.exports = SeedCommand;