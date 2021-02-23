import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "chaos",
  aliases: ["chaoscircuit", "chaosdevice", "chaoscircuit"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Chaos Device/Circuit/Core")
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Ruin Guards\n🔹 Dropped by Ruin Hunters\n🔹 Crafting",
        "",
        "**Chaos Device/Circuit/Core** is used for the following weapon ascensions:"
      ])
      .addField("⭐⭐⭐", "Otherworldly Story\nRecurve Bow\nTraveler's Handy Sword\nWhite Iron Greatsword", true)
      .addField("⭐⭐⭐⭐", "Favonius Greatsword\nFavonius Lance\nFavonius Warbow\nFrostbearer\nRoyal Bow\nRoyal Greatsword\nSacrificial Fragments\nSacrificial Sword", true)
      .addField("⭐⭐⭐⭐⭐", "Amos' Bow\nLost Prayer to the Sacred Winds\nSkyward Spine\nWolf's Gravestone", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Chaos_Circuit.png/revision/latest/scale-to-width-down/256?cb=20201202043130")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Chaos Device")
      .setDescription([
        "**Rarity:** ⭐⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Ruin Guards\n🔹 Dropped by Ruin Hunters",
        "",
        "**Description:**",
        "Comes from ancient defunct relic structures. A part that once held the structure together. Its aesthetically-pleasing engineering is quite exquisite."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Chaos_Circuit.png/revision/latest/scale-to-width-down/256?cb=20201202043130")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Chaos Circuit")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 60+ Ruin Guards\n🔹 Dropped by Lv. 60+ Ruin Hunters\n🔹 Crafting: 3x Chaos, 50 Mora",
      "",
      "**Description:**",
      "Comes from ancient defunct relic structures. Was once a logic circuit responsible for movement functions. Sadly, no-one is able to make sense of how it worked."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Chaos_Circuit.png/revision/latest/scale-to-width-down/256?cb=20201202043130")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Chaos Core")
    .setDescription([
      "**Rarity:** ⭐⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv.60+ Mitachurls\n🔹 Crafting: 3x Black Bronze Horn, 125 Mora",
      "",
      "**Description:**",
      "Comes from ancient defunct relic structures. The core that once drove a mechanical beast. Should you come to understand its workings and reproduce it, you could perhaps change the world."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/3/3e/Item_Chaos_Core.png/revision/latest/scale-to-width-down/256?cb=20210106072654")
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
