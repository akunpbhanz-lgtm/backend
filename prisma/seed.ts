import { PrismaClient, Platform, TournamentStatus, TournamentTier, EventMode, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "founder@efozone.id" },
    update: {},
    create: {
      email: "founder@efozone.id",
      name: "Admin EFOZone",
      role: Role.ADMIN,
      image: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=80",
    },
  });

  const players = [
    {
      name: "Raka Sandika",
      gamertag: "RAKA-CTRL",
      platform: Platform.CONSOLE,
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
      platform: Platform.STEAM,
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
      platform: Platform.CONSOLE,
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
      platform: Platform.CROSSPLAY,
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
      platform: Platform.CROSSPLAY,
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
      platform: Platform.CONSOLE,
      position: "CDM",
      archetype: "Anchor Playmaker",
      club: "Bali Horizon",
      avatarUrl: "https://avatars.githubusercontent.com/u/6?v=4",
      overall: 89,
      rating: 5,
      bio: "High block pressing 4-3-3 narrow dengan tikungan tempo micro adjustment.",
    },
  ];

  for (const player of players) {
    await prisma.player.upsert({
      where: { gamertag: player.gamertag },
      update: {
        ...player,
      },
      create: player,
    });
  }

  const tournaments = [
    {
      name: "Liga Nusantara Vol.4",
      organizer: "EFOZone Crew",
      tier: TournamentTier.COMMUNITY,
      startDate: new Date("2025-05-31T13:00:00+07:00"),
      endDate: new Date("2025-06-30T21:00:00+07:00"),
      format: "Round Robin • BO2",
      prizePool: "Total 5.000.000",
      slotsTotal: 16,
      slotsTaken: 12,
      platform: Platform.CROSSPLAY,
      registrationUrl: "https://discord.gg/efozone",
      status: TournamentStatus.ONGOING,
    },
    {
      name: "Pro Invitational Scrim Night",
      organizer: "EFO Pro Division",
      tier: TournamentTier.PRO,
      startDate: new Date("2025-06-02T21:00:00+07:00"),
      endDate: new Date("2025-06-02T23:00:00+07:00"),
      format: "BO3 Mixed Squad",
      prizePool: "Sparring Prize 3.000.000",
      slotsTotal: 8,
      slotsTaken: 6,
      platform: Platform.CONSOLE,
      registrationUrl: "https://discord.gg/efozone",
      status: TournamentStatus.UPCOMING,
    },
    {
      name: "Open Qualifier Cup",
      organizer: "EFO Open Series",
      tier: TournamentTier.OPEN,
      startDate: new Date("2025-06-07T13:00:00+07:00"),
      endDate: new Date("2025-06-07T19:00:00+07:00"),
      format: "Single Elimination • BO1",
      prizePool: "Slot Offline Final",
      slotsTotal: 32,
      slotsTaken: 24,
      platform: Platform.STEAM,
      registrationUrl: "https://discord.gg/efozone",
      status: TournamentStatus.UPCOMING,
    },
    {
      name: "Community Clash Series",
      organizer: "EFOZone Community",
      tier: TournamentTier.COMMUNITY,
      startDate: new Date("2025-06-15T19:30:00+07:00"),
      endDate: new Date("2025-06-20T22:00:00+07:00"),
      format: "Swiss Stage • BO1",
      prizePool: "Merch & Bootcamp Slot",
      slotsTotal: 24,
      slotsTaken: 18,
      platform: Platform.CROSSPLAY,
      registrationUrl: "https://discord.gg/efozone",
      status: TournamentStatus.UPCOMING,
    },
  ];

  for (const tournament of tournaments) {
    await prisma.tournament.upsert({
      where: { name: tournament.name },
      update: tournament,
      create: tournament,
    });
  }

  const events = [
    {
      title: "Bootcamp Analisa Patch 4.0",
      organizer: "Coach Damar",
      date: new Date("2025-06-01T20:00:00+07:00"),
      location: "Discord Stage #analysis-room",
      mode: EventMode.ONLINE,
      summary: "Kupas tuntas perubahan meta patch 4.0 dengan studi kasus match top tier.",
      link: "https://discord.gg/efozone",
    },
    {
      title: "Community Watch Party Final Asian Cup",
      organizer: "EFO Community ID",
      date: new Date("2025-06-08T19:00:00+07:00"),
      location: "Jakarta — Space Garage",
      mode: EventMode.OFFLINE,
      summary: "Nobar, giveaway jersey, dan scrim mini turnamen setelah pertandingan.",
      link: "https://event.efozone.id/watchparty",
    },
    {
      title: "Scrim Mixer Console x Steam",
      organizer: "Mixer Squad",
      date: new Date("2025-06-05T21:00:00+07:00"),
      location: "Discord Voice #scrim-mixer",
      mode: EventMode.HYBRID,
      summary: "Mix roster lintas platform buat calibrate rotasi dan synergy sebelum turnamen besar.",
      link: "https://discord.gg/efozone",
    },
  ];

  for (const event of events) {
    await prisma.communityEvent.upsert({
      where: { title: event.title },
      update: event,
      create: event,
    });
  }

  const discussions = [
    {
      title: "Pressing 4-3-3 Narrow Build Patch 4.0",
      slug: "pressing-4-3-3-narrow-patch-4-0",
      summary:
        "Breakdown cara nge-press high block dengan L1 trigger + manual jockey. Lengkap dengan video breakdown dan mapping controller.",
      tags: ["tactics", "4-3-3", "pressing"],
      replies: 68,
      platform: Platform.CONSOLE,
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
      platform: Platform.STEAM,
      lastActivity: new Date("2025-05-30T18:00:00+07:00"),
      authorName: "Valdo",
    },
    {
      title: "Setting Kamera & Overlay buat Scrim Broadcast",
      slug: "setting-kamera-overlay-scrim",
      summary: "Template overlay scoreboard custom buat matchday liga komunitas. Include file OBS & PSD.",
      tags: ["broadcast", "overlay", "coaching"],
      replies: 33,
      platform: Platform.CROSSPLAY,
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
      platform: Platform.CONSOLE,
      lastActivity: new Date("2025-05-27T17:00:00+07:00"),
      authorName: "Alpha",
    },
  ];

  for (const discussion of discussions) {
    await prisma.discussion.upsert({
      where: { slug: discussion.slug },
      update: discussion,
      create: discussion,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
