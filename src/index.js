const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { CommandHandler } = require('djs-commander');
require('dotenv').config();
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
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

// Skullboard Collector
client.on('messageReactionAdd', async (reaction, user) => {
    const skull = '💀';
    const skullboardChannelId = '1132190346785333248';

    if (reaction.emoji.name === skull && reaction.count === 3 && reaction.channel.id !== skullboardChannelId) {
        const embed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setAuthor({ name: `${reaction.message.author.tag}`, iconURL: `${reaction.message.author.displayAvatarURL()}` })
        .setTitle('Click me to jump to the message!')
        .setURL(`${reaction.message.url}`)
        .setDescription(`${reaction.message.content}`)
        if (reaction.message.attachments.size > 0) {
            try {
                embed.setImage(`${reaction.message.attachments.first()?.url}`);
            } catch (err) {
                console.log(`Couldn't set image for skullboard.`);
                return;
            }
            
        }
                
        const channel = client.channels.cache.get(skullboardChannelId);
        channel.send({ embeds: [embed] })
    }

    return;
});

client.login(process.env.TOKEN);