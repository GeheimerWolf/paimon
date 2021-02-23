import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "ceciliagarden",
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Cecilia Garden Overview")
      .setDescription([
        "**Location**",
        "Wolvendom, Mondstadt",
        "",
        "**Required Adventurer Rank**",
        "16/21/30/40",
        "",
        "**Recommended Party Level**",
        "15/36/59/80",
        "",
        "**Recommended Elements**",
        "<:Cryo:798483525052530719> <:Pyro:798483485832249354> <:Electro:798483560205385799>",
        "",
        "**Ley Line Disorder**",
        "Level 1:",
        "Your character will be periodically inflicted with Slowing Water, greatly increasing your skill's CD duration (-80% Reduce CD) until the inflicted Hydro element is removed.",
        "",
        "Level 2-4:",
        "Your character will be periodically inflicted with Slowing Water, greatly increasing your skill's CD duration (-100% Reduce CD) until the inflicted Hydro element is removed.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/f/fb/Domain_Cecilia_Garden.png/revision/latest/scale-to-width-down/310?cb=20201221031347")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Cecilia Garden Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798566392965103616/812975752982953984/wAbOd3T.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Cecilia Garden Enemies")
      .addField("Cecilia Garden I", `*Defeat 20 enemies. Time between kills cannot exceed 20 seconds.*\n\n<:HydroSlime:812678780711731201> 19x Hydro Slime\n<:LargeHydroSlime:812678780903882782> 1x Large Hydro Slime`, true)
      .addField("Cecilia Garden II", "*Defeat 23 enemies. Time between kills cannot exceed 25 seconds.*\n\n<:HydroSlime:812678780711731201> 12x Hydro Slime\n<:LargeHydroSlime:812678780903882782> 3x Large Hydro Slime\n<:WoodenShieldHilichurlGuard:812678780971253820> 8x Wooden Shield Hilichurl Guard", true)
      .addBlankField()
      .addField("Cecilia Garden III", "*Defeat 22 enemies. Time between kills cannot exceed 50 seconds.*\n\n<:HydroSlime:812678780711731201> 14x Hydro Slime\n<:LargeHydroSlime:812678780903882782> 5x Large Hydro Slime\n<:HydroSamachurl:812678780732571660> 3x Hydro Samachurl\n<:HydroAbyssMage:812678780900212737> 1x Hydro Abyss Mage", true)
      .addField("Cecilia Garden IV Wave 1", "*Defeat 8 enemies. Time between kills cannot exceed 40 seconds.*\n\n**Wave 1**\n<:LargeHydroSlime:812678780903882782> 8x Large Hydro Slime\n\n**Wave 2**\n<:HydroAbyssMage:812678780900212737> 1x Hydro Abyss Mage\n", true)
      .setFooter("Page 3/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")
      .setTimestamp()

    const pages = {
      1: { page: 1, embed: first, emoji: "1️⃣" },
      2: { page: 2, embed: second, emoji: "2️⃣" },
      3: { page: 3, embed: third, emoji: "3️⃣" },
    } as Record<
      number,
      { page: number; embed: Embed; emoji: string } | undefined
    >;

    const page = pages[args.page];
    if (!page) return;

    // SEND FIRST EMBED
    const response = args.msg
      ? await (args.msg as Message).edit({ embed: page.embed }).catch(
        console.log,
      )
      : await message.reply({ embed: page.embed }).catch(console.log);
    if (!response) return;

    const emojis = ["1️⃣", "2️⃣", "3️⃣"];
    // ADD THE REACTIONS
    if (!args.msg) await response.addReactions(emojis, true).catch(console.log);

    // HANDLE PAGINATION
    const reaction = await needReaction(message.author.id, response.id, {
      filter: (userID, reaction) =>
        message.author.id === userID && page.emoji !== reaction,
    }).catch(console.log);
    if (!reaction) return;

    const selectedPage = Object.values(pages).find((page) =>
      page?.emoji === reaction
    );
    if (!selectedPage) return;


    return botCache.commands
    .get("domain")?.subcommands?.get("ceciliagarden")
      ?.execute?.(message, {
        character: args.character,
        page: selectedPage.page,
        msg: response,
      });
  },
});

interface HelpArgs {
  command?: string;
}
