import { useRef, useState } from "react"
import { formatRupiah, formatRupiahShort } from "@/lib/rupiah"
import { formatDate } from "@/lib/date"

import {
  STAGES,
  SEED_LEADS,
  SEED_PROJECTS,
  DEFAULT_MILESTONES,
  TODAY,
  HEALTH_COLORS,
  tenderOf,
  progressOf,
  healthOf,
} from "../../data/example/projects"
import { SiteHeader } from "@/components/sidebar/site-header"

const card = {
  border: "1px solid rgba(255,255,255,0.06)",
}

const mono = { fontFamily: "JetBrains Mono, monospace" }

const STAGE_META = {
  Prospek: {
    label: "Prospek",
    hint: "Pemenang tender teridentifikasi",
    color: "#64748B",
  },
  Penawaran: {
    label: "Penawaran Terkirim",
    hint: "Marketing menawarkan jasa",
    color: "#3B82F6",
  },
  Negosiasi: {
    label: "Negosiasi",
    hint: "Pembahasan harga & termin",
    color: "#F59E0B",
  },
  Kesepakatan: {
    label: "Kesepakatan",
    hint: "Disetujui, menunggu kontrak",
    color: "#A78BFA",
  },
}

const COLUMNS = [
  ...STAGES.map((k) => ({
    key: k,
    ...STAGE_META[k],
  })),
  {
    key: "Berjalan",
    label: "Proyek Berjalan",
    hint: "Deal tercapai, sedang dikerjakan",
    color: "#10B981",
  },
  {
    key: "Selesai",
    label: "Selesai",
    hint: "Sudah serah terima",
    color: "#94A3B8",
  },
]

const FILTERS = [
  {
    key: "semua",
    label: "Semua",
    cols: COLUMNS.map((c) => c.key),
  },
  {
    key: "penawaran",
    label: "Penawaran",
    cols: ["Prospek", "Penawaran"],
  },
  {
    key: "negosiasi",
    label: "Negosiasi",
    cols: ["Negosiasi"],
  },
  {
    key: "kesepakatan",
    label: "Kesepakatan",
    cols: ["Kesepakatan"],
  },
  {
    key: "berjalan",
    label: "Proyek Berjalan",
    cols: ["Berjalan"],
  },
  {
    key: "selesai",
    label: "Proyek Selesai",
    cols: ["Selesai"],
  },
]

function ProgressBar({ value, color }) {
  return (
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background: color,
        }}
      />
    </div>
  )
}

function HealthBadge({ project }) {
  const h = healthOf(project)
  const c = HEALTH_COLORS[h]

  return (
    <span
      className="text-xs px-2 py-0.5 rounded-md font-600 whitespace-nowrap"
      style={{
        background: `${c}22`,
        color: c,
        border: `1px solid ${c}40`,
      }}
    >
      {h}
    </span>
  )
}

