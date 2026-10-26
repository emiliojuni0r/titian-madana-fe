// ============================================================
// PROJECT / MONITORING DATA
// ============================================================

export const STAGES = [
  "Prospek",
  "Penawaran",
  "Negosiasi",
  "Kesepakatan",
]

// ============================================================
// TANGGAL HARI INI
// ============================================================

export const TODAY = new Date().toISOString().slice(0, 10)

// ============================================================
// DATA TENDER
// ============================================================

export const TENDERS = [
  {
    id: 1,
    nama: "Budi Santoso",
    namaPerusahaan: "PT Maju Jaya",
    kontak: "0812-3456-7890",
  },
  {
    id: 2,
    nama: "Andi Wijaya",
    namaPerusahaan: "CV Sinar Abadi",
    kontak: "0813-4567-8901",
  },
  {
    id: 3,
    nama: "Dewi Lestari",
    namaPerusahaan: "PT Nusantara Teknologi",
    kontak: "0814-5678-9012",
  },
  {
    id: 4,
    nama: "Rudi Hartono",
    namaPerusahaan: "PT Karya Indonesia",
    kontak: "0815-6789-0123",
  },
  {
    id: 5,
    nama: "Siti Rahma",
    namaPerusahaan: "CV Berkah Mandiri",
    kontak: "0816-7890-1234",
  },
]

// ============================================================
// LEADS / PIPELINE
// ============================================================

export const SEED_LEADS = [
  {
    id: 1,
    tenderId: 1,
    layanan: "Pengembangan Website Company Profile",
    pic: "Andi",
    nilaiPenawaran: 85000000,
    stage: "Prospek",
    kontakTerakhir: TODAY,
    catatan: "Menunggu jadwal presentasi dengan direktur.",
  },
  {
    id: 2,
    tenderId: 2,
    layanan: "Sistem Informasi Manajemen",
    pic: "Budi",
    nilaiPenawaran: 175000000,
    stage: "Penawaran",
    kontakTerakhir: TODAY,
    catatan: "Proposal sudah dikirim ke procurement.",
  },
  {
    id: 3,
    tenderId: 3,
    layanan: "Aplikasi Mobile",
    pic: "Citra",
    nilaiPenawaran: 250000000,
    stage: "Negosiasi",
    kontakTerakhir: TODAY,
    catatan: "Negosiasi harga dan termin pembayaran.",
  },
  {
    id: 4,
    tenderId: 4,
    layanan: "Digitalisasi Dokumen",
    pic: "Deni",
    nilaiPenawaran: 120000000,
    stage: "Kesepakatan",
    kontakTerakhir: TODAY,
    catatan: "Harga sudah disetujui, menunggu kontrak.",
  },
  {
    id: 5,
    tenderId: 5,
    layanan: "Maintenance & Support",
    pic: "Eka",
    nilaiPenawaran: 65000000,
    stage: "Prospek",
    kontakTerakhir: TODAY,
    catatan: "Follow up setelah pemenang tender diumumkan.",
  },
]

// ============================================================
// DEFAULT MILESTONES
// ============================================================

export function DEFAULT_MILESTONES(startDate) {
  const start = new Date(startDate)

  const addDays = (days) => {
    const date = new Date(start)
    date.setDate(date.getDate() + days)

    return date.toISOString().slice(0, 10)
  }

  return [
    {
      nama: "Kickoff & Analisis Kebutuhan",
      due: addDays(14),
      bobot: 25,
      done: false,
    },
    {
      nama: "Desain & Perancangan",
      due: addDays(45),
      bobot: 25,
      done: false,
    },
    {
      nama: "Development / Implementasi",
      due: addDays(100),
      bobot: 25,
      done: false,
    },
    {
      nama: "Testing & Serah Terima",
      due: addDays(180),
      bobot: 25,
      done: false,
    },
  ]
}

// ============================================================
// SEED PROJECTS
// ============================================================

