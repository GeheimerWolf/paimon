import { parsePrefix } from "../../monitors/commandHandler.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("list", {
  name: "gadgets",
  arguments: [
    { name: "page", type: "number", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message, args) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Gadgetlist")
      .setDescription([
        `⭐⭐⭐⭐`,
        "Condensed Resin 🔹 Wind Catcher 🔹 NRE (Menu 30) 🔹 Geo Treasure Compass 🔹 Anemo Treasure Compass 🔹 Portable Waypoint 🔹 Kamera 🔹 Mini Seelie: Curcuma 🔹 Mini Seelie: Dayflower 🔹 Mini Seelie: Rosé 🔹 Treasure-Seeking Seelie 🔹 Parametric Transformer",
        "",
        `⭐⭐⭐`,
        "Geoculus Resonance Stone 🔹 Anemoculus Resonance Stone 🔹 Adepti Seeker's Stove 🔹 Warming Bottle",
        "",
        `If you want to search for gadget infos, type \`${prefix}gadget (name)\`\nThe gadget name has to be lower case and without spacing. For example \`${prefix}gadget windcatcher\``,
      ]);

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
