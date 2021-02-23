import { parsePrefix } from "../monitors/commandHandler.ts";
import { Embed } from "../utils/Embed.ts";
import {
  createCommand,
} from "../utils/helpers.ts";

createCommand({
  name: "patchnotes",
  aliases: ["patchnote", "update", "version"],
  arguments: [{ name: "subcommand", type: "subcommand", required: false }],
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    await message.reply({
      embed: new Embed()
        .setTitle("Need help, Traveler?")
        .setDescription([
          `\`${prefix}update 1.1\``,
          "**not availabable yet**",
          "",
          `\`${prefix}update 1.2\``,
          "**not availabable yet**",
          "",
          `\`${prefix}update 1.3\``,
          "'All That Glitters'",
          "",
        ]),
    }).catch(console.log);
  },
});
