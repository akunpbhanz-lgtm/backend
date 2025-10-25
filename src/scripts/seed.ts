import "dotenv/config";

import {
  communityEvents,
  discussions,
  EventMode,
  Platform,
  players,
  Role,
  TournamentStatus,
  TournamentTier,
  tournaments,
  users,
} from "@/db";
import { db } from "@/db";

async function main() {
  const adminEmail = "founder@efozone.id";

  const [admin] = await db
    .insert(users)
    .values({
      email: adminEmail,
      name: "Admin EFOZone",
      image:
        "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=80",
      role: "ADMIN" satisfies Role,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        name: "Admin EFOZone",
        image:
          "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=80",
        updatedAt: new Date(),
        role: "ADMIN" satisfies Role,
      },
    })
    .returning();

  console.log(`Seed user ready: ${admin.email}`);

  const playerData = [
    {
      name: "Raka Sandika",
      gamertag: "RAKA-CTRL",
      platform: "CONSOLE" as Platform,
      position: "CAM",
      archetype: "Possession Maestro",
      club: "Jakarta Galaxy",
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
      overall: 92,
      rating: 4,
      bio: "Inverted winger overload dengan tempo switching tajam di half-space kiri.",
    },
    {
      name: "Nico Pramana",
      gamertag: "NICO-TURBO",
      platform: "STEAM" as Platform,
      position: "CF",
      archetype: "High Press",
      club: "Bandung Velocity",
      avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
      overall: 90,
      rating: 5,
      bio: "Trigger press agresif dengan counter press 7 detik dan cover wide CB.",
    },
    {
      name: "Dewi Laras",
      gamertag: "DEWI-COUNTER",
      platform: "CONSOLE" as Platform,
      position: "RW",
      archetype: "Vertical Runner",
      club: "Surabaya Phoenix",
      avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4",
      overall: 91,
      rating: 5,
      bio: "Serangan balik vertical 4-3-3 hybrid dengan memanfaatkan overload flank.",
    },
    {
      name: "Alpha Nugraha",
      gamertag: "ALPHA-TIER",
      platform: "CROSSPLAY" as Platform,
      position: "LW",
      archetype: "Meta Finisher",
      club: "Makassar Reign",
      avatarUrl: "https://avatars.githubusercontent.com/u/4?v=4",
      overall: 93,
      rating: 5,
      bio: "Cut-inside finisher dengan preset sprint 1v1 dan kombinasi skill cancell.",
    },
    {
      name: "Neyra Dwi",
      gamertag: "NEYRA-BROADCAST",
      platform: "CROSSPLAY" as Platform,
      position: "CM",
      archetype: "Broadcast Strategist",
      club: "Yogyakarta Pulse",
      avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
      overall: 88,
      rating: 4,
      bio: "Menjaga shape mid-block sambil koordinasi overlay broadcast dan scoreboard.",
    },
    {
      name: "Rivandra G",
      gamertag: "RIV-433",
      platform: "CONSOLE" as Platform,
      position: "CDM",
      archetype: "Anchor Playmaker",
      club: "Bali Horizon",
      avatarUrl: "https://avatars.githubusercontent.com/u/6?v=4",
      overall: 89,
      rating: 5,
      bio: "High block pressing 4-3-3 narrow dengan tikungan tempo micro adjustment.",
    },
  ];

  for (const player of playerData) {
    await db
      .insert(players)
      .values(player)
      .onConflictDoUpdate({
        target: players.gamertag,
        set: { ...player, updatedAt: new Date() },
      });
  }
  console.log(`Seeded ${playerData.length} players`);

  const tournamentData = [
    {
      name: "Liga Nusantara Vol.4",
      organizer: "EFOZone Crew",
      tier: "COMMUNITY" as TournamentTier,
      startDate: new Date("2025-05-31T13:00:00+07:00"),
      endDate: new Date("2025-06-30T21:00:00+07:00"),
      format: "Round Robin • BO2",
      prizePool: "Total 5.000.000",
      slotsTotal: 16,
      slotsTaken: 12,
      platform: "CROSSPLAY" as Platform,
      registrationUrl: "https://discord.gg/efozone",
      status: "ONGOING" as TournamentStatus,
    },
    {
      name: "Pro Invitational Scrim Night",
      organizer: "EFO Pro Division",
      tier: "PRO" as TournamentTier,
      startDate: new Date("2025-06-02T21:00:00+07:00"),
      endDate: new Date("2025-06-02T23:00:00+07:00"),
      format: "BO3 Mixed Squad",
      prizePool: "Sparring Prize 3.000.000",
      slotsTotal: 8,
      slotsTaken: 6,
      platform: "CONSOLE" as Platform,
      registrationUrl: "https://discord.gg/efozone",
      status: "UPCOMING" as TournamentStatus,
    },
    {
      name: "Open Qualifier Cup",
      organizer: "EFO Open Series",
      tier: "OPEN" as TournamentTier,
      startDate: new Date("2025-06-07T13:00:00+07:00"),
      endDate: new Date("2025-06-07T19:00:00+07:00"),
      format: "Single Elimination • BO1",
      prizePool: "Slot Offline Final",
      slotsTotal: 32,
      slotsTaken: 24,
      platform: "STEAM" as Platform,
      registrationUrl: "https://discord.gg/efozone",
      status: "UPCOMING" as TournamentStatus,
    },
    {
      name: "Community Clash Series",
      organizer: "EFOZone Community",
      tier: "COMMUNITY" as TournamentTier,
      startDate: new Date("2025-06-15T19:30:00+07:00"),
      endDate: new Date("2025-06-20T22:00:00+07:00"),
      format: "Swiss Stage • BO1",
      prizePool: "Merch & Bootcamp Slot",
      slotsTotal: 24,
      slotsTaken: 18,
      platform: "CROSSPLAY" as Platform,
      registrationUrl: "https://discord.gg/efozone",
      status: "UPCOMING" as TournamentStatus,
    },
  ];

  for (const tournament of tournamentData) {
    await db
      .insert(tournaments)
      .values(tournament)
      .onConflictDoUpdate({
        target: tournaments.name,
        set: { ...tournament, updatedAt: new Date() },
      });
  }
  console.log(`Seeded ${tournamentData.length} tournaments`);

  const eventData = [
    {
      title: "Bootcamp Analisa Patch 4.0",
      organizer: "Coach Damar",
      date: new Date("2025-06-01T20:00:00+07:00"),
      location: "Discord Stage #analysis-room",
      mode: "ONLINE" as EventMode,
      summary: "Kupas tuntas perubahan meta patch 4.0 dengan studi kasus match top tier.",
      link: "https://discord.gg/efozone",
    },
    {
      title: "Community Watch Party Final Asian Cup",
      organizer: "EFO Community ID",
      date: new Date("2025-06-08T19:00:00+07:00"),
      location: "Jakarta — Space Garage",
      mode: "OFFLINE" as EventMode,
      summary: "Nobar, giveaway jersey, dan scrim mini turnamen setelah pertandingan.",
      link: "https://event.efozone.id/watchparty",
    },
    {
      title: "Scrim Mixer Console x Steam",
      organizer: "Mixer Squad",
      date: new Date("2025-06-05T21:00:00+07:00"),
      location: "Discord Voice #scrim-mixer",
      mode: "HYBRID" as EventMode,
      summary: "Mix roster lintas platform buat calibrate rotasi dan synergy sebelum turnamen besar.",
      link: "https://discord.gg/efozone",
    },
  ];

  for (const event of eventData) {
    await db
      .insert(communityEvents)
      .values(event)
      .onConflictDoUpdate({
        target: communityEvents.title,
        set: { ...event, updatedAt: new Date() },
      });
  }
  console.log(`Seeded ${eventData.length} community events`);

  const discussionData = [
    {
      title: "Pressing 4-3-3 Narrow Build Patch 4.0",
      slug: "pressing-4-3-3-narrow-patch-4-0",
      summary:
        "Breakdown cara nge-press high block dengan L1 trigger + manual jockey. Lengkap dengan video breakdown dan mapping controller.",
      tags: ["tactics", "4-3-3", "pressing"],
      replies: 68,
      platform: "CONSOLE" as Platform,
      lastActivity: new Date("2025-05-30T22:00:00+07:00"),
      authorName: "Rivandra",
    },
    {
      title: "Optimasi Formasi 3-2-2-3 buat Steam Player",
      slug: "optimasi-formasi-3-2-2-3-steam",
      summary:
        "Analisa build balanced yang tetap sustain stamina. Share preset slider dan variasi pressing sesuai lawan.",
      tags: ["formation", "steam", "build"],
      replies: 54,
      platform: "STEAM" as Platform,
      lastActivity: new Date("2025-05-30T18:00:00+07:00"),
      authorName: "Valdo",
    },
    {
      title: "Setting Kamera & Overlay buat Scrim Broadcast",
      slug: "setting-kamera-overlay-scrim",
      summary:
        "Template overlay scoreboard custom buat matchday liga komunitas. Include file OBS & PSD.",
      tags: ["broadcast", "overlay", "coaching"],
      replies: 33,
      platform: "CROSSPLAY" as Platform,
      lastActivity: new Date("2025-05-29T21:00:00+07:00"),
      authorName: "Neyra",
    },
    {
      title: "Tier List Winger Pasca Hotfix Dribbling",
      slug: "tier-list-winger-hotfix",
      summary:
        "Tier list detail winger kiri/kanan termasuk statistik sprint 1v1 dan finishing cut-inside.",
      tags: ["meta", "players", "analysis"],
      replies: 41,
      platform: "CONSOLE" as Platform,
      lastActivity: new Date("2025-05-27T17:00:00+07:00"),
      authorName: "Alpha",
    },
  ];

  for (const discussion of discussionData) {
    await db
      .insert(discussions)
      .values(discussion)
      .onConflictDoUpdate({
        target: discussions.slug,
        set: {
          ...discussion,
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded ${discussionData.length} discussions`);
}

main()
  .then(() => {
    console.log("Seeding completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
