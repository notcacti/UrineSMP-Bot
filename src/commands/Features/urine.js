const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('urine')
  .setDescription("Spits out facts about urine."),
  
  run: async ({ interaction, client }) => {
    const getFact = async () => {
      const getRandom = (min, max) => {
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        
        return rand;
      }
        const facts = await import('../../localStorage/facts.json', { assert: { type: 'json' } });

        const min = 0;
        const max = facts.default.length - 1;
        
        const index = await getRandom(min, max);

        return facts.default[index].fact;
    }

    await interaction.reply(`**Urine Fact:** *${await getFact()}*`);
  }
}