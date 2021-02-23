import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "mask",
  aliases: ["damagedmask", "stainedmask", "omniousmask"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Mask")
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Hilichurls\n🔹 Dropped by some ranged Hilichurls\n🔹 Dropped by some Samachurls\n🔹 Dropped by some Mitachurls\n🔹 Crafting",
        "",
        "**Ominous Mask** is used for the following weapon and character ascensions:"
      ])
      .addField("⭐⭐⭐", "Dark Iron Sword\nDebate Club\nOtherworldly Story\nSlingshot", true)
      .addField("⭐⭐⭐⭐", "Eye of Perception\nPrototype Archaic\bPrototype Starglitter\nRust\nThe Widsith\n\nChongyun\nNoelle\nRazor\nXingqiu", true)
      .addField("⭐⭐⭐⭐⭐", "Memory of Dust\nSummit Shaper\n\nJean\nTraveler", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/6/69/Item_Damaged_Mask.png/revision/latest/scale-to-width-down/256?cb=20210109220851")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Damaged Mask")
      .setDescription([
        "**Rarity:** ⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Hilichurls\n🔹 Dropped by some ranged Hilichurls\n🔹 Dropped by some Samachurls\n🔹 Dropped by some Mitachurls",
        "",
        "**Description:**",
        "A broken bone mask that once belonged to some hilichurl.\nNow more broken than complete, it can no longer perform its primary function."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/6/69/Item_Damaged_Mask.png/revision/latest/scale-to-width-down/256?cb=20210109220851")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Stained Mask")
    .setDescription([
      "**Rarity:** ⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 40+ Hilichurls\n🔹 Dropped by some Lv. 40+ ranged Hilichurls\n🔹 Dropped by some Lv. 40+ Samachurls\n🔹 Dropped by some Lv. 40+ Mitachurls\n🔹 Crafting: 3x Damaged Mask, 25 Mora",
      "",
      "**Description:**",
      "A bone mask covered in unidentifiable stains and a mysterious odor.\nYet such is the devotion of hilichurls to masks that they will wear it nonetheless."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Item_Stained_Mask.png/revision/latest/scale-to-width-down/256?cb=20210109220849")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Ominous Mask")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 60+ Hilichurls\n🔹 Dropped by some Lv. 60+ ranged Hilichurls\n🔹 Dropped by some Lv. 60+ Samachurls\n🔹 Dropped by some Lv. 60+ Mitachurls\n🔹 Crafting: 3x Stained Mask, 50 Mora",
      "",
      "**Description:**",
      "A glossy bone mask with oil markings painted on it, meant to intimidate enemies.\nNo-one really knows why hilichurls are so fascinated with masks. Some say it's because they don't want to see their own reflections in the water."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/9/91/Item_Ominous_Mask.png/revision/latest/scale-to-width-down/256?cb=20210110031519")
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
