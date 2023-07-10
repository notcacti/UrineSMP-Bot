const { SlashCommandBuilder,EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('helpme')
    .setDescription('Gets all the commands of this bot.'),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Command List.')
        .addFields(
            { name: 'Feature', value: '\`\`/howtopee\`\` - Teaches you how to pee\n\`\`/urine\`\` - Don\'t try it. You\'ve been warned!\n\`\`/colorsofurine\`\` - Displays the wonderful colors of Urine.\n\`\`/affirmation\`\` or \`\`/afm\`\` - Gets you a random affirmating quote (sentence).' },
            { name: 'Fun', value: '\`\`/avatar\`\` - Get any user\'s avatar\n\`\`/tweet\`\` - Generate a fake tweet!\n\`\`/trumptweet\`\` - Generate a fake tweet as Donald J Trump.\n\`\`/snipe\`\` - Get the most recently deleted message from the channel.\n\`\`/say\`\` - Make the bot say whatever you want.' },
            { name: 'Misc', value: '\`\`/ping\`\` - Check the API and Client latency\n\`\`/help\`\` - This Command!\n' },
            { name: 'Dev-Only', value: '\`\`/kill\`\` - Kills the bot. Cacti & Magictop only uwu.' },
            { name: 'Admin-Only', value: '\`\`/del-chan\`\` - Deletes the channel this command is ran in.' }
        )
        .setTimestamp()
        .setFooter({ text: 'Made for UrineSMP' });

        await interaction.reply({ embeds: [embed] });
    }
}