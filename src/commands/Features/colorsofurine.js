const { SlashCommandBuilder,EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('colorsofurine')
    .setDescription('The colors of urine!'),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setImage('https://www.schemecolor.com/wallpaper?i=15759&desktop')
        .setTitle("The wonderful colors of urine!")
        .setDescription(`Hex Codes: #FEF24E, #FDFD66, #FEFEBE, #FDFD96\nRGB Colors: Fuck you :middle_finger:`)
        .setTimestamp()
        .setFooter({ text: 'Made for UrineSMP.' });

        await interaction.reply({ embeds: [embed] });
    }
}