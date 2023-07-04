const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('howtopee')
    .setDescription("Learn how to pee!"),

    run: async ({ interaction, client }) => {
        const peeArr = [
`Tapping the area between navel 🧭 and pubic bone. 🦴`,
`Bending forward. 🍑`,
`Placing a hand 🤚 in warm water. 💦`,
`Running water. 🌊`,
`Drinking while trying to urinate. 🍵`,
`Trying the Valsalva maneuver. 😳`,
`Exercising. 🏋️‍♀️`,
`Massaging the inner thigh. 😏`,
        ]

        const embed = new EmbedBuilder()
        .setColor("Yellow")
        .setFooter({ text: "Made for UrineSMP." })
        .setTitle("How to pee!")
        .setTimestamp()

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Tutorial - Click!')
            .setURL('https://www.youtube.com/watch?v=kZkx3h_YfLc')
            .setEmoji('<:urine:1125441442882535555>1125441442882535555>')
            .setStyle(ButtonStyle.Link)
        );

        const thatone = (peeArr) => {
            let string = '';
            for (const peeline of peeArr) {
                string = string + `- ${peeline}\n`;
            }
            
            return string;
        }
        
        const final = thatone(peeArr);

        embed.setDescription(final);

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}