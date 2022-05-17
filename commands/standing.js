const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const f1js = require("formula-one-js");
const { results, drivers, seasons, constructors, circuits, qualifyings, schedule, laptime, pitStops, standings} = f1js.requests();

let driver_standings  = []
let constructor_standings = [];

module.exports = {
    name: 'Standings',
    aliases: ['standings', 'standing', 'std'],
    cooldown: 0,
    description: '',
    async run(client, message, args, cmd){
        if (!args[0]) {
            let start = 0;
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle('Classement')
            let emb = await message.channel.send({ embeds: [embed], components: [row]});
            const collector1 = emb.createMessageComponentCollector({ time: 30000 });
            collector1.on('collect', async i => {
                if (i.customId === 'driver') {
                    await driver_std();
                    let max = driver_standings.length;
                    collector1.stop();     
                    let standing = await emb.reply({ embeds: [await page_embed(start, max+1, driver_standings)], components: [buttons]});
                    client.channels.cache.get(message.channel.id).messages.fetch(emb.id).then(message => message.delete());
                    const collector2 = standing.createMessageComponentCollector({ time: 60000 });
                    collector2.on('collect', async i => {
                        if (i.customId === 'forward') {
                            start +=10;
                            if (start > max+1) start = 0;
                            await i.update({ embeds: [await page_embed(start, max+1, driver_standings)], components: [buttons]});
                        }
                        if (i.customId === 'back') {
                            start -=10;
                            if (start < -10) start = 10;
                            await i.update({ embeds: [await page_embed(start, max+1, driver_standings)], components: [buttons]});
                        }
                    })
                    return;
                }
                if (i.customId === 'const') {
                    await con_std();
                    let max = constructor_standings.length;
                    collector1.stop();
                    await emb.reply({ embeds: [await page_embed(start, max, constructor_standings)]});               
                    client.channels.cache.get(message.channel.id).messages.fetch(emb.id).then(message => message.delete());
                    return;
                }
            })
        } else {
            if (!isNaN(args[0]) && args[0] > 2022 && args[0] < 1950) return;
            let start = 0;
            const embed = new MessageEmbed()
            .setColor('#FFD700')
            .setTitle('Classement')
            let emb = await message.channel.send({ embeds: [embed], components: [row]});
            const collector1 = emb.createMessageComponentCollector({ time: 30000 });
            collector1.on('collect', async i => {
                if (i.customId === 'driver') {
                    await standing_year_driver(args[0]);
                    let max = driver_standings.length;
                    collector1.stop();
                    let standing = await emb.reply({ embeds: [await page_embed(start, max+1, driver_standings)], components: [buttons]});
                    client.channels.cache.get(message.channel.id).messages.fetch(emb.id).then(message => message.delete());
                    const collector2 = standing.createMessageComponentCollector({ time: 60000 });
                    collector2.on('collect', async i => {
                        if (i.customId === 'forward') {
                            start +=10;
                            if (start > max+1) start = 0;
                            await i.update({ embeds: [await page_embed(start, max, driver_standings)], components: [buttons]});
                        }
                        if (i.customId === 'back') {
                            start -=10;
                            if (start < -10) start = 10;
                            await i.update({ embeds: [await page_embed(start, max, driver_standings)], components: [buttons]});
                        }
                    })
                    return;
                }
                if (i.customId === 'const') {
                    await standing_year_const(args[0]);
                    let max = constructor_standings.length;
                    collector1.stop();
                    await emb.reply({ embeds: [await page_embed(start, max, constructor_standings)]});                 
                    client.channels.cache.get(message.channel.id).messages.fetch(emb.id).then(message => message.delete());
                    return;
                }
            })
        }
    }
}

const row = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('driver')
        .setLabel('Driver')
        .setStyle('SECONDARY'), 
)
.addComponents(
    new MessageButton()
        .setCustomId('const')
        .setLabel('Constructeur')
        .setStyle('SUCCESS'),
);

const buttons = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY'),
)
.addComponents(
    new MessageButton()
        .setCustomId('forward')
        .setLabel('➡')
        .setStyle('SECONDARY'), 
);

async function driver_std () {
    await standings.getCurrentDriverStanding()
        .then(async(standingList) => {
            console.log(standingList)
            for await (const driver of standingList) {
                let dri = "**"+driver.position+"** "+driver.Driver.code+" "+driver.Driver.permanentNumber+" | "+driver.points+"pts \n";
                driver_standings.push(dri);
        }
    })
}

async function con_std () {
    await standings.getCurrentConstructorStanding()
    .then(async(standingList) => {
        for await (const cs of standingList) {
            let cons = `**${cs.position}** ${cs.Constructor.name} | ${cs.points}pts \n`;
            constructor_standings.push(cons);
        }
    });
}

async function standing_year_driver (year) {
    driver_standings  = [];
    await standings.getDriverStandingsByYear(year)
    .then(async(standingList) => {
        for await (const driver of standingList) {
            let dri = "**"+driver.position+"** "+driver.Driver.code+" | "+driver.points+"pts \n";
            driver_standings.push(dri);
        }
    })
}

async function standing_year_const (year) {
    constructor_standings  = [];
    await standings.getConstructorStandingsByYear(year)
    .then(async(standingList) => {
        for await (const cs of standingList) {
            let cons = `**${cs.position}** ${cs.Constructor.name} | ${cs.points}pts \n`;
            constructor_standings.push(cons);
        }
    })
}

async function page_embed (start, end, std) {
    if (start === end || start > end ) start = 0;
    if (start < 0) start = 20;
    let current = std.slice(start, start+10);
    return new MessageEmbed()
        .setColor('#FFD700')
        .setTitle('Driver Standing')
        .addFields(
            { name: '\u200B', value: current.join('\n') }
        )  
}