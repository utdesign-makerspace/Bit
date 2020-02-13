const { Command } = require('discord-akairo');

class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
           // clientPermissions: ['BAN_MEMBERS'],
           userPermissions: ['BAN_MEMBERS'],
        });
    }
    async exec(message){
        console.log('Role was ran')
    message.react('🐍')
    }

}

module.exports = RoleCommand;