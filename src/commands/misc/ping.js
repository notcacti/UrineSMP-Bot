const { SlashCommandBuilder } = require("discord.js");
const wait = require('timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Check the API and Client latency."),

    run: async ({ interaction, client }) => {
        const msg = await interaction.reply({ content: `Pong... 🏓`, ephemeral: true, fetchReply: true });
        wait(2000);
        await interaction.editReply(`API Latency: ${client.ws.ping}ms.\nClient Latency: ${msg.createdTimestamp - interaction.createdTimestamp}ms.`);
    }
}