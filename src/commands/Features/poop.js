const { SlashCommandBuilder,EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poop')
    .setDescription('poop.'),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder()
        .setColor('#964B00')
        .setTitle('Poop.')
        .setDescription(":poop: <-- there you go :D")
        .setTimestamp()
        .setFooter({ text: 'Made for UrineSMP' });

        await interaction.reply({ embeds: [embed] });
    }
}