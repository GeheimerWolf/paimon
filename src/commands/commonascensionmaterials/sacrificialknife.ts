import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "sacrificialknife",
  aliases: ["hunterssacrificialknife", "agentssacrificialknife", "Inspectorssacrificialknife"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Sacrificial Knife")
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Agents\n🔹 Crafting",
        "",
        "**Sacrificial Knife** is used for the following weapon ascensions:"
      ])
      .addField("⭐⭐⭐", "Dark Iron Sword\nEmerald Orb\nSlingshot\nWhite Tassel", true)
      .addField("⭐⭐⭐⭐", "Blackcliff Agate\nBlackcliff Longsword\nBlackcliff Warbow\nCrescent Pike\nLion's Roar\nRust\nSolar Pearl", true)
      .addField("⭐⭐⭐⭐⭐", "Primordial Jade Winged-Spear\nSummit Shaper", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/2/28/Item_Hunter%27s_Sacrificial_Knife.png/revision/latest/scale-to-width-down/256?cb=20210109223410")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Hunter's Sacrificial Knife")
      .setDescription([
        "**Rarity:** ⭐⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Agents",
        "",
        "**Description:**",
        "A sharp alloy weapon. Though its owner has been lost, it still reflects a disturbingly cold light."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/2/28/Item_Hunter%27s_Sacrificial_Knife.png/revision/latest/scale-to-width-down/256?cb=20210109223410")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Agent's Sacrificial Knife")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv.40+ Agents\n🔹 Crafting: 3x Hunter's Sacrificial Knife, 50 Mora",
      "",
      "**Description:**",
      "An oddly-shaped weapon made with superior Snezhnayan technology that once belonged to a senior agent. Proper training is required for using this strange weapon."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/5/55/Item_Agent%27s_Sacrificial_Knife.png/revision/latest/scale-to-width-down/256?cb=20210109220745")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Inspector's Sacrificial Knife")
    .setDescription([
      "**Rarity:** ⭐⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 60+ Agents\n🔹 Crafting: 3x Agent's Sacrificial Knife, 125 Mora",
      "",
      "**Description:**",
      "In the hands of its lord, this fierce weapon has handled many 'debts'. No-one has eyes in the back of their heads, and this weapon and its related techniques are designed around that weakness."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/9/98/Item_Boreal_Wolf%27s_Broken_Fang.png/revision/latest/scale-to-width-down/256?cb=20210109220033")
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
