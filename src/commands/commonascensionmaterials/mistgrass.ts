import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "mistgrass",
  aliases: ["mistgrasspollen", "mistgrasswick"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Mist Grass") 
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Fatui Cicin Mages\n🔹 Crafting", 
        "", 
        "**Mist Grass** is used for the following weaponn ascensions:" 
      ])
      .addField("⭐⭐⭐", "Debate Club\nFillet Blade\nHalberd\nMessenger\nTwin Nephrite", true)
      .addField("⭐⭐⭐⭐", "Blackcliff Pole\nBlackcliff Slasher\nDragon's Bane\nDragonspine Spear\nEye of Perception\nPrototype Amber\nPrototype Crescent\nPrototype Rancour\nRainslasher\nRoyal Spear", true)
      .addField("⭐⭐⭐⭐⭐", "Primordial Jade Cutter\nThe Unforged", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/7/73/Item_Mist_Grass.png/revision/latest/scale-to-width-down/256?cb=20201210053537")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Mist Grass Pollen")
      .setDescription([
        "**Rarity:** ⭐⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Whopperflower",
        "",
        "**Description:**",
        "Strange spores created by Mist Grass in enclosed spaces. They are the Cicins' favorite food."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/3/32/Item_Mist_Grass_Pollen.png/revision/latest/scale-to-width-down/256?cb=20201210053615")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Mist Grass")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 40+ Fatui Cicin Mages\n🔹 Crafting: 3x Mist Grass Pollen, 50 Mora",
      "",
      "**Description:**",
      "Well-preserved Mist Grass. Some would take advantage of the Cicins' love for the Mist Grass to control them."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/7/73/Item_Mist_Grass.png/revision/latest/scale-to-width-down/256?cb=20201210053537")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Mist Grass Wick")
    .setDescription([
      "**Rarity:** ⭐⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv.60+ Fatui Cicin Mages\n🔹 Crafting: 3x Mist Grass, 125 Mora",
      "",
      "**Description:**",
      "A rare bundle of Mist Grass that gives off a faint glow. Those who carry it invite both the Cicins and misfortune."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/9/90/Item_Mist_Grass_Wick.png/revision/latest/scale-to-width-down/256?cb=20201210053456")
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
