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

        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    }

    async exec(message, args) {
        //use RegEx to differentiate NetID and token
        let NetId = new RegExp("^[A-z]{3}[0-9]{6}");
        if (NetId.test(args.token)) {
            //check that their netID does not already have a linked discord on the LDAP server
            
            //generate the token and all that J A Z Z
            args.token = args.token.substring(0,3).toLowerCase() + args.token.substring(3);
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));

            let token = generateToken();

            dBObj.findOne({ discord: message.member }, (err, res) => {
                if (err) { throw err; }
                if (res) {
                    message.reply('You already have a token; please check your email.');
                }
                else {
                    dBObj.create({ netId: args.token, discord: message.member, token: token });

                    message.reply(token);
                    //take care of NetID and send email
                }
            });
        }
        else {
            //check if Discord and Token match on Mongoose
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            dBObj.findOne({ discord: message.member }, (err, res) => {
                if (err) { throw err; }

                if (!res){
                    message.reply('Please call the command again and provide a NetID; you are not in our system.');
                }
                else if (args.token == res.token) {//we need to confirm they have a token first
                    dBObj.deleteOne({ discord: message.member },(err) => {
                        if(err){ throw err; }
                    });
                    message.reply('Account linked.');
                    //contact LDAP server
                    
                }
                else{
                    message.reply('Incorrect token: please check your email for the proper token.')
                }
            });
        }

    }
}

module.exports = ClientAuthenticationCommand;

function generateToken() {
    let token = 0;
    for (let i = 0; i < 8; i++) {//generate an 8 digit random number
        token = token * 10;
        token += Math.floor(Math.random() * 10);
    }
    dBObj.findOne({ token: token }, (err, res) => {
        if (err) { throw err; }

        if (res) { token = generateToken; }
    });
    return token;
}