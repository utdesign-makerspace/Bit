require("dotenv").config();
const { Command } = require('discord-akairo');

const ldap = require('ldapjs');

const mongoose = require('mongoose');

const env = process.env;

const dBObj = mongoose.model('dBObj', {
    netid: String,
    discord: String,
    token: String
});

var client = ldap.createClient({
    url: env.LDAP_URL
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

        mongoose.connect(env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    }

    async exec(message, args) {
        //use RegEx to differentiate NetID and token
        let NetId = new RegExp("^[A-z]{3}[0-9]{6}");
        if (NetId.test(args.token)) {
            //check that their netID does not already have a linked discord on the LDAP server
            client.bind(`cn=${env.BOT_CN},${env.LDAP_SPACE}`, env.BOT_PASSWORD, (err) => {
                if (err) { throw err };

                let opts = {
                    filter: `|(${env.NETID_ATTR}=${args.token})(${env.DISCORD_ATTR}=${message.member.user.username})`,
                    scope: 'sub',
                    attributes: [env.NETID_ATTR, env.DISCORD_ATTR]
                };

                client.search(env.LDAP_SPACE, opts, (err, res) => {
                    if (err) { throw err };

                    let resultFlag = false;

                    res.on('searchEntry', (entry) => {
                        //production environment
                        //let netid = entry.attributes[0]._vals[0].toString();
                        //let discord = entry.attributes[1]._vals[0].toString();

                        //test environment
                        let netid = entry.object.netid;
                        let discord = entry.object.discord;
                        if (discord === message.member.user.username &&
                            netid === args.token.toLowerCase()) {
                            resultFlag = true;
                            return message.reply('Your NetID is already linked');
                        }
                        else if (discord === message.member.user.username) {
                            resultFlag = true;
                            return message.reply('This Discord is already linked to another NetID');
                        }
                        else if (discord != '') {
                            resultFlag = true;
                            return message.reply('That NetID is already in use');
                        }
                    });

                    res.on('searchReference', (referral) => { //idk what to do w/ this
                        console.log('referral: ' + referral.uris.join());
                    });

                    res.on('error', function (err) {//or this
                        console.error('error: ' + err.message);
                    });

                    res.on('end', (result) => {

                        if (!resultFlag) {//this flag is false if we do not receive any results from the LDAP server
                            //generate the token and all that J A Z Z
                            args.token = args.token.substring(0, 3).toLowerCase() + args.token.substring(3);
                            const db = mongoose.connection;
                            db.on('error', console.error.bind(console, 'connection error:'));

                            let token = generateToken();

                            dBObj.findOne({ discord: message.member.user.username }, (err, res) => {
                                if (err) { throw err; }
                                if (res) {
                                    message.reply('You already have a token; please check your email.');
                                }
                                else {
                                    dBObj.create({ netid: args.token, discord: message.member.user.username, token: token });

                                    message.reply(token);
                                    //take care of NetID and send email
                                }
                            });
                        }
                    });
                });
            });


        }
        else {
            //check if Discord and Token match on Mongoose
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            dBObj.findOne({ discord: message.member.user.username }, (err, res) => {
                if (err) { throw err; }

                if (!res) {
                    message.reply('Please call the command again and provide a NetID; you are not in our system.');
                }
                else if (args.token == res.token) {//we need to confirm they have a token first
                    dBObj.deleteOne({ discord: message.member.user.username }, (err) => {
                        if (err) { throw err; }
                    });
                    message.reply('Account linked.');
                    //contact LDAP server
                    client.bind(`cn=${env.BOT_CN},${env.LDAP_SPACE}`, process.env.BOT_PASSWORD, (err) => {
                        if (err) { throw err };

                        let change = new ldap.Change({
                            operation: 'replace',
                            modification: {
                                discord: [message.member.user.username]
                            }
                        });

                        client.modify(`cn=${res.netid},${env.LDAP_SPACE}`, change, (err, res) => {
                            
                            if (err) { throw err; }//we want to disconnect before throwing the error
                        });
                    });
                }
                else {
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