import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("material", {
  name: "dustofazoth",
  guildOnly: true,
  execute: async function (message, args) {
    const embed = new Embed()
      .setTitle("Dust of Azoth")
      .setDescription([
        `**Rarity:** ⭐⭐`,
        "",
        "**Item type:** Consumables",
        "",
        "**Used for:**\nConvert elemental Character Ascension Material from one element to another",
        "",
        "**Source:**\n🔹 Stardust Exchange+\n🔹 Lantern Rite Event Shop",
        "",
        "**Description:**",
        "A device that can transmute elemental Ascension Materials and change their elemental attribute. Its practical uses notwithstanding, alchemy is the study of the nature of matter and the rules that underpin its transformations, and it ultimately seeks to comprehend the working principles of the world and the flow of the ley lines. It is not known who would share alchemical achievements of this magnitude with the civilizations of the world and why. But although the power to fundamentally transmute elemental energy in its crystallized and inert form is a highly useful one, this device also conceals the grave danger of disrupting the elemental balance..."
      ])
      .setThumbnail(
        "https://static.wikia.nocookie.net/gensin-impact/images/6/60/Item_Dust_of_Azoth.png/revision/latest/scale-to-width-down/215?cb=20210127005119",
      )
      .setTimestamp()
      .setColor("RANDOM");

    await sendEmbed(message.channelID, embed).catch(console.log);
  },
});
