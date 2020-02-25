const { Command } = require('discord-akairo');
// Role command that serves as back up to the react role command. 
class RoleRemove extends Command {
    constructor() {
        super('roleremove', {
            args: [
                    {
                     id: 'remove',
                     //Roles list
                     type: ['Python', 'NodeJS','IOT','Drones','Arduino','React'],
                     //Probably poor error handling
                     default: 'Error'
                
                    }

                 ],
            aliases: ['roleremove']
        });

      

    }
    async exec(message, args){

        switch(args.remove){
            //Switch case for each role
            case 'NodeJS':
                message.member.removeRole('669010113440251944')
                .then(console.log('Removed NodeJS role'))
                .then(message.reply('Role Removed'))
                .catch(console.error);
        
                break;
            case 'IOT':
                message.member.removeRole('669010161444323358')
                .then(console.log('Removed IOT role'))
                .then(message.reply('Role Removed'))
                .catch(console.error);
            
                break;       
            case 'Drones':
                message.member.removeRole('669010205832511489')
                .then(console.log('Removed Drones role'))
                .then(message.reply('Role Removed'))
                .catch(console.error);
                
            break;
            case 'Python':
                message.member.removeRole('669010258857033749')
                .then(console.log('Removed Python role'))
                .then(message.reply('Role Removed'))
                .catch(console.error);
        
                break;
            case 'Arduino':
                message.member.removeRole('669010402901884957')
                .then(console.log('Removed Arduino role'))
                .then(message.reply('Role Removed'))
                .catch(console.error);
            
                break;
            case 'React':
                message.member.removeRole('669010450645516328')
                .then(console.log('Removed React role'))
                .then(message.reply('Role Removed'))
                .catch(console.error);
            
                break;
            case 'Error':
                message.reply('Error has occured')
                .catch(console.error);
                break;
        }
    
    }
}
module.exports = RoleRemove;