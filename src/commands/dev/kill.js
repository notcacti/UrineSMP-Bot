const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Literally, kills the bot.'),

    run: async ({ interaction, client }) => {
        let check = false;

        switch (interaction.user.id) {
            case '809651134671093782':
                check = true;
                break;

            case '1064432270708060190':
                check = true;
                break;
        
            default:
                check = false;
                break;
        }

        if (check === false) {
            await interaction.reply("Sure buddy, trying things you shouldn't huh. die you mf.");
        } else {
            await interaction.reply("Dying... :skull: :sob:");
            await interaction.editReply("Dead. :skull:")

            console.log("Death executed by:", interaction.user.username);
            process.exit(0);
        }
    }
}