import { useState, useEffect } from "react";

// Google Font injection
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Inter:wght@400;600;700;800;900&display=swap";
document.head.appendChild(fontLink);

const SPECIAL = [
  { code: "00", name: "Panini Logo" },
  { code: "FWC1", name: "Official Emblem" },
  { code: "FWC2", name: "Official Emblem II" },
  { code: "FWC3", name: "Official Mascots" },
  { code: "FWC4", name: "Official Slogan" },
  { code: "FWC5", name: "Official Ball" },
  { code: "FWC6", name: "Canada — Host Cities" },
  { code: "FWC7", name: "Mexico — Host Cities" },
  { code: "FWC8", name: "USA — Host Cities" },
  { code: "FWC9", name: "FIFA Museum — Uruguay 1930" },
  { code: "FWC10", name: "FIFA Museum — Italy 1934" },
  { code: "FWC11", name: "FIFA Museum — France 1938" },
  { code: "FWC12", name: "FIFA Museum — Brazil 1950" },
  { code: "FWC13", name: "FIFA Museum — Switzerland 1954" },
  { code: "FWC14", name: "FIFA Museum — Sweden 1958" },
  { code: "FWC15", name: "FIFA Museum — Chile 1962" },
  { code: "FWC16", name: "FIFA Museum — England 1966" },
  { code: "FWC17", name: "FIFA Museum — Mexico 1970" },
  { code: "FWC18", name: "FIFA Museum — Germany 1974" },
  { code: "FWC19", name: "FIFA Museum — Argentina 1978" },
];

const TEAMS = [
  // Group A
  { code: "MEX", name: "Mexico", flag: "🇲🇽" },
  { code: "RSA", name: "South Africa", flag: "🇿🇦" },
  { code: "KOR", name: "South Korea", flag: "🇰🇷" },
  { code: "CZE", name: "Czechia", flag: "🇨🇿" },
  // Group B
  { code: "CAN", name: "Canada", flag: "🇨🇦" },
  { code: "BIH", name: "Bosnia-Herzegovina", flag: "🇧🇦" },
  { code: "QAT", name: "Qatar", flag: "🇶🇦" },
  { code: "SUI", name: "Switzerland", flag: "🇨🇭" },
  // Group C
  { code: "BRA", name: "Brazil", flag: "🇧🇷" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦" },
  { code: "HAI", name: "Haiti", flag: "🇭🇹" },
  { code: "SCO", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  // Group D
  { code: "USA", name: "United States", flag: "🇺🇸" },
  { code: "PAR", name: "Paraguay", flag: "🇵🇾" },
  { code: "AUS", name: "Australia", flag: "🇦🇺" },
  { code: "TUR", name: "Turkey", flag: "🇹🇷" },
  // Group E
  { code: "GER", name: "Germany", flag: "🇩🇪" },
  { code: "CUW", name: "Curaçao", flag: "🇨🇼" },
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨" },
  // Group F
  { code: "NED", name: "Netherlands", flag: "🇳🇱" },
  { code: "JPN", name: "Japan", flag: "🇯🇵" },
  { code: "SWE", name: "Sweden", flag: "🇸🇪" },
  { code: "TUN", name: "Tunisia", flag: "🇹🇳" },
  // Group G
  { code: "BEL", name: "Belgium", flag: "🇧🇪" },
  { code: "EGY", name: "Egypt", flag: "🇪🇬" },
  { code: "IRN", name: "Iran", flag: "🇮🇷" },
  { code: "NZL", name: "New Zealand", flag: "🇳🇿" },
  // Group H
  { code: "ESP", name: "Spain", flag: "🇪🇸" },
  { code: "CPV", name: "Cabo Verde", flag: "🇨🇻" },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "URU", name: "Uruguay", flag: "🇺🇾" },
  // Group I
  { code: "FRA", name: "France", flag: "🇫🇷" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳" },
  { code: "IRQ", name: "Iraq", flag: "🇮🇶" },
  { code: "NOR", name: "Norway", flag: "🇳🇴" },
  // Group J
  { code: "ARG", name: "Argentina", flag: "🇦🇷" },
  { code: "ALG", name: "Algeria", flag: "🇩🇿" },
  { code: "AUT", name: "Austria", flag: "🇦🇹" },
  { code: "JOR", name: "Jordan", flag: "🇯🇴" },
  // Group K
  { code: "POR", name: "Portugal", flag: "🇵🇹" },
  { code: "COD", name: "DR Congo", flag: "🇨🇩" },
  { code: "UZB", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "COL", name: "Colombia", flag: "🇨🇴" },
  // Group L
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { code: "CRO", name: "Croatia", flag: "🇭🇷" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭" },
  { code: "PAN", name: "Panama", flag: "🇵🇦" },
];

const TEAM_TOTAL = 20;
const STORAGE_KEY = "copa2026_stickers_v3";

const INIT_STATE = () => {
  const s = { special: Array(SPECIAL.length).fill(0) };
  TEAMS.forEach(t => { s[t.code] = Array(TEAM_TOTAL).fill(0); });
  return s;
};

function loadStickers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const full = INIT_STATE();
      if (parsed.special) full.special = parsed.special;
      TEAMS.forEach(t => { if (parsed[t.code]) full[t.code] = parsed[t.code]; });
      return full;
    }
  } catch (e) {}
  return INIT_STATE();
}

