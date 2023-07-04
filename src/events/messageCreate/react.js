module.exports = (message) => {
    let text = message.content.toLowerCase();
    if (text.includes('urine')) {
        if(message.author.bot) return;
        message.react('<:urine:1125441442882535555>1125441442882535555>');
        // // message.reply({ content: "haha i get it, urine. (maybe out of context but who cares)", ephemeral: true });
        // message.author.send('haha urine, i get it. (maybe out of context but who cares)')
    }
    
    if (text.includes('poop')) {
        if(message.author.bot) return;
        message.react('💩');
    }
}