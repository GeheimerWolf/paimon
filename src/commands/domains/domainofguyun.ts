import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "domainofguyun",
    aliases: ["guyun"],
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Domain of Guyun")
      .setDescription([
        "**Location**",
        "Guyun Stone Forest, Liyue",
        "",
        "**Required Adventurer Rank**",
        "22/25/30/​35/40/45",
        "",
        "**Recommended Party Level**",
        "34/47/59/​69/80/90",
        "",
        "**Recommended Elements**",
        "<:Electro:798483560205385799>",
        "",
        "**Ley Line Disorder**",
        "Level 1:",
        "Electro-Charged DMG increased by 150%, and its AoE is increased by 100%.",
        "",
        "Level 2:",
        "When Overload is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.",
        "",
        "Level 3:",
        "When Superconduct is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.",
        "",
        "Level 4:",
        "Electro-Charged DMG increased by 150% and its AoE is increased by 100%.",
        "",
        "Level 5:",
        "When Overload is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Melt is triggered, you will be hit by a powerful blast, causing your character to take DMG.\nWhen Vaporize is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 6:",
        "When Superconduct is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Melt is triggered, you will be hit by a powerful blast, causing your character to take DMG.\nWhen Vaporize is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/e/e3/Domain_of_Guyun.png/revision/latest/scale-to-width-down/310?cb=20201221031030")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Domain of Guyun Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812706132366852146/gg9tVLe.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Domain of Guyun Enemies")
      .addField("Domain of Guyun I", "*Defeat 28 enemies while protecting Domain Monolith*\n\n<:HydroSlime:812678780711731201> 21x Hydro Slime\n<:LargeHydroSlime:812678780903882782> 6x Large Hydro slime\n<:HydroAbyssMage:812678780900212737> 1x Hydro Abyss Mage", true)
      .addField("Domain of Guyun II", "*Defeat 22 enemies while protecting Domain Monolith*\n\n<:PyroSlime:812702015074467941> 16x Pyro Slime\n<:LargePyroSlime:812702015410274395> 5x Large Pyro slime\n<:PyroAbyssMage:812702015024136254> 1x Pyro Abyss Mage", true)
      .addBlankField()
      .addField("Domain of Guyun III", "*Defeat 20 enemies while protecting Domain Monolith*\n\n<:CryoSlime:812702015213142068> 15x Cryo Slime\n<:LargeCryoSlime:812702014966333441> 4x Large Cryo Slime\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addField("Domain of Guyun IV", "*Defeat 20 enemies while protecting Domain Monolith*\n\n<:HydroSlime:812678780711731201> 5x Hydro Slime\n<:LargeHydroSlime:812678780903882782> 6x Large Hydro slime\n<:Hilichurl:812702015389564978> 6x Hilichurl\n<:HydroSamachurl:812678780732571660> 2x Hydro Samachurl\n<:HydroAbyssMage:812678780900212737> 1x Hydro Abyss Mage", true)
      .addBlankField()
      .addField("Domain of Guyun V", "*Defeat all enemies in less than 5:00 minutes*\n\n**Wave 1:**\n<:PyroAbyssMage:812702015024136254> 1x Pyro Abyss Mage\n\n**Wave 2:**\n<:RuinGuard:812702015125061684> 2x Ruin Guard", true)
      .addField("Domain of Guyun VI", "*Defeat all enemies in less than 7:00 minutes*\n\n**Wave 1:**\n<:RuinHunter:812702015024398337> 1x Ruin Hunter\n<:Hilichurl:812702015389564978> 2x Hilichurl\n\n**Wave 2:**\n<:CryoAbyssMage:812702015196758036> 2x Cryo Abyss Mage", true)
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
    .get("domain")?.subcommands?.get("domainofguyun")
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
