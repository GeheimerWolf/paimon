import { Embed } from "../../utils/Embed.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "teyvattimes",
  aliases: ["tt"],
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Help Teyvat Times")
      .setDescription([
        `🔹 \`${prefix}teyvattimes\` or \`${prefix}tt\``,
        "",
        `🔹 \`${prefix}teyvattimes [no1 | 1 | one]\``,
        `🔹 \`${prefix}teyvattimes [no2 | 2 | two]\``,
        `🔹 \`${prefix}teyvattimes [no3 | 3 | three]\``,
        `🔹 \`${prefix}teyvattimes [no4 | 4 | four]\``,
      ])
      .setTimestamp()
      .setColor("RANDOM")

      await sendEmbed(message.channelID, embed).catch(console.log);
    },
  });