CREATE TYPE "public"."event_mode" AS ENUM('ONLINE', 'OFFLINE', 'HYBRID');--> statement-breakpoint
CREATE TYPE "public"."platform" AS ENUM('CONSOLE', 'STEAM', 'CROSSPLAY', 'MOBILE');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('MEMBER', 'MODERATOR', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."tournament_status" AS ENUM('UPCOMING', 'ONGOING', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."tournament_tier" AS ENUM('COMMUNITY', 'OPEN', 'PRO');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "community_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"organizer" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"location" text NOT NULL,
	"mode" "event_mode" NOT NULL,
	"summary" text NOT NULL,
	"link" text
);
--> statement-breakpoint
CREATE TABLE "discussions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text NOT NULL,
	"tags" text[],
	"replies" integer DEFAULT 0 NOT NULL,
	"platform" "platform" NOT NULL,
	"last_activity" timestamp with time zone DEFAULT now() NOT NULL,
	"author_name" text NOT NULL,
	"author_id" uuid
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_token" text NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tournaments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"organizer" text NOT NULL,
	"tier" "tournament_tier" NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"format" text NOT NULL,
	"prize_pool" text,
	"slots_total" integer NOT NULL,
	"slots_taken" integer NOT NULL,
	"platform" "platform" NOT NULL,
	"registration_url" text,
	"status" "tournament_status" DEFAULT 'UPCOMING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"email_verified" timestamp with time zone,
	"image" text,
	"role" "role" DEFAULT 'MEMBER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts" USING btree ("provider","provider_account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "community_events_title_key" ON "community_events" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "discussions_title_key" ON "discussions" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "discussions_slug_key" ON "discussions" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "players_gamertag_key" ON "players" USING btree ("gamertag");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions" USING btree ("session_token");--> statement-breakpoint
CREATE UNIQUE INDEX "tournaments_name_key" ON "tournaments" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens" USING btree ("identifier","token");