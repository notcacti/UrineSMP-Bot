/* CREDITS */ 
/*Created by: velocityhq */
/* Upgraded by: Razlar#4937 */

const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription(`Fetch a user's avatar from the server`)
        .setDMPermission(false)
        .addUserOption(option => option
            .setName('user')
            .setDescription(`The users avatar to fetch`)
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName('id')
            .setDescription(`If the user has left, you can enter the user ID`)
            .setRequired(false)
        ),
    run: async ({ interaction }) => {
        const { client, member } = interaction;
        const userOption = interaction.options.getUser('user');
        const idOption = interaction.options.getString('id');
        
        let user;
        if (userOption) {
            user = userOption;
        } else if (idOption) {
            const userById = await client.users.fetch(idOption);
            if (userById) {
                user = userById;
            } else {
                await interaction.reply('Invalid user ID or user has direct messages turned off.');
                return;
            }
        } else {
            user = member;
        }
        
        const userAvatar = user.displayAvatarURL({ size: 512 });

        // function componentToHex(c) {
        //     var hex = c.toString(16);
        //     return hex.length == 1 ? "0" + hex : hex;
        // }
        
        // function rgbToHex(r, g, b) {
        //     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        // }

        // const hc = rgbToHex(r, g, b);
 
        const embed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`${user.tag}'s Avatar`)
        .setImage(userAvatar)
        .setTimestamp()
        .setFooter({ text: `User ID: ${user.id}`})

        const png = new ButtonBuilder()
            .setLabel('PNG')
            .setStyle(ButtonStyle.Link)
            .setURL(user.displayAvatarURL({ size: 512, extension: 'png' }));
            
            const jpg = new ButtonBuilder()
            .setLabel('JPG')
            .setStyle(ButtonStyle.Link)
            .setURL(user.displayAvatarURL({ size: 512, extension: 'jpg' }));
            
            const jpeg = new ButtonBuilder()
            .setLabel('JPEG')
            .setStyle(ButtonStyle.Link)
            .setURL(user.displayAvatarURL({ size: 512, extension: 'jpeg' }));
            
            const row = new ActionRowBuilder().addComponents(png, jpg, jpeg);
            
        await interaction.reply({
            embeds: [embed],
            ephemeral: true, 
            components: [row],
        });
    },
};
