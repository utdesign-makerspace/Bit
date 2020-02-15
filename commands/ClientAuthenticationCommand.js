require("dotenv").config();
const { Command } = require('discord-akairo');

const mongoose = require('mongoose');

const dBObj = mongoose.model('dBObj', {
    netId: String,
    discord: String,
    token: String
});

class ClientAuthenticationCommand extends Command {
    constructor() {
        super('link', {
           aliases: ['link'],
           args: [{
               id: 'token',
               type: 'string'
           }]
        });

        mongoose.connect(process.env.MONGODB_URL);

    }

    async exec(message, args) {
        //use RegEx to differentiate NetID and token
        let NetId = "^[A-z]{3}[0-9]{6}";
        if(NetId.test(args.token)){            
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', () => {
                let token = generateToken();
                
                dBObj.create({netID: args.token, discord: message.member, token: token});
            });            
            //take care of NetID and send email
            
        }
        else{
            //check if Discord and Token match on Mongoose
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', () => {
                dBObj.findOne({ discord: message.member}, (err, res) => {
                    if(err){return err;}

                    if(args.token == res.token){
                        //contact LDAP server

                    }
                });
            });
        }

    }
}

module.exports = ClientAuthenticationCommand;

function generateToken(){
    let token = 0;
    for(let i = 0; i < 8; i++){//generate an 8 digit random number
        token = token * 10;
        token += Math.floor(Math.random() * 10);
    }
    dBObj.findOne({token: token}, (err, res) =>{
        if(err){return err;}

        if(res){token = generateToken;}
    });
    return token;
}