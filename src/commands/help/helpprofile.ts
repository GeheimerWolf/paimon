import { Embed } from "../../utils/Embed.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "profile",
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    const embed = new Embed()
      .setTitle("Help Profile")
      .setDescription([
        `🔹 \`${prefix}profile\``,
        "Shows your own profile. If you didn't set it up, you receive the setup via DM.",
        "",
        `🔹 \`${prefix}profile [@user | userID]\``,
        "Shows the profile of the user."
      ])
      .setTimestamp()
      .setColor("RANDOM");

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
