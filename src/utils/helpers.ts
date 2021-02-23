import { Command } from "../types/commands.ts";
import { Embed } from "./Embed.ts";
import {
  botCache,
  Collection,
  deleteMessageByID,
  editMessage,
  Message,
  MessageContent,
  sendMessage,
} from "../../deps.ts";
import { Milliseconds } from "./constants/time.ts";

/** This function should be used when you want to convert milliseconds to a human readable format like 1d5h. */
export function humanizeMilliseconds(milliseconds: number) {
  const years = Math.floor(milliseconds / botCache.constants.milliseconds.YEAR);
  const months = Math.floor(
    (milliseconds % botCache.constants.milliseconds.YEAR) /
      botCache.constants.milliseconds.MONTH,
  );
  const weeks = Math.floor(
    ((milliseconds % botCache.constants.milliseconds.YEAR) %
      botCache.constants.milliseconds.MONTH) /
      botCache.constants.milliseconds.WEEK,
  );
  const days = Math.floor(
    (((milliseconds % botCache.constants.milliseconds.YEAR) %
      botCache.constants.milliseconds.MONTH) %
      botCache.constants.milliseconds.WEEK) /
      botCache.constants.milliseconds.DAY,
  );
  const hours = Math.floor(
    ((((milliseconds % botCache.constants.milliseconds.YEAR) %
      botCache.constants.milliseconds.MONTH) %
      botCache.constants.milliseconds.WEEK) %
      botCache.constants.milliseconds.DAY) /
      botCache.constants.milliseconds.HOUR,
  );
  const minutes = Math.floor(
    (((((milliseconds % botCache.constants.milliseconds.YEAR) %
      botCache.constants.milliseconds.MONTH) %
      botCache.constants.milliseconds.WEEK) %
      botCache.constants.milliseconds.DAY) %
      botCache.constants.milliseconds.HOUR) /
      botCache.constants.milliseconds.MINUTE,
  );
  const seconds = Math.floor(
    (((((milliseconds % botCache.constants.milliseconds.YEAR) %
          botCache.constants.milliseconds.MONTH) %
          botCache.constants.milliseconds.WEEK) %
          botCache.constants.milliseconds.DAY) %
          botCache.constants.milliseconds.HOUR) %
        botCache.constants.milliseconds.MINUTE / 1000,
  );

  const yearString = years ? `${years}y ` : "";
  const monthString = months ? `${months}mo ` : "";
  const weekString = weeks ? `${weeks}w ` : "";
  const dayString = days ? `${days}d ` : "";
  const hourString = hours ? `${hours}h ` : "";
  const minuteString = minutes ? `${minutes}m ` : "";
  const secondString = seconds ? `${seconds}s ` : "";

  return `${yearString}${monthString}${weekString}${dayString}${hourString}${minuteString}${secondString}`
    .trimEnd() ||
    "1s";
}

/** This function helps convert a string like 1d5h to milliseconds. */
export function stringToMilliseconds(text: string) {
  const matches = text.match(/(\d+[w|d|h|m]{1})/g);
  if (!matches) return;

  let total = 0;

  for (const match of matches) {
    // Finds the first of these letters
    const validMatch = /(w|d|h|m|s)/.exec(match);
    // if none of them were found cancel
    if (!validMatch) return;
    // Get the number which should be before the index of that match
    const number = match.substring(0, validMatch.index);
    // Get the letter that was found
    const [letter] = validMatch;
    if (!number || !letter) return;

    let multiplier = botCache.constants.milliseconds.SECOND;
    switch (letter.toLowerCase()) {
      case `w`:
        multiplier = botCache.constants.milliseconds.WEEK;
        break;
      case `d`:
        multiplier = botCache.constants.milliseconds.DAY;
        break;
      case `h`:
        multiplier = botCache.constants.milliseconds.HOUR;
        break;
      case `m`:
        multiplier = botCache.constants.milliseconds.MINUTE;
        break;
    }

    const amount = number ? parseInt(number, 10) : undefined;
    if (!amount) return;

    total += amount * multiplier;
  }

  return total;
}

export function createCommand(command: Command) {
  botCache.commands.set(command.name, command);
}

export function createSubcommand(
  commandName: string,
  subcommand: Command,
  retries = 0,
) {
  const names = commandName.split("-");

  let command = botCache.commands.get(commandName);

  if (names.length > 1) {
    for (const name of names) {
      const validCommand = command
        ? command.subcommands?.get(name)
        : botCache.commands.get(name);
      if (!validCommand) break;

      command = validCommand;
    }
  }

  if (!command) {
    // If 10 minutes have passed something must have been wrong
    if (retries === 20) {
      return console.error(
        `Subcommand ${subcommand} unable to be created for ${commandName}`,
      );
    }

    // Try again in 30 seconds in case this command file just has not been loaded yet.
    setTimeout(
      () => createSubcommand(commandName, subcommand, retries++),
      30000,
    );
    return;
  }

  if (!command.subcommands) {
    command.subcommands = new Collection();
  }

  command.subcommands.set(subcommand.name, subcommand);
}

/** Use this function to send an embed with ease. */
export function sendEmbed(channelID: string, embed: Embed, content?: string) {
  return sendMessage(channelID, { content, embed });
}

/** Use this function to edit an embed with ease. */
export function editEmbed(message: Message, embed: Embed, content?: string) {
  return editMessage(message, { content, embed });
}

// Very important to make sure files are reloaded properly
let uniqueFilePathCounter = 0;
let paths: string[] = [];
/** This function allows reading all files in a folder. Useful for loading/reloading commands, monitors etc */
export async function importDirectory(path: string) {
  const files = Deno.readDirSync(Deno.realPathSync(path));
  const folder = path.substring(path.indexOf("/src/") + 5);
  if (!folder.includes("/")) console.log(`[Import] Loading ${folder}...`);

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`.replaceAll("\\", "/");
    if (file.isFile) {
      if (!currentPath.endsWith(".ts")) continue;
      paths.push(
        `import "${Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))}/${currentPath.substring(
          currentPath.indexOf("src/")
        )}#${uniqueFilePathCounter}";`
      );
      continue;
    }

    await importDirectory(currentPath);
  }

  uniqueFilePathCounter++;
}

/** Imports everything using fileloader.ts */
export async function fileLoader() {
  await Deno.writeTextFile("fileloader.ts", paths.join("\n").replaceAll("\\", "/"));
  await import(
    `${Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))}/fileloader.ts#${uniqueFilePathCounter}`
  );
  paths = [];
}

export function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minute = now.getMinutes();

  let hour = hours;
  let amOrPm = `AM`;
  if (hour > 12) {
    amOrPm = `PM`;
    hour = hour - 12;
  }

  return `${hour >= 10 ? hour : `0${hour}`}:${
    minute >= 10 ? minute : `0${minute}`
  } ${amOrPm}`;
}