function getStats(stickers) {
  let have = 0, dup = 0, miss = 0;
  stickers.special.forEach(s => { if (s === 1) have++; else if (s === 2) dup++; else miss++; });
  TEAMS.forEach(t => stickers[t.code].forEach(s => { if (s === 1) have++; else if (s === 2) dup++; else miss++; }));
  return { have, dup, miss, total: SPECIAL.length + TEAMS.length * TEAM_TOTAL };
}

function buildShareText(stickers) {
  const repeated = [], missing = [];
  const specRep = [], specMis = [];
  stickers.special.forEach((s, i) => {
    if (s === 2) specRep.push(SPECIAL[i].code);
    if (s === 0) specMis.push(SPECIAL[i].code);
  });
  if (specRep.length) repeated.push(`Special: ${specRep.join(", ")}`);
  if (specMis.length) missing.push(`Special: ${specMis.join(", ")}`);
  TEAMS.forEach(t => {
    const rep = [], mis = [];
    stickers[t.code].forEach((s, i) => { if (s === 2) rep.push(i + 1); if (s === 0) mis.push(i + 1); });
    if (rep.length) repeated.push(`${t.code}: ${rep.join(", ")}`);
    if (mis.length) missing.push(`${t.code}: ${mis.join(", ")}`);
  });
  const stats = getStats(stickers);
  const pct = Math.round((stats.have + stats.dup) / stats.total * 100);
  return [
    `⚽ World Cup 2026 Stickers — ${pct}% complete`,
    `✅ ${stats.have} have  |  🔁 ${stats.dup} duplicates  |  ❌ ${stats.miss} missing`,
    "",
    repeated.length ? `🔁 DUPLICATES (available to trade):\n${repeated.join("\n")}` : "🔁 No duplicates yet",
    "",
    missing.length ? `❌ MISSING:\n${missing.join("\n")}` : "❌ Album complete! 🏆",
  ].join("\n");
}

const css = `
  @keyframes stickerPop {
    0% { transform: scale(1); }
    40% { transform: scale(1.18) rotate(-2deg); }
    70% { transform: scale(0.95) rotate(1deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes splashIn {
    0% { opacity: 0; transform: scale(0.92); }
    100% { opacity: 1; transform: scale(1); }
  }
  .sticker-pop { animation: stickerPop 0.35s cubic-bezier(.36,.07,.19,.97); }
  * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
  body { margin: 0; background: #0a1f0f; }
`;
const styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);

