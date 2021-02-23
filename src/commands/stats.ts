import { botCache, botID, cache } from "../../deps.ts";
import { db } from "../database/database.ts";
import { createCommand, humanizeMilliseconds } from "../utils/helpers.ts";
import { Embed } from "../utils/Embed.ts";

const UPTIME = Date.now();

createCommand({
  name: `stats`,
  guildOnly: true,
  botChannelPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
  execute: async (message) => {
    let totalMemberCount = 0;
    let cachedMemberCount = 0;

    for (const guild of cache.guilds.values()) {
      totalMemberCount += guild.memberCount;
    }

    for (const member of cache.members.values()) {
      cachedMemberCount += member.guilds.size;
    }

    const stats = await db.clientstats.get(botID);
    if (!stats) {
      await db.clientstats.create(botID, {
        id: botID,
        botID,
        messagesProcessed: "0",
        messagesDeleted: "0",
        messagesUpdated: "0",
        messagesSent: "0",
        reactionsAddedProcessed: "0",
        reactionsRemovedProcessed: "0",
        commandsRan: "0",
      });
      return message.reply("Stats table didn't return any data.");
    }

    const messageStats = [
      `**Processed:** ${botCache.helpers.shortNumber(
        BigInt(stats.messagesProcessed || "0")
      )}`,
      `**Sent:** ${botCache.helpers.shortNumber(
        BigInt(stats.messagesSent || "0")
      )}`,
      `**Deleted:** ${botCache.helpers.shortNumber(
        BigInt(stats.messagesDeleted || "0")
      )}`,
      `**Edited:** ${botCache.helpers.shortNumber(
        BigInt(stats.messagesUpdated || "0")
      )}`,
      `**Commands:** ${botCache.helpers.shortNumber(
        BigInt(stats.commandsRan || "0")
      )}`,
    ];

    const reactionStats = [
      `**Added:** ${botCache.helpers.shortNumber(
        BigInt(stats.reactionsAddedProcessed || "0")
      )}`,
      `**Removed:** ${botCache.helpers.shortNumber(
        BigInt(stats.reactionsRemovedProcessed || "0")
      )}`,
    ];
    const embed = new Embed()
      .setAuthor(
        `${message.guild?.botMember?.nick || message.guild?.bot?.tag} Stats`,
        message.guild?.bot?.avatarURL,
      )
      .setColor("random")
      .addField("Servers:", cache.guilds.size.toLocaleString(), true)
      .addField("Members:", totalMemberCount.toLocaleString(), true)
      .addField("Channels:", cache.channels.size.toLocaleString(), true)
      .addField("Messages:", cache.messages.size.toLocaleString(), true)
      .addBlankField(true)
      .addField("Uptime:", humanizeMilliseconds(Date.now() - UPTIME), true)
      .addField("Messages", messageStats.join("\n"), true)
      .addField("Reactions", reactionStats.join("\n"), true)
      .setTimestamp();

    return message.send({ embed });
  },
});
