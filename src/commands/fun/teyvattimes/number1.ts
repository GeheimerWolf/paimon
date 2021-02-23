import { Embed } from "../../../utils/Embed.ts";
import { createSubcommand } from "../../../utils/helpers.ts";
import { createPagination } from "../../../utils/pagination.ts";

createSubcommand("teyvattimes", {
  name: "no1",
  aliases: ["1", "one"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
    .setTitle("Teyvat Times No. 1")
    .setDescription("*Full Image: https://i.imgur.com/H6BSpkz.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/812997420631719966/unknown.png")
    .setFooter("Page 1/4 - Release Date: November 28, 2020")
    .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Teyvat Times No. 1")
    .setDescription("*Full Image: https://i.imgur.com/H6BSpkz.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/812997460825866240/unknown.png")
    .setFooter("Page 2/4 - Release Date: November 28, 2020")
    .setColor("RANDOM");

    const thirdEmbed = new Embed()
    .setTitle("Teyvat Times No. 1")
    .setDescription("*Full Image: https://i.imgur.com/H6BSpkz.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/812997486900674580/unknown.png")
    .setFooter("Page 3/4 - Release Date: November 28, 2020")
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Teyvat Times No. 1")
    .setDescription("*Full Image: https://i.imgur.com/H6BSpkz.png*")
    .setImage("https://cdn.discordapp.com/attachments/798566392965103616/812997517980467250/unknown.png")
    .setFooter("Page 4/4 - Release Date: November 28, 2020")
    .setColor("RANDOM");

    createPagination(message, [firstEmbed, secondEmbed, thirdEmbed, fourthEmbed]);
  },
});