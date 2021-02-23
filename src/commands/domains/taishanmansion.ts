import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "taishanmansion",
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Taishan Mansion Overview")
      .setDescription([
        "**Location**",
        "Jueyun Karst, Liyue",
        "",
        "**Required Adventurer Rank**",
        "27/28/36/45",
        "",
        "**Recommended Party Level**",
        "38/54/71/88",
        "",
        "**Recommended Elements**",
        "<:Hydro:798483587157983282> <:Cryo:798483525052530719> <:Electro:798483560205385799>",
        "",
        "**Ley Line Disorder**",
        "Level 1-4:",
        "Your character will be periodically inflicted with Smoldering Flames, causing you to take Pyro DMG until the inflicted Pyro element is removed.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/d/d8/Domain_Taishan_Mansion.png/revision/latest/scale-to-width-down/310?cb=20201221031419")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Taishan Mansion Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798854249806037033/813054920177483826/XIyzU1h.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Taishan Mansion Enemies")
      .addField("Taishan Mansion I", "*Defeat 20 opponents within 360 seconds.*\n\n**Wave 1:**\n<:LargePyroSlime:812702015410274395> 3x Large Pyro Slime\n<:PyroSlime:812702015074467941> 12x Pyro Slime\n\n**Wave 2:**\n<:PyroAbyssMage:812702015024136254> 1x Pyro Abyss Mage\n<:PyroSlime:812702015074467941> 4x Pyro Slime", true)
      .addField("Taishan Mansion II", "*Defeat 12 opponents within 360 seconds.*\n\n**Wave 1:**\n<:LargePyroSlime:812702015410274395> 4x Large Pyro Slime\n<:PyroSlime:812702015074467941> 6x Pyro Slime\n\n**Wave 2:**\n<:PyroAbyssMage:812702015024136254> 1x Pyro Abyss Mage\n<:LargePyroSlime:812702015410274395> 1x Large Pyro Slime", true)
      .addBlankField()
      .addField("Taishan Mansion III", "*Defeat 8 opponents within 360 seconds.*\n\n**Wave 1:**\n<:LargePyroSlime:812702015410274395> 6x Large Pyro Slime\n\n**Wave 2:**\n<:PyroAbyssMage:812702015024136254> 2x Pyro Abyss Mage", true)
      .addField("Taishan Mansion IV", "*Defeat 4 opponents within 480 seconds.*\n\n**Wave 1:**\n<:BlazingAxeMitachurl:812972562875154482> 2x Blazing Axe Mitachurl\n\n**Wave 2:**\n<:FatuiPyroAgent:812728058141736980> 2x Fatui Pyro Agent", true)
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
    .get("domain")?.subcommands?.get("taishanmansion")
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