// ─── Sticker Card (team) ──────────────────────────────────────────────────────
function StickerCard({ team, stickers, onClick }) {
  const haveCount = stickers.filter(s => s >= 1).length;
  const dupCount = stickers.filter(s => s === 2).length;
  const isComplete = haveCount === TEAM_TOTAL;
  const pct = Math.round(haveCount / TEAM_TOTAL * 100);

  return (
    <button onClick={onClick} style={{
      background: "#1e3a2a",
      border: "none",
      borderRadius: 10,
      overflow: "hidden",
      cursor: "pointer",
      padding: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      transform: "translateZ(0)",
      transition: "box-shadow 0.2s, transform 0.15s",
    }}>
      {/* Color strip — status only */}
      <div style={{
        background: "#2d6e47",
        height: 7,
      }} />

      {/* Card body */}
      <div style={{ padding: "8px 10px 10px", position: "relative", textAlign: "left" }}>
        {/* Code badge top-right */}
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: "rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 9,
          padding: "1px 5px",
          borderRadius: 4,
          letterSpacing: 0.5,
        }}>{team.code}</div>

        {/* Flag */}
        <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 4, textAlign: "left" }}>{team.flag}</div>

        {/* Team name */}
        <div style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 11,
          color: "#f5f0e8",
          lineHeight: 1.2,
          marginBottom: 5,
          paddingRight: 28,
          textAlign: "left",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>{team.name}</div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: isComplete ? "#27ae60" : "#f5c842",
              borderRadius: 3, transition: "width 0.3s",
            }} />
          </div>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontWeight: 700, minWidth: 24 }}>{haveCount}/20</span>
        </div>

        <div style={{ marginTop: 4, fontSize: 9, fontWeight: 800, height: 13 }}>
          {dupCount > 0 && <span style={{ color: "#f5a623" }}>🔁 {dupCount} dup{dupCount > 1 ? "s" : ""}</span>}
          {isComplete && <span style={{ color: "#27ae60" }}>✓ Complete</span>}
        </div>
      </div>
    </button>
  );
}

