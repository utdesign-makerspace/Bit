const {Command} = require('discord-akairo');
const {RichEmbed} = require('discord.js');

class RoleDisplayCommand extends Command {
    constructor() {
        super('roleDisplay', {
            aliases: ['roleDisplay']
        });
    }

    exec(message) {
        console.log("roleDisplay command collected.");
        var embed = new RichEmbed();
        embed.setTitle('Server Roles');
        embed.setColor('RED');
        embed.setDescription('🤜 - Right Punch\nFucking do it.'); // TODO: Change to list all the emojis and the associated roles.

        message.channel.send(embed)
        .then(sentEmbed => {
            sentEmbed.react("🤜");
        })

        return;
    }
}

module.exports = RoleDisplayCommand;