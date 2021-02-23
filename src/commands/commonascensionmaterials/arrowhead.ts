import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "arrowhead",
  aliases: ["firmarrowhead", "sharparrowhead", "weatheredarrowhead"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Arrow Head") 
      .setDescription([
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Hilichurl Shooter\n🔹 Crafting", 
        "", 
        "**Arrow Head** is used for the following weapon and character ascensions:" 
      ])
      .addField("⭐⭐⭐", "Black Tassel\nBloodtainted Greatsword\nCool Steel\nRaven Bow", true)
      .addField("⭐⭐⭐⭐", "Blackcliff Longsword\nFavonius Sword\nPrototype Amber\nRoyal Longsword\nSacrificial Greatsword\nThe Stringless\nThe Viridescent Hunt\n\n<:Amber:798579318262988810> Amber\n<:Diona:798582510480785409> Diona\n<:Fischl:798579031381114890> Fischl", true)
      .addField("⭐⭐⭐⭐⭐", "Aquila Favonia\nSkyward Atlas\nSkyward Harp\n\n<:Traveler:798976293613600829> Traveler", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/0/0d/Item_Sharp_Arrowhead.png/revision/latest/scale-to-width-down/256?cb=20201210053042")
      .setFooter("Page 1/4")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Firm Arrowhead")
      .setDescription([
        "**Rarity:** ⭐",
        "",
        "**Item type:** Common Ascension Material",
        "",
        "**Source:**",
        "🔹 Dropped by Hilichurl Shooter",
        "",
        "**Description:**",
        "A roughly produced arrowhead. Though unimpressive, neither it nor the bow should be underestimated, for even the bravest knight can be felled by an arrow from the rear."
      ])
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/0/01/Item_Firm_Arrowhead.png/revision/latest/scale-to-width-down/256?cb=20201210052906")
      .setFooter("Page 2/4")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Sharp Arrowhead")
    .setDescription([
      "**Rarity:** ⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 40+ Hilichurl Shooter\n🔹 Crafting: 3x Firm Arrowhead, 25 Mora",
      "",
      "**Description:**",
      "A well-made arrowhead. Sharp enough to penetrate armor with the ease of a rock through the surface of water."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/0/0d/Item_Sharp_Arrowhead.png/revision/latest/scale-to-width-down/256?cb=20201210053042")
    .setFooter("Page 3/4")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Weathered Arrowhead")
    .setDescription([
      "**Rarity:** ⭐⭐⭐",
      "",
      "**Item type:** Common Ascension Material",
      "",
      "**Source:**",
      "🔹 Dropped by Lv. 60+ Hilichurl Shooter\n🔹 Crafting: 3x Sharp Arrowhead, 50 Mora",
      "",
      "**Description:**",
      "An old arrowhead coated in blood. The arrowhead has long since lost its sharpness and thus its use as a weapon.\nHowever it represents the pride of a hunter and acts as both an amulet and a medal."
    ])
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Weathered_Arrowhead.png/revision/latest/scale-to-width-down/256?cb=20201210053107")
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
