export interface GuildSchema {
  /** The guild id */
  id: string;
  /** The custom prefix for this guild */
  prefix: string;
  /** The language for this guild */
  language: string;
}

export interface UserSchema {
  /** The user id who created this emoji */
  id: string;
  /** The users uid. May be Not Available if user skipped. */
  uid: string;
  /** The characters that the user owns */
  characters: OwnedCharacter[];
  /** The adventurer rank */
  adventurerRank: number;
  /** The world levelfor the user */
  worldLevel: number;
}

export interface OwnedCharacter {
  /** The name of the character */
  name: string;
  /** The level of this character constellation */
  constellationLevel: number;
  /** The level of this character */
  charLevel: number;
}

export interface ClientStatsSchema {
  id: string;
  botID: string;
  // Bot Statistics. Using string to prevent big ints from breaking.
  messagesProcessed: string;
  messagesDeleted: string;
  messagesUpdated: string;
  messagesSent: string;
  reactionsAddedProcessed: string;
  reactionsRemovedProcessed: string;
  commandsRan: string;
}