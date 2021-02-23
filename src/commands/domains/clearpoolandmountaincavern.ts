import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "clearpoolandmountaincavern",
    aliases: ["clearpool", "mountaincavern"],
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Clear Pool and Mountain Cavern Overview")
      .setDescription([
        "**Location**",
        "North of Mt. Aozang, Liyue",
        "",
        "**Required Adventurer Rank**",
        "35/40/45",
        "",
        "**Recommended Party Level**",
        "69/80/90",
        "",
        "**Recommended Elements**",
        "<:Geo:798483630740865044>",
        "",
        "**Ley Line Disorder**",
        "Level 1-3:",
        "Geo DMG dealt by all party members increased by 75%.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/b/b6/Domain_Clear_Pool_and_Mountain_Cavern.png/revision/latest/scale-to-width-down/310?cb=20201221031314")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Clear Pool and Mountain Cavern Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812985169022943232/unknown.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Clear Pool and Mountain Cavern Enemies")
      .addField("Peak of Vindagnyr I", "*Defeat 3 opponents within 300 sec.*\n\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage\n<:PyroAbyssMage:812702015024136254> 2x Pyro Abyss Mage", true)
      .addField("Peak of Vindagnyr II", "*Defeat 3 opponents within 360 sec.*\n\n<:CryoAbyssMage:812702015196758036> 2x Cryo Abyss Mage\n<:PyroAbyssMage:812702015024136254> 1x Pyro Abyss Mage", true)
      .addBlankField()
      .addField("Peak of Vindagnyr III", "*Defeat 3 opponents within 360 sec.*\n\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage\n<:PyroAbyssMage:812702015024136254> 1x Pyro Abyss Mage\n<:HydroAbyssMage:812678780900212737> 1x Hydro Abyss Mage", true)
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
    .get("domain")?.subcommands?.get("clearpoolandmountaincavern")
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
