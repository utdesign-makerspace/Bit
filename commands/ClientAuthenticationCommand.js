const { Command } = require('discord-akairo');

class ClientAuthenticationCommand extends Command {
    constructor() {
        super('link', {
           aliases: ['link'],
           args: [{
               id: 'token',
               type: 'string'
           }]
        });
    }

    async exec(message, args) {
        //use RegEx to differentiate NetID and token
        let NetId = "^[A-z]{3}[0-9]{6}";
        if(NetId.test(args.token)){
            //take care of NetID and send email

        }
        else{
        //check if Discord and Token match on Mongoose
            
        //contact LDAP server
        }

    }
}

module.exports = ClientAuthenticationCommand;