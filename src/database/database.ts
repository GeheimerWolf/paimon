import { Sabr, SabrTable } from "../../deps.ts";
import { ClientStatsSchema, GuildSchema, UserSchema } from "./schemas.ts";

// Create the database class
const sabr = new Sabr();

export const db = {
  // This will allow us to access table methods easily as we will see below.
  sabr,
  guilds: new SabrTable<GuildSchema>(sabr, "guilds"),
  users: new SabrTable<UserSchema>(sabr, "users"),
  clientstats: new SabrTable<ClientStatsSchema>(sabr, "clientstats"),

};

// This is important as it prepares all the tables.
await sabr.init();
