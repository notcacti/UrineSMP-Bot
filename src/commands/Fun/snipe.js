const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription("Fetch the most recently deleted message in your channel."),

    run: async ({ interaction, client }) => {
        const msg = client.snipes.get(interaction.channel.id);
        if (!msg) return await interaction.reply({ content: `I can't find any deleted messages.`, ephemeral: true });

        const ID = msg.author.id;
        const member = interaction.guild.members.cache.get(ID);
        const URL = member.displayAvatarURL();

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`SNIPED MESSAGE - ${member.user.tag}`)
        .setDescription(`${msg.content ? msg.content : `**No text in the original message**`}`)
        .setTimestamp()
        .setFooter({ text: `Member ID: ${ID}`, iconURL: `${URL}` });

        if(msg.image) embed.setImage(msg.image);
        await interaction.reply({ embeds: [embed] });
    }
}