import { parsePrefix } from "../../monitors/commandHandler.ts";
import { Embed } from "../../utils/Embed.ts";
import {
  createCommand,
} from "../../utils/helpers.ts";

createCommand({
  name: `teyvattimes`,
  aliases: ["tt"],
  arguments: [{ name: "subcommand", type: "subcommand", required: false }],
  guildOnly: true,
  execute: async function (message) {
    const prefix = parsePrefix(message.guildID);
    await message.reply({
        embed: new Embed()
          .setTitle("Need help, Traveler?")
          .setDescription([
            "You forgot to provide which one you wanna read.",
            "",
            `If you need help, try \`${prefix}help teyvattimes\` or \`${prefix}help tt\``,
          ])
          .setTimestamp()
      }).catch(console.log);
    },
  });
