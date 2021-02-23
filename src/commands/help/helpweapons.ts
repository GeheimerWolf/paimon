import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "weapons",
  aliases: ["weapon"],
  arguments: [
    { name: "page", type: "number", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message, args) {
    const prefix = parsePrefix(message.guildID);
    const first = new Embed()
      .setTitle("Bows")
      .setDescription([
        `🔹 \`${prefix}help sharpshootersoath\``,
        `🔹 \`${prefix}help slingshot\``,
        `🔹 \`${prefix}help ravenbow\``,
        `🔹 \`${prefix}help messenger\``,
        `🔹 \`${prefix}help recurvebow\``,
        "",
        `🔹 \`${prefix}help compoundbow\``,
        `🔹 \`${prefix}help blackcliffwarbow\``,
        `🔹 \`${prefix}help theviridescenthunt\``,
        `🔹 \`${prefix}help prototypecrescent\``,
        `🔹 \`${prefix}help sacrificialbow\``,
        `🔹 \`${prefix}help rust\``,
        `🔹 \`${prefix}help thestringless\``,
        `🔹 \`${prefix}help favoniuswarbow\``,
        "",
        `🔹 \`${prefix}help amosbow\``,
        `🔹 \`${prefix}help skywardharp\``,
      ])
      .setTimestamp()
      .setFooter("Page 1/5")

    const second = new Embed()
      .setTitle("Polearms")
      .setDescription([
        `🔹 \`${prefix}help halberd\``,
        `🔹 \`${prefix}help blacktassel\``,
        `🔹 \`${prefix}help whitetassel\``,
        "",
        `🔹 \`${prefix}help crescentpike\``,
        `🔹 \`${prefix}help deathmatch\``,
        `🔹 \`${prefix}help royalspear\``,
        `🔹 \`${prefix}help favoniuslance\``,
        `🔹 \`${prefix}help dragonspinespear\``,
        `🔹 \`${prefix}help prototypestarglitter\``,
        `🔹 \`${prefix}help dragonsbane\``,
        `🔹 \`${prefix}help blackcliffpole\``,
        `🔹 \`${prefix}help lithicspear\``,
        "",
        `🔹 \`${prefix}help vortexvanquisher\``,
        `🔹 \`${prefix}help skywardspine\``,
        `🔹 \`${prefix}help primordialjadewinged-spear\``,
        `🔹 \`${prefix}help staffofhoma\``,
      ])
      .setTimestamp()
      .setFooter("Page 2/5")

    const third = new Embed()
      .setTitle("Claymores")
      .setDescription([
        `🔹 \`${prefix}help whiteirongreatsword\``,
        `🔹 \`${prefix}help skyridergreatsword\``,
        `🔹 \`${prefix}help quartz\``,
        `🔹 \`${prefix}help ferrousshadow\``,
        `🔹 \`${prefix}help debateclub\``,
        `🔹 \`${prefix}help bloodtaintedgreatsword\``,
        "",
        `🔹 \`${prefix}help blackcliffslasher\``,
        `🔹 \`${prefix}help whiteblind\``,
        `🔹 \`${prefix}help snow-Tombedstarsilver\``,
        `🔹 \`${prefix}help sacrificialgreatsword\``,
        `🔹 \`${prefix}help serpentspine\``,
        `🔹 \`${prefix}help thebell\``,
        `🔹 \`${prefix}help royalgreatsword\``,
        `🔹 \`${prefix}help rainslasher\``,
        `🔹 \`${prefix}help prototypearchaic\``,
        `🔹 \`${prefix}help favoniusgreatsword\``,
        `🔹 \`${prefix}help lithicblade\``,
        "",
        `🔹 \`${prefix}help The Unforged\``,
        `🔹 \`${prefix}help Wolf's Gravestone\``,
        `🔹 \`${prefix}help Skyward Pride\``,
      ])
      .setTimestamp()
      .setFooter("Page 3/5")

    const fourth = new Embed()
      .setTitle("Swords")
      .setDescription([
        `🔹 \`${prefix}help skyridersword\``,
        `🔹 \`${prefix}help filletblade\``,
        `🔹 \`${prefix}help travelershandysword\``,
        `🔹 \`${prefix}help harbingerofdawn\``,
        `🔹 \`${prefix}help darkironsword\``,
        `🔹 \`${prefix}help coolsteel\``,
        "",
        `🔹 \`${prefix}help blackclifflongsword\``,
        `🔹 \`${prefix}help sacrificialsword\``,
        `🔹 \`${prefix}help swordofdescension\``,
        `🔹 \`${prefix}help favoniussword\``,
        `🔹 \`${prefix}help theblacksword\``,
        `🔹 \`${prefix}help theflute\``,
        `🔹 \`${prefix}help royallongsword\``,
        `🔹 \`${prefix}help prototyperancour\``,
        `🔹 \`${prefix}help lionsrRoar\``,
        `🔹 \`${prefix}help ironsting\``,
        `🔹 \`${prefix}help festeringdesire\``,
        "",
        `🔹 \`${prefix}help summitshaper\``,
        `🔹 \`${prefix}help aquilafavonia\``,
        `🔹 \`${prefix}help skywardblade\``,
        `🔹 \`${prefix}help primordialjadecutter\``,
      ])
      .setTimestamp()
      .setFooter("Page 4/5")

    const fifth = new Embed()
      .setTitle("Catalysts")
      .setDescription([
        `🔹 \`${prefix}help magicguide\``,
        `🔹 \`${prefix}help thrillingtalesofdragonslayers\``,
        `🔹 \`${prefix}help twinnephrite\``,
        `🔹 \`${prefix}help otherworldlystory\``,
        `🔹 \`${prefix}help emeraldorb\``,
        "",
        `🔹 \`${prefix}help solarpearl\``,
        `🔹 \`${prefix}help eyeofperception\``,
        `🔹 \`${prefix}help thewidsith\``,
        `🔹 \`${prefix}help frostbearer\``,
        `🔹 \`${prefix}help sacrificialfragments\``,
        `🔹 \`${prefix}help royalgrimoire\``,
        `🔹 \`${prefix}help prototypeamber\``,
        `🔹 \`${prefix}help mappamare\``,
        `🔹 \`${prefix}help favoniuscodex\``,
        `🔹 \`${prefix}help blackcliffagate\``,
        "",
        `🔹 \`${prefix}help lostprayertothesacredwinds\``,
        `🔹 \`${prefix}help memoryofdust\``,
        `🔹 \`${prefix}help skywardatlas\``,
      ])
      .setTimestamp()
      .setFooter("Page 5/5")

      createPagination(message, [
        first,
        second,
        third,
        fourth,
        fifth
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
  