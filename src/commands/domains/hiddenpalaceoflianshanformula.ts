import { botCache, Message, removeUserReaction  } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand } from "../../utils/helpers.ts";

createSubcommand("domain", {
    name: "hiddenpalaceoflianshanformula",
    aliases: ["lianshanformula"],
    arguments: [
        { name: "page", type: "number", defaultValue: 1 },
      ],
    guildOnly: true,
  execute: async function (message, args) {
    const first = new Embed()
      .setTitle("Hidden Palace of Lianshan Formula Overview")
      .setDescription([
        "**Location**",
        "Mingyun Village, Liyue",
        "",
        "**Required Adventurer Rank**",
        "16/21/30/40",
        "",
        "**Recommended Party Level**",
        "15/36/59/80",
        "",
        "**Recommended Elements**",
        "<:Cryo:798483525052530719> <:Pyro:798483485832249354>",
        "",
        "**Ley Line Disorder**",
        "Level 1-2:",
        "Your character will be periodically inflicted with Engulfing Storm, continuously draining your Energy until the inflicted Electro element is removed.",
        "",
        "Level 3:",
        "Your character will be periodically inflicted with Engulfing Storm, continuously draining your Energy until the inflicted Electro element is removed.",
        "",
        "Level 4:",
        "Lightning bolts will periodically fall from above, dealing Electro DMG and completely draining the hit character's Energy. Lightning bolts may leave balls of lightning.",
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Domain_Hidden_Palace_of_Lianshan_Formula.png/revision/latest/scale-to-width-down/310?cb=20201221031402")
      .setTimestamp()
      .setFooter("Page 1/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const second = new Embed()
      .setTitle("Hidden Palace of Lianshan Formula Rewards")
      .setImage("https://cdn.discordapp.com/attachments/798854249806037033/812657620694859816/EzIhOO7.png")
      .setTimestamp()
      .setFooter("Page 2/3 - 1️⃣ Overview, 2️⃣ Rewards, 3️⃣ Enemies")

    const third = new Embed()
      .setTitle("Hidden Palace of Lianshan Formula Enemies")
      .addField("Hidden Palace of Lianshan Formula I", "*Defeat 20 opponents within 360 seconds.*\n\n**Wave 1**\n<:ElectroSlime:812678780862464000> 15x Electro Slime\n\n**Wave 2**\n<:ElectroSlime:812678780862464000> 3x Electro Slime\n<:LargeElectroSlime:812678780451684443> 1x Large Electro Slime\n<:MutantElectroSlime:812678780975579146> 1x Mutant Electro Slime", true)
      .addField("Hidden Palace of Lianshan Formula II", "*Defeat 16 opponents within 360 seconds.*\n\n**Wave 1**\n<:ElectroSlime:812678780862464000> 7x Electro Slime\n<:LargeElectroSlime:812678780451684443> 3x Large Electro Slime\n<:MutantElectroSlime:812678780975579146> 3x Mutant Electro Slime\n\n**Wave 2**\n<:LargeElectroSlime:812678780451684443> 2x Large Electro Slime\n<:MutantElectroSlime:812678780975579146> 1x Mutant Electro Slime", true)
      .addBlankField()
      .addField("Hidden Palace of Lianshan Formula III", "*Defeat 10 opponents within 360 seconds.*\n\n**Wave 1**\n<:LargeElectroSlime:812678780451684443> 6x Large Electro Slime\n<:MutantElectroSlime:812678780975579146> 3x Mutant Electro Slime\n\n**Wave 2**\n<:FatuiElectroCicinMage:812678780703211522> 1x Faui Electro Cicin Mage\n", true)
      .addField("Hidden Palace of Lianshan Formula IV", "*Defeat 8 opponents within 480 seconds.*\n\n<:LargeElectroSlime:812678780451684443> 4x Large Electro Slime\n<:MutantElectroSlime:812678780975579146> 2x Mutant Electro Slime\n<:FatuiElectroCicinMage:812678780703211522> 2x Faui Electro Cicin Mage\n", true)
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
    .get("domain")?.subcommands?.get("hiddenpalaceoflianshanformula")
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
