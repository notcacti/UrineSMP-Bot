const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('urine')
    .setDescription("Spits out facts about urine."),

    run: async ({ interaction, client }) => {
        await interaction.reply(`your mom... ||\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n||...sorry bad joke.`)
    }
}