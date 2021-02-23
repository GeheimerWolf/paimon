import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "slime",
  aliases: ["slimecondensate", "slimesecretions", "slimeconcentrate"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Slime") 
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Slimes\n🔹 Crafting", 
        "", 
        "**Slime** is used for the following weapon and character ascensions:" 
      ])
      .addField("⭐⭐⭐", "Harbinger of Dawn\nMagic Guide\nSharpshooter's Oath\nWhite Iron Greatsword", true)
      .addField("⭐⭐⭐⭐", "Favonius Lance\nMappa MareRoyal Bow\nRoyal Greatsword\nSacrificial Bow\nSnow-Tombed Starsilver\nThe Black Sword\nThe Flute\n\n<:Lisa:798578725716361267> Lisa\n<:Xiangling:798578032935436329> Xiangling", true)
      .addField("⭐⭐⭐⭐⭐", "Amos' Bow\nLost Prayer to the Sacred Winds\nSkyward Blade\nSkyward Pride\n\n<:Venti:798578059891834890> Venti\n<:Xiao:798578017197883412> Xiao\n<:Zhongli:798577390577254441> Zhongli", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Item_Slime_Secretions.png/revision/latest/scale-to-width-down/256?cb=20210109220910")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Slime Condensate")
      .setDescription([
        "**Rarity:** ⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Slimes",
        "",
        "**Description:**",
        "A thick coating found on slimes. Most commonly seen material in elemental workshops."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/1/1c/Item_Slime_Condensate.png/revision/latest/scale-to-width-down/256?cb=20210109220914")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Slime Secretions")
    .setDescription([
      "**Rarity:** ⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv.40+ Slimes\n🔹 Crafting: 3x Slime Condensate, 25 Mora",
      "",
      "**Description:**",
      "Mildly purified slime secretions. Harmful to the skin. Please avoid direct exposure."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Item_Slime_Secretions.png/revision/latest/scale-to-width-down/256?cb=20210109220910")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Slime Concentrate")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv.60+ Slimes\n🔹 Crafting: 3x Slime Secretions, 50 Mora",
      "",
      "**Description:**",
      "Concentrated slime essence. When left on its own, it will begin to move on its own."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/d/d8/Item_Slime_Concentrate.png/revision/latest/scale-to-width-down/256?cb=20210109220909")
    .setFooter("Page 4/4")
    .setTimestamp()
    .setColor("RANDOM");

    createPagination(message, [
      firstEmbed,
      secondEmbed,
      thirdEmbed,
      fourthEmbed,
    ]);
  },
});

export async function createPagination(
  message: Message,
  embeds: Embed[],
  page = 1,
): Promise<void> {
  if (embeds.length === 0) {
    return;
  }

  const { channelID, author } = message;

  let currentPage: number = page - 1;

  let embedMessage = await sendEmbed(channelID, embeds[currentPage]);

  if (!embedMessage) {
    return;
  }

  if (embeds.length <= 1) {
    return;
  }

  try {
    addReactions(
      embedMessage.channelID,
      embedMessage.id,
      ["⏮️", "◀️", "▶️", "⏭️"],
      true,
    );
  } catch (e) {
    console.error(e);
    return;
  }

  while (true) {
    if (!embedMessage) {
      return;
    }
    const reaction = await needReaction(author.id, embedMessage.id);

    if (!reaction) {
      return;
    }

    if (
      !(removeUserReaction(
        message.channelID,
        embedMessage.id,
        reaction,
        message.author.id,
      ).catch(console.error))
    ) {
      return;
    }

    if (reaction === "◀️") {
      currentPage--;
    } else if (reaction === "▶️") {
      currentPage++;
    } else if (reaction === "⏮️") {
      currentPage = 0;
    } else if (reaction === "⏭️") {
      currentPage = embeds.length - 1;
    } else {
      continue;
    }

    if (currentPage < 0) {
      currentPage = 0;
    }

    if (currentPage > embeds.length - 1) {
      currentPage = embeds.length - 1;
    }

    if (!embedMessage) {
      return;
    }

    if (
      !(await editEmbed(embedMessage, embeds[currentPage]).catch(console.error))
    ) {
      return;
    }
  }
}