// ─── Number grid inside modal ─────────────────────────────────────────────────
function NumberGrid({ stickers, onToggle, color }) {
  const [poppingIdx, setPoppingIdx] = useState(null);

  function handleTap(idx) {
    setPoppingIdx(idx);
    onToggle(idx);
    setTimeout(() => setPoppingIdx(null), 400);
  }

  return (
    <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7 }}>
      {stickers.map((state, idx) => {
        const n = idx + 1;
        let bg, border, col, label;
        if (state === 0) { bg = "rgba(255,255,255,0.07)"; border = "rgba(255,255,255,0.15)"; col = "rgba(255,255,255,0.35)"; label = null; }
        else if (state === 1) { bg = "rgba(39,174,96,0.2)"; border = "#27ae60"; col = "#27ae60"; label = "✓"; }
        else { bg = "rgba(245,166,35,0.2)"; border = "#f5a623"; col = "#f5a623"; label = "2×"; }

        return (
          <button
            key={n}
            onClick={() => handleTap(idx)}
            className={poppingIdx === idx ? "sticker-pop" : ""}
            style={{
              background: bg, border: `2px solid ${border}`,
              borderRadius: 8, padding: "9px 4px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            }}>
            <span style={{ color: col, fontWeight: 800, fontSize: 15, fontFamily: "monospace" }}>{n}</span>
            {label && <span style={{ fontSize: 8, color: col, fontWeight: 800 }}>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ─── Team Modal ───────────────────────────────────────────────────────────────
function TeamModal({ team, stickers, onToggle, onClose }) {
  const modalColor = "#2d6e47";
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1e3a2a", borderRadius: 16, width: "100%", maxWidth: 380,
        overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
        {/* Color header */}
        <div style={{ background: "linear-gradient(135deg, #1a4a2e, #2d6e47)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>{team.flag}</span>
            <div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 18 }}>{team.name}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                {stickers.filter(s => s >= 1).length}/20 collected
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.25)", border: "none", color: "#fff",
            borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 14, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { bg: "#f0f0f0", border: "#ddd", label: "Missing" },
            { bg: "#e8f8ee", border: "#27ae60", label: "Have" },
            { bg: "#fff8e6", border: "#f5a623", label: "Duplicate" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: l.bg, border: `1.5px solid ${l.border}` }} />
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>

        <NumberGrid stickers={stickers} onToggle={onToggle} color={modalColor} />

        <div style={{ color: "#aaa", fontSize: 11, textAlign: "center", padding: "0 16px 14px" }}>
          Tap to cycle: missing → have → duplicate
        </div>
      </div>
    </div>
  );
}

// ─── Special Modal ────────────────────────────────────────────────────────────
function SpecialModal({ stickers, onToggle, onClose }) {
  const [poppingIdx, setPoppingIdx] = useState(null);

  function handleTap(idx) {
    setPoppingIdx(idx);
    onToggle(idx);
    setTimeout(() => setPoppingIdx(null), 400);
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1e3a2a", borderRadius: 16, width: "100%", maxWidth: 420,
        overflow: "hidden", maxHeight: "85vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 18 }}>✨ Special Stickers</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              {stickers.filter(s => s >= 1).length}/{SPECIAL.length} collected
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
            borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        <div style={{ overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {SPECIAL.map((sp, idx) => {
            const state = stickers[idx];
            let bg, border, textCol;
            if (state === 0) { bg = "rgba(255,255,255,0.05)"; border = "rgba(255,255,255,0.12)"; textCol = "rgba(255,255,255,0.4)"; }
            else if (state === 1) { bg = "rgba(39,174,96,0.15)"; border = "#27ae60"; textCol = "#27ae60"; }
            else { bg = "rgba(245,166,35,0.15)"; border = "#f5a623"; textCol = "#f5a623"; }

            return (
              <button
                key={sp.code}
                onClick={() => handleTap(idx)}
                className={poppingIdx === idx ? "sticker-pop" : ""}
                style={{
                  background: bg, border: `2px solid ${border}`,
                  borderRadius: 10, padding: "10px 12px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    fontFamily: "'Black Han Sans', sans-serif",
                    background: state === 0 ? "rgba(255,255,255,0.15)" : border,
                    color: "#fff",
                    padding: "2px 7px", borderRadius: 5, fontSize: 11, minWidth: 44, textAlign: "center",
                  }}>{sp.code}</span>
                  <span style={{ color: state === 0 ? "rgba(255,255,255,0.85)" : textCol, fontSize: 13, fontWeight: 600 }}>{sp.name}</span>
                </div>
                {state === 2 && <span style={{ fontSize: 11, color: "#f5a623", fontWeight: 800 }}>2×</span>}
                {state === 1 && <span style={{ fontSize: 16 }}>✓</span>}
              </button>
            );
          })}
        </div>
        <div style={{ color: "#aaa", fontSize: 11, textAlign: "center", padding: "8px 16px 14px", flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          Tap to cycle: missing → have → duplicate
        </div>
      </div>
    </div>
  );
}

// ─── Share Sheet ──────────────────────────────────────────────────────────────
function ShareSheet({ stickers, onClose }) {
  const text = buildShareText(stickers);
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1e3a2a", borderRadius: 16, width: "100%", maxWidth: 500,
        overflow: "hidden", marginBottom: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
        <div style={{ background: "#0a1f0f", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 16 }}>📤 Share with friends</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 10 }}>Copy and paste this text anywhere — anyone can read it without installing anything:</p>
          <textarea readOnly value={text} style={{
            width: "100%", background: "#0f2d1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            padding: "10px 12px", color: "#f5f0e8", fontSize: 12, fontFamily: "monospace",
            lineHeight: 1.6, resize: "none", outline: "none", height: 220,
          }} />
          <button onClick={copy} style={{
            marginTop: 10, width: "100%",
            background: copied ? "#27ae60" : "#f5c842",
            color: copied ? "#fff" : "#0a1f0f",
            border: "none", borderRadius: 10, padding: "12px 0",
            fontFamily: "'Black Han Sans', sans-serif", fontSize: 16, cursor: "pointer",
          }}>{copied ? "✓ Copied!" : "📋 Copy text"}</button>
        </div>
      </div>
    </div>
  );
}

const PACKS_KEY = "copa2026_packs";

function loadPacks() {
  try {
    const saved = localStorage.getItem(PACKS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

// ─── Packs Modal ──────────────────────────────────────────────────────────────
function PacksModal({ packs, onAdd, onRemove, onClose }) {
  const [qty, setQty] = useState("1");
  const [price, setPrice] = useState("1.50");

  const totalPacks = packs.reduce((s, p) => s + p.qty, 0);
  const totalSpent = packs.reduce((s, p) => s + p.qty * p.price, 0);
  const avgPrice = totalPacks > 0 ? totalSpent / totalPacks : 0;

  function handleAdd() {
    const q = parseInt(qty);
    const p = parseFloat(price.replace(",", "."));
    if (!q || q < 1 || !p || p <= 0) return;
    onAdd({ id: Date.now(), qty: q, price: p, date: new Date().toLocaleDateString("en-GB") });
    setQty("1");
    setPrice("1.50");
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: 16, width: "100%", maxWidth: 420,
        border: "2px solid #f5c842", overflow: "hidden", maxHeight: "85vh",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0a1f0f, #1a4a2e)", borderBottom: "2px solid #f5c842", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 18 }}>🧧 Pack Tracker</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{totalPacks} packs · €{totalSpent.toFixed(2)} spent</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          {[
            { label: "Packs", value: totalPacks },
            { label: "Total spent", value: `€${totalSpent.toFixed(2)}` },
            { label: "Avg / pack", value: `€${avgPrice.toFixed(2)}` },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 18 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add purchase */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Add purchase</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>Packs</div>
              <input
                type="number" min="1" value={qty}
                onChange={e => setQty(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14, outline: "none" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>Price each (€)</div>
              <input
                type="number" min="0" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14, outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button onClick={handleAdd} style={{ background: "#f5c842", color: "#0a1f0f", border: "none", borderRadius: 8, padding: "8px 14px", fontFamily: "'Black Han Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>+ Add</button>
            </div>
          </div>
        </div>

        {/* History */}
        <div style={{ overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {packs.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "24px 0", fontSize: 13 }}>No purchases yet</div>
          ) : [...packs].reverse().map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "10px 12px" }}>
              <div>
                <div style={{ color: "#f5f0e8", fontSize: 13, fontWeight: 700 }}>{p.qty} pack{p.qty > 1 ? "s" : ""} · €{(p.qty * p.price).toFixed(2)}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>€{p.price.toFixed(2)} each · {p.date}</div>
              </div>
              <button onClick={() => onRemove(p.id)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.4)", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontSize: 14 }}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function App() {
  const [stickers, setStickers] = useState(loadStickers);
  const [packs, setPacks] = useState(loadPacks);
  const [splash, setSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [activeTeam, setActiveTeam] = useState(null);
  const [showSpecial, setShowSpecial] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPacks, setShowPacks] = useState(false);
  const [view, setView] = useState("all");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers)); }, [stickers]);
  useEffect(() => { localStorage.setItem(PACKS_KEY, JSON.stringify(packs)); }, [packs]);
  useEffect(() => {
    const t1 = setTimeout(() => setSplashFading(true), 2000);
    const t2 = setTimeout(() => setSplash(false), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function addPack(p) { setPacks(prev => [...prev, p]); }
  function removePack(id) { setPacks(prev => prev.filter(p => p.id !== id)); }

  const stats = getStats(stickers);
  const pct = Math.round((stats.have + stats.dup) / stats.total * 100);

  function toggleSticker(teamCode, idx) {
    setStickers(prev => {
      const updated = { ...prev, [teamCode]: [...prev[teamCode]] };
      updated[teamCode][idx] = (updated[teamCode][idx] + 1) % 3;
      return updated;
    });
  }
  function toggleSpecial(idx) {
    setStickers(prev => {
      const updated = { ...prev, special: [...prev.special] };
      updated.special[idx] = (updated.special[idx] + 1) % 3;
      return updated;
    });
  }

  const currentTeam = activeTeam ? TEAMS.find(t => t.code === activeTeam) : null;
  const specialHave = stickers.special.filter(s => s >= 1).length;
  const specialDup = stickers.special.filter(s => s === 2).length;

  const visibleTeams = TEAMS.filter(team => {
    if (view === "missing") return stickers[team.code].some(s => s === 0);
    if (view === "duplicates") return stickers[team.code].some(s => s === 2);
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0a1f0f", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Splash screen */}
      {splash && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "linear-gradient(160deg, #0a1f0f 0%, #0f3020 50%, #0a1f0f 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: splashFading ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: splashFading ? "none" : "all",
        }}>
          <div style={{ animation: "splashIn 0.6s ease forwards", textAlign: "center" }}>
            <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>⚽</div>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: "#f5c842", fontSize: 36,
              letterSpacing: 2, lineHeight: 1, marginBottom: 6,
            }}>WORLD CUP</div>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: "#fff", fontSize: 52,
              letterSpacing: 4, lineHeight: 1, marginBottom: 20,
            }}>2026</div>
            <div style={{
              color: "rgba(255,255,255,0.35)", fontSize: 12,
              letterSpacing: 3, textTransform: "uppercase",
            }}>Sticker Tracker</div>
          </div>
          <div style={{
            position: "absolute", bottom: 40,
            color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: 1,
          }}>🇺🇸 🇲🇽 🇨🇦</div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0a1f0f 0%, #0f3020 100%)",
        padding: "16px 16px 20px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 22, letterSpacing: 1, lineHeight: 1 }}>WORLD CUP 2026</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>Sticker Tracker</div>
            </div>
            <button onClick={() => setShowPacks(true)} style={{
                background: "rgba(255,255,255,0.1)", color: "#f5f0e8", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10, padding: "9px 14px",
                fontFamily: "'Black Han Sans', sans-serif", fontSize: 13, cursor: "pointer",
              }}>🧧 {packs.reduce((s, p) => s + p.qty, 0)}</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {[
              { label: "Have", value: stats.have, color: "#27ae60" },
              { label: "Dupes", value: stats.dup, color: "#f5a623" },
              { label: "Missing", value: stats.miss, color: "#e8523a" },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 8,
                padding: "6px 4px", textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: s.color, fontSize: 18, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${pct}%`,
                background: "linear-gradient(90deg, #27ae60, #f5c842)",
                borderRadius: 6, transition: "width 0.4s",
              }} />
            </div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 12, minWidth: 80, textAlign: "right" }}>{pct}% completed</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "14px 12px 0" }}>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[
            { key: "all", label: "All" },
            { key: "duplicates", label: "🔁 Duplicates" },
            { key: "missing", label: "❌ Missing" },
          ].map(f => (
            <button key={f.key} onClick={() => setView(f.key)} style={{
              background: view === f.key ? "#f5c842" : "rgba(255,255,255,0.08)",
              color: view === f.key ? "#0a1f0f" : "rgba(255,255,255,0.7)",
              border: "none", borderRadius: 20, padding: "7px 14px",
              fontFamily: view === f.key ? "'Black Han Sans', sans-serif" : "'Inter', sans-serif",
              fontWeight: view === f.key ? 400 : 600,
              fontSize: 12, cursor: "pointer", letterSpacing: view === f.key ? 0.5 : 0,
            }}>{f.label}</button>
          ))}
        </div>

        {/* Special stickers card */}
        {view === "all" && (
          <button onClick={() => setShowSpecial(true)} style={{
            width: "100%", background: "#1e3a2a", border: "none",
            borderRadius: 10, overflow: "hidden", cursor: "pointer",
            marginBottom: 16, padding: 0,
            boxShadow: specialDup > 0 ? "0 4px 16px rgba(245,166,35,0.4)" : "0 2px 10px rgba(0,0,0,0.3)",
          }}>
            <div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", height: 7 }} />
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>✨</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 13 }}>SPECIAL STICKERS</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                    {specialHave}/{SPECIAL.length} · FWC 00–19
                    {specialDup > 0 && <span style={{ color: "#f5a623", marginLeft: 6 }}>🔁 {specialDup} dups</span>}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>→</div>
              </div>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.1)", margin: "0 14px 10px" }}>
              <div style={{ height: "100%", width: `${Math.round(specialHave / SPECIAL.length * 100)}%`, background: "#1a1a2e", borderRadius: 3 }} />
            </div>
          </button>
        )}

        {/* Teams */}
        {visibleTeams.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "40px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 16, color: "#f5c842" }}>
              {view === "duplicates" ? "No duplicates yet" : "Album complete!"}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, paddingBottom: 24 }}>
            {visibleTeams.map(team => (
              <StickerCard
                key={team.code}
                team={team}
                stickers={stickers[team.code]}
                onClick={() => setActiveTeam(team.code)}
              />
            ))}
          </div>
        )}

        <div style={{ height: 24 }} />
      </div>

      {/* Floating share button */}
      <button onClick={() => setShowShare(true)} style={{
        position: "fixed", bottom: 24, right: 20,
        background: "#f5c842", color: "#0a1f0f", border: "none",
        borderRadius: 50, padding: "14px 20px",
        fontFamily: "'Black Han Sans', sans-serif", fontSize: 14, cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        zIndex: 50,
      }}>
        📤 SHARE
      </button>

      {showPacks && <PacksModal packs={packs} onAdd={addPack} onRemove={removePack} onClose={() => setShowPacks(false)} />}
      {showSpecial && <SpecialModal stickers={stickers.special} onToggle={toggleSpecial} onClose={() => setShowSpecial(false)} />}
      {activeTeam && currentTeam && (
        <TeamModal team={currentTeam} stickers={stickers[activeTeam]} onToggle={(idx) => toggleSticker(activeTeam, idx)} onClose={() => setActiveTeam(null)} />
      )}
      {showShare && <ShareSheet stickers={stickers} onClose={() => setShowShare(false)} />}
    </div>
  );
}