import { Embed } from "../../utils/Embed.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "help",
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Help Help")
      .setDescription([
        `🔹 \`${prefix}help edit\``,
        `🔹 \`${prefix}help [gadgets | gadget]\``,
        `🔹 \`${prefix}help help\``,
        `🔹 \`${prefix}help [materials | material]\``,
        `🔹 \`${prefix}help [patchnote | patchnotes | update | version]\``,
        `🔹 \`${prefix}help profile\``,
        `🔹 \`${prefix}help remove\``,
        `🔹 \`${prefix}help reset\``,
        `🔹 \`${prefix}help setup\``,
        `🔹 \`${prefix}help [weapon | weapons]\``,
      ])
      .setTimestamp()
      .setColor("RANDOM");

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
