import {
  pgEnum,
  pgTable,
  uuid,
  timestamp,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const platformEnum = pgEnum("platform", ["CONSOLE", "STEAM", "CROSSPLAY", "MOBILE"]);
export const tournamentTierEnum = pgEnum("tournament_tier", ["COMMUNITY", "OPEN", "PRO"]);
export const tournamentStatusEnum = pgEnum("tournament_status", ["UPCOMING", "ONGOING", "COMPLETED"]);
export const eventModeEnum = pgEnum("event_mode", ["ONLINE", "OFFLINE", "HYBRID"]);
export const roleEnum = pgEnum("role", ["MEMBER", "MODERATOR", "ADMIN"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("email_verified", { withTimezone: true }),
    image: text("image"),
    role: roleEnum("role").notNull().default("MEMBER"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  }
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => ({
    providerAccountIdx: uniqueIndex("accounts_provider_provider_account_id_key").on(
      table.provider,
      table.providerAccountId
    ),
  })
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionToken: text("session_token").notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    sessionTokenIdx: uniqueIndex("sessions_session_token_key").on(table.sessionToken),
  })
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex("verification_tokens_token_key").on(table.token),
    identifierTokenIdx: uniqueIndex("verification_tokens_identifier_token_key").on(
      table.identifier,
      table.token
    ),
  })
);

export const players = pgTable(
  "players",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    name: text("name").notNull(),
    gamertag: text("gamertag").notNull(),
    platform: platformEnum("platform").notNull(),
    position: text("position").notNull(),
    archetype: text("archetype"),
    club: text("club"),
    avatarUrl: text("avatar_url"),
    overall: integer("overall").notNull(),
    rating: integer("rating"),
    bio: text("bio"),
  },
  (table) => ({
    gamertagIdx: uniqueIndex("players_gamertag_key").on(table.gamertag),
  })
);

export const tournaments = pgTable(
  "tournaments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    name: text("name").notNull(),
    organizer: text("organizer").notNull(),
    tier: tournamentTierEnum("tier").notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }),
    format: text("format").notNull(),
    prizePool: text("prize_pool"),
    slotsTotal: integer("slots_total").notNull(),
    slotsTaken: integer("slots_taken").notNull(),
    platform: platformEnum("platform").notNull(),
    registrationUrl: text("registration_url"),
    status: tournamentStatusEnum("status").notNull().default("UPCOMING"),
  },
  (table) => ({
    uniqueName: uniqueIndex("tournaments_name_key").on(table.name),
  })
);

export const communityEvents = pgTable(
  "community_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    title: text("title").notNull(),
    organizer: text("organizer").notNull(),
    date: timestamp("date", { withTimezone: true }).notNull(),
    location: text("location").notNull(),
    mode: eventModeEnum("mode").notNull(),
    summary: text("summary").notNull(),
    link: text("link"),
  },
  (table) => ({
    uniqueTitle: uniqueIndex("community_events_title_key").on(table.title),
  })
);

export const discussions = pgTable(
  "discussions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    summary: text("summary").notNull(),
    tags: text("tags").array(),
    replies: integer("replies").notNull().default(0),
    platform: platformEnum("platform").notNull(),
    lastActivity: timestamp("last_activity", { withTimezone: true }).defaultNow().notNull(),
    authorName: text("author_name").notNull(),
    authorId: uuid("author_id").references(() => users.id),
  },
  (table) => ({
    uniqueTitle: uniqueIndex("discussions_title_key").on(table.title),
    uniqueSlug: uniqueIndex("discussions_slug_key").on(table.slug),
  })
);

export type Platform = (typeof platformEnum.enumValues)[number];
export type TournamentTier = (typeof tournamentTierEnum.enumValues)[number];
export type TournamentStatus = (typeof tournamentStatusEnum.enumValues)[number];
export type EventMode = (typeof eventModeEnum.enumValues)[number];
export type Role = (typeof roleEnum.enumValues)[number];
