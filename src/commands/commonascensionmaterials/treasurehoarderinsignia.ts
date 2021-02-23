import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "treasurehoarderinsignia",
  aliases: ["silverraveninsignia", "goldenraveninsignia", "raveninsignia"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Treasure Hoarder-, Silver Raven- and Golden Raven Insignia")
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Treasure Hoarders\n🔹 Crafting",
        "",
        "**Treasure Hoarder-, Silver Raven- and Golden Raven Insignia** are used for the following weapon and character ascensions:"
      ])
      .addField("⭐⭐⭐", "Emerald Orb\nFillet Blade\nMessenger\nSkyrider Greatsword", true)
      .addField("⭐⭐⭐⭐", "Alley Hunter\nCrescent Pike\nLion's Roar\nPrototype Crescent\nSacrificial Fragments\nSword of Descension\nWhiteblind\n\n<:Beidou:798579120479928360> Beidou\n<:Bennett:798579139430973500> Bennett\n<:Kaeya:798578983775240242> Kaeya\n<:Xinyan:798577406427529246> Xinyan", true)
      .addField("⭐⭐⭐⭐⭐", "Primordial Jade Cutter\nThe Unforged\nVortex Vanquisher", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/7/71/Item_Golden_Raven_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220636")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Treasure Hoarder Insignia")
      .setDescription([
        "**Rarity:** ⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Treasure Hoarders",
        "",
        "**Description:**",
        "A signet that proudly represents it's owner's position as a member of the Treasure Hoarders. The pursuit of treasure knows no bounds. That said... is being a thief something to be proud of?"
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/c/c9/Item_Treasure_Hoarder_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220643")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Silver Raven Insignia")
    .setDescription([
      "**Rarity:** ⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 40+ Treasure Hoarders\n🔹 Crafting: 3x Treasure Hoarder Insignia, 25 Mora",
      "",
      "**Description:**",
      "A raven insignia used by members of the Treasure Hoarders to identify each other. The Treasure Hoarders ask for no resume. Anyone who has an insatiable desire for treasure and is backed up by an equal amount of courage can become a worthy member."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/4/44/Item_Silver_Raven_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220650")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Golden Raven Insignia")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 60+ Treasure Hoarders\n🔹 Crafting: 3x Silver Raven Insignia, 50 Mora",
      "",
      "**Description:**",
      "A raven insignia that symbolizes the pride and the guiding principle of the Treasure Hoarders. Whether it's hidden amidst the vastness of the land or in the depths of the seas, as long as there are treasures to be hunted down, the spirit of Treasure Hoarders, who will stop at nothing to acquire them, will never die."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/7/71/Item_Golden_Raven_Insignia.png/revision/latest/scale-to-width-down/256?cb=20210109220636")
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
