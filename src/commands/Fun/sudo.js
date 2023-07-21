const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sudo')
    .setDescription('Says whatever you want as another person using webhooks.')
    .addUserOption(opt => opt.setName('user').setDescription('The user you want to sudo'))
    .addStringOption(opt => opt.setName("message").setDescription("The message you want them to send.")),

    run: async ({ interaction, client }) => {
        const user = interaction.options.getUser("user") || interaction.user;
        const text = interaction.options.getString("message");

        if (!text) return await interaction.reply({ content: "Please add the message you want them to send!", ephemeral: true });

        if (text.includes('@everyone')) return await interaction.reply({ content: "You can't ping everyone in your message!", ephemeral: true });
        if (text.includes('@here')) return await interaction.reply({ content: "You can't ping everyone in your message!", ephemeral: true });

        const userWebhook = await interaction.channel.createWebhook({ 
            name: user.username,
            avatar: user.displayAvatarURL(),
            reason: "sudo command was run"
        }).catch(err => {
            interaction.reply({ content: "Something went wrong... I might be missing permissions.", ephemeral: true });
            return;
        });

        await interaction.reply({ content: 'Successfully sudoed the person!', ephemeral: true });

        await userWebhook.send(String(text))

        await userWebhook.delete();
    }
}