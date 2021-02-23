import { addReactions, Message, removeUserReaction } from "../../../deps.ts";
import { needReaction } from "../../utils/collectors.ts";
import { Embed } from "../../utils/Embed.ts";
import { createSubcommand, editEmbed, sendEmbed } from "../../utils/helpers.ts";

createSubcommand("patchnotes", {
  name: "1.3",
  aliases: ["1-3"],
  arguments: [
    { name: "page", defaultValue: 1 },
  ],
  guildOnly: true,
  execute: async function (message) {
    const firstEmbed = new Embed()
      .setTitle("Update Notes Version 1.3")
      .setDescription([
        "**Release Date:** 3. February 2021",
        "",
        "**Download Size:**",
        "PC: 4,19 GB",
        "Smartphone: 2,2 GB",
        "Playstation: NA",
        "Switch: NA",
        "",
        "**Dear Travelers,**\n\nTo ensure all Travelers have the best-possible Genshin Impact experience, our developers will soon begin performing update maintenance. After this is complete, the game will update to a new version.\nAfter Travelers install the new game client, they will be able to continue playing. It is recommended to install the update over Wi-Fi owing to the large file size.\nWhile the update maintenance is in progress, Travelers will be unable to log in to the game. Please take note of the update time and schedule your game time accordingly to avoid losing your progress. We hope Travelers will bear with us during the disruption.",
      ])
      .setThumbnail("https://upload-os-bbs.mihoyo.com/upload/2021/01/31/12293768/ff79c3511cb603c9d6c59862d02c8de9_7563784528451615190.jpg?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg")
      .setFooter("Page 1/10")
      .setTimestamp()
      .setColor("RANDOM");

    const secondEmbed = new Embed()
      .setDescription([
        "**〓Update Schedule〓**",
        "Update maintenance begins 2021/02/03 06:00:00 (UTC+8) and is estimated to take 5 hours.\n*(Note: Precise timings are subject to change. Players may also experience disruption outside of this period.)*",
        "",
        "",
        "**〓How to Update Game Client〓**",
        "PC: Close the game, open the Genshin Impact Launcher, and click Update.\niOS: Open the App Store and tap Update.\nAndroid: Open the game and follow the directions on-screen. (Alternatively, you may open Google Play and tap Update.)\nPS4: Highlight Genshin Impact from the PS4 Home Screen and press the OPTIONS button > Check for Update.\n\nPlease do not hesitate to contact Customer Service if you encounter any issues installing the new version. We will do our very best to resolve the issue swiftly.",
        "",
        "",
        "**〓Eligibility〓**",
        "All Travelers who have reached Adventure Rank 5 or above by 2021/02/03 06:00:00 (UTC+8)\nOur developers will distribute compensation to Travelers via in-game mail within 5 hours after the update maintenance is finished. Please log in and claim it before Version 1.3 ends. The mail will expire after 30 days, so don't forget to claim the attached compensation in time.",
      ])
      .setFooter("Page 2/10")
      .setTimestamp()
      .setColor("RANDOM");
      
    const thirdEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "**〓Update Details〓**",
      "*(All times below based on server time)*",
      "",
      "I. New Character",
      "5-Star Character: 'Vigilant Yaksha' Xiao (Anemo)",
      "◇ Vision: Anemo",
      "◇ Weapon: Polearm",
      "◇ A yaksha adeptus who defends Liyue. Also heralded as the 'Conqueror of Demons' and 'Vigilant Yaksha'.\nElemental Skill 'Lemniscatic Wing Cycling': Xiao instantly lunges forward, dealing DMG to enemies in his path. This maneuver can also be executed in mid-air.",
      "Elemental Burst 'Bane of All Evil': Xiao dons the Yaksha's Mask, giving him enhanced abilities at the cost of draining his health: He deals increased DMG, attacks are converted to Anemo DMG, and his jumping ability is greatly increased.",
      "",
      "During the event wish 'Invitation to Mundane Life,' from after the Version 1.3 update to 2021/02/17 15:59:59, the event-exclusive 5-star character 'Vigilant Yaksha' Xiao (Anemo) and the 4-star characters 'Kätzlein Cocktail' Diona (Cryo), 'Uncrowned Lord of the Ocean' Beidou (Electro), and 'Blazing Riff' Xinyan (Pyro) will have their Wish drop rates greatly increased!",
      "",
      "II. Rate-Boosted Characters",
      "5-Star Character 'Driving Thunder' Keqing (Electro)",
      "◇ Vision: Electro",
      "◇ Weapon: Sword",
      "◇ The Yuheng of the Liyue Qixing. Keqing has much to say about Rex Lapis' unilateral approach to policymaking in Liyue — but in truth, gods admire skeptics such as her quite a lot.",
      "",
      "During the event wish 'Dance of Lanterns,' from 2021/02/17 18:00:00 – 2021/03/02 15:59:59, the 5-star character 'Driving Thunder' Keqing (Electro) and the 4-star characters 'Eclipsing Star' Ningguang (Geo), 'Trial by Fire' Bennett (Pyro), and 'Shining Idol' Barbara (Hydro) will have their Wish drop rates greatly increased!",
      "",
      "More character event wishes to follow during Version 1.3.",
      "",
      "III. New Equipment",
      "◇ New weapons: Primordial Jade Cutter (5-Star Sword), Staff of Homa (5-Star Polearm), Lithic Spear (4-Star Polearm), and Lithic Blade (4-Star Claymore)",
      "◆ During the event wish 'Epitome Invocation,' from after the Version 1.3 update to 2021/02/23 15:59:59, the event-exclusive 5-star sword Primordial Jade Cutter and the 5-star polearm Primordial Jade Winged-Spear will have their Wish drop rates greatly increased!",
      "*Staff of Homa (Polearm), Lithic Spear (Polearm), and Lithic Blade (Claymore) will appear in future event wishes.",
      "IV. New Events",
      "Take part in Version 1.3's flagship event, Lantern Rite, for the chance to obtain a free 4-star Liyue character of your choice!",
      "◆ Gameplay Duration: 2021/02/10 10:00:00 – 2021/02/28 03:59",
      "◆ Event Rules: No Original Resin needed to take part. During the event period, Travelers can claim a 4-star Liyue character of their choice in 'Stand by Me.' Complete challenges in 'Theater Mechanicus' to obtain Peace Talismans, which can be spent in the Xiao Market on rewards including Crown of Insight and a new namecard style 'Celebration: Lantern-Light.'",
    ])
    .setFooter("Page 3/10")
    .setTimestamp()
    .setColor("RANDOM");

    const fourthEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "**〓All That Glitters〓**",
      "Duration:",
      "The Origin of the Lanterns: 2021/02/10 10:00:00 – 2021/02/28 03:59:59",
      "Currents Deep Beneath the Lanterns: 2021/02/14 04:00:00 – 2021/02/28 03:59:59",
      "Light Upon the Sea: 2021/02/18 04:00:00 – 2021/02/28 03:59:59",
      "",
      "〓Lantern Rite Tales〓",
      "Unlock Criteria:",
      "Lantern Rite Tales I: Complete 'The Origin of the Lanterns' to unlock.",
      "Lantern Rite Tales II: Reach the Festive Fever stage 'Guests Flock From Afar,' complete the questline 'CurrentsDeep Beneath the Lanterns,' and complete all requests in 'Lantern Rite Tales I' to unlock.",
      "Lantern Rite Tales III: Reach the Festive Fever stage 'Glow of a Thousand Lanterns,' complete the questline 'Light Upon the Sea,' and complete all requests in 'Lantern Rite Tales II' to unlock.",
      "● Complete requests in 'Lantern Rite Tales' to win Primogems and increase Festive Fever. Increase Festive Fever to progress through the Lantern Rite.",
      "※ After the event gameplay ends on 2021/02/28 03:59:59, requests will no longer be available to complete.",
      "",
      "",
      "**〓Theater Mechanicus〓**",
      "Unlock Criteria:",
      "Complete the quests 'The Origin of the Lanterns' and 'Liyue: Theater Mechanicus' to unlock",
      "● Each attempt at Theater Mechanicus costs 1 Xiao Lantern (regardless of whether or not the challenge is successful). Xiao Lanterns can be crafted at a Crafting Bench, and the required crafting materials can be obtained by gathering plants and ore, or by defeating specified enemies.",
      "● Progressing through the stages of Festive Fever unlocks new maps, new mechanici, higher upgrade levels, and increased difficulty levels.",
      "● Progressing through the stages of Festive Fever unlocks new Theater Mechanicus challenges. Complete them to win Peace Talismans.",
      "● Theater Mechanicus challenges can only be completed in Single-Player Mode or a two-player Co-Op session.",
    ])
    .setFooter("Page 4/10")
    .setTimestamp()
    .setColor("RANDOM");


    const fifthEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "**〓Xiao Market〓**",
      "Duration:",
      "Stage I: 2021/02/10 10:00:00 – 2021/03/07 03:59:59",
      "Stage II: 2021/02/14 04:00:00 – 2021/03/07 03:59:59",
      "Stage III: 2021/02/18 04:00:00 – 2021/03/07 03:59:59",
      "● Spend Peace Talismans at the Xiao Market to purchase items including Hero's Wit, Mystic Enhancement Ore, Character Level-Up Materials, Talent Level-Up Materials, the Crown of Insight, and the namecard style 'Celebration: Lantern-Light.'",
      "",
      "**〓Stand by Me〓**",
      "Duration: 2021/02/10 10:00:00 – 2021/03/07 03:59:59",
      "● Reach the Festive Fever stage 'Glow of a Thousand Lanterns' and spend 1,000 Peace Talismans in 'Stand by Me' to receive one of the following 4-star characters: 'Exquisite Delicacy' Xiangling (Pyro), 'Blazing Riff' Xinyan (Pyro), 'Uncrowned Lord of the Ocean' Beidou (Electro), 'Eclipsing Star' Ningguang (Geo), 'Juvenile Galant' Xingqiu (Hydro), or 'Frozen Ardor' Chongyun (Cryo). You may claim only one character in this way.",
      "",
      "**Login Event 'May Fortune Find You': Log In on 7 Days, Receive Intertwined Fate ×10**",
      "◆ Event Duration:2021/02/11 04:00:00 – 2021/02/26 03:59:59",
      "◆ During the event, log in on 7 days in total to receive Intertwined Fate ×10 and other rewards!",
      "Login Day 1 -> Intertwined Fate ×1",
      "Login Day 2 -> Mora ×80,000",
      "Login Day 3 -> Intertwined Fate ×2",
      "Login Day 4 -> Mystic Enhancement Ore ×18",
      "Login Day 5 -> Intertwined Fate ×2",
      "Login Day 6 -> Hero's Wit ×8",
      "Login Day 7 -> Intertwined Fate ×5",
      "**Five Flushes of Fortune**",
      "◆ Event Duration: After the Version 1.3 update to 2021/02/10 03:59:59 *(Please notice that this event will start from 2020/02/03 04:00:00 on Euro and America Server.)*",
      "◆ During the event, Travelers can claim a Kurious Kamera from Ji Tong. Equip the Kamera and take pictures of specific targets to obtain photos of different colors. Collect photos of five different colors and exchange them for a Fortune Trove to obtain Primogems, Hero's Wit, Mystic Enhancement Ore, and other rewards!",
      "More events to follow during Version 1.3.",
      "",
      "V. New Questlines",
      "**1. New story quests**",
      "After the Version 1.3 update, Xiao's story quest 'Alatus Chapter' will be available.\n◆ More story quests are on the way, so please stay tuned!",
      
    ])
    .setFooter("Page 5/10")
    .setTimestamp()
    .setColor("RANDOM");

    const sixthEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "2. New world quests",
      "◆ A total of 26 festive World Quests will become available over the course of the Lantern Rite event, accessible from 'Lantern Rite Tales' on the Events menu.",
      "◆ A further world quest 'Bough Keeper: Dainsleif' will also be added.",
      "",
      "VI. Other New Content",
      "• Gameplay",
      "1. New monsters: Geovishap, Primo Geovishap",
      "2. New gadgets:",
      "Parametric Transformer: Enhancement Materials can be converted into Character EXP Materials, Character Level-Up Materials, and Weapon Ascension Materials by placing them in the Parametric Transformer to undergo transmutation.",
      "3. New achievement 'Transmutation Nuclide'",
      "4. New consumable: Dust of Azoth can convert the Elemental Type of Character Ascension Materials.",
      "5. New recipes: Fullmoon Egg, Vegetarian Abalone, and Stone Harbor Delicacies",
      "",
      "• System",
      "1. Archive addition 'Living Beings': Records information on enemies defeated and living things caught or discovered. Travelers can consult the Living Beings section of the Archive to view how many times they have defeated different enemies and also review tutorials for certain enemies.",
      "2. New conversion function on Crafting Bench: Combining some Character Ascension Materials with Dust of Azoth at a Crafting Bench lets you convert their Elemental Type.",
      "3. Travelers' profile pages now include Achievement progress and a Character Showcase.",
      "4. Controller support added for devices running iOS 14 or above. Currently, the following controllers are supported: Xbox Wireless Controller (Bluetooth Version), Xbox Elite Wireless Controller Series 2, PlayStation DualShock 4 Wireless Controller, some other Bluetooth Wireless Controllers designed for iOS.",
      "5. On the Weapon Enhancement screen, holding the selected material will add it rapidly.",
      "6. A quick delete function has been added to the mailbox. Does not delete unread mail or mail with unclaimed attachments.",
      "7. New photography method added for the PS4 version. Take a photo and save it to the PS4's local storage in one single action.",
      
    ])
    .setFooter("Page 6/10")
    .setTimestamp()
    .setColor("RANDOM");

    const seventhEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "VII. Adjustments & Optimizations",
      "• Characters",
      "1. Adjustments to Zhongli:",
      "1) Adjusts the effect of holding Zhongli's Elemental Skill 'Dominus Lapidis':",
      "◇ Original effect:",
      "Causes nearby Geo energy to explode, causing the following effects:",
      "·Creates a shield of jade. The shield's DMG Absorption scales based on Zhongli's Max HP, and absorbs Geo DMG 250% more effectively.",
      "·Deals AoE Geo DMG.",
      "·If there are nearby targets with the Geo element, it will drain a large amount of Geo element from a maximum of 2 such targets. This effect does not cause DMG.",
      "◆ Post-adjustment effect:",
      "Causes nearby Geo energy to explode, causing the following effects:",
      "·If their maximum number hasn't been reached, creates a Stone Stele.",
      "·Creates a shield of jade. The shield's DMG Absorption scales based on Zhongli's Max HP. Possesses 150% DMG Absorption against all Elemental and Physical DMG.",
      "·Characters protected by the Jade Shield will decrease the Elemental RES and Physical RES of opponents in a small AoE by 20%. This effect cannot be stacked.",
      "·Deals AoE Geo DMG.",
      "·If there are nearby targets with the Geo element, it will drain a large amount of Geo element from a maximum of 2 such targets. This effect does not cause DMG.",
      "",
      "2) Adjusts the effect of Zhongli's second Ascension Talent 'Dominance of Earth':",
      "◇ Original effect:",
      "Planet Befall deals additional DMG equal to 33% of Zhongli's Max HP.",
      "◆ Post-adjustment effect:",
      "Zhongli deals bonus DMG based on his Max HP:",
      "·Normal Attack, Charged Attack, and Plunging Attack DMG is increased by 1.39% of Max HP.",
      "·Dominus Lapidis' Stone Stele, resonance, and hold DMG is increased by 1.9% of Max HP.",
      "·Planet Befall's DMG is increased by 33% of Max HP.",
    ])
    .setFooter("Page 7/10")
    .setTimestamp()
    .setColor("RANDOM");

    const eighthEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "2. Optimizes Mona's Talent 'Illusory Torrent': When Mona is hit, she can use Illusory Torrent more quickly, as is the case with sprinting for other characters.",
      "3. Adds a new idle animation for Kaeya.",
      "4. Optimizes Zhongli's animation under 'Weapons' on the Character Screen.",
      "5. Resolves issues with Aiming Mode for Bow-wielding characters when obstacles are present nearby, such as character shaking and off-center shots.",
      "6. Optimizes precision when firing shots at moving targets.",
      "7. Resolves issues of shaky clothing/movements when some characters perform actions such as walking, attacking, skill casting, and sitting.",
      "",
      "• Monsters",
      "1. Adjusts combat logic for Dendro Slimes: When a Dendro Slime is hiding relatively far from your location, you will not enter combat mode.",
      "",
      "• System",
      "1. Spiral Abyss",
      "Updates the monster lineup on Floor 12 of the Spiral Abyss.",
      "The Ley Line Disorders on Floor 12 are adjusted to:",
      "• For this floor only, the ley line flow will be normal",
      "• No Ley Line Disorder",
      "Starting from the first time that the Lunar Phase refreshes after updating to Version 1.3, the three Lunar Phases will be as follows:",
      "Phase I:",
      "When active character's HP is less than 70%, ATK is increased by 20% and ATK SPD is increased by 15%.",
      "When active character's HP is less than 35% and they are under the protection of a shield, CRIT Rate is increased by 20% and CRIT DMG is increased by 40%.",
      "Phase II:",
      "A Charge will accumulate every 10s, with a maximum of three existing at any one time. If the active character's HP is less than 50%, they will consume a Charge when they hit an opponent to create an unstable energy orb at the opponent's position. This orb will explode after 1s, and only one of them can be created every 2s.",
      "Phase III:",
      "When the active character's HP is less than 50%, they gain a 2% DMG Bonus for 10s after hitting an opponent. This effect can stack up to 10 times, and each character in the party will have their own independent stacks and durations. Each time the stack count or duration of this effect resets, there is a 50% chance to release an Energy Blast. An Energy Blast can be triggered once every 10s.",
    ])
    .setFooter("Page 8/10")
    .setTimestamp()
    .setColor("RANDOM")

    const ninethEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "2. Deleted chats will not appear in the chat list.",
      "3. Optimizes display order of chat column: After entering team setup in Co-Op Mode, the chat column will automatically switch to the team column.",
      "4. Optimizes the display hierarchy when there are multiple overlapping icons on the Map.",
      "5. Optimizes UI transparency on mobile devices upon entering Aiming Mode in the Spiral Abyss.",
      "6. Optimizes the Kamera gadget for the PS4 version: When equipped, using the Kamera directly stores a screenshot with the UI hidden to the local storage.",
      "7. From Version 1.3 onward, extra Fragile Resin rewards will be included in the BP system:",
      "Starting from BP Level 5, Sojourner's Battle Pass and Gnostic Hymn provide Fragile Resin ×1 every 10 BP Levels. The original rewards of Mystic Enhancement Ore provided at these BP Levels will be added to the rewards at other BP Levels instead, and the total quantity of Mystic Enhancement Ore that can be obtained from the BP system will not change.",
      "8. Removes the Delete button from the Portable Waypoint interface of the open world map.",
      "9. Optimizes the size of the Wind Glider on the Dressing Room screen for certain characters.",
      "10. When using a controller, improves the refresh rate when switching between tabs in the Paimon's Bargains section of the Shop.",
      "11. Optimizes the experience of moving the crosshair in Aiming Mode when the frame rate is low.",
      "",
      "• Audio",
      "1. Voice-Over Optimization:",
      "a. Adds a reverb effect to internal monologue voice-over in quests.",
      "b. Character combat voice-over can interrupt idle voice-over.",
      "2. The Chinese voice artist for Amber will be changed, and this adjustment will take effect in Version 1.4.",
      "3. Adds Chinese voice-over for some characters.",
      "4. Adds Japanese voice-over for some characters.",
      "5. Adjusts the audio effects for some voice-over on mobile and PC versions.",
    ])
    .setFooter("Page 9/10")
    .setTimestamp()
    .setColor("RANDOM")

    const tenthEmbed = new Embed()
    .setTitle("Update Notes Version 1.3")
    .setDescription([
      "• Other",
      "1. Adjustment to the Geo Elemental Resonance 'Enduring Rock':",
      "◇ Original effect:",
      "Increases resistance to interruption. When protected by a shield, increases Attack DMG by 15%.",
      "",
      "◆ Post-adjustment effect:",
      "Increases shield strength by 15%. Additionally, characters protected by a shield will have the following special characteristics: DMG dealt increased by 15%, dealing DMG to enemies will decrease their Geo RES by 20% for 15s.",
      "",
      "2. Geo Shield balance adjustments:",
      "Geo Shields are adjusted from having '250% Geo DMG Absorption' to having '150% Physical DMG and Elemental DMG Absorption.'",
      "This adjustment affects the following:",
      "• The Geo Shield produced by Zhongli's Elemental Skill",
      "• The Geo Shield produced by Noelle's Elemental Skill",
      "• The Geo Shield produced upon picking up a Geo Crystal dropped by a Geovishap Hatchling",
      "",
      "3. Amends the tab for the standard wish 'Wanderlust Invocation.' *Only the tab has been changed. The Wish contents and rules remain unchanged.",
      "4. Optimizes item source descriptions for Mist Grass Pollen, Mist Grass, and Mist Grass Wick.",
      "5. Adjusts descriptions for the materials Fragile Bone Shard, Sturdy Bone Shard, and Fossilized Bone Shard and adds their sources.",
      "6. Adds a description for the rules of Elemental Orb drops in the 'Test Run' event (the actual mechanics in-game are not affected by this change).",
      "",
      "*Note: In order to allow Travelers for a quicker use of Elemental Bursts and more efficient testing experience, the opponents on trial stages drop additional Elemental Orbs. However, due to our negligence, this effect was not individually listed in the event details, leading some Travelers to misevaluate characters based on their trial stage performance. We sincerely apologize for any confusion this might have caused. After this update, the event details will be supplemented with the relevant rules. We will continue to optimize the trial stage experience in the upcoming versions.",
    ])
    .setFooter("Page 10/10")
    .setTimestamp()
    .setColor("RANDOM")

    createPagination(message, [
      firstEmbed,
      secondEmbed,
      thirdEmbed,
      fourthEmbed,
      fifthEmbed,
      sixthEmbed,
      seventhEmbed,
      eighthEmbed,
      ninethEmbed,
      tenthEmbed
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
