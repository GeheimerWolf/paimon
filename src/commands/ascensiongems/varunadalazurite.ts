import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "varunadalazurite",
  aliases: ["vl", "varunada"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Varunada Lazurite")
      .setDescription([
        "**Varunada Lazurite** are gemstones of varying quality used in the ascension of characters.\n\n**Varunada Lazurite** is associated with the Hydro element.\n\nCan be obtained from Oceanid, Souvenir Shop and Alchemy.\n\n**Element:** <:Hydro:798483587157983282> Hydro",
      ])
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Item_Varunada_Lazurite_Gemstone.png",
      )
      .setFooter("Page 1/5")
      .setColor("RANDOM");

    const secondEmbed = new Embed()
      .setTitle("Varunada Lazurite Sliver")
      .setDescription([
        "**Rarity:** ⭐⭐",
        "",
        "**Element:** <:Hydro:798483587157983282> Hydro",
        "",
        "**Item type:** Character Ascension Material",
        "",
        "**Source:**\n🔹 Dropped by Oceanid\n🔹 Purchased from the Souvenir Shop\n🔹 **Crafting:** 1x Agnidus Agate Sliver, 1x Dust of Azoth",
        "",
        "Varunada Lazurite Sliver is used for the following character ascensions:\n\n<:Barbara:798579079221215272> Barbara\n:Childe:798579167843057665> Childe\n<:Mona:798582495674105876> Mona\n<:Xingqiu:798577525265399838> Xingqiu",
      ])
      .setImage(
        "https://static.wikia.nocookie.net/gensin-impact/images/f/f8/Item_Varunada_Lazurite_Sliver.png",
      )
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/f/f8/Item_Varunada_Lazurite_Sliver.png",
      )
      .setFooter("Page 2/5")
      .setColor("RANDOM");

    const thirdEmbed = new Embed()
      .setTitle("Varunada Lazurite Fragment")
      .setDescription([
        "**Rarity:** ⭐⭐⭐",
        "",
        "**Element:** <:Hydro:798483587157983282> Hydro",
        "",
        "**Description:**\nMy ideals have no stains.",
        "",
        "**Item type:** Character Ascension Material",
        "",
        "**Source:**\n🔹 Dropped by Lv.40+ Oceanid\n🔹 **Crafting:** 3x Varunada Lazurite Sliver, 300 Mora\n🔹 **Crafting:** 1x Agnidus Agate Fragment, 3x Dust of Azoth",
        "",
        "Varunada Lazurite Fragment is used for the following character ascensions:\n\n<:Barbara:798579079221215272> Barbara\n:Childe:798579167843057665> Childe\n<:Mona:798582495674105876> Mona\n<:Xingqiu:798577525265399838> Xingqiu",
      ])
      .setImage(
        "https://static.wikia.nocookie.net/gensin-impact/images/f/f6/Item_Varunada_Lazurite_Fragment.png",
      )
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/f/f6/Item_Varunada_Lazurite_Fragment.png",
      )
      .setFooter("Page 3/5")
      .setColor("RANDOM");

    const fourthEmbed = new Embed()
      .setTitle("Varunada Lazurite Chunk")
      .setDescription([
        "**Rarity:** ⭐⭐⭐⭐",
        "",
        "**Element:** <:Hydro:798483587157983282> Hydro",
        "",
        "**Description:**\nMy ideals have no stains.\nI must correct you. People here bear no sins in the eyes of the gods...",
        "",
        "**Item type:** Character Ascension Material",
        "",
        "**Source:**\n🔹 Dropped by Lv.60+ Oceanid\n🔹 **Crafting:** 3x Varunada Lazurite Fragment, 900 Mora\n🔹 **Crafting:** 1x Agnidus Agate Chunk, 9x Dust of Azoth",
        "",
        "Varunada Lazurite Chunk is used for the following character ascensions:\n\n<:Barbara:798579079221215272> Barbara\n:Childe:798579167843057665> Childe\n<:Mona:798582495674105876> Mona\n<:Xingqiu:798577525265399838> Xingqiu",
      ])
      .setImage(
        "https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Item_Varunada_Lazurite_Chunk.png",
      )
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Item_Varunada_Lazurite_Chunk.png",
      )
      .setFooter("Page 4/5")
      .setColor("RANDOM");

    const fifthEmbed = new Embed()
      .setTitle("Varunada Lazurite Gemstone")
      .setDescription([
        "**Rarity:** ⭐⭐⭐⭐⭐",
        "",
        "**Element:** <:Hydro:798483587157983282> Hydro",
        "",
        "**Description:**\nMy ideals have no stains.\nI must correct you. People here bear no sins in the eyes of the gods...\nOnly laws and the Tribunal can judge someone.\nThey can judge even me. So praise my magnificence and purity.",
        "",
        "**Item type:** Character Ascension Material",
        "",
        "**Source:**\n🔹 Dropped by Lv.75+ Oceanid\n🔹 **Crafting:** 3x Varunada Lazurite Chunk, 2.700 Mora\n🔹 **Crafting:** 1x Agnidus Agate Gemstone, 27x Dust of Azoth",
        "",
        "Varunada Lazurite Gemstone is used for the following character ascensions:\n\n<:Barbara:798579079221215272> Barbara\n:Childe:798579167843057665> Childe\n<:Mona:798582495674105876> Mona\n<:Xingqiu:798577525265399838> Xingqiu",
      ])
      .setImage(
        "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Item_Varunada_Lazurite_Gemstone.png",
      )
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Item_Varunada_Lazurite_Gemstone.png",
      )
      .setFooter("Page 5/5")
      .setColor("RANDOM");

    createPagination(message, [
      firstEmbed,
      secondEmbed,
      thirdEmbed,
      fourthEmbed,
      fifthEmbed,
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