export const SEED_PROJECTS = [
  {
    id: 101,
    tenderId: 3,
    layanan: "Aplikasi Mobile",
    pic: "Citra",
    nilai: 230000000,
    dibayar: 115000000,
    mulai: "2026-05-01",
    target: "2026-10-28",
    selesai: undefined,
    milestones: [
      {
        nama: "Kickoff & Analisis Kebutuhan",
        due: "2026-05-15",
        bobot: 25,
        done: true,
      },
      {
        nama: "Desain & Perancangan",
        due: "2026-06-15",
        bobot: 25,
        done: true,
      },
      {
        nama: "Development / Implementasi",
        due: "2026-09-01",
        bobot: 25,
        done: false,
      },
      {
        nama: "Testing & Serah Terima",
        due: "2026-10-28",
        bobot: 25,
        done: false,
      },
    ],
  },

  {
    id: 102,
    tenderId: 1,
    layanan: "Website Company Profile",
    pic: "Andi",
    nilai: 85000000,
    dibayar: 85000000,
    mulai: "2026-02-01",
    target: "2026-05-30",
    selesai: "2026-05-28",
    milestones: [
      {
        nama: "Kickoff & Analisis Kebutuhan",
        due: "2026-02-10",
        bobot: 25,
        done: true,
      },
      {
        nama: "Desain & Perancangan",
        due: "2026-03-01",
        bobot: 25,
        done: true,
      },
      {
        nama: "Development / Implementasi",
        due: "2026-04-30",
        bobot: 25,
        done: true,
      },
      {
        nama: "Testing & Serah Terima",
        due: "2026-05-30",
        bobot: 25,
        done: true,
      },
    ],
  },

  {
    id: 103,
    tenderId: 4,
    layanan: "Digitalisasi Dokumen",
    pic: "Deni",
    nilai: 120000000,
    dibayar: 30000000,
    mulai: "2026-08-01",
    target: "2027-01-28",
    selesai: undefined,
    milestones: [
      {
        nama: "Kickoff & Analisis Kebutuhan",
        due: "2026-08-15",
        bobot: 25,
        done: true,
      },
      {
        nama: "Desain & Perancangan",
        due: "2026-09-15",
        bobot: 25,
        done: false,
      },
      {
        nama: "Development / Implementasi",
        due: "2026-11-15",
        bobot: 25,
        done: false,
      },
      {
        nama: "Testing & Serah Terima",
        due: "2027-01-28",
        bobot: 25,
        done: false,
      },
    ],
  },
]

// ============================================================
// HEALTH COLORS
// ============================================================

export const HEALTH_COLORS = {
  Aman: "#10B981",
  "Perlu Perhatian": "#F59E0B",
  Terlambat: "#EF4444",
}

// ============================================================
// HELPER: TENDER
// ============================================================

export function tenderOf(tenderId) {
  return (
    TENDERS.find((tender) => tender.id === tenderId) || {
      id: tenderId,
      nama: "-",
      namaPerusahaan: "-",
      kontak: "-",
    }
  )
}

// ============================================================
// HELPER: PROGRESS
// ============================================================

export function progressOf(project) {
  if (!project || !project.milestones?.length) {
    return 0
  }

  const total = project.milestones.reduce(
    (sum, milestone) => sum + (milestone.done ? milestone.bobot : 0),
    0,
  )

  return Math.round(total)
}

// ============================================================
// HELPER: HEALTH
// ============================================================

export function healthOf(project) {
  if (!project) {
    return "Aman"
  }

  const progress = progressOf(project)

  if (progress === 100) {
    return "Aman"
  }

  const overdue = project.milestones.some(
    (milestone) =>
      !milestone.done && milestone.due < TODAY,
  )

  if (overdue) {
    return "Terlambat"
  }

  const targetDate = new Date(project.target)
  const today = new Date(TODAY)

  const daysRemaining = Math.ceil(
    (targetDate - today) / (1000 * 60 * 60 * 24),
  )

  if (daysRemaining <= 30 && progress < 75) {
    return "Perlu Perhatian"
  }

  return "Aman"
}
