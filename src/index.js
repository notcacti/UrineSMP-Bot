const { Client, IntentsBitField } = require('discord.js');
const { CommandHandler } = require('djs-commander');
require('dotenv').config();
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.snipes = new Map();

client.on('messageDelete', (message, channel) => {
    if (message.author.bot) return;
    if (message.author.id === '916447838790094848') return; // Meth
    if (message.author.id === '809651134671093782') return; // Cacti
    if (message.author.id === '865235794130108426') return; // Saz

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
});

new CommandHandler({
    client: client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events')
});

// Handles Rejections(promise error)
process.on('unhandledRejection', async(reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handles Exceptions(errors)
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception: ', err);
});

// Handles ExceptionMonitors(error catchers)
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('Uncaught Exception Monitor: ', err, origin);
});

client.login(process.env.TOKEN);