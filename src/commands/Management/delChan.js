const { SlashCommandBuilder,EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const wait = require('timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('del-chan')
    .setDescription('Deletes the channel.'),

    run: async ({ interaction, client }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: "You don't have the required permissions to run this command!", ephemeral: true });
    
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('yes')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId('no')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary)
        );

        const response = await interaction.reply({
            content: `Are you sure you want to delete this channel?`,
            components: [row],
        });
        
        const collectorFilter = i => i.user.id === interaction.user.id;
        
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

            if (confirmation.customId === 'yes') {
                interaction.user.send(`Deleted the channel: ${interaction.channel.name} in server: ${interaction.guild.name}`);
                interaction.channel.delete().catch(err => {console.error(err); return});
            } else if (confirmation.customId === 'no') {
                await interaction.editReply('Action cancelled.\n*This message will be deleted automatically*');
                wait(5000);
                await interaction.deleteReply();
            }
        } catch (e) {
            await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling\n*This message will be deleted automatically*', components: [] });
            wait(5000);
            await interaction.deleteReply();
        }
    }
}