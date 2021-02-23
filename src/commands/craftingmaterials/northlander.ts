import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "northlander",
  aliases: ["northlanderbowbillet", "northlandercatalystbillet", "northlanderclaymorebillet", "northlanderpolearmbillet", "northlanderswordbillet", "northlanderbow", "northlandercatalyst", "northlanderclaymore", "northlanderpolearm", "northlandersword"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Northlander Bow Billet") 
      .setDescription([
        "**Item type:** Forging Material",
        "",
        "**Source:**",
        "🔹 Dropped by Weekly Bosses\n🔹 Purchased from the Souvenir Shop", 
        "",
        "**Description:**",
        "Weapon forging material. Can be used to forge 4-star bows. Philosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater."
      ])
      .addField("Used for forging:", "🔹 Compound Bow\n🔹 Prototype Crescent", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/0/0f/Item_Northlander_Bow_Billet.png/revision/latest/scale-to-width-down/256?cb=20201117072909")
      .setFooter("Page 1/5")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
    .setTitle("Northlander Catalyst Billet")
    .setDescription([
        "**Item type:** Forging Material",
        "",
        "**Source:**",
        "🔹 Dropped by Weekly Bosses\n🔹 Purchased from the Souvenir Shop\n🔹 Reward from Adventurer Handbook Chapter 4", 
        "",
        "**Description:**",
        "Weapon forging material. Can be used to forge 4-star catalysts. Philosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater."
      ])
      .addField("Used for forging:", "🔹 Frostbearer\n🔹 Mappa Mare\n🔹 Prototype Amber", true)
      .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/3/3b/Item_Northlander_Catalyst_Billet.png/revision/latest/scale-to-width-down/256?cb=20201117073018")
      .setFooter("Page 2/5")
      .setTimestamp()
      .setColor("RANDOM");
      

    const thirdEmbed = new Embed()
    .setTitle("Northlander Claymore Billet")
    .setDescription([
        "**Item type:** Forging Material",
        "",
        "**Source:**",
        "🔹 Dropped by Weekly Bosses\n🔹 Purchased from the Souvenir Shop\n🔹 In the Luxurious chest at the end of the quest Break the Sword Cemetery Seal", 
        "",
        "**Description:**",
        "Weapon forging material. Can be used to forge 4-star catalysts. Philosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater."
      ])
    .addField("Used for forging:", "🔹 Prototype Archaic\n🔹 Snow-Tombed Starsilver\n🔹 Whiteblind", true)
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/d/db/Item_Northlander_Claymore_Billet.png/revision/latest/scale-to-width-down/256?cb=20201117072926")
    .setFooter("Page 3/5")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Northlander Polearm Billet")
    .setDescription([
        "**Item type:** Forging Material",
        "",
        "**Source:**",
        "🔹 Dropped by Weekly Bosses\n🔹 Purchased from the Souvenir Shop\n🔹 Reward from Spiral Abyss Chamber's Bounty, Floor 3 Chamber 3\n🔹 Reward from Level 8 Frostbearing Tree", 
        "",
        "**Description:**",
        "Weapon forging material. Can be used to forge 4-star catalysts. Philosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater."
      ])
    .addField("Used for forging:", "🔹 Crescent Pike\n🔹 Dragonspine Spear\n🔹 Prototype Starglitter", true)
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/a/a5/Item_Northlander_Polearm_Billet.png/revision/latest/scale-to-width-down/256?cb=20201117072958")
    .setFooter("Page 4/5")
    .setTimestamp()
    .setColor("RANDOM");

    const fifthEmbed = new Embed()
    .setTitle("Northlander Sword Billet")
    .setDescription([
        "**Item type:** Forging Material",
        "",
        "**Source:**",
        "🔹 Dropped by Weekly Bosses\n🔹 Purchased from the Souvenir Shop", 
        "",
        "**Description:**",
        "Weapon forging material. Can be used to forge 4-star catalysts. Philosophers believe marble has the potential to be sculpted into a beautiful statue. Likewise, these billets have the potential to become something greater."
      ])
    .addField("Used for forging:", "🔹 Iron Sting\n🔹 Prototype Rancour", true)
    .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/c/c2/Item_Northlander_Sword_Billet.png/revision/latest/scale-to-width-down/256?cb=20201117072810")
    .setFooter("Page 4/5")
    .setTimestamp()
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
