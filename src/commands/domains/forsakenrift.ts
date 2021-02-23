import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "forsakenrift",
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Forsaken Rift Overview")
      .setDescription([
        "**Location**",
        "Springvale, Mondstadt",
        "",
        "**Required Adventurer Rank**",
        "27/28/36/45",
        "",
        "**Recommended Party Level**",
        "38/54/71/88",
        "",
        "**Recommended Elements**",
        "<:Pyro:798483485832249354> <:Electro:798483560205385799>",
        "",
        "**Ley Line Disorder**",
        "Level 1-2:",
        "Your character will be periodically inflicted with Condensed Ice, greatly increasing your Stamina Consumption until the inflicted Cryo element is removed.",
        "",
        "Level 3-4:",
        "Your character will be periodically inflicted with Condensed Ice, greatly increasing your Stamina Consumption until the inflicted Cryo element is removed. Icicles will periodically fall from above, dealing Cryo DMG.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/a/a1/Domain_Forsaken_Rift.png/revision/latest/scale-to-width-down/310?cb=20201221031430")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Forsaken Rift Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798854249806037033/813055058555568138/PvNr1zo.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Forsaken Rift Enemies")
      .addField("Forsaken Rift I", "*Defeat 18 opponents within 360 seconds.*\n\n**Wave 1:**\n<:CryoSlime:812702015213142068> 15x Cryo Slime\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addField("Forsaken Rift II", "*Defeat 20 opponents within 360 seconds.*\n\n**Wave 1:**\n<:HilichurlFighter:812973228766003200> 8x Hilichurl Fighter\n<:CryoSlime:812702015213142068> 8x Cryo Slime\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addBlankField()
      .addField("Forsaken Rift III", "*Defeat 8 opponents within 360 seconds.*\n\n**Wave 1:**\n<:CryoSlime:812702015213142068> 3x Cryo Slime\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n\n**Wave 2:**\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addField("Forsaken Rift IV", "*Defeat 8 opponents within 480 seconds.*\n\n**Wave 1:**\n<:LargeCryoSlime:812702014966333441> 3x Large Cryo Slime\n\n**Wave 2:**\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage\n\n**Wave 3:**\n<:CryoAbyssMage:812702015196758036> 2x Cryo Abyss Mage", true)
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
    .get("domain")?.subcommands?.get("forsakenrift")
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
