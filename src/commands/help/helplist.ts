import { Embed } from "../../utils/Embed.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "list",
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Help List")
      .setDescription([
        `🔹 \`${prefix}list artifacts\``,
        `🔹 \`${prefix}list food\``,
        `🔹 \`${prefix}list gadgets\``,
        `🔹 \`${prefix}list materials\``,
        `🔹 \`${prefix}list weapons\``,
      ])
      .setTimestamp()
      .setColor("RANDOM");

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
