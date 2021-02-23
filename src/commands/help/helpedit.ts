import { parsePrefix } from "../../monitors/commandHandler.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "edit",
  aliases: ["add"],
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Help Edit/Add")
      .setDescription([
        `🔹 \`${prefix}edit uid (UID)\``,
        `🔹 \`${prefix}edit [ar | adventurerrank] (1-60)\``,
        `🔹 \`${prefix}edit [wl | worldlevel] (0-8)\``,
        `🔹 \`${prefix}edit [char | character] (char name) const (constellation 0-6)\``,
        `🔹 \`${prefix}edit [char | character] (char name) level (level 1-90)\``,
        ``,
        `🔹 \`${prefix}add uid (UID)\``,
        `🔹 \`${prefix}add [ar | adventurerrank] (1-60)\``,
        `🔹 \`${prefix}add [wl | worldlevel] (0-8)\``,
        `🔹 \`${prefix}add [char | character] (char name) const (constellation 0-6)\``,
        `🔹 \`${prefix}add [char | character] (char name) level (level 1-90)\``,
      ])
      .setTimestamp()
      .setColor("RANDOM");

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
