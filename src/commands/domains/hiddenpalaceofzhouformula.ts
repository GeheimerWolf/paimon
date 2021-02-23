import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "hiddenpalaceofzhouformula",
    aliases: ["zhouformula"],
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Hidden Palace of Zhou Formula Overview")
      .setDescription([
        "**Location**",
        "Wuwang Hill, Liyue",
        "",
        "**Required Adventurer Rank**",
        "30/35/40/45",
        "",
        "**Recommended Party Level**",
        "59/69/80/90",
        "",
        "**Recommended Elements**",
        "<:Cryo:798483525052530719>",
        "",
        "**Ley Line Disorder**",
        "Level 1:",
        "The duration of the Frozen status effect is greatly increased.\nWhen Superconduct is triggered, an Energy Blast will occur dealing DMG to surrounding enemies.",
        "",
        "Level 2:",
        "When Melt is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Overloaded is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 3:",
        "When Superconduct is triggered, an Energy Blast will occur dealing DMG to surrounding enemies.\nWhen Overloaded is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 4:",
        "When Melt is triggered, an Energy Blast will occur dealing DMG to surrounding enemies.\nWhen Overloaded is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/3/3c/Domain_Hidden_Palace_of_Zhou_Formula.png/revision/latest/scale-to-width-down/310?cb=20201221031231")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Hidden Palace of Zhou Formula Rewards")
      .setImage("https://cdn.discordapp.com/attachments/799226933450768405/812971168872398888/unknown.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Hidden Palace of Zhou Formula Enemies")
      .addField("Hidden Palace of Zhou Formula I", "*Defeat 20 enemies while protecting Domain Monolith*\n\n<:LargeElectroSlime:812678780451684443> 6x Large Electro Slime\n<:HydroSlime:812678780711731201> 8x Hydro Slime\n<:LargeHydroSlime:812678780903882782> 6x Large hydro Slime", true)
      .addField("Hidden Palace of Zhou Formula II", "*Defeat 8 enemies within 6:00 minutes*\n\n<:LargePyroSlime:812702015410274395> 4x Large Pyro Slime\n<:BlazingAxeMitachurl:812972562875154482> 2x Blazing Axe Mitachurl\n<:PyroAbyssMage:812702015024136254> 2x Pyro Abyss Mage", true)
      .addBlankField()
      .addField("Hidden Palace of Zhou Formula III", "*Defeat 16 enemies within 360 seconds*\n\n**Wave 1**\n<:LargeElectroSlime:812678780451684443> 3x Large Electro Slime\n<:HilichurlFighter:812973228766003200> 2x Hilichurl Fighter\n\n**Wave 2**\n<:LargeElectroSlime:812678780451684443> 3x Large Electro Slime\n<:HilichurlFighter:812973228766003200> 2x Hilichurl Fighter\n\n**Wave 3**\n<:LargeElectroSlime:812678780451684443> 5x Large Electro Slime\n\n**Wave 4**\n<:FatuiElectroCicinMage:812678780703211522> 1x Fatui Electro Cicin Mage", true)
      .addField("Hidden Palace of Zhou Formula IV", "*Defeat 6 opponents within 60 seconds (time is added after each kill)*\n\n<:PyroSlime:812702015074467941> 2x Pyro Slime\n<:BlazingAxeMitachurl:812972562875154482> 2x Blazing Axe Mitachurl\n<:PyroAbyssMage:812702015024136254> 2x Pyro Abyss Mage", true)
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
    .get("domain")?.subcommands?.get("hiddenpalaceofzhouformula")
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
