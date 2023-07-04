const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tweet')
    .setDescription('Generates a fake tweet.')
    .addStringOption(option => option.setName('displayname').setDescription('The display name of the user who is tweeting this.').setRequired(true))
    .addStringOption(option => option.setName('username').setDescription('The username of the person who is tweeting this.').setRequired(true))
    .addStringOption(option => option.setName('text').setDescription('The text to be displayed in the tweet').setRequired(true))
    .addIntegerOption(option => option.setName('replies').setDescription('The number of replies in the tweet').setRequired(false))
    .addIntegerOption(option => option.setName('likes').setDescription('The number of likes in the tweet').setRequired(false))
    .addIntegerOption(option => option.setName('retweets').setDescription('The number of retweets in the tweet').setRequired(false))
    .addStringOption(option => option.setName('theme').setDescription('The theme that you want in the image').addChoices({name: 'light', value: 'light'}, {name: 'dark', value: 'dark'}, {name: 'dim', value: 'dim'}).setRequired(false))
    .addStringOption(option => option.setName('avatar_url').setDescription('The avatar of the user who is tweeting.').setRequired(false)),


    run: async ({interaction, client}) => {
        
        let dname = interaction.options.getString('displayname');
        let uname = interaction.options.getString('username');
        let comment = interaction.options.getString('text');
        const replies = interaction.options.getInteger('replies') ?? 1;
        const likes = interaction.options.getInteger('likes') ?? 1;
        const retweets = interaction.options.getInteger('retweets') ?? 0;
        const theme = interaction.options.getString('theme') ?? 'dark';
        const avatar = interaction.options.getString('avatar_url') ?? 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png';
        
        if(dname.length > 32) return await interaction.reply('The display name should be only 32 characters or less.');
        if(uname.length > 15) return await interaction.reply('The username should be only 15 characters or less.');
        if(comment.length > 1000) return await interaction.reply('The text should be only 1000 characters or less.');
        if(avatar.split('.').pop() !== 'png') return await interaction.reply('The avatar should be png or jpg only!');

        try {

            dname = dname.replaceAll(" ", "+");
            uname = uname.replaceAll(" ", "+");
            comment = comment.replaceAll(" ", "+");

            const output = await interaction.reply(`https://some-random-api.com/canvas/tweet?displayname=${dname}&username=${uname}&comment=${comment}&replies=${replies}&likes=${likes}&retweets=${retweets}&theme=${theme}&avatar=${avatar}`);
        } catch (error) {
            console.error(error);
            return;
        }
    }
}