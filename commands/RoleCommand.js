const { Command } = require('discord-akairo');
// Role command that serves as back up to the react role command. 
class RoleCommand extends Command {
    constructor() {
        super('role', {
            args: [
                    {
                     id: 'role',
                     //Roles list
                     type: ['Python', 'NodeJS','IOT','Drones','Arduino','React'],
                     //Probably poor error handling
                     default: 'Error'
                
                    }

                 ],
            aliases: ['role']
        });
    }
    //TODO add json file to for scalability
    async exec(message, args){

        switch(args.role){
            //Switch case for each role
            case 'NodeJS':
                message.member.addRole('669010113440251944')
                .then(console.log('Added NodeJS role'))
                .then(message.reply('Role Added'))
                .catch(console.error);
        
                break;
            case 'IOT':
                message.member.addRole('669010161444323358')
                .then(console.log('Added IOT role'))
                .then(message.reply('Role Added'))
                .catch(console.error);
            
                break;       
            case 'Drones':
                message.member.addRole('669010205832511489')
                .then(console.log('Added Drones role'))
                .then(message.reply('Role Added'))
                .catch(console.error);
                
            break;
            case 'Python':
                message.member.addRole('669010258857033749')
                .then(console.log('Added Python role'))
                .then(message.reply('Role Added'))
                .catch(console.error);
        
                break;
            case 'Arduino':
                message.member.addRole('669010402901884957')
                .then(console.log('Added Arduino role'))
                .then(message.reply('Role Added'))
                .catch(console.error);
            
                break;
            case 'React':
                message.member.addRole('669010450645516328')
                .then(console.log('Added React role'))
                .then(message.reply('Role Added'))
                .catch(console.error);
            
                break;
            case 'Error':
                message.reply('Error has occured')
                .catch(console.error);
                break;
        }
    
    }

}

module.exports = RoleCommand;