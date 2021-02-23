import type {
    Message,
    MessageReactionUncachedPayload,
    ReactionPayload,
  } from "../../deps.ts";
  import type { Embed } from "../utils/Embed.ts";
  import type {
    CollectMessagesOptions,
    CollectReactionsOptions,
    MessageCollectorOptions,
    ReactionCollectorOptions,
  } from "./collectors.ts";
  
export interface Helpers {
    // Basic Utils
    chooseRandom: <T>(array: T[]) => T;
    snowflakeToTimestamp: (id: string) => number;
    toTitleCase: (text: string) => string;
    chunkStrings: (
      array: string[],
      chunkSize?: number,
      separateLines?: boolean,
    ) => string[];
    authorEmbed: (message: Message) => Embed;
    cleanNumber: (number: bigint | number | string) => string;
    shortNumber: (number: bigint | number | string) => string;
    booleanEmoji: (bool: boolean) => string;
    reactError: (message: Message, vip?: boolean) => Promise<void>;

    // Collectors
  needMessage: (
    memberID: string,
    channelID: string,
    options?: MessageCollectorOptions | undefined,
  ) => Promise<Message>;
  collectMessages: (options: CollectMessagesOptions) => Promise<Message[]>;
  needReaction: (
    memberID: string,
    messageID: string,
    options?: ReactionCollectorOptions,
  ) => Promise<string>;
  collectReactions: (options: CollectReactionsOptions) => Promise<string[]>;
  processReactionCollectors: (
    message: Message | MessageReactionUncachedPayload,
    emoji: ReactionPayload,
    userID: string,
  ) => void;
}