import { Embed } from "../../../utils/Embed.ts";
import { createSubcommand } from "../../../utils/helpers.ts";
import { createPagination } from "../../../utils/pagination.ts";

createSubcommand("teyvattimes", {
  name: "no3",
  aliases: ["3", "three"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
    .setTitle("Teyvat Times No. 3")
    .setDescription("*Full Image: https://i.imgur.com/dsH0E5o.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813002689515749416/unknown.png")
    .setFooter("Page 1/4 - Release Date: December 30, 2020")
    .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Teyvat Times No. 3")
    .setDescription("*Full Image: https://i.imgur.com/dsH0E5o.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813002779588558869/unknown.png")
    .setFooter("Page 2/4 - Release Date: December 30, 2020")
    .setColor("RANDOM");

    const thirdEmbed = new Embed()
    .setTitle("Teyvat Times No. 3")
    .setDescription("*Full Image: https://i.imgur.com/dsH0E5o.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813002828737675274/unknown.png")
    .setFooter("Page 3/4 - Release Date: December 30, 2020")
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Teyvat Times No. 3")
    .setDescription("*Full Image: https://i.imgur.com/dsH0E5o.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/813002857501425664/unknown.png")
    .setFooter("Page 4/4 - Release Date: December 30, 2020")
    .setColor("RANDOM");

    createPagination(message, [firstEmbed, secondEmbed, thirdEmbed, fourthEmbed]);
  },
});