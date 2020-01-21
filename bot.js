// Load ENV from .env, create one from .env.example if you don't have one
require('dotenv').config()

// Loading in The Akairo Client
const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient();

client.login(process.env.DISCORD_TOKEN);