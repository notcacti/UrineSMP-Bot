const { SlashCommandBuilder,EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Repeats whatever you say.')
    .addStringOption(opt => opt.setName('text').setDescription("The text you want to repeat").setRequired(true)),

    run: async ({ interaction, client }) => {
        const text = interaction.options.getString('text');
        if (!interaction.inGuild()) return await interaction.reply("You can only use this command in a server!");
        if (!text) return await interaction.reply({ content: "please add the text you want to say!", ephemeral: true });
        if (text.mentions.members.first()) return await interaction.reply({ content: "You can't ping anyone in your message!", ephemeral: true });
        
        await interaction.reply({ content: "Successfully repeated the message!", ephemeral: true });
        await interaction.channel.send(text);
    }
}