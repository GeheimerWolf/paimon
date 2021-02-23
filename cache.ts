import { Collection, Guild, Message } from "./deps.ts";
import { MessageCollector, ReactionCollector } from "./src/types/collectors.ts";
import { Argument, Command, PermissionLevels } from "./src/types/commands.ts";
import { Constants } from "./src/types/constants.ts";
import { CustomEvents } from "./src/types/events.ts";
import { Helpers } from "./src/types/helpers.ts";
import { Monitor } from "./src/types/monitors.ts";
import { Task } from "./src/types/tasks.ts";

export const botCache = {
  arguments: new Collection<string, Argument>(),
  constants: {} as Constants,
  helpers: {} as Helpers,
  commands: new Collection<string, Command>(),
  eventHandlers: {} as CustomEvents,
  guildPrefixes: new Collection<string, string>(),
  guildLanguages: new Collection<string, string>(),
  messageCollectors: new Collection<string, MessageCollector>(),
  reactionCollectors: new Collection<string, ReactionCollector>(),
  inhibitors: new Collection<
    string,
    (message: Message, command: Command, guild?: Guild) => Promise<boolean>
  >(),
  monitors: new Collection<string, Monitor>(),
  permissionLevels: new Collection<
    PermissionLevels,
    (message: Message, command: Command, guild?: Guild) => Promise<boolean>
  >(),
  tasks: new Collection<string, Task>(),
  runningTasks: [] as number[],
  memberLastActive: new Collection<string, number>(),
  activeGuildIDs: new Set<string>(),
  stats: {
    messagesProcessed: 0,
    messagesDeleted: 0,
    messagesUpdated: 0,
    messagesSent: 0,
    reactionsAddedProcessed: 0,
    reactionsRemovedProcessed: 0,
    commandsRan: 0,
    feedbacksSent: 0,
    automod: 0,
  },
  // dispatchedGuildIDs: new Set<string>(),
  // dispatchedChannelIDs: new Set<string>(),
  fullyReady: false,
};
console.log("cache.ts")