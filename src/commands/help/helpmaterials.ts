import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { parsePrefix } from "../../monitors/commandHandler.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("help", {
  name: "materials",
  aliases: ["material"],
  guildOnly: true,
      execute: async function (message) {
        const prefix = parsePrefix(message.guildID);
        const firstEmbed = new Embed()
        .setTitle("Help Material")
        .setDescription([
          "**Ascension Gems**",
          `🔹 \`${prefix}material [agnidusagate | agndius | aa]\``,
          `🔹 \`${prefix}material [brilliantdiamond | diamond | bd]\``,
          `🔹 \`${prefix}material [prithivatopaz | prithi | pv]\``,
          `🔹 \`${prefix}material [vajradaamethyst | vajrada | va]\``,
          `🔹 \`${prefix}material [varunadalazurite | varunada | vl]\``,
          `🔹 \`${prefix}material [vayudaturquoise | vayuda | vt]\``,
          "",
          "**Talent Level-Up Materials**",
          `🔹 \`${prefix}material [ballad | teachingsofballad | guidetoballad | philosophiesofballad]\``,
          `🔹 \`${prefix}material [diligence | teachingsofdiligence | guidetodiligence | philosophiesofdiligence]\``,
          `🔹 \`${prefix}material [freedom | teachingsoffreedom | guidetofreedom | philosophiesoffreedom]\``,
          `🔹 \`${prefix}material [gold | teachingsofgold | guidetogold | philosophiesofgold]\``,
          `🔹 \`${prefix}material [prosperity | teachingsofprosperity | guidetoprosperity | philosophiesofprosperity]\``,
          `🔹 \`${prefix}material [resistance | teachingsofresistance | guidetoresistance | philosophiesofresistance]\``,
          `🔹 \`${prefix}material crownofinsight\``,
          `🔹 \`${prefix}material dvalinsclaw\``,
          `🔹 \`${prefix}material dvalinsplume\``,
          `🔹 \`${prefix}material dvalinssigh\``,
          `🔹 \`${prefix}material ringofboreas\``,
          `🔹 \`${prefix}material shadowofthewarriors\``,
          `🔹 \`${prefix}material [shardofafoullegacy | foullegacy]\``,
          `🔹 \`${prefix}material [spiritlocketofboreas | spiritlocket]\``,
          `🔹 \`${prefix}material [tuskofmonoceroscaeli | tuskofmonoceros | monoceroscaeli | monoceros]\``,
        ])
        .setFooter("Page 1/3")
        .setTimestamp()
        .setColor("RANDOM");
    
        const secondEmbed = new Embed()
        .setTitle("Help Material")
        .setDescription([
          "**Weapon Ascension Material**",
          `🔹 \`${prefix}material [aerosiderite | pieceofaerosiderite | grainofaerosiderite | bitofaerosiderite | chunkofaerosiderite]\``,
          `🔹 \`${prefix}material [boreal | borealwolf | borealwolfs | borealwolfsmilktooth | borealwolfsbrokenfang | borealwolfscrackedtooth | borealwolfsnostalgia | milktooth | brokenfang | crackedtooth | nostalgia]\``,
          `🔹 \`${prefix}material [dandeliongladiator | fettersofthedandeliongladiator | chainsofthedandeliongladiator | shacklesofthedandeliongladiator | dreamofthedandeliongladiator]\``,
          `🔹 \`${prefix}material [mistveiled | mistveiledleadelixir | mistveiledmercuryelixir | mistveiledgoldelixir | mistveiledprimoelixir]\``,
          "",
          "**Character EXP Material**",
          `🔹 \`${prefix}material [wanderersadvice | adventurersexperience | heroswit]\``,
          "",
          "**Weapon Enhancement Material**",
          `🔹 \`${prefix}material enhancementore\``,
          `🔹 \`${prefix}material [festeringdragonmarrow | festeringdragon | dragonmarrow]\``,
          ])
          .setFooter("Page 2/3")
          .setTimestamp()
          .setColor("RANDOM");

          const thirdEmbed = new Embed()
        .setTitle("Help Material")
        .setDescription([
          "**Common Ascension Material**",
          `🔹 \`${prefix}material [horn | heavyhorn | blackbronzehorn | blackcrystalhorn]\``,
          `🔹 \`${prefix}material [chaos | chaoscircuit | chaosdevice | chaoscircuit]\``,
          `🔹 \`${prefix}material [mask | damagedmask | stainedmask | omniousmask]\``,
          `🔹 \`${prefix}material [sacrificialknife | hunterssacrificialknife | agentssacrificialknife | Inspectorssacrificialknife]\``,
          `🔹 \`${prefix}material [treasurehoarderinsignia | silverraveninsignia | goldenraveninsignia | raveninsignia]\``,
          `🔹 \`${prefix}material [deadleyline | deadleylinebranch | deadleylineleaves | leylinesprouts]\``,
          `🔹 \`${prefix}material [fatuiinsignia | recruitsinsignia | sergeantsinsignia | lieutenantsinsignia]\``,
          `🔹 \`${prefix}material [nectar | whopperflowernectar | shimmeringnectar | energynectar]\``,
          `🔹 \`${prefix}material [boneshard | fragileboneshard | sturdyboneshard | fossilizedboneshard]\``,
          `🔹 \`${prefix}material [mistgrass | mistgrasspollen | mistgrasswick]\``,
          `🔹 \`${prefix}material [slime | slimecondensate | slimesecretions | slimeconcentrate]\``,
          `🔹 \`${prefix}material [arrowhead | firmarrowhead | sharparrowhead | weatheredarrowhead]\``,
          "",
          "**Forging Material**",
          `🔹 \`${prefix}material [ore | ironchunk | whiteironchunk | crystalchunk | magicalcrystalchunk]\``,
          `🔹 \`${prefix}material [northlander | northlanderbowbillet | northlandercatalystbillet | northlanderclaymorebillet | northlanderpolearmbillet | northlanderswordbillet | northlanderbow | northlandercatalyst | northlanderclaymore | northlanderpolearm | northlandersword]\``,
          "",
          "**Other**",
          `🔹 \`${prefix}material dustofazoth\``,
          ])
          .setFooter("Page 3/3")
          .setTimestamp()
          .setColor("RANDOM");

      createPagination(message, [
        firstEmbed,
        secondEmbed,
        thirdEmbed
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
  