import { Embed } from "../../../utils/Embed.ts";
import { createSubcommand } from "../../../utils/helpers.ts";
import { createPagination } from "../../../utils/pagination.ts";

createSubcommand("teyvattimes", {
  name: "no2",
  aliases: ["2", "two"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
    .setTitle("Teyvat Times No. 2")
    .setDescription("*Full Image: https://i.imgur.com/SDjTu6x.png*")
    .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812992391832535080/unknown.png")
    .setFooter("Page 1/4 - Release Date: December 10, 2020")
    .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Teyvat Times No. 2")
    .setDescription("*Full Image: https://i.imgur.com/SDjTu6x.png*")
    .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812992438557736960/unknown.png")
    .setFooter("Page 24 - Release Date: December 10, 2020")
    .setColor("RANDOM");

    const thirdEmbed = new Embed()
    .setTitle("Teyvat Times No. 2")
    .setDescription("*Full Image: https://i.imgur.com/SDjTu6x.png*")
    .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812992471683301376/unknown.png")
    .setFooter("Page 3/4 - Release Date: December 10, 2020")
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Teyvat Times No. 2")
    .setDescription("*Full Image: https://i.imgur.com/SDjTu6x.png*")
    .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812992520744468480/unknown.png")
    .setFooter("Page 4/4 - Release Date: December 10, 2020")
    .setColor("RANDOM");

    createPagination(message, [firstEmbed, secondEmbed, thirdEmbed, fourthEmbed]);
  },
});