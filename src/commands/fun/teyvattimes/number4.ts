import { Embed } from "../../../utils/Embed.ts";
import { createSubcommand } from "../../../utils/helpers.ts";
import { createPagination } from "../../../utils/pagination.ts";

createSubcommand("teyvattimes", {
  name: "no4",
  aliases: ["4", "four"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
    .setTitle("Teyvat Times No. 4")
    .setDescription("*Full Image: https://i.imgur.com/QfI7T6Y.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813003433732472832/unknown.png")
    .setFooter("Page 1/4 - Release Date: January 28, 2021")
    .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Teyvat Times No. 4")
    .setDescription("*Full Image: https://i.imgur.com/QfI7T6Y.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813002779588558869/unknown.png")
    .setFooter("Page 2/4 - Release Date: January 28, 2021")
    .setColor("RANDOM");

    const thirdEmbed = new Embed()
    .setTitle("Teyvat Times No. 4")
    .setDescription("*Full Image: https://i.imgur.com/QfI7T6Y.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813002828737675274/unknown.png")
    .setFooter("Page 3/4 - Release Date: January 28, 2021")
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Teyvat Times No. 4")
    .setDescription("*Full Image: https://i.imgur.com/QfI7T6Y.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813003555098722304/unknown.png")
    .setFooter("Page 4/4 - Release Date: January 28, 2021")
    .setColor("RANDOM");

    createPagination(message, [firstEmbed, secondEmbed, thirdEmbed, fourthEmbed]);
  },
});