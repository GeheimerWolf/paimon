import { Embed } from "../../utils/Embed.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "gadget",
  aliases: ["gadgets"],
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Help Gadgets")
      .setDescription([
        `🔹 \`${prefix}gadget geoculusresonancestone\``,
        `🔹 \`${prefix}gadget anemoculusresonancestone\``,
        `🔹 \`${prefix}gadget adeptiseekersstove\``,
        `🔹 \`${prefix}gadget warmingbottle\``,
        `🔹 \`${prefix}gadget condensedresin\``,
        `🔹 \`${prefix}gadget windcatcher\``,
        `🔹 \`${prefix}gadget nre\``,
        `🔹 \`${prefix}gadget geotreasurecompass\``,
        `🔹 \`${prefix}gadget anemotreasurecompass\``,
        `🔹 \`${prefix}gadget portablewaypoint\``,
        `🔹 \`${prefix}gadget kamera\``,
        `🔹 \`${prefix}gadget miniseeliecurcuma\``,
        `🔹 \`${prefix}gadget miniseeliedayflower\``,
        `🔹 \`${prefix}gadget miniseelierose\``,
        `🔹 \`${prefix}gadget treasureseekingseelie\``,
        `🔹 \`${prefix}gadget parametrictransformer\``
      ])
      .setTimestamp()
      .setColor("RANDOM");

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
