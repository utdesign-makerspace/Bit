message.channel.send({embed})
    .then(async embedMessage => {
        await embedMessage.react('◀')
        await embedMessage.react('▶')
        const emoji = {
            NEXT_PAGE: '▶',
            PREV_PAGE: '◀',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.NEXT_PAGE:
                    {
                        //Edit embed here (Next page)
                        embedMessage.reactions.get(emoji.PREV_PAGE).remove(message.author)
                        break;
                    }
                case emoji.PREV_PAGE:
                    {
                        //Edit embed here (Previous page)
                        embedMessage.reactions.get(emoji.PREV_PAGE).remove(message.author)
                        break;
                    }
            };
        });
        collector.on('end', () => embedMessage.delete());
    })
}