const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('urine')
    .setDescription("Spits out facts about urine."),

  run: async ({ interaction, client }) => {
    await interaction.reply(`<:urine:1125441442882535555>`)
  }
}