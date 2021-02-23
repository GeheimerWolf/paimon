import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "midsummercourtyard",
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Midsummer Courtyard")
      .setDescription([
        "**Location**",
        "Starsnatch Cliff, Mondstadt",
        "",
        "**Required Adventurer Rank**",
        "22/25/30/​35/40/45",
        "",
        "**Recommended Party Level**",
        "34/47/59/​69/80/90",
        "",
        "**Recommended Elements**",
        "<:Pyro:798483485832249354>",
        "",
        "**Ley Line Disorder**",
        "Level 1:",
        "When Melt is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.",
        "",
        "Level 2:",
        "When Overloaded is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Superconduct is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 3:",
        "When Melt is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Superconduct is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 4:",
        "When Vaporize is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Electro-Charged is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 5:",
        "When Melt is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Superconduct is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
        "",
        "Level 6:",
        "When Overload is triggered, an Energy Blast will occur, dealing DMG to surrounding enemies.\nWhen Superconduct is triggered, you will be hit by a powerful blast, causing your character to take DMG.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/2/28/Domain_Midsummer_Courtyard.png/revision/latest/scale-to-width-down/310?cb=20201221031727")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Midsummer Courtyard Rewards")
      .setImage("https://cdn.discordapp.com/attachments/799226933450768405/812723465442164796/unknown.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Midsummer Courtyard Enemies")
      .addField("Midsummer Courtyard I", "*Defeat 26 opponents within 300 seconds*\n\n<:CryoSlime:812702015213142068> 3 Cryo Slime\n<:HydroSlime:812678780711731201> 7x Hydro Slime\n<:Hilichurl:812702015389564978> 14x Hilichurl\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addField("Midsummer Courtyard II", "*Defeat 12 opponents within 300 seconds*\n\n<:ElectroSlime:812678780862464000> 11x Electro Slime\n<:FatuiElectroCicinMage:812678780703211522> 1x Fatui Electro Cicin Mage", true)
      .addBlankField()
      .addField("Midsummer Courtyard III", "*Defeat 14 opponents within 360 seconds*\n\n<:CryoSlime:812702015213142068> 13 Cryo Slime\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addField("Midsummer Courtyard IV", "*Defeat 15 opponents within 360 seconds*\n\n<:HydroSlime:812678780711731201> 13x Hydro Slime\n<:HydroAbyssMage:812678780900212737> 1x Hydro Abyss Mage\n<:HydroSamachurl:812678780732571660> 1x Hydro Samachurl", true)
      .addBlankField()
      .addField("Midsummer Courtyard V", "*Defeat 5 opponents within 360 seconds*\n\n<:LargeCryoSlime:812702014966333441> 3x Large cryo Slime\n<:CryoAbyssMage:812702015196758036> 2x Cryo Abyss Mage", true)
      .addField("Midsummer Courtyard VI", "*Defeat 7 opponents within 360 seconds*\n\n**Wave 1:**\n<:LargeElectroSlime:812678780451684443> 3x large Electro Slime\n<:MutantElectroSlime:812678780975579146> 2x Mutant Electro Slime\n\n**Wave 2:**\n<:FatuiElectroCicinMage:812678780703211522> 2x Fatui Electro Cicin Mage", true)
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
    .get("domain")?.subcommands?.get("midsummercourtyard")
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
