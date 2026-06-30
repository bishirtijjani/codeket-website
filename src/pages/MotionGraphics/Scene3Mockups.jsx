import { NAVY, ORANGE } from "./animUtils";

// Shared text styles (sizes scale with the panel via clamps tied to vw)
const LABEL_STYLE = {
  fontSize: "clamp(0.4rem, 0.7vw, 0.75rem)",
  color: "rgba(11,22,40,0.55)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontWeight: 600,
};

// 1) Mobile Apps — phone with 2×2 app grid -----------------------------------
export function PhoneMockup() {
  const apps = [
    { bg: NAVY,      label: "IMS", fg: ORANGE },
    { bg: ORANGE,    label: "AI",  fg: "#fff" },
    { bg: "#1E3A5F", label: "ERP", fg: "#fff" },
    { bg: "#2D6A4F", label: "VTU", fg: "#fff" },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0F172A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px 14px 20px",
        gap: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "8px",
          backgroundColor: "rgba(255,255,255,0.18)",
          borderRadius: "4px",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          flex: 1,
          width: "100%",
        }}
      >
        {apps.map((app, i) => (
          <div
            key={i}
            style={{
              backgroundColor: app.bg,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: app.fg,
                fontWeight: 800,
                fontSize: "clamp(0.7rem, 1.1vw, 1.3rem)",
                fontFamily: "inherit",
                letterSpacing: "0.02em",
              }}
            >
              {app.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2) AI Automation — neural network diagram ----------------------------------
export function AINetwork() {
  // 3-3-3 fully connected network. Positions in a 440×520 viewBox.
  const left   = [{ x:  80, y: 130 }, { x:  80, y: 260 }, { x:  80, y: 390 }];
  const middle = [{ x: 220, y: 130 }, { x: 220, y: 260 }, { x: 220, y: 390 }];
  const right  = [{ x: 360, y: 130 }, { x: 360, y: 260 }, { x: 360, y: 390 }];

  const connections = [];
  left.forEach((a) => middle.forEach((b) => connections.push({ a, b })));
  middle.forEach((a) => right.forEach((b) => connections.push({ a, b })));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0F172A",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle glow behind the middle */}
      <div
        style={{
          position: "absolute",
          width: "55%",
          height: "55%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}22 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <svg
        viewBox="0 0 440 520"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {/* Connection lines, every other in orange to suggest active paths */}
        {connections.map((c, i) => {
          const isActive = i % 3 === 0;
          return (
            <line
              key={i}
              x1={c.a.x}
              y1={c.a.y}
              x2={c.b.x}
              y2={c.b.y}
              stroke={isActive ? ORANGE : "rgba(255,255,255,0.18)"}
              strokeOpacity={isActive ? 0.85 : 1}
              strokeWidth={isActive ? "1.6" : "1"}
            />
          );
        })}

        {/* Nodes (rendered after lines so they sit on top) */}
        {[...left, ...middle, ...right].map((n, i) => (
          <g key={`node-${i}`}>
            {/* Outer halo */}
            <circle cx={n.x} cy={n.y} r="14" fill={ORANGE} opacity="0.12" />
            {/* Inner dot */}
            <circle
              cx={n.x}
              cy={n.y}
              r="8"
              fill="#0F172A"
              stroke={ORANGE}
              strokeWidth="2"
            />
          </g>
        ))}

        {/* Label at top */}
        <text
          x="220"
          y="40"
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          fontSize="14"
          fontWeight="600"
          letterSpacing="2"
          fontFamily="inherit"
        >
          NEURAL INFERENCE
        </text>

        {/* Activity indicator at bottom */}
        <g transform="translate(220, 480)">
          <circle cx="-50" cy="0" r="4" fill={ORANGE} />
          <text
            x="-38"
            y="5"
            fill="rgba(255,255,255,0.8)"
            fontSize="13"
            fontWeight="600"
            fontFamily="inherit"
          >
            Active
          </text>
        </g>
      </svg>
    </div>
  );
}

// 3) Enterprise Software — ERP dashboard skeleton ---------------------------
export function EnterpriseDashboard() {
  const kpis = [
    { label: "Revenue", value: "₦248K" },
    { label: "Orders",  value: "1,284" },
    { label: "Margin",  value: "94%",   accent: true },
  ];
  const bars = [42, 65, 50, 78, 92, 70];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F1F5F9",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "14%",
          backgroundColor: NAVY,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          paddingTop: "20px",
        }}
      >
        {/* Logo dot */}
        <div
          style={{
            width: "18px",
            height: "18px",
            backgroundColor: ORANGE,
            borderRadius: "5px",
            marginBottom: "8px",
          }}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: i === 1 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          minWidth: 0,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(11,22,40,0.1)",
              height: "10px",
              width: "70px",
              borderRadius: "5px",
            }}
          />
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: NAVY,
            }}
          />
        </div>

        {/* KPI cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
          }}
        >
          {kpis.map((k, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "12px 14px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                minWidth: 0,
              }}
            >
              <div style={LABEL_STYLE}>{k.label}</div>
              <div
                style={{
                  fontSize: "clamp(0.85rem, 1.5vw, 1.6rem)",
                  fontWeight: 800,
                  color: k.accent ? ORANGE : NAVY,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontFamily: "inherit",
                }}
              >
                {k.value}
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "14px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            minHeight: 0,
          }}
        >
          <div style={{ ...LABEL_STYLE, marginBottom: "12px" }}>
            Last 6 months
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "8px",
              flex: 1,
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  backgroundColor: i === 4 ? ORANGE : NAVY,
                  opacity: i === 4 ? 1 : 0.82,
                  borderRadius: "3px 3px 0 0",
                  minHeight: "4px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5) Websites — landing page skeleton ---------------------------------------
export function WebsiteMockup() {
  const cards = [
    { label: "Fast",        sub: "Core Web Vitals", accent: false },
    { label: "Responsive",  sub: "Mobile-first",    accent: true  },
    { label: "SEO Ready",   sub: "Built-in",        accent: false },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Nav bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 18px",
          borderBottom: "1px solid rgba(11,22,40,0.07)",
          gap: "14px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "auto" }}>
          <div style={{ width: "14px", height: "14px", backgroundColor: ORANGE, borderRadius: "3px" }} />
          <span
            style={{
              color: NAVY,
              fontWeight: 800,
              fontSize: "clamp(0.45rem, 0.8vw, 0.88rem)",
              letterSpacing: "-0.01em",
              fontFamily: "inherit",
            }}
          >
            codeket
          </span>
        </div>
        {["Home", "Services", "Work", "Contact"].map((l) => (
          <span
            key={l}
            style={{
              color: "rgba(11,22,40,0.45)",
              fontSize: "clamp(0.3rem, 0.52vw, 0.6rem)",
              fontWeight: 500,
              fontFamily: "inherit",
            }}
          >
            {l}
          </span>
        ))}
        <div
          style={{
            backgroundColor: ORANGE,
            color: "#fff",
            fontSize: "clamp(0.28rem, 0.48vw, 0.55rem)",
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: "999px",
            fontFamily: "inherit",
          }}
        >
          Get Started
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px 22px 14px",
          gap: "12px",
          minHeight: 0,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "clamp(0.85rem, 1.65vw, 2rem)",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontFamily: "inherit",
            }}
          >
            Your business.
            <br />
            <span style={{ color: ORANGE }}>Online.</span>
          </div>
          <div
            style={{
              fontSize: "clamp(0.32rem, 0.56vw, 0.66rem)",
              color: "rgba(11,22,40,0.52)",
              marginTop: "8px",
              fontFamily: "inherit",
              lineHeight: 1.5,
              maxWidth: "58%",
            }}
          >
            Fast, modern websites built for growth. SEO-ready from day one.
          </div>
          <div style={{ display: "flex", gap: "7px", marginTop: "12px" }}>
            <div
              style={{
                backgroundColor: NAVY,
                color: "#fff",
                fontSize: "clamp(0.27rem, 0.46vw, 0.54rem)",
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: "999px",
                fontFamily: "inherit",
              }}
            >
              Start a project
            </div>
            <div
              style={{
                border: "1px solid rgba(11,22,40,0.18)",
                color: NAVY,
                fontSize: "clamp(0.27rem, 0.46vw, 0.54rem)",
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: "999px",
                fontFamily: "inherit",
              }}
            >
              See our work
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "7px",
            flexShrink: 0,
          }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                backgroundColor: c.accent ? NAVY : "#F8FAFC",
                borderRadius: "7px",
                padding: "9px 11px",
                border: c.accent ? "none" : "1px solid rgba(11,22,40,0.06)",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "4px",
                  backgroundColor: c.accent ? ORANGE : "rgba(11,22,40,0.18)",
                  borderRadius: "2px",
                  marginBottom: "6px",
                }}
              />
              <div
                style={{
                  fontSize: "clamp(0.32rem, 0.56vw, 0.66rem)",
                  fontWeight: 700,
                  color: c.accent ? "#fff" : NAVY,
                  fontFamily: "inherit",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.27rem, 0.44vw, 0.52rem)",
                  color: c.accent ? "rgba(255,255,255,0.55)" : "rgba(11,22,40,0.45)",
                  fontFamily: "inherit",
                  marginTop: "2px",
                }}
              >
                {c.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6) Data Analytics — hero line chart ---------------------------------------
export function AnalyticsChart() {
  // Data points showing improving accuracy (SVG y is inverted)
  const points = [
    { x:  20, y: 280 },
    { x:  85, y: 248 },
    { x: 150, y: 212 },
    { x: 215, y: 170 },
    { x: 280, y: 142 },
    { x: 345, y:  98 },
    { x: 410, y:  72 },
  ];
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} 320 L ${points[0].x} 320 Z`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F8FAFC",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div style={LABEL_STYLE}>Model accuracy</div>
          <div
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(1.6rem, 2.8vw, 3.4rem)",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginTop: "6px",
            }}
          >
            94%
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(194,65,12,0.13)",
            color: ORANGE,
            fontSize: "clamp(0.55rem, 0.9vw, 0.95rem)",
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: "999px",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          +12% YoY ↑
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, marginTop: "8px", minHeight: 0 }}>
        <svg
          viewBox="0 0 430 340"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <defs>
            <linearGradient id="analytics-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ORANGE} stopOpacity="0.28" />
              <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[80, 160, 240, 320].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="430"
              y2={y}
              stroke="rgba(11,22,40,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Area fill under line */}
          <path d={areaPath} fill="url(#analytics-gradient)" />

          {/* The line */}
          <path
            d={linePath}
            fill="none"
            stroke={ORANGE}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((p, i) => {
            const isLast = i === points.length - 1;
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={isLast ? 7 : 4.5}
                fill="#fff"
                stroke={ORANGE}
                strokeWidth={isLast ? 3 : 2.5}
              />
            );
          })}
        </svg>
      </div>

      {/* X-axis labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      >
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
          <div
            key={m}
            style={{
              fontSize: "clamp(0.4rem, 0.65vw, 0.7rem)",
              color: "rgba(11,22,40,0.55)",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
