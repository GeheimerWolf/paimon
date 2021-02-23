import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "peakofvindagnyr",
    aliases: ["vindagnyr"],
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Peak of Vindagnyr Overview")
      .setDescription([
        "**Location**",
        "Dragonspine's Peak",
        "",
        "**Required Adventurer Rank**",
        "30/35/40/45",
        "",
        "**Recommended Party Level**",
        "59/69/80/90",
        "",
        "**Recommended Elements**",
        "<:Pyro:798483485832249354> <:Electro:798483560205385799> <:Geo:798483630740865044> <:Anemo:798483595781341194>",
        "",
        "**Ley Line Disorder**",
        "Level 1-4:",
        "Characters in the challenge will continuously accumulate Sheer Cold, and will lose HP after Sheer Cold reaches its limit.\nThe platforms in this challenge will intermittently switch between the Subzero and Warm statuses.\nThe areas affected by the Warm status will diminish Sheer Cold. The areas affected by the Subzero status will accelerate Sheer Cold's accumulation",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/a/af/Peak_of_Vindagnyr.png/revision/latest/scale-to-width-down/310?cb=20210129032543")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Peak of Vindagnyr Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812977660333523024/unknown.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Peak of Vindagnyr Enemies")
      .addField("Peak of Vindagnyr I", "*Defeat all enemies in less than 10:00 minutes*\n\n<:CryoSlime:812702015213142068> 10x Cryo Slime\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:IceShieldwallMitachurl:812977848741658634> 2x Ice Shieldwall Mitachurl", true)
      .addField("Peak of Vindagnyr II", "*Defeat all enemies in less than 10:00 minutes*\n\n<:CryoSlime:812702015213142068> 3x Cryo Slime\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:CryoHilichurlGrenadier:812979713848246318> 3x Cryo Hilichurl Grenadier\n<:IceShieldwallMitachurl:812977848741658634> 2x Ice Shieldwall Mitachurl", true)
      .addBlankField()
      .addField("Peak of Vindagnyr III", "*Defeat all enemies in less than 10:00 minutes*\n\n<:LargeCryoSlime:812702014966333441> 2x Large Cryo Slime\n<:CryoHilichurlGrenadier:812979713848246318> 2x Cryo Hilichurl Grenadier\n<:IceShieldwallMitachurl:812977848741658634> 3x Ice Shieldwall Mitachurl\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage", true)
      .addField("Peak of Vindagnyr IV", "*Defeat all enemies in less than 10:00 minutes*\n\n<:CryoAbyssMage:812702015196758036> 1x Cryo Abyss Mage\n<:FrostarmLawachurl:812977848624611358> 1x Frostarm Lawachurl", true)
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
    .get("domain")?.subcommands?.get("peakofvindagnyr")
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
