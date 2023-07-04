const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const https = require('https'); 

module.exports = {
    data: new SlashCommandBuilder()
    .setName('trumptweet')
    .setDescription('Generates a fake Donald Trump tweet.')
    .addStringOption(option => option.setName('text').setDescription('The text to be displayed in the tweet').setRequired(true)),


    run: async ({interaction, client}) => {
        const text = interaction.options.getString('text');
        if (!text) return await interaction.reply('Please enter some text to tweet.')
        
        if(text.length > 100) return await interaction.reply('The text should be only 1000 characters or less.');

        try {
            await interaction.reply('Hacking trump...');
            await wait(2000);
            await interaction.editReply('Almost done...');
            
            const embed = new EmbedBuilder()
            .setColor('#2B2D31')
            .setFooter({ text: 'Made by Cacti#8752.' })
            .setTimestamp() 
            .setTitle('Trump Tweet')

            https.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                })

                response.on('end', () => {
                    var json = JSON.parse(data);
                    var msg = json.message;
                    embed.setImage(`${msg}`);
                    interaction.editReply({ content: '', embeds: [embed] });
                })

            }).on('error', (error) => {
                console.error(error);
            })


        } catch (error) {
            console.error(error);
            return;
        }
    }
}