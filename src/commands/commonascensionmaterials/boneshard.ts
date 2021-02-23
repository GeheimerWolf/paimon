import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "boneshard",
  aliases: ["fragileboneshard", "sturdyboneshard", "fossilizedboneshard"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Bone Shard") 
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Geovishaps\n🔹 Crafting", 
        "", 
        "**Bone Shard** is used for the following weapon ascensions:" 
      ])
      .addField("⭐⭐⭐", "Black Tassel\nSkyrider Greatsword\nSkyrider Sword", true)
      .addField("⭐⭐⭐⭐", "Compound Bow\nIron Sting\nMappa Mare\nPrototype Archaic\nPrototype Starglitter\nSerpent Spine", true)
      .addField("⭐⭐⭐⭐⭐", "Memory of Dust\nVortex Vanquisher", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/f/ff/Item_Sturdy_Bone_Shard.png/revision/latest/scale-to-width-down/256?cb=20210109215136")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Fragile Bone Shard")
      .setDescription([
        "**Rarity:** ⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Geovishaps",
        "",
        "**Description:**",
        "A bone shard once carried by a Geovishap Hatchling. Although they are quite fragile, they seem to still harbor some indescribable power."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/e/e5/Item_Fragile_Bone_Shard.png/revision/latest/scale-to-width-down/256?cb=20210109215139")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Sturdy Bone Shard")
    .setDescription([
      "**Rarity:** ⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Geovishaps\n🔹 Crafting: 3x Fragile Bone Shard, 25 Mora",
      "",
      "**Description:**",
      "A fragment of an unknown creature's bones that appear to be prized by Geovishap Hatchlings for some reason.\nThe fragment appears to be quite aged. Despite being dragon-like beasts with no spoken language, they still seem to have some sort of special affection for these bone shards."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/f/ff/Item_Sturdy_Bone_Shard.png/revision/latest/scale-to-width-down/256?cb=20210109215136")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Fossilized Bone Shard")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Geovishaps\n🔹 Crafting: 3x Sturdy Bone Shard, 50 Mora",
      "",
      "**Description:**",
      "A fossilized bone fragment sometimes found after defeating Geovishap Hatchlings.\nGeovishap Hatchlings all dream of growing into great dragons one day. They see these fossils as dragon bones and greatly cherish them, perhaps because they too hope to attain the dragons' longevity and power."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/6/60/Item_Fossilized_Bone_Shard.png/revision/latest/scale-to-width-down/256?cb=20210109215145")
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
