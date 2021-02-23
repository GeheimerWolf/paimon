import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "valleyofremembrance",
    aliases: ["remembrance"],
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Valley of Remembrance")
      .setDescription([
        "**Location**",
        "Dawn Winery, Mondstadt",
        "",
        "**Required Adventurer Rank**",
        "25/30/35/40/45",
        "",
        "**Recommended Party Level**",
        "47/59/69/80/90",
        "",
        "**Recommended Elements**",
        "None",
        "",
        "**Ley Line Disorder**",
        "Level 1-5:",
        "Physical DMG dealt by all party members increased by 75%.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/e/e3/Domain_of_Guyun.png/revision/latest/scale-to-width-down/310?cb=20201221031030")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Valley of Remembrance Rewards")
      .setImage("https://static.wikia.nocookie.net/gensin-impact/images/5/53/Domain_Valley_of_Remembrance.png/revision/latest/scale-to-width-down/310?cb=20201221031212")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Valley of Remembrance Enemies")
      .addField("Midsummer Courtyard I", "*Defeat 23 opponents within 300 seconds*\n\n<:TreasureHoarder:812728057965051915> 23x Treasure Hoarder", true)
      .addField("Midsummer Courtyard II", "*Defeat 16 opponents within 300 seconds*\n\n<:TreasureHoarder:812728057965051915> 15x Treasure Hoarder\n<:FatuiPyroAgent:812728058141736980> 1x Fatui Pyro Agent", true)
      .addBlankField()
      .addField("Midsummer Courtyard III", "*Defeat 20 opponents within 20 seconds*\n\n<:TreasureHoarder:812728057965051915> 18x Treasure Hoarder\n<:FatuiPyroAgent:812728058141736980> 1x Fatui Pyro Agent\n<:FatuiElectroCicinMage:812678780703211522> 1x Fatui Electro Cicin Mage", true)
      .addField("Midsummer Courtyard IV", "*Defeat 7 opponents within 360 seconds*\n\n<:TreasureHoarder:812728057965051915> 5x Treasure Hoarder\n<:FatuiPyroAgent:812728058141736980> 1x Fatui Pyro Agent\n<:FatuiElectroCicinMage:812678780703211522> 1x Fatui Electro Cicin Mage", true)
      .addBlankField()
      .addField("Midsummer Courtyard V", "*Defeat 5 opponents within 360 seconds*\n\n<:TreasureHoarderCryoPotioneer:812728057894142004> 3x Treasure Hoarder Cryo Potioneer\n<:FatuiPyroAgent:812728058141736980> 1x Fatui Pyro Agent\n<:FatuiElectroCicinMage:812678780703211522> 1x Fatui Electro Cicin Mage", true)
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
    .get("domain")?.subcommands?.get("valleyofremembrance")
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
