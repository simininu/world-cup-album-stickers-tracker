import { useState, useEffect, useRef } from "react";

const TEAMS = [
  { code: "MEX", name: "México", flag: "🇲🇽" },
  { code: "RSA", name: "África do Sul", flag: "🇿🇦" },
  { code: "USA", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "CAN", name: "Canadá", flag: "🇨🇦" },
  { code: "ARG", name: "Argentina", flag: "🇦🇷" },
  { code: "BOL", name: "Bolívia", flag: "🇧🇴" },
  { code: "BRA", name: "Brasil", flag: "🇧🇷" },
  { code: "CHI", name: "Chile", flag: "🇨🇱" },
  { code: "COL", name: "Colômbia", flag: "🇨🇴" },
  { code: "ECU", name: "Equador", flag: "🇪🇨" },
  { code: "PAR", name: "Paraguai", flag: "🇵🇾" },
  { code: "PER", name: "Peru", flag: "🇵🇪" },
  { code: "URU", name: "Uruguai", flag: "🇺🇾" },
  { code: "VEN", name: "Venezuela", flag: "🇻🇪" },
  { code: "CRC", name: "Costa Rica", flag: "🇨🇷" },
  { code: "HON", name: "Honduras", flag: "🇭🇳" },
  { code: "JAM", name: "Jamaica", flag: "🇯🇲" },
  { code: "PAN", name: "Panamá", flag: "🇵🇦" },
  { code: "AUS", name: "Austrália", flag: "🇦🇺" },
  { code: "CHN", name: "China", flag: "🇨🇳" },
  { code: "JPN", name: "Japão", flag: "🇯🇵" },
  { code: "KOR", name: "Coreia do Sul", flag: "🇰🇷" },
  { code: "NZL", name: "Nova Zelândia", flag: "🇳🇿" },
  { code: "THA", name: "Tailândia", flag: "🇹🇭" },
  { code: "IRN", name: "Irã", flag: "🇮🇷" },
  { code: "JOR", name: "Jordânia", flag: "🇯🇴" },
  { code: "KSA", name: "Arábia Saudita", flag: "🇸🇦" },
  { code: "UZB", name: "Uzbequistão", flag: "🇺🇿" },
  { code: "CMR", name: "Camarões", flag: "🇨🇲" },
  { code: "COD", name: "R.D. Congo", flag: "🇨🇩" },
  { code: "EGY", name: "Egito", flag: "🇪🇬" },
  { code: "MAR", name: "Marrocos", flag: "🇲🇦" },
  { code: "NGA", name: "Nigéria", flag: "🇳🇬" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳" },
  { code: "TZA", name: "Tanzânia", flag: "🇹🇿" },
  { code: "BEL", name: "Bélgica", flag: "🇧🇪" },
  { code: "CRO", name: "Croácia", flag: "🇭🇷" },
  { code: "DEN", name: "Dinamarca", flag: "🇩🇰" },
  { code: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { code: "FRA", name: "França", flag: "🇫🇷" },
  { code: "GER", name: "Alemanha", flag: "🇩🇪" },
  { code: "HUN", name: "Hungria", flag: "🇭🇺" },
  { code: "IRL", name: "Irlanda", flag: "🇮🇪" },
  { code: "ITA", name: "Itália", flag: "🇮🇹" },
  { code: "NED", name: "Holanda", flag: "🇳🇱" },
  { code: "POL", name: "Polônia", flag: "🇵🇱" },
  { code: "POR", name: "Portugal", flag: "🇵🇹" },
  { code: "ESP", name: "Espanha", flag: "🇪🇸" },
];

const TOTAL = 20;
const INIT_STATE = () => {
  const s = {};
  TEAMS.forEach(t => { s[t.code] = Array(TOTAL).fill(0); });
  return s;
};

// 0 = faltando, 1 = tenho, 2 = repetida
const C = {
  bg: "#0f2d1a", card: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)",
  gold: "#c9a84c", green: "#1a4a2e", greenMid: "#2d6e47",
  cream: "#f5f0e8", gray: "#7a9a82", have: "#2ecc71", dup: "#f39c12",
  white: "#ffffff",
};

function getStats(stickers) {
  let have = 0, dup = 0, miss = 0;
  TEAMS.forEach(t => stickers[t.code].forEach(s => {
    if (s === 1) have++; else if (s === 2) dup++; else miss++;
  }));
  return { have, dup, miss, total: TEAMS.length * TOTAL };
}

function buildShareText(stickers) {
  const repeated = [], missing = [];
  TEAMS.forEach(t => {
    const rep = [], mis = [];
    stickers[t.code].forEach((s, i) => {
      if (s === 2) rep.push(i + 1);
      if (s === 0) mis.push(i + 1);
    });
    if (rep.length) repeated.push(`${t.code}: ${rep.join(", ")}`);
    if (mis.length) missing.push(`${t.code}: ${mis.join(", ")}`);
  });
  const stats = getStats(stickers);
  const pct = Math.round((stats.have + stats.dup) / stats.total * 100);
  const lines = [
    `⚽ Figurinhas Copa 2026 — ${pct}% completo`,
    `✅ ${stats.have} tenho  |  🔁 ${stats.dup} repetidas  |  ❌ ${stats.miss} faltando`,
    "",
    repeated.length ? `🔁 REPETIDAS (tenho pra trocar):\n${repeated.join("\n")}` : "🔁 Nenhuma repetida ainda",
    "",
    missing.length ? `❌ FALTANDO:\n${missing.join("\n")}` : "❌ Álbum completo! 🏆",
  ];
  return lines.join("\n");
}

// ─── Team Modal ─────────────────────────────────────────────────────────────
function TeamModal({ team, stickers, onToggle, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0f2d1a", borderRadius: 16, width: "100%", maxWidth: 380,
        border: `2px solid ${C.gold}`, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${C.green}, ${C.greenMid})`,
          borderBottom: `2px solid ${C.gold}`,
          padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>{team.flag}</span>
            <div>
              <div style={{ color: C.gold, fontWeight: 800, fontSize: 16 }}>{team.name}</div>
              <div style={{ color: C.gray, fontSize: 12 }}>
                {stickers.filter(s => s >= 1).length}/20 coletadas
                {stickers.filter(s => s === 2).length > 0 && ` · ${stickers.filter(s => s === 2).length} repetidas`}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: C.white,
            borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 14, padding: "10px 16px", borderBottom: `1px solid ${C.border}` }}>
          {[
            { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.15)", label: "Faltando" },
            { bg: "rgba(46,204,113,0.2)", border: C.have, label: "Tenho" },
            { bg: "rgba(243,156,18,0.2)", border: C.dup, label: "Repetida" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: l.bg, border: `1.5px solid ${l.border}` }} />
              <span style={{ color: C.gray, fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Grid 5×4 */}
        <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7 }}>
          {stickers.map((state, idx) => {
            const n = idx + 1;
            const isSpecial = n === 1 || n === 13;
            const bg = state === 1 ? "rgba(46,204,113,0.2)" : state === 2 ? "rgba(243,156,18,0.2)" : "rgba(255,255,255,0.06)";
            const border = state === 1 ? C.have : state === 2 ? C.dup : "rgba(255,255,255,0.15)";
            const col = state === 1 ? C.have : state === 2 ? C.dup : C.gray;
            return (
              <button key={n} onClick={() => onToggle(idx)} title={n === 1 ? "Escudo" : n === 13 ? "Foto do time" : `Jogador ${n}`}
                style={{
                  background: bg, border: `2px solid ${border}`, borderRadius: 8,
                  padding: "9px 4px", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                }}>
                <span style={{ color: col, fontWeight: 800, fontSize: 15, fontFamily: "monospace" }}>{n}</span>
                {isSpecial && <span style={{ fontSize: 8, color: C.gold }}>✦</span>}
                {state === 2 && <span style={{ fontSize: 8, color: C.dup }}>2×</span>}
              </button>
            );
          })}
        </div>
        <div style={{ color: C.gray, fontSize: 11, textAlign: "center", padding: "0 16px 14px" }}>
          Toque para alternar: faltando → tenho → repetida
        </div>
      </div>
    </div>
  );
}

// ─── Share Sheet ─────────────────────────────────────────────────────────────
function ShareSheet({ stickers, onClose }) {
  const text = buildShareText(stickers);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 200, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0f2d1a", borderRadius: 16, width: "100%", maxWidth: 500,
        border: `2px solid ${C.gold}`, overflow: "hidden", marginBottom: 8,
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.green}, ${C.greenMid})`,
          borderBottom: `2px solid ${C.gold}`,
          padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ color: C.gold, fontWeight: 800, fontSize: 15 }}>📤 Compartilhar no Slack</div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: C.white,
            borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ color: C.gray, fontSize: 12, marginBottom: 10 }}>
            Cole esse texto no grupo do Slack — qualquer pessoa entende sem precisar de nenhum app:
          </div>
          <textarea readOnly value={text} style={{
            width: "100%", background: "rgba(255,255,255,0.06)",
            border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "10px 12px", color: C.white, fontSize: 12,
            fontFamily: "monospace", lineHeight: 1.6,
            resize: "none", outline: "none", boxSizing: "border-box",
            height: 220,
          }} />
          <button onClick={copy} style={{
            marginTop: 10, width: "100%",
            background: copied ? C.have : C.gold,
            color: C.green, border: "none", borderRadius: 10,
            padding: "12px 0", fontWeight: 800, fontSize: 15, cursor: "pointer",
            transition: "background 0.2s",
          }}>
            {copied ? "✓ Copiado!" : "📋 Copiar texto"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stickers, setStickers] = useState(INIT_STATE);
  const [activeTeam, setActiveTeam] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [view, setView] = useState("all"); // "all" | "missing" | "repeated"

  const stats = getStats(stickers);
  const pct = Math.round((stats.have + stats.dup) / stats.total * 100);

  function toggleSticker(teamCode, idx) {
    setStickers(prev => {
      const updated = { ...prev, [teamCode]: [...prev[teamCode]] };
      updated[teamCode][idx] = (updated[teamCode][idx] + 1) % 3;
      return updated;
    });
  }

  const currentTeam = activeTeam ? TEAMS.find(t => t.code === activeTeam) : null;

  const visibleTeams = TEAMS.filter(team => {
    if (view === "missing") return stickers[team.code].some(s => s === 0);
    if (view === "repeated") return stickers[team.code].some(s => s === 2);
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', system-ui, sans-serif", color: C.white }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenMid} 100%)`,
        borderBottom: `3px solid ${C.gold}`,
        padding: "16px 16px 14px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>⚽</span>
              <div>
                <div style={{ color: C.gold, fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>Copa 2026</div>
                <div style={{ color: C.cream, fontSize: 11, opacity: 0.6 }}>Minhas figurinhas</div>
              </div>
            </div>
            <button onClick={() => setShowShare(true)} style={{
              background: C.gold, color: C.green, border: "none",
              borderRadius: 10, padding: "8px 14px", fontWeight: 800,
              fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>
              📤 Compartilhar
            </button>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            {[
              { label: "Tenho", value: stats.have, color: C.have },
              { label: "Repetidas", value: stats.dup, color: C.dup },
              { label: "Faltando", value: stats.miss, color: "#e74c3c" },
              { label: "Completo", value: `${pct}%`, color: C.gold },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ color: s.color, fontWeight: 800, fontSize: 16 }}>{s.value}</div>
                <div style={{ color: C.gray, fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.have}, ${C.gold})`, borderRadius: 5, transition: "width 0.4s" }} />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "12px 16px 0" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[
            { key: "all", label: "Todas as seleções" },
            { key: "repeated", label: `🔁 Repetidas` },
            { key: "missing", label: `❌ Faltando` },
          ].map(f => (
            <button key={f.key} onClick={() => setView(f.key)} style={{
              background: view === f.key ? C.gold : "rgba(255,255,255,0.07)",
              color: view === f.key ? C.green : C.cream,
              border: "none", borderRadius: 20, padding: "6px 12px",
              fontWeight: 700, fontSize: 12, cursor: "pointer",
            }}>{f.label}</button>
          ))}
        </div>

        {/* Team grid */}
        {visibleTeams.length === 0 ? (
          <div style={{ textAlign: "center", color: C.gray, padding: "40px 0", fontSize: 14 }}>
            {view === "repeated" ? "Nenhuma repetida ainda" : "Nenhuma faltando — álbum completo! 🏆"}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, paddingBottom: 24 }}>
            {visibleTeams.map(team => {
              const s = stickers[team.code];
              const haveCount = s.filter(x => x >= 1).length;
              const dupCount = s.filter(x => x === 2).length;
              const missCount = s.filter(x => x === 0).length;
              const pctTeam = Math.round(haveCount / TOTAL * 100);
              const isComplete = haveCount === TOTAL;
              return (
                <button key={team.code} onClick={() => setActiveTeam(team.code)} style={{
                  background: isComplete ? "rgba(46,204,113,0.1)" : C.card,
                  border: dupCount > 0 ? `2px solid ${C.dup}` : isComplete ? `2px solid ${C.have}` : `1px solid ${C.border}`,
                  borderRadius: 10, padding: "10px 12px", cursor: "pointer", textAlign: "left",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{team.flag}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.white, fontWeight: 700, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{team.name}</div>
                      <div style={{ fontSize: 11, color: C.gray, display: "flex", gap: 6 }}>
                        <span>{haveCount}/20</span>
                        {dupCount > 0 && <span style={{ color: C.dup }}>🔁 {dupCount}</span>}
                        {isComplete && <span style={{ color: C.have }}>✓</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pctTeam}%`, background: dupCount > 0 ? C.dup : C.have, borderRadius: 3 }} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {activeTeam && currentTeam && (
        <TeamModal
          team={currentTeam}
          stickers={stickers[activeTeam]}
          onToggle={(idx) => toggleSticker(activeTeam, idx)}
          onClose={() => setActiveTeam(null)}
        />
      )}
      {showShare && <ShareSheet stickers={stickers} onClose={() => setShowShare(false)} />}
    </div>
  );
}