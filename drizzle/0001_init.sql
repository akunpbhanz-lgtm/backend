CREATE TYPE "platform" AS ENUM ('CONSOLE', 'STEAM', 'CROSSPLAY', 'MOBILE');
CREATE TYPE "tournament_tier" AS ENUM ('COMMUNITY', 'OPEN', 'PRO');
CREATE TYPE "tournament_status" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');
CREATE TYPE "event_mode" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');
CREATE TYPE "role" AS ENUM ('MEMBER', 'MODERATOR', 'ADMIN');

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text,
  "email" text UNIQUE,
  "email_verified" timestamptz,
  "image" text,
  "role" "role" NOT NULL DEFAULT 'MEMBER',
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "accounts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "provider" text NOT NULL,
  "provider_account_id" text NOT NULL,
  "refresh_token" text,
  "access_token" text,
  "expires_at" integer,
  "token_type" text,
  "scope" text,
  "id_token" text,
  "session_state" text
);

CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_provider_account_id_key"
ON "accounts" ("provider", "provider_account_id");

CREATE TABLE IF NOT EXISTS "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "session_token" text NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "expires" timestamptz NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "sessions_session_token_key"
ON "sessions" ("session_token");

CREATE TABLE IF NOT EXISTS "verification_tokens" (
  "identifier" text NOT NULL,
  "token" text NOT NULL,
  "expires" timestamptz NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_token_key"
ON "verification_tokens" ("token");

CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_identifier_token_key"
ON "verification_tokens" ("identifier", "token");

CREATE TABLE IF NOT EXISTS "players" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NOT NULL DEFAULT NOW(),
  "name" text NOT NULL,
  "gamertag" text NOT NULL,
  "platform" "platform" NOT NULL,
  "position" text NOT NULL,
  "archetype" text,
  "club" text,
  "avatar_url" text,
  "overall" integer NOT NULL,
  "rating" integer,
  "bio" text
);

CREATE UNIQUE INDEX IF NOT EXISTS "players_gamertag_key"
ON "players" ("gamertag");

CREATE TABLE IF NOT EXISTS "tournaments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NOT NULL DEFAULT NOW(),
  "name" text NOT NULL,
  "organizer" text NOT NULL,
  "tier" "tournament_tier" NOT NULL,
  "start_date" timestamptz NOT NULL,
  "end_date" timestamptz,
  "format" text NOT NULL,
  "prize_pool" text,
  "slots_total" integer NOT NULL,
  "slots_taken" integer NOT NULL,
  "platform" "platform" NOT NULL,
  "registration_url" text,
  "status" "tournament_status" NOT NULL DEFAULT 'UPCOMING'
);

CREATE UNIQUE INDEX IF NOT EXISTS "tournaments_name_key"
ON "tournaments" ("name");

CREATE TABLE IF NOT EXISTS "community_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NOT NULL DEFAULT NOW(),
  "title" text NOT NULL,
  "organizer" text NOT NULL,
  "date" timestamptz NOT NULL,
  "location" text NOT NULL,
  "mode" "event_mode" NOT NULL,
  "summary" text NOT NULL,
  "link" text
);

CREATE UNIQUE INDEX IF NOT EXISTS "community_events_title_key"
ON "community_events" ("title");

CREATE TABLE IF NOT EXISTS "discussions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz NOT NULL DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL,
  "summary" text NOT NULL,
  "tags" text[],
  "replies" integer NOT NULL DEFAULT 0,
  "platform" "platform" NOT NULL,
  "last_activity" timestamptz NOT NULL DEFAULT NOW(),
  "author_name" text NOT NULL,
  "author_id" uuid REFERENCES "users"("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "discussions_title_key"
ON "discussions" ("title");

CREATE UNIQUE INDEX IF NOT EXISTS "discussions_slug_key"
ON "discussions" ("slug");
