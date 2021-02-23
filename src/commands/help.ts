import { parsePrefix } from "../monitors/commandHandler.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommand } from "../utils/helpers.ts";


createCommand({
  name: `help`,
  arguments: [{ name: `subcommand`, type: `subcommand`, required: false }],
  guildOnly: true,
  execute: async function (message) {

    const prefix = parsePrefix(message.guildID);

    await message.reply({
      content: `https://discord.gg/26MjArxVP3`,
      embed: new Embed()
        .setTitle(`Need help, Traveler?`)
        .setDescription([
          `To set up your profile run \`${prefix}setup\` and go to my DMs!`,
          ``,
          `To check your profile, run the command \`${prefix}profile\`!`,
          ``,
          `o access the command list, please use the command \`${prefix}commands\`!`,
          ``,
          `Need further help? Visit our Support Server!`,
        ]),
    }).catch(console.log);
  },
});
