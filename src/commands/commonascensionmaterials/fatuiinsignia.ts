import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "fatuiinsignia",
  aliases: ["recruitsinsignia", "sergeantsinsignia", "lieutenantsinsignia"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Recruit's-, Sergeant's- and Lieutenant's Insignia")
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Skirmishers\n🔹 Dropped by some Agents\n🔹 Dropped by some Electro Cicin Mages\n🔹 Crafting",
        "",
        "**Recruit's-, Sergeant's- and Lieutenant's Insignia** are used for the following weapon and character ascensions:"
      ])
      .addField("⭐⭐⭐", "Skyrider Sword\nTwin Nephrite\nWhite Tassel", true)
      .addField("⭐⭐⭐⭐", "Blackcliff Pole\nBlackcliff Slasher\nCompound Bow\nDragonspine Spear\nFavonius Greatsword\nFestering Desire\nPrototype Rancour\nRoyal Spear\n\n<:Ningguang:798571977120022578> Ningguang", true)
      .addField("⭐⭐⭐⭐⭐", "Primordial Jade Winged-Spear\n\n<:Diluc:798579247945613332> Diluc\n<:Childe:798579167843057665> Tartaglia", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/a/a5/Item_Sergeant%27s_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220720")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Recruit's Insignia")
      .setDescription([
        "**Rarity:** ⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Skirmishers\n🔹 Dropped by some Agents\n🔹 Dropped by some Electro Cicin Mages",
        "",
        "**Description:**",
        "An insignia to identify the recruits. Makes one wonder about what the ones joining the Fatui's war machine were thinking."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/b/b2/Item_Recruit%27s_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220719")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Agent's Sacrificial Knife")
    .setDescription([
      "**Rarity:** ⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 40+ Skirmishers\n🔹 Dropped by some Lv. 40+ Agents\n🔹 Dropped by some Lv. 40+ Electro Cicin Mages\n🔹 Crafting: 3x Recruit's Insignia, 25 Mora",
      "",
      "**Description:**",
      "An insignia with a different shape to tell the sergeants from new recruits. Perhaps there are complicated emotions behind it."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/a/a5/Item_Sergeant%27s_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220720")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Lieutenant's Insignia")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 60+ Skirmishers\n🔹 Dropped by some Lv. 60+ Agents\n🔹 Dropped by some Lv. 60+ Electro Cicin Mages\n🔹 Crafting: 3x Sergeant's Insignia, 50 Mora",
      "",
      "**Description:**",
      "An armband to identify officers. The Fatui possess a colossal army, so there must be something extraordinary about the ones who achieved this rank within the group."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/d/db/Item_Lieutenant%27s_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220723")
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