export default function Monitoring() {
  const drag = useRef(null)
  const [filter, setFilter] = useState("semua")
  const [overCol, setOverCol] = useState(null)
  const [leads, setLeads] = useState(SEED_LEADS)
  const [projects, setProjects] = useState(SEED_PROJECTS)
  const [lost, setLost] = useState(2)
  const [openId, setOpenId] = useState(null)
  const [toast, setToast] = useState(null)

  const running = projects.filter((p) => progressOf(p) < 100)
  const done = projects.filter((p) => progressOf(p) === 100)
  const open = projects.find((p) => p.id === openId) ?? null

  const nilaiBerjalan = running.reduce((s, p) => s + p.nilai, 0)
  const nilaiPipeline = leads.reduce((s, l) => s + l.nilaiPenawaran, 0)
  const telat = running.filter((p) => healthOf(p) === "Terlambat").length

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3200)
  }

  const advance = (l) => {
    const next = STAGES[STAGES.indexOf(l.stage) + 1]

    setLeads((ls) =>
      ls.map((x) =>
        x.id === l.id
          ? {
            ...x,
            stage: next,
            kontakTerakhir: TODAY,
          }
          : x,
      ),
    )
  }

  const closeDeal = (l) => {
    const p = {
      id: Math.max(0, ...projects.map((x) => x.id)) + 1,
      tenderId: l.tenderId,
      layanan: l.layanan,
      pic: l.pic,
      nilai: l.nilaiPenawaran,
      dibayar: 0,
      mulai: TODAY,
      target: new Date(
        new Date(TODAY).getTime() + 180 * 864e5,
      )
        .toISOString()
        .slice(0, 10),
      milestones: DEFAULT_MILESTONES(TODAY),
    }

    setProjects((ps) => [p, ...ps])

    setLeads((ls) => ls.filter((x) => x.id !== l.id))

    flash(
      `Proyek dimulai. "${l.layanan}" masuk ke monitoring proyek.`,
    )
  }

  const dropLead = (l) => {
    setLeads((ls) => ls.filter((x) => x.id !== l.id))
    setLost((n) => n + 1)
  }

  const toggleMilestone = (pid, idx) => {
    setProjects((ps) =>
      ps.map((p) => {
        if (p.id !== pid) return p

        const milestones = p.milestones.map((m, i) =>
          i === idx
            ? {
              ...m,
              done: !m.done,
            }
            : m,
        )

        const next = {
          ...p,
          milestones,
        }

        const prog = progressOf(next)

        next.selesai = prog === 100 ? TODAY : undefined

        next.dibayar = Math.round(
          p.nilai *
          (prog === 100
            ? 1
            : Math.floor(prog / 25) * 0.25),
        )

        return next
      }),
    )
  }

  const drop = (col) => {
    const d = drag.current

    drag.current = null
    setOverCol(null)

    if (!d) return

    if (d.kind === "lead") {
      const l = leads.find((x) => x.id === d.id)

      if (!l) return

      if (col === "Berjalan") {
        closeDeal(l)
      } else if (col === "Selesai") {
        flash(
          "Selesaikan kesepakatan dulu sebelum proyek bisa ditandai selesai.",
        )
      } else if (col !== l.stage) {
        setLeads((ls) =>
          ls.map((x) =>
            x.id === l.id
              ? {
                ...x,
                stage: col,
                kontakTerakhir: TODAY,
              }
              : x,
          ),
        )
      }

      return
    }

    const p = projects.find((x) => x.id === d.id)

    if (!p) return

    const isDone = progressOf(p) === 100

    if (col === "Selesai" && !isDone) {
      setProjects((ps) =>
        ps.map((x) =>
          x.id === p.id
            ? {
              ...x,
              milestones: x.milestones.map((m) => ({
                ...m,
                done: true,
              })),
              selesai: TODAY,
              dibayar: x.nilai,
            }
            : x,
        ),
      )

      flash(
        "Proyek ditandai selesai, semua milestone terpenuhi.",
      )
    } else if (col === "Berjalan" && isDone) {
      const last = p.milestones.length - 1

      setProjects((ps) =>
        ps.map((x) =>
          x.id === p.id
            ? {
              ...x,
              selesai: undefined,
              milestones: x.milestones.map((m, i) =>
                i === last
                  ? {
                    ...m,
                    done: false,
                  }
                  : m,
              ),
            }
            : x,
        ),
      )

      flash(
        "Proyek dibuka kembali, milestone terakhir belum selesai.",
      )
    } else if (
      col !== "Berjalan" &&
      col !== "Selesai"
    ) {
      flash(
        "Proyek yang sudah deal tidak bisa kembali ke pipeline penawaran.",
      )
    }
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 relative">
      <SiteHeader breadcrumbs={[
        {
          label: "Titian Market",
        },
        {
          label: "Monitoring",
        },
      ]} />

      {/* Alur */}
      <div
        className="rounded-xl px-5 py-4 flex items-center gap-2 overflow-x-auto bg-gray-100"
        style={card}
      >
        {[
          {
            l: "Tender",
            s: "Pemenang diambil",
            c: "#64748B",
          },
          {
            l: "Penawaran",
            s: "Tim marketing",
            c: "#3B82F6",
          },
          {
            l: "Kesepakatan",
            s: "Deal / batal",
            c: "#F59E0B",
          },
          {
            l: "Monitoring",
            s: "Proyek berjalan",
            c: "#10B981",
          },
          {
            l: "Selesai",
            s: "Serah terima",
            c: "#94A3B8",
          },
        ].map((s, i, a) => (
          <div
            key={s.l}
            className="flex items-center gap-2 flex-1 min-w-fit"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 flex-shrink-0"
                style={{
                  background: `${s.c}22`,
                  color: s.c,
                  border: `1px solid ${s.c}55`,
                  ...mono,
                }}
              >
                {i + 1}
              </div>

              <div>
                <div
                  className="text-xs font-600"
                  style={{ color: "#000000" }}
                >
                  {s.l}
                </div>

                <div
                  className="text-xs"
                  style={{ color: "#475569" }}
                >
                  {s.s}
                </div>
              </div>
            </div>

            {i < a.length - 1 && (
              <div
                className="flex-1 h-px mx-2 min-w-6"
                style={{
                  background: "rgba(255,255,255,0.1)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Nilai Pipeline",
            value: formatRupiahShort(nilaiPipeline),
            sub: `${leads.length} prospek aktif`,
            accent: "#3B82F6",
          },
          {
            label: "Proyek Berjalan",
            value: running.length.toString(),
            sub: `Nilai ${formatRupiahShort(nilaiBerjalan)}`,
            accent: "#10B981",
          },
          {
            label: "Terlambat",
            value: telat.toString(),
            sub: telat
              ? "Butuh tindak lanjut"
              : "Semua sesuai jadwal",
            accent: telat ? "#EF4444" : "#64748B",
          },
          {
            label: "Win Rate",
            value: `${Math.round(
              (projects.length /
                (projects.length + lost + leads.length)) *
              100,
            )}%`,
            sub: `${projects.length} deal, ${lost} batal`,
            accent: "#F59E0B",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-5 py-4 bg-gray-100"
            style={card}
          >
            <div
              className="text-xs font-500 mb-2"
              style={{ color: "#475569" }}
            >
              {s.label}
            </div>

            <div
              className="text-xl font-700"
              style={{
                color: s.accent,
                ...mono,
              }}
            >
              {s.value}
            </div>

            <div
              className="text-xs mt-1"
              style={{ color: "#475569" }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key

          const n = f.cols.reduce(
            (sum, k) =>
              sum +
              (k === "Berjalan"
                ? running.length
                : k === "Selesai"
                  ? done.length
                  : leads.filter((l) => l.stage === k).length),
            0,
          )

          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="text-xs px-3 py-1.5 rounded-lg font-500 flex items-center gap-2 transition-all"
              style={{
                background: active ? "#3B82F6" : "#efefef",
                color: active ? "#fff" : "#64748B",
                border: `1px solid ${active
                  ? "#3B82F6"
                  : "rgba(255,255,255,0.1)"
                  }`,
              }}
            >
              {f.label}

              <span
                style={{
                  opacity: 0.7,
                  ...mono,
                }}
              >
                {n}
              </span>
            </button>
          )
        })}
      </div>

      {/* Board */}
      <div
        className={`gap-4 pb-4 items-start ${filter === "semua"
          ? "flex overflow-x-auto"
          : "grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))]"
          }`}
      >
        {COLUMNS.filter((c) =>
          FILTERS.find(
            (f) => f.key === filter,
          ).cols.includes(c.key),
        ).map((col) => {
          const isLead =
            col.key !== "Berjalan" &&
            col.key !== "Selesai"

          const leadItems = isLead
            ? leads.filter(
              (l) => l.stage === col.key,
            )
            : []

          const projItems =
            col.key === "Berjalan"
              ? running
              : col.key === "Selesai"
                ? done
                : []

          const count =
            leadItems.length + projItems.length

          const over = overCol === col.key

          return (
            <div
              key={col.key}
              onDragOver={(e) => {
                e.preventDefault()
                setOverCol(col.key)
              }}
              onDragLeave={() =>
                setOverCol((c) =>
                  c === col.key ? null : c,
                )
              }
              onDrop={(e) => {
                e.preventDefault()
                drop(col.key)
              }}
              className={`${filter === "semua"
                ? "w-72 flex-shrink-0"
                : ""
                } rounded-xl p-3 space-y-3 transition-colors`}
              style={{
                background: over
                  ? "rgba(59,130,246,0.05)"
                  : "#F8FAFC",
                border: `1px solid ${over
                  ? "rgba(59,130,246,0.35)"
                  : "#E2E8F0"
                  }`,
                minHeight: 320,
              }}
            >
              <div className="px-1 pt-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: col.color,
                    }}
                  />

                  <span
                    className="text-sm font-600"
                    style={{
                      color: "#0F172A",
                    }}
                  >
                    {col.label}
                  </span>

                  <span
                    className="text-xs ml-auto"
                    style={{
                      color: "#64748B",
                      ...mono,
                    }}
                  >
                    {count}
                  </span>
                </div>

                <div
                  className="text-xs mt-0.5 ml-4"
                  style={{
                    color: "#64748B",
                  }}
                >
                  {col.hint}
                </div>
              </div>

              {count === 0 && (
                <div
                  className="text-xs text-center py-10 rounded-lg"
                  style={{
                    color: "#94A3B8",
                    border:
                      "1px dashed #CBD5E1",
                    background: "#FFFFFF",
                  }}
                >
                  Seret kartu ke sini
                </div>
              )}

              {leadItems.map((l) => {
                const t = tenderOf(l.tenderId)

                return (
                  <div
                    key={l.id}
                    draggable
                    onDragStart={() => {
                      drag.current = {
                        kind: "lead",
                        id: l.id,
                      }
                    }}
                    onDragEnd={() => {
                      drag.current = null
                      setOverCol(null)
                    }}
                    className="rounded-lg p-3.5 space-y-2.5 cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors"
                    style={{
                      ...card,
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      boxShadow:
                        "0 1px 2px rgba(15,23,42,0.04)",
                    }}
                  >
                    <div>
                      <div
                        className="text-sm font-600 leading-snug"
                        style={{
                          color: "#0F172A",
                        }}
                      >
                        {t.namaPerusahaan}
                      </div>

                      <div
                        className="text-xs mt-0.5 line-clamp-1"
                        style={{
                          color: "#64748B",
                        }}
                      >
                        Pemenang: {t.nama}
                      </div>
                    </div>

                    <div
                      className="text-xs"
                      style={{
                        color: "#475569",
                      }}
                    >
                      {l.layanan}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-600"
                        style={{
                          color: "#2563EB",
                          ...mono,
                        }}
                      >
                        {formatRupiahShort(
                          l.nilaiPenawaran,
                        )}
                      </span>

                      <span
                        className="text-xs"
                        style={{
                          color: "#64748B",
                        }}
                      >
                        {l.pic}
                      </span>
                    </div>

                    <div
                      className="text-xs rounded-md px-2.5 py-1.5"
                      style={{
                        background: "#F1F5F9",
                        color: "#64748B",
                      }}
                    >
                      {l.catatan}
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      {l.stage === "Kesepakatan" ? (
                        <button
                          onClick={() => closeDeal(l)}
                          className="flex-1 py-1.5 rounded-md text-xs font-600 hover:brightness-110"
                          style={{
                            background: "#10B981",
                            color: "#FFFFFF",
                          }}
                        >
                          Mulai proyek, masuk monitoring
                        </button>
                      ) : (
                        <button
                          onClick={() => advance(l)}
                          className="flex-1 py-1.5 rounded-md text-xs font-600 hover:brightness-110"
                          style={{
                            background: "#2563EB",
                            color: "#FFFFFF",
                          }}
                        >
                          {l.stage === "Prospek"
                            ? "Kirim penawaran"
                            : l.stage === "Penawaran"
                              ? "Mulai negosiasi"
                              : "Sepakat"}
                        </button>
                      )}

                      <button
                        onClick={() => dropLead(l)}
                        className="px-2.5 py-1.5 rounded-md text-xs font-500 hover:brightness-125"
                        style={{
                          background: "#FEF2F2",
                          color: "#DC2626",
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )
              })}

              {projItems.map((p) => {
                const t = tenderOf(p.tenderId)
                const prog = progressOf(p)
                const c =
                  HEALTH_COLORS[healthOf(p)]
                const next = p.milestones.find(
                  (m) => !m.done,
                )

                return (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => {
                      drag.current = {
                        kind: "project",
                        id: p.id,
                      }
                    }}
                    onDragEnd={() => {
                      drag.current = null
                      setOverCol(null)
                    }}
                    onClick={() => setOpenId(p.id)}
                    className="rounded-lg p-3.5 space-y-2.5 cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors"
                    style={{
                      ...card,
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      boxShadow:
                        "0 1px 2px rgba(15,23,42,0.04)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className="text-sm font-600 leading-snug"
                        style={{
                          color: "#0F172A",
                        }}
                      >
                        {p.layanan}
                      </div>

                      <HealthBadge project={p} />
                    </div>

                    <div
                      className="text-xs"
                      style={{
                        color: "#64748B",
                      }}
                    >
                      {t.namaPerusahaan}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex-1">
                        <ProgressBar
                          value={prog}
                          color={c}
                        />
                      </div>

                      <span
                        className="text-xs"
                        style={{
                          color: "#64748B",
                          ...mono,
                        }}
                      >
                        {prog}%
                      </span>
                    </div>

                    <div
                      className="flex items-center justify-between text-xs"
                      style={{
                        color: "#64748B",
                      }}
                    >
                      <span style={mono}>
                        {formatRupiahShort(p.nilai)}
                      </span>

                      <span>
                        {p.selesai
                          ? `Selesai ${formatDate(
                            p.selesai,
                          )}`
                          : `Target ${formatDate(
                            p.target,
                          )}`}
                      </span>
                    </div>

                    {next && (
                      <div
                        className="text-xs rounded-md px-2.5 py-1.5"
                        style={{
                          background: "#F1F5F9",
                          color:
                            next.due < TODAY
                              ? "#DC2626"
                              : "#64748B",
                        }}
                      >
                        Berikutnya: {next.nama}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

          )
        })}
      </div>

      {/* Drawer detail proyek */}
      {open && (
        <ProjectDrawer
          project={open}
          onClose={() => setOpenId(null)}
          onToggle={(idx) =>
            toggleMilestone(open.id, idx)
          }
        />
      )}

      {toast && (
        <div
          className="fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-500 shadow-2xl z-50"
          style={{
            background: "#0F2A22",
            color: "#6EE7B7",
            border:
              "1px solid rgba(16,185,129,0.35)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}

function ProjectDrawer({
  project: p,
  onClose,
  onToggle,
}) {
  const t = tenderOf(p.tenderId)
  const prog = progressOf(p)
  const c = HEALTH_COLORS[healthOf(p)]
  const bayarPct = Math.round(
    (p.dibayar / p.nilai) * 100,
  )

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      style={{
        background: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <aside
        className="w-[440px] h-full overflow-y-auto p-6 space-y-5"
        style={{
          background: "#0D1117",
          borderLeft:
            "1px solid rgba(255,255,255,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <HealthBadge project={p} />

            <h3
              className="text-base font-700 mt-2 leading-snug"
              style={{
                color: "#F0F4FF",
              }}
            >
              {p.layanan}
            </h3>

            <p
              className="text-xs mt-1"
              style={{
                color: "#475569",
              }}
            >
              {t.namaPerusahaan}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex-shrink-0 hover:brightness-125"
            style={{
              background:
                "rgba(255,255,255,0.05)",
              color: "#94A3B8",
            }}
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <div
          className="rounded-xl p-4 space-y-2"
          style={card}
        >
          <div className="flex items-baseline justify-between">
            <span
              className="text-xs"
              style={{
                color: "#475569",
              }}
            >
              Progres keseluruhan
            </span>

            <span
              className="text-xl font-700"
              style={{
                color: c,
                ...mono,
              }}
            >
              {prog}%
            </span>
          </div>

          <ProgressBar
            value={prog}
            color={c}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            [
              "Nilai kontrak",
              formatRupiah(p.nilai),
            ],
            [
              "Sudah dibayar",
              `${formatRupiahShort(
                p.dibayar,
              )} (${bayarPct}%)`,
            ],
            [
              "Mulai",
              formatDate(p.mulai),
            ],
            [
              p.selesai
                ? "Selesai"
                : "Target",
              formatDate(
                p.selesai ?? p.target,
              ),
            ],
            [
              "PIC marketing",
              p.pic,
            ],
            [
              "Kontak klien",
              t.kontak,
            ],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-lg px-3 py-2.5"
              style={card}
            >
              <div
                className="text-xs"
                style={{
                  color: "#475569",
                }}
              >
                {k}
              </div>

              <div
                className="text-xs font-600 mt-1"
                style={{
                  color: "#E2E8F0",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            className="text-xs font-600 mb-2.5"
            style={{
              color: "#94A3B8",
            }}
          >
            Milestone{" "}
            <span
              style={{
                color: "#475569",
                fontWeight: 400,
              }}
            >
              · klik untuk tandai selesai
            </span>
          </div>

          <div className="space-y-2">
            {p.milestones.map((m, i) => {
              const late =
                !m.done && m.due < TODAY

              return (
                <button
                  key={m.nama}
                  onClick={() => onToggle(i)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all hover:brightness-125"
                  style={{
                    ...card,
                    borderColor: late
                      ? "rgba(239,68,68,0.35)"
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-xs"
                    style={{
                      background: m.done
                        ? "#10B981"
                        : "transparent",
                      border: `1.5px solid ${m.done
                        ? "#10B981"
                        : "#334155"
                        }`,
                      color: "#fff",
                    }}
                  >
                    {m.done ? "✓" : ""}
                  </span>

                  <span className="flex-1">
                    <span
                      className="block text-sm"
                      style={{
                        color: m.done
                          ? "#64748B"
                          : "#E2E8F0",
                        textDecoration: m.done
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {m.nama}
                    </span>

                    <span
                      className="block text-xs mt-0.5"
                      style={{
                        color: late
                          ? "#F87171"
                          : "#475569",
                      }}
                    >
                      {late
                        ? "Lewat tenggat · "
                        : "Tenggat "}
                      {formatDate(m.due)}
                    </span>
                  </span>

                  <span
                    className="text-xs"
                    style={{
                      color: "#475569",
                      ...mono,
                    }}
                  >
                    {m.bobot}%
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </aside>
    </div>
  )
}
