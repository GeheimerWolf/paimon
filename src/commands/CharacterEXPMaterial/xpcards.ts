import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "wanderersadvice",
  aliases: [
    "adventurersexperience",
    "heroswit",
  ],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Wanderer's Advice")
      .setDescription([
        "**Rarity:** ⭐⭐",
        "",
        "**Item type:** Character EXP Material",
        "",
        "**Source:**",
        "🔹 Midsummer Courtyard\n🔹 Adventure and Exploration Reward\n🔹 Ley Line Outcrops Blossom of Revelation",
        "",
        "**Description:**",
        "Character EXP material. Gives 1,000 EXP. These experiences are still beneficial even if one does not live in Teyvat.",
      ])
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/6/60/Item_Wanderer%27s_Advice.png/revision/latest/scale-to-width-down/256?cb=20201116222406",
      )
      .setFooter("Page 1/3")
      .setColor("RANDOM");

    const secondEmbed = new Embed()
      .setTitle("Adventurer's Experience")
      .setDescription([
        "**Rarity:** ⭐⭐⭐",
        "",
        "**Item type:** Character EXP Material",
        "",
        "**Source:**",
        "🔹 Adventure and Exploration Reward\n🔹 Paimon's Bargains\n🔹 Ley Line Outcrops Blossom of Revelation",
        "",
        "**Description:**",
        "Character EXP material. Gives 5,000 EXP. These experiences are very beneficial for journeys into the unknown.",
      ])
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/0/07/Item_Adventurer%27s_Experience.png/revision/latest/scale-to-width-down/256?cb=20201116222310",
      )
      .setFooter("Page 2/3")
      .setColor("RANDOM");

    const thirdEmbed = new Embed()
      .setTitle("Hero's Wit")
      .setDescription([
        "**Rarity:** ⭐⭐⭐⭐",
        "",
        "**Item type:** Character EXP Material",
        "",
        "**Source:**",
        "🔹 Random Event Reward\n🔹 Ley Line Outcrops Blossom of Revelation (AR 35+)\n🔹 Quest completion reward",
        "",
        "**Description:**",
        "Character EXP material. Gives 20,000 EXP. These experiences are extremely precious for a pilgrim traveling through Teyvat in order to be closer to Celestia.",
      ])
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/2/26/Item_Hero%27s_Wit.png/revision/latest/scale-to-width-down/256?cb=20201116222208",
      )
      .setFooter("Page 3/3")
      .setColor("RANDOM");

    createPagination(message, [firstEmbed, secondEmbed, thirdEmbed]);
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
