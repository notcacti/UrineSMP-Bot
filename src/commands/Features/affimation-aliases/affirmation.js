const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("affirmation")
    .setDescription("Gives you a random affirmating quote."),

    run: async({ interaction, client }) => {
        const affirmationEmbed = new EmbedBuilder()
        .setColor('DarkGreen')
        .setTitle("Affirmating Quote.")

        https.get("https://www.affirmations.dev/", (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on("end", async () => {
                let json = JSON.parse(data);
                let quote = json.affirmation;

                affirmationEmbed.setDescription(`*“${quote}”*`);
        
                await interaction.reply({ embeds: [affirmationEmbed] });
            })
        }).on('error', async (e) => {
            await interaction.reply({ content: "There has been an error while executing this command", ephemeral: true });
            console.error(e);
            return;
        });
    }
}