import { botCache } from "../../../deps.ts";

const gifData = [
  {
    name: "emergencyfood",
    aliases: [],
    gifs: [
      "https://media.tenor.com/images/896afb9f07ce2d0731ac007bafcc4b01/tenor.gif",
      "https://cdn.discordapp.com/attachments/799962935971545118/812803732282277919/wtfistdas.gif",
      "https://i.kym-cdn.com/photos/images/newsfeed/001/915/094/da9.png",
      "https://media1.tenor.com/images/6e3c3043fda5b0085da74405819aca49/tenor.gif",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051506117967892/324685081993cf2e05d3cddfdc284c58.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051546677149696/3c24af6e02e64e4a8e22ba289da746df.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051583935938590/maxresdefault.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051634275844127/3e4.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051740702244894/bc2.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051824696328202/4ifzpj.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051916804030504/sample-08d63e56d2627f4e16e9c63f85db8183.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051883857772574/5c7.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813051991055532082/0886929373d90a46e8f79d006fc87940_1656200143489460465.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813052209532764160/Z.png",
      "https://media1.tenor.com/images/e5c0782eabec199b0d929a64813b98da/tenor.gif",
      "https://cdn.discordapp.com/attachments/812829387560189992/813052311361552394/kz5jqthsu4r51.png",
      "https://cdn.discordapp.com/attachments/812829387560189992/813052402064031794/915060e05dc1a6c7f179a8e3e44f0010.png",
      "https://media1.tenor.com/images/7374fc0ef8a5192ce5f0083e51b98717/tenor.gif",
      "https://media1.tenor.com/images/4369322fe48647949dd720facb6845e0/tenor.gif",
    ],
  }
]

gifData.forEach(async (data) => {
    botCache.commands.set(data.name, {
      name: data.name,
      aliases: data.aliases,
      botChannelPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      guildOnly: true,
      execute: async (message) => {
     
        const randomGif = botCache.helpers.chooseRandom(data.gifs);
  
        // Create the embed
        const embed = botCache.helpers.authorEmbed(message).setImage(randomGif);
  
        // Send the embed to the channel
        return message.send({ embed });
      },
    });
  });