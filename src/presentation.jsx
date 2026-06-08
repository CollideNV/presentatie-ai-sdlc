 import React from 'react'
import {
  Deck, Slide, Heading, Text, Notes, FlexBox, Box, DeckContext,
} from 'spectacle'
import { theme, NAVY, SLATE, MUTED, TEAL, BLUE, BG, WHITE, BORDER } from './theme.js'

// ── Design helpers ──────────────────────────────────────────────────────────

const G = ({ children, from = TEAL, to = BLUE }) => (
  <span style={{
    background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}>{children}</span>
)

const Rule = ({ color = TEAL, width = 40 }) => (
  <Box style={{
    height: 3,
    width,
    background: `linear-gradient(to right, ${color}, ${color}44)`,
    borderRadius: 2,
    marginBottom: 24,
  }} />
)

// ── Slide base styles ───────────────────────────────────────────────────────
const SW = { backgroundColor: WHITE, padding: '52px 72px' }

// ── Requirements evolutie ────────────────────────────────────────────────────

function RequirementsEvolutie({ phase }) {
  const ff = 'Inter, sans-serif'
  const configs = [
    {
      dark: false, accent: SLATE,
      eyebrow: '1 van 3 · Requirements — Vroeger',
      headline: 'Één reviewer. Alle vragen tegelijk.',
      bullets: [
        'Tech Team reviewt kwaliteit, functioneel én intent in één reviewmoment.',
        'Drie soorten expertise, één overbelaste reviewronde.',
        'Systematische checks vallen weg tussen de grote discussies.',
      ],
    },
    {
      dark: true, accent: TEAL,
      eyebrow: '1 van 3 · Requirements — Fase 1',
      headline: 'AI doet de kwaliteitscheck.',
      bullets: [
        "AI Agent screent elk requirement: tegenstrijdigheden, ontbrekende scenario's, onduidelijkheden.",
        'Tech Lead focust enkel op functionele intent — niet meer op checklist werk.',
        'Sneller, grondiger — en de analist krijgt direct feedback.',
      ],
    },
    {
      dark: true, accent: BLUE,
      eyebrow: '1 van 3 · Requirements — Fase 2',
      headline: 'De AIGeneer schrijft mee.',
      bullets: [
        "Requirements én Gedragsscenario's worden door de AIGeneer opgesteld — AI Agent valideert de volledigheid.",
        'AIGeneer blijft eindverantwoordelijk: AI ondersteunt, mens beslist.',
        "Wat je nu schrijft, wordt straks ook de basis voor je testen — één investering, twee keer rendement.",
      ],
    },
  ]
  const c = configs[phase]
  const bg = c.dark ? NAVY : BG
  const headlineColor = c.dark ? WHITE : NAVY
  const textColor = c.dark ? `${WHITE}CC` : SLATE
  const eyebrowColor = c.dark ? c.accent : MUTED
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: bg, display: 'flex', overflow: 'hidden' }}>
      {/* Content column */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 80px', boxSizing: 'border-box', minWidth: 0 }}>
        {c.dark && <>
          <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', border: `1px solid ${c.accent}18`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 20, top: 20, width: 160, height: 160, borderRadius: '50%', border: `1px solid ${c.accent}10`, pointerEvents: 'none' }} />
        </>}
        <p style={{ color: eyebrowColor, fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 16px', fontFamily: ff }}>{c.eyebrow}</p>
        <div style={{ height: 3, width: 40, background: `linear-gradient(to right, ${c.accent}, ${c.accent}44)`, borderRadius: 2, marginBottom: 28 }} />
        <p style={{ color: headlineColor, fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 36px', fontFamily: ff, maxWidth: '90%' }}>{c.headline}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {c.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ color: c.accent, fontSize: '1.1rem', lineHeight: 1.5, fontFamily: ff, flexShrink: 0 }}>—</span>
              <p style={{ color: textColor, fontSize: '1.0rem', lineHeight: 1.6, margin: 0, fontFamily: ff }}>{b}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Illustration panel — sprite sheet, one scene per phase */}
      <div style={{
        width: '36%',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: c.dark ? NAVY : BG,
        borderLeft: c.dark ? `1px solid ${c.accent}18` : `1px solid ${SLATE}15`,
      }}>
        <img alt="" src="/Gemini_Generated_Image_hhm3vwhhm3vwhhm3.png" style={{
          width: 'auto',
          height: '306%',
          position: 'absolute',
          top: `calc(${-phase * 100}% - 1%)`,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'block',
        }} />
      </div>
    </div>
  )
}


// ── Code evolutie ────────────────────────────────────────────────────────────

function CodeEvolutie({ phase }) {
  const ff = 'Inter, sans-serif'
  const configs = [
    {
      dark: false, accent: SLATE,
      eyebrow: '2 van 3 · Code-ontwikkeling — Vroeger',
      headline: 'Developer doet alles zelf.',
      bullets: [
        'Van technische analyse tot pull request: één persoon, alles tegelijk.',
        'PR als enig veiligheidsnet: kwaliteit, context en architectuur — allemaal tegelijk beoordeeld.',
        'Hoog volume, hoge mentale belasting, trage feedback loop.',
      ],
    },
    {
      dark: true, accent: TEAL,
      eyebrow: '2 van 3 · Code-ontwikkeling — Fase 1',
      headline: 'AI versnelt de uitvoering.',
      bullets: [
        'Implementatie en testen AI-assisted: developer stuurt, AI voert uit.',
        'PR gesplitst: AI Agent doet de snelle kwaliteitscheck, Dev Team focust op context en intent.',
        'Minder boilerplate schrijven — meer tijd voor wat écht telt.',
      ],
    },
    {
      dark: true, accent: BLUE,
      eyebrow: '2 van 3 · Code-ontwikkeling — Fase 2',
      headline: 'AI Agent schrijft en test de code.',
      bullets: [
        "AI Agent implementeert volledig op basis van Gedragsscenario's — inclusief automatische testen.",
        'AIGeneer bepaalt de architectuur en keurt goed via de PR deep-dive.',
        'Geen diepgaande technische kennis vereist. De driving seat blijft bij de mens.',
      ],
    },
  ]
  const c = configs[phase]
  const bg = c.dark ? NAVY : BG
  const headlineColor = c.dark ? WHITE : NAVY
  const textColor = c.dark ? `${WHITE}CC` : SLATE
  const eyebrowColor = c.dark ? c.accent : MUTED
  const cornerImgs = ['/img.png', '/img_1.png', '/img_3.png']
  const cornerImg = cornerImgs[phase]
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: bg, overflow: 'hidden' }}>
      {/* Decorative circles for dark slides */}
      {c.dark && <>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 420, height: 420, borderRadius: '50%', border: `1px solid ${c.accent}18`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 40, top: 40, width: 220, height: 220, borderRadius: '50%', border: `1px solid ${c.accent}10`, pointerEvents: 'none' }} />
      </>}
      {/* Corner background image */}
      {cornerImg && <img alt="" src={cornerImg} style={{
        position: 'absolute', bottom: -80, right: -80,
        width: 520, height: 520,
        pointerEvents: 'none',
        opacity: 0.50,
        maskImage: 'radial-gradient(ellipse 80% 80% at 80% 80%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 80% 80%, black 30%, transparent 75%)',
      }} />}
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '52px 96px', boxSizing: 'border-box' }}>
        <p style={{ color: eyebrowColor, fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 16px', fontFamily: ff }}>{c.eyebrow}</p>
        <div style={{ height: 3, width: 40, background: `linear-gradient(to right, ${c.accent}, ${c.accent}44)`, borderRadius: 2, marginBottom: 28 }} />
        <p style={{ color: headlineColor, fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 36px', fontFamily: ff, maxWidth: '68%' }}>{c.headline}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '65%' }}>
          {c.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ color: c.accent, fontSize: '1.1rem', lineHeight: 1.5, fontFamily: ff, flexShrink: 0 }}>—</span>
              <p style={{ color: textColor, fontSize: '1.0rem', lineHeight: 1.6, margin: 0, fontFamily: ff }}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Testing timeline SVG ─────────────────────────────────────────────────────

function TestingTimeline({ phase, dark }) {
  const ff = 'Inter, sans-serif'
  const W = 1200, H = 110, Y = 44
  const nodes = [
    { x: 100,  label: 'Requirements' },
    { x: 390,  label: 'Development'  },
    { x: 720,  label: 'Testing'      },
    { x: 1060, label: 'Delivery'     },
  ]
  const mutedLine  = dark ? 'rgba(255,255,255,0.15)' : 'rgba(71,85,105,0.22)'
  const mutedDot   = dark ? 'rgba(255,255,255,0.20)' : 'rgba(71,85,105,0.28)'
  const labelColor = dark ? 'rgba(255,255,255,0.38)' : 'rgba(71,85,105,0.55)'

  const segColor = (i) => {
    if (phase === 0) return i === 2 ? 'rgba(239,68,68,0.55)' : mutedLine
    if (phase === 1) return i >= 1 ? 'rgba(13,148,136,0.45)' : mutedLine
    return 'rgba(34,197,94,0.55)'
  }

  const nodeStyle = (i) => {
    if (phase === 0) {
      if (i === 3) return { r: 16, fill: null, stroke: '#ef4444', sw: 2.5, icon: '!', ic: '#ef4444' }
      return { r: 5, fill: mutedDot, stroke: null, sw: 0, icon: null }
    }
    if (phase === 1) {
      if (i === 1) return { r: 14, fill: '#0d9488', stroke: null, sw: 0, icon: '✓', ic: '#fff' }
      if (i === 2) return { r: 14, fill: '#0d9488', stroke: null, sw: 0, icon: '✓', ic: '#fff' }
      if (i === 3) return { r: 8,  fill: null, stroke: 'rgba(13,148,136,0.4)', sw: 2, icon: null }
      return { r: 5, fill: mutedDot, stroke: null, sw: 0, icon: null }
    }
    return { r: 14, fill: '#22c55e', stroke: null, sw: 0, icon: '✓', ic: '#fff' }
  }

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ fontFamily: ff, display: 'block' }}>
      {nodes.slice(0, -1).map((n, i) => (
        <line key={i} x1={n.x} y1={Y} x2={nodes[i + 1].x} y2={Y}
          stroke={segColor(i)} strokeWidth={2}
          strokeDasharray={phase === 0 && i === 2 ? '7 5' : undefined} />
      ))}
      {nodes.map((node, i) => {
        const s = nodeStyle(i)
        return (
          <g key={i}>
            {s.fill
              ? <circle cx={node.x} cy={Y} r={s.r} fill={s.fill} />
              : <circle cx={node.x} cy={Y} r={s.r} fill="none" stroke={s.stroke} strokeWidth={s.sw} />}
            {s.icon && (
              <text x={node.x} y={Y + 5} textAnchor="middle" fill={s.ic}
                fontSize={s.icon === '!' ? 14 : 12} fontWeight="bold">{s.icon}</text>
            )}
            <text x={node.x} y={Y + s.r + 18} textAnchor="middle"
              fill={labelColor} fontSize={10.5} letterSpacing="0.04em">{node.label}</text>
          </g>
        )
      })}
      {phase === 0 && (
        <text x={1060} y={Y - 26} textAnchor="middle" fill="#ef4444"
          fontSize={10} opacity={0.8} letterSpacing="0.08em">LAAT ONTDEKT</text>
      )}
      {phase === 1 && (
        <g>
          <rect x={511} y={Y - 38} width={88} height={19} rx={3} fill="#0d9488" fillOpacity={0.15} />
          <text x={555} y={Y - 24} textAnchor="middle" fill="#0d9488"
            fontSize={9.5} letterSpacing="0.1em">AI‑ASSISTED</text>
        </g>
      )}
      {phase === 2 && (
        <g>
          <rect x={1016} y={Y - 38} width={88} height={19} rx={3} fill="#22c55e" fillOpacity={0.15} />
          <text x={1060} y={Y - 24} textAnchor="middle" fill="#22c55e"
            fontSize={9.5} letterSpacing="0.1em">CI/CD AUTO</text>
        </g>
      )}
    </svg>
  )
}

// ── Testing evolutie ─────────────────────────────────────────────────────────

function TestingEvolutie({ phase }) {
  const ff = 'Inter, sans-serif'
  const configs = [
    {
      dark: false, accent: SLATE,
      eyebrow: '3 van 3 · Testing & Delivery — Vroeger',
      headline: 'Vakwerk. Maar laat en arbeidsintensief.',
      bullets: [
        "Requirements en testscenario's werden zorgvuldig opgesteld — door mensen met kennis van zaken, maar op twee aparte sporen.",
        'Verificatie gebeurde aan het einde van het traject — pas daar wist je zeker of het klopte.',
        'Hoe later een fout opduikt, hoe duurder de oplossing. Dat is geen verwijt — dat is gewoon hoe het werkt.',
      ],
    },
    {
      dark: true, accent: TEAL,
      eyebrow: '3 van 3 · Testing & Delivery — Fase 1',
      headline: 'AI-assisted testing.',
      bullets: [
        "QA-Engineer schrijft scenario's en testen met AI-hulp: sneller, betere dekking.",
        'AI genereert de randgevallen die een mens zou missen.',
        'QA-Engineer focust op intentie en gedrag — niet meer op checklist werk.',
      ],
    },
    {
      dark: true, accent: BLUE,
      eyebrow: '3 van 3 · Testing & Delivery — Fase 2',
      headline: 'Alles komt samen.',
      bullets: [
        "Gedragsscenario's uit stap 1 zijn de bron: AI Agent genereert alle E2E testen automatisch.",
        '"Is dit wat de klant wil?" werd al beantwoord in de requirements fase — niet op het einde.',
        'AIGeneer keurt goed op gedrag en intent. CI/CD deployt automatisch.',
      ],
    },
  ]
  const c = configs[phase]
  const bg = c.dark ? NAVY : BG
  const headlineColor = c.dark ? WHITE : NAVY
  const textColor = c.dark ? `${WHITE}CC` : SLATE
  const eyebrowColor = c.dark ? c.accent : MUTED
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: bg, overflow: 'hidden' }}>
      {c.dark && <>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 420, height: 420, borderRadius: '50%', border: `1px solid ${c.accent}18`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 40, top: 40, width: 220, height: 220, borderRadius: '50%', border: `1px solid ${c.accent}10`, pointerEvents: 'none' }} />
      </>}
      <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <TestingTimeline phase={phase} dark={c.dark} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '52px 96px 160px', boxSizing: 'border-box' }}>
        <p style={{ color: eyebrowColor, fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 16px', fontFamily: ff }}>{c.eyebrow}</p>
        <div style={{ height: 3, width: 40, background: `linear-gradient(to right, ${c.accent}, ${c.accent}44)`, borderRadius: 2, marginBottom: 28 }} />
        <p style={{ color: headlineColor, fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 36px', fontFamily: ff, maxWidth: '78%' }}>{c.headline}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '65%' }}>
          {c.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ color: c.accent, fontSize: '1.1rem', lineHeight: 1.5, fontFamily: ff, flexShrink: 0 }}>—</span>
              <p style={{ color: textColor, fontSize: '1.0rem', lineHeight: 1.6, margin: 0, fontFamily: ff }}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ── Presentation ────────────────────────────────────────────────────────────

function ClickToAdvance() {
  const { stepForward } = React.useContext(DeckContext)
  React.useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest('button, a, input, select, textarea')) return
      stepForward()
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [stepForward])
  return null
}

export default function Presentation() {
  return (
    <Deck theme={theme} template={() => null}>
      <ClickToAdvance />

      {/* ── 1. Titelpagina ──────────────────────────────────────────── */}
      <Slide style={{ ...SW, padding: 0 }}>
        {/* Absolute full-bleed layout to bypass Spectacle's content wrapper */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          {/* Left accent bar */}
          <div style={{
            width: 6,
            background: `linear-gradient(to bottom, ${TEAL}, ${BLUE})`,
            flexShrink: 0,
          }} />
          {/* Main content */}
          <div style={{ flex: 1, padding: '56px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{
              color: MUTED,
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: '0 0 32px',
              fontFamily: 'Inter, sans-serif',
            }}>
              AI with Business Impact · Corda Campus Hasselt · 09/06/2026
            </p>
            <h1 style={{
              color: NAVY,
              fontSize: '3.8rem',
              fontWeight: 900,
              lineHeight: 1.1,
              margin: '0 0 24px',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'left',
            }}>
              AI in uw<br />
              <G from={TEAL} to={BLUE}>ontwikkelingsproces</G>
            </h1>
            <p style={{ color: SLATE, fontSize: '1.15rem', margin: '0 0 60px', fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
              Van snelheid naar beheersbaarheid — en terug
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <div>
                <p style={{ color: NAVY, fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>Berten De Schutter</p>
                <p style={{ color: TEAL, fontSize: '0.85rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>Collide</p>
              </div>
              <div style={{ width: 1, background: BORDER, margin: '0 36px', height: 32 }} />
              <div>
                <p style={{ color: NAVY, fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>Rubin Beckers</p>
                <p style={{ color: BLUE, fontSize: '0.85rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>The Value Hub</p>
              </div>
            </div>
          </div>
          {/* Right image panel — replace img src with generated image */}
          <div style={{
            width: '36%',
            flexShrink: 0,
            borderLeft: `1px solid ${TEAL}18`,
            overflow: 'hidden',
            background: `linear-gradient(160deg, ${TEAL}0a 0%, ${BLUE}07 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/title-image.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
        <Notes>
          <em>Wacht tot iedereen zit. Start rustig.</em>
        </Notes>
      </Slide>

      {/* ── 2. Intro — split visitekaartjes ─────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: '#001827' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>

          {/* ── Berten / Collide — dark card ── */}
          <div style={{
            flex: 1,
            backgroundColor: '#001827',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '56px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative circle background */}
            <div style={{
              position: 'absolute', bottom: -80, right: -80,
              width: 280, height: 280, borderRadius: '50%',
              border: '1.5px solid #37E28420', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -20, right: -20,
              width: 160, height: 160, borderRadius: '50%',
              border: '1.5px solid #37E28430', pointerEvents: 'none',
            }} />

            {/* Photo placeholder */}
            <div style={{
              width: 160, height: 160, borderRadius: '50%',
              background: '#37E28420',
              border: '2px solid #37E28460',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 28,
              fontSize: '1.6rem', fontWeight: 800,
              color: '#37E284',
              fontFamily: 'Inter, sans-serif',
              overflow: 'hidden',
            }}>
              <img src="/berten.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p style={{ color: '#37E284', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 10px', fontFamily: 'Inter, sans-serif' }}>
              Software Architect
            </p>
            <h2 style={{ color: '#FAFAFE', fontSize: '2rem', fontWeight: 800, margin: '0 0 4px', fontFamily: 'Inter, sans-serif', lineHeight: 1.15 }}>
              Berten<br />De Schutter
            </h2>
            <p style={{ color: '#37E284', fontSize: '1rem', fontWeight: 600, margin: '20px 0 0', fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em' }}>
              collide.be
            </p>
          </div>

          {/* ── Divider ── */}
          <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, #37E28440, transparent)', flexShrink: 0 }} />

          {/* ── Rubin / The Value Hub — light card ── */}
          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '56px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative circle background */}
            <div style={{
              position: 'absolute', top: -80, left: -80,
              width: 280, height: 280, borderRadius: '50%',
              border: '1.5px solid #F0B23B25', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', top: -20, left: -20,
              width: 160, height: 160, borderRadius: '50%',
              border: '1.5px solid #F0B23B35', pointerEvents: 'none',
            }} />

            {/* Photo placeholder */}
            <div style={{
              width: 160, height: 160, borderRadius: '50%',
              background: '#F0B23B18',
              border: '2px solid #F0B23B55',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 28,
              fontSize: '1.6rem', fontWeight: 800,
              color: '#F0B23B',
              fontFamily: 'Inter, sans-serif',
              overflow: 'hidden',
              alignSelf: 'flex-end',
            }}>
              <img src="/_JVR5052.jpg" alt="Rubin Beckers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p style={{ color: '#F0B23B', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 10px', fontFamily: 'Inter, sans-serif', textAlign: 'right' }}>
              Manager
            </p>
            <h2 style={{ color: '#181946', fontSize: '2rem', fontWeight: 800, margin: '0 0 4px', fontFamily: 'Inter, sans-serif', lineHeight: 1.15, textAlign: 'right' }}>
              Rubin<br />Beckers
            </h2>
            <p style={{ color: '#F0B23B', fontSize: '1rem', fontWeight: 600, margin: '20px 0 0', fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em', textAlign: 'right' }}>
              thevaluehub.be
            </p>
          </div>

          {/* ── Bottom tagline bar ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '16px 60px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(8px)',
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.85rem',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              letterSpacing: '0.04em',
            }}>
              Samen runnen we een <strong style={{ color: '#37E284' }}>Product Factory</strong> — software-projecten voor onze klanten, van idee tot oplevering.
            </p>
          </div>
        </div>
        <Notes>
          <em>[Berten]</em> "Ik ben Berten."<br/>
          <em>[Rubin]</em> "En ik ben Rubin."<br/><br/>
          "Samen runnen we een Product Factory — we managen software-projecten voor onze klanten, van idee tot oplevering."<br/><br/>
          "En het is vanuit die context dat we hier staan vandaag."<br/><br/>
          <em>Overgang:</em><br/>
          "Want jullie kennen ze vast — die LinkedIn posts waarbij iemand beweert een hele app te hebben gebouwd in een uurtje. Uiteraard willen wij onze werking ook automatiseren. Dus hebben we het gewoon... geprobeerd."
        </Notes>
      </Slide>

      {/* ── 2b. LinkedIn post ───────────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: '#F3F2EF' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Subtle LinkedIn nav bar hint at top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 52, background: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span style={{ color: '#0A66C2', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.02em' }}>LinkedIn</span>
          </div>

          {/* Post card */}
          <div style={{
            width: '100%', maxWidth: 560, marginTop: 52,
            background: '#FFFFFF',
            borderRadius: 8,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            overflow: 'hidden',
          }}>
            {/* Post header */}
            <div style={{ padding: '12px 16px 0', display: 'flex', gap: 10 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #0073b1, #004471)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '1rem', fontWeight: 700,
              }}>NV</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: '#000000E6', fontSize: '0.9rem', fontWeight: 600 }}>Niels Vermeersch</span>
                  <span style={{ color: '#0A66C2', fontSize: '0.78rem', fontWeight: 600 }}>· 1e</span>
                </div>
                <div style={{ color: '#00000099', fontSize: '0.76rem', lineHeight: 1.3 }}>CEO @ BuildFast · SaaS builder · Tech enthusiast</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <span style={{ color: '#00000066', fontSize: '0.72rem' }}>2 uur geleden</span>
                  <span style={{ color: '#00000066' }}>·</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="#00000066"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm5-3.25v3.5l2.6 1.55.52-.87-2.12-1.26V4.75h-1z"/></svg>
                </div>
              </div>
              <button style={{ alignSelf: 'flex-start', marginTop: 2, background: 'none', border: 'none', color: '#0A66C2', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', padding: '2px 6px', flexShrink: 0 }}>
                + Volgen
              </button>
            </div>

            {/* Post body */}
            <div style={{ padding: '10px 16px 12px' }}>
              <p style={{ color: '#000000E6', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
                Zojuist een volledig werkend platform gebouwd in <strong>47 minuten</strong>. 🤯<br /><br />
                Geen developer. Geen technische kennis. Gewoon prompts.<br /><br />
                ✅ Database + login<br />
                ✅ Dashboard met analytics<br />
                ✅ REST API<br />
                ✅ Mobielvriendelijke UI<br /><br />
                Traditionele developers: oppassen. 👀<br />
                De toekomst is <em>nu</em>.<br /><br />
                <span style={{ color: '#0A66C2' }}>#AI #VibeCode #NoCode #BuildFast #Innovatie</span>
              </p>
            </div>

            {/* Reactions row */}
            <div style={{ padding: '4px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: '0.9rem' }}>👍</span><span style={{ fontSize: '0.9rem' }}>❤️</span><span style={{ fontSize: '0.9rem' }}>🔥</span>
                <span style={{ color: '#00000066', fontSize: '0.78rem', marginLeft: 2 }}>1.247</span>
              </div>
              <span style={{ color: '#00000066', fontSize: '0.76rem' }}>312 reacties · 94 keer gedeeld</span>
            </div>

            {/* Action bar */}
            <div style={{ padding: '2px 8px', display: 'flex', justifyContent: 'space-around' }}>
              {[{ icon: '👍', label: 'Vind ik leuk' }, { icon: '💬', label: 'Reageren' }, { icon: '↗', label: 'Delen' }, { icon: '✉', label: 'Sturen' }].map(({ icon, label }) => (
                <button key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: '#00000066', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: '8px 10px', borderRadius: 4, fontFamily: 'system-ui, sans-serif' }}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Notes>
          <em>[Wijs naar het scherm]</em><br/><br/>
          "U kent ze wel — die LinkedIn posts. Iemand bouwt een volledig platform in 47 minuten. Zonder developer. Gewoon prompts."<br/><br/>
          "En de comments stromen binnen: 'Waanzinnig!' 'Indrukwekkend!' '🔥'"<br/><br/>
          "Dus wat doen wij? We proberen het."
        </Notes>
      </Slide>

      {/* ── 3a. Ons vibe coding experiment ──────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: WHITE }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 96px', boxSizing: 'border-box' }}>
          <p style={{ color: MUTED, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 16px', fontFamily: 'Inter, sans-serif' }}>
            Ons eerste experiment
          </p>
          <h2 style={{ color: NAVY, fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', fontFamily: 'Inter, sans-serif' }}>
            Dus hebben we het gewoon geprobeerd.
          </h2>
          <p style={{ color: SLATE, fontSize: '0.95rem', lineHeight: 1.65, margin: '0 0 32px', fontFamily: 'Inter, sans-serif' }}>
            In het begin was het indrukwekkend. Maar al snel merkten we wat vibe coding in de praktijk betekent:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'Features die we nooit gevraagd hadden — maar wel gebouwd werden.',
              'Functionaliteit op meerdere plaatsen in de app, en ook op meerdere plaatsen in de code.',
              'Data samengesteld door de code zelf — in plaats van uit de database opgehaald.',
              'Een kluwen van applicaties waarvan enkel AI wist hoe ze te starten — architectuur die niemand meer begreep.',
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: TEAL, fontSize: '1.1rem', lineHeight: 1.55, fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>—</span>
                <p style={{ color: SLATE, fontSize: '0.98rem', lineHeight: 1.6, margin: 0, fontFamily: 'Inter, sans-serif' }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
        <Notes>
          "We zijn het gewoon gaan doen. We hebben een prompt geschreven, AI laten werken, en in het begin was het... eigenlijk best indrukwekkend."<br/><br/>
          "Maar al snel zagen we wat er in de praktijk gebeurt. Features die we nooit gevraagd hadden — maar AI vond ze een goed idee. Dezelfde functionaliteit op drie verschillende plekken in de app, ook drie keer geschreven in de code. Data die gewoon door de code werd samengesteld — alsof het klopte — maar nergens uit de database kwam. En op het einde: een kluwen van applicaties waarvan niemand meer wist hoe alles samenhing."<br/><br/>
          "De code deed iets, maar niemand begreep meer precies wat — of waarom."
        </Notes>
      </Slide>

      {/* ── 3b. De les ───────────────────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: NAVY }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: NAVY, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 96px', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -80, top: -80, width: 420, height: 420, borderRadius: '50%', border: `1px solid ${TEAL}18`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 40, top: 40, width: 220, height: 220, borderRadius: '50%', border: `1px solid ${TEAL}10`, pointerEvents: 'none' }} />
          <p style={{ color: TEAL, fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 16px', fontFamily: 'Inter, sans-serif' }}>De les</p>
          <div style={{ height: 3, width: 40, background: `linear-gradient(to right, ${TEAL}, ${TEAL}44)`, borderRadius: 2, marginBottom: 28 }} />
          <p style={{ color: WHITE, fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 24px', fontFamily: 'Inter, sans-serif' }}>
            AI heeft guardrails nodig.
          </p>
          <p style={{ color: `${WHITE}88`, fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 36px', fontFamily: 'Inter, sans-serif', maxWidth: '72%' }}>
            Zonder duidelijke kaders beslist AI zelf wat het bouwt — en hoe. Je moet expliciet zeggen wat kan en wat niet. De teugels in eigen handen houden is geen rem op snelheid. Het is de enige manier om die snelheid vol te houden.
          </p>
        </div>
        <Notes>
          "De les was niet dat AI te snel gaat. De les was dat wij te weinig richting gaven."<br/><br/>
          "AI vult de leegte op. Als u niet zegt hoe de architectuur moet zijn, kiest AI er één. Als u niet zegt welke data uit de database moet komen, bedenkt AI iets. Als u niet zegt wat de scope is, bouwt AI verder."<br/><br/>
          "Guardrails zijn geen beperking — ze zijn de voorwaarde om AI nuttig te laten zijn."<br/><br/>
          <em>Overgang:</em> "En het goede nieuws: die guardrails hoef je niet uit het niets te bedenken."
        </Notes>
      </Slide>


      {/* ── 4. Het antwoord lag er al — full dark statement ─────────── */}
      <Slide style={{ padding: 0, backgroundColor: NAVY }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: NAVY, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {/* Subtle decorative circles — depth without distraction */}
          <div style={{ position: 'absolute', right: -160, top: -160, width: 520, height: 520, borderRadius: '50%', border: `1px solid ${TEAL}12`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -100, top: -100, width: 360, height: 360, borderRadius: '50%', border: `1px solid ${TEAL}18`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -120, bottom: -120, width: 400, height: 400, borderRadius: '50%', border: `1px solid ${BLUE}12`, pointerEvents: 'none' }} />

          {/* Content — centered, max readable width */}
          <div style={{ textAlign: 'center', maxWidth: 740, padding: '0 48px', position: 'relative', zIndex: 1 }}>

            <p style={{ color: TEAL, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 32px', fontFamily: 'Inter, sans-serif' }}>
              De doorbraak
            </p>

            <h2 style={{ color: WHITE, fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 32px', fontFamily: 'Inter, sans-serif' }}>
              Het antwoord<br />lag er al.
            </h2>

            <p style={{ color: `${WHITE}88`, fontSize: '1.05rem', lineHeight: 1.8, margin: '0 0 48px', fontFamily: 'Inter, sans-serif' }}>
              Vijfendertig jaar IT-projecten hebben ons geleerd wat softwarelevering doet slagen.
              Niet als theorie — in de praktijk, keer op keer.
            </p>

            {/* Pillars — inline, no boxes */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, marginBottom: 48, flexWrap: 'wrap' }}>
              {['Requirements', 'Architectuur', 'Testing', 'Delivery'].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <span style={{ color: WHITE, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    {item}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: TEAL, margin: '0 14px', fontSize: '0.9rem' }}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Accent divider */}
            <div style={{ width: 56, height: 3, background: `linear-gradient(to right, ${TEAL}, ${BLUE})`, borderRadius: 2, margin: '0 auto 32px' }} />

            <p style={{ color: `${WHITE}66`, fontSize: '0.95rem', lineHeight: 1.7, margin: 0, fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
              Die structuur verdwijnt niet door AI. Ze maakt AI pas echt waardevol.
            </p>
          </div>
        </div>
        <Notes>
          "Na dat experiment stonden we voor een keuze: doorgaan met vibe coding, of teruggaan naar hoe we altijd hebben gewerkt. Maar er is een derde weg."<br/><br/>
          "De structuur die wij als IT-sector de afgelopen vijfendertig jaar hebben opgebouwd — requirements begrijpen, architectuur nadenken, testen, gestructureerd opleveren — die verdwijnt niet. Die wordt het stuur waarmee we AI aansturen."<br/><br/>
          "Snelheid van AI, gecombineerd met structuur die we al kennen. Dat is geen compromis — dat is het beste van beide werelden."
        </Notes>
      </Slide>

      {/* ── Requirements evolutie — 3 slides ────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <RequirementsEvolutie phase={0} />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "Laten we even terugkijken naar hoe het vroeger werkte. Klantgesprek → requirements → acceptance criteria → en dan: was het goed genoeg? Één persoon die dat allemaal moet beoordelen."<br/><br/>
          "Kwaliteit, volledigheid én functionele fit — allemaal op hetzelfde reviewmoment. Dat is traag, arbeidsintensief, en elk type vraag vraagt eigenlijk een andere expertise."
        </Notes>
      </Slide>

      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <RequirementsEvolutie phase={1} />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "In Fase 1 splitsen we die review op. AI doet de snelle volledigheidscheck: zijn er tegenstrijdigheden? Ontbreken er scenario's? Is de User Story helder?"<br/><br/>
          "De Tech Lead focust op intentie en toepasbaarheid. Niet meer 'is dit compleet?' — dat heeft AI al gedaan. Wel: 'klopt dit functioneel en past het bij de bedoeling van de klant?'"
        </Notes>
      </Slide>

      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <RequirementsEvolutie phase={2} />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "In Fase 2 zijn we verder gegaan. We schrijven nu Gedragsscenario's. Vóór er nagedacht wordt over architectuur of implementatie beschrijft het hele team samen hoe het systeem zich moet gedragen — in elk denkbaar scenario."<br/><br/>
          "En die scenario's verdwijnen niet. Ze leven in de codebase. En — zoals je straks zult zien — ze betalen dubbel."
        </Notes>
      </Slide>

      {/* ── 8. AIGeneer ─────────────────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: NAVY }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: NAVY, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {/* Decorative circles */}
          <div style={{ position: 'absolute', right: -140, top: -140, width: 480, height: 480, borderRadius: '50%', border: `1px solid ${TEAL}10`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -80, top: -80, width: 300, height: 300, borderRadius: '50%', border: `1px solid ${TEAL}16`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -100, bottom: -100, width: 360, height: 360, borderRadius: '50%', border: `1px solid ${BLUE}12`, pointerEvents: 'none' }} />

          <div style={{ textAlign: 'center', maxWidth: 760, padding: '0 56px', position: 'relative', zIndex: 1 }}>

            <p style={{ color: TEAL, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 28px', fontFamily: 'Inter, sans-serif' }}>
              Een nieuwe manier van werken
            </p>

            <h2 style={{ margin: '0 0 32px', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>
              <span style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, ${BLUE} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '4rem',
                fontWeight: 900,
              }}>AIGeneer</span>
            </h2>

            <p style={{ color: `${WHITE}80`, fontSize: '1.1rem', lineHeight: 1.8, margin: '0 0 48px', fontFamily: 'Inter, sans-serif' }}>
              Je merkt misschien al dat we hier niet meer over aparte rollen spreken.<br />
              In een AI-ondersteunde werking spreken wij liever over <strong style={{ color: WHITE }}>AIGeneers</strong>.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 48 }}>
              <div style={{ textAlign: 'center', padding: '0 36px', borderRight: `1px solid ${WHITE}15` }}>
                <p style={{ color: MUTED, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>Vroeger</p>
                <p style={{ color: `${WHITE}55`, fontSize: '0.88rem', fontFamily: 'Inter, sans-serif', margin: 0 }}>Analist · Architect · Developer · QA</p>
              </div>
              <div style={{ textAlign: 'center', padding: '0 36px' }}>
                <p style={{ color: TEAL, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>Nu</p>
                <p style={{ color: WHITE, fontSize: '0.88rem', fontFamily: 'Inter, sans-serif', margin: 0 }}>Iemand die de volledige keten bewaakt — met AI</p>
              </div>
            </div>

            <div style={{ width: 56, height: 3, background: `linear-gradient(to right, ${TEAL}, ${BLUE})`, borderRadius: 2, margin: '0 auto 28px' }} />

            <p style={{ color: `${WHITE}50`, fontSize: '0.95rem', lineHeight: 1.7, margin: 0, fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
              Iemand die vroeger enkel analyse deed is nu misschien veel technischer betrokken — en vice versa.
            </p>
          </div>
        </div>
        <Notes>
          <em>Rustig brengen — even laten landen.</em><br/><br/>
          "Je hebt misschien gemerkt dat we de afgelopen slides niet meer spraken over 'de analist doet dit' en 'de developer doet dat'."<br/><br/>
          "Dat is bewust. In onze manier van werken spreken we liever over AIGeneers — iemand die de volledige keten bewaakt, met AI als copiloot."<br/><br/>
          "Iemand die vroeger puur analyse deed, heeft nu ook technisch inzicht in wat er gebouwd moet worden. En een developer die vroeger nooit met een klant sprak, kan nu veel dichter op de functionele vraag zitten."<br/><br/>
          "De grenzen tussen rollen vervagen. Dat is geen bedreiging — dat is een verrijking."
        </Notes>
      </Slide>

      {/* ── Code evolutie — 3 slides ─────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <CodeEvolutie phase={0} />
        <Notes>
          <em>[Berten]</em><br/><br/>
          "Vroeger deed de developer alles zelf: analyse, schrijven, testen, pull request. Eén kwaliteitscheck aan het einde — door het Dev Team. Alles op hetzelfde moment: kwaliteit, context, architectuur, intent."
        </Notes>
      </Slide>

      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <CodeEvolutie phase={1} />
        <Notes>
          <em>[Berten]</em><br/><br/>
          "In Fase 1 gaat AI helpen bij het schrijven en testen. AI-assisted — de developer beslist nog steeds, maar gaat sneller."<br/><br/>
          "AI doet een eerste review — kwaliteit, consistentie, volledigheid. Daarna focust de developer enkel op wat AI niet begrijpt: context en intent. Kleinere vragen worden weggevangen vóór de human review."
        </Notes>
      </Slide>

      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <CodeEvolutie phase={2} />
        <Notes>
          <em>[Berten]</em><br/><br/>
          "In Fase 2 neemt de AI Agent de uitvoering volledig over. Implementatie en testen worden gegenereerd op basis van de Gedragsscenario's."<br/><br/>
          "De developer verschuift naar architect en reviewer. Architectuur leeft in de code zelf — AI Agent leest die context en gebruikt ze voor de implementatie. Deep-dive blijft menselijk, maar zonder technisch profiel."
        </Notes>
      </Slide>

      {/* ── Testing evolutie — 3 slides ──────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <TestingEvolutie phase={0} />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "Vroeger schreef een QA-Engineer scenario's specifiek voor testen — vaak nadat de code al af was. Dan automatische testen draaien, manuele verificatie."<br/><br/>
          "En de vraag 'is dit wat de klant bedoelde?' landde steeds bij de QA-Engineer, op het einde van het proces. Als het antwoord 'nee' was, was de kostprijs hoog."
        </Notes>
      </Slide>

      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <TestingEvolutie phase={1} />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "In Fase 1 wordt de QA-Engineer geholpen door AI. Scenario's schrijven gaat sneller, testdekking verbetert."<br/><br/>
          "Maar de vraag 'klopt dit met de intent?' blijft bij de QA-Engineer. Met betere automatische dekking is er wel meer tijd voor de echte edge cases."
        </Notes>
      </Slide>

      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <TestingEvolutie phase={2} />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "In Fase 2 komt alles samen. De Gedragsscenario's die we in stap 1 schreven zijn nu ook de bron voor onze E2E testen. AI Agent genereert de testen, AIGeneer keurt goed."<br/><br/>
          "En die vraag 'is dit wat de klant bedoelde?' werd al beantwoord in de requirements fase — hier controleer je enkel nog of de code doet wat beschreven staat. Eén investering in Gedragsscenario's betaalt dubbel."
        </Notes>
      </Slide>


      {/* ── Het spectrum ─────────────────────────────────────────────── */}
      <Slide style={SW}>
        <FlexBox flexDirection="column" alignItems="center" justifyContent="center" height="100%">
          <Rule color={TEAL} width={60} />
          <Heading style={{
            color: NAVY,
            fontSize: '2.8rem',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.25,
            marginBottom: 52,
          }}>
            Er is een hele wereld tussen<br />
            <G from={TEAL} to={BLUE}>"niets met AI"</G>
            {' '}en{' '}
            <G from={TEAL} to={BLUE}>"alles met AI"</G>.
          </Heading>
          <Box style={{ width: '100%', maxWidth: 680 }}>
            <Box style={{
              height: 10,
              borderRadius: 5,
              background: `linear-gradient(to right, ${BLUE}44, ${TEAL})`,
              marginBottom: 14,
              position: 'relative',
            }}>
              <Box style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: WHITE,
                border: `2px solid ${TEAL}`,
                borderRadius: '50%',
                width: 18,
                height: 18,
                boxShadow: `0 0 0 4px ${TEAL}30`,
              }} />
            </Box>
            <FlexBox justifyContent="space-between">
              <Text style={{ color: MUTED, fontSize: '0.85rem' }}>Niets met AI</Text>
              <Text style={{ color: TEAL, fontSize: '0.9rem', fontWeight: 700 }}>← Wij wonen hier →</Text>
              <Text style={{ color: MUTED, fontSize: '0.85rem' }}>Alles met AI</Text>
            </FlexBox>
          </Box>
          <Text style={{
            color: SLATE,
            fontSize: '1.05rem',
            textAlign: 'center',
            maxWidth: 580,
            marginTop: 40,
            lineHeight: 1.7,
          }}>
            De meeste bedrijven denken dat het een binaire keuze is. Het is dat niet.<br />
            Die wereld ertussen — dat is precies waar we het vandaag over hebben.
          </Text>
        </FlexBox>
        <Notes>
          <em>[Rubin] Rustig brengen — laten landen.</em><br/><br/>
          "Er bestaat een heel spectrum. En de meeste bedrijven die wij tegenkomen zitten ergens aan de linkerkant — niet omdat ze niet willen, maar omdat ze niet weten waar te beginnen."<br/><br/>
          "U heeft net gezien hoe het spectrum werkt in de praktijk. Nu de vraag: waar wilt ú staan? En hoe begint u?"
        </Notes>
      </Slide>

      {/* ── 11. Afsluiting + CTA ─────────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: NAVY }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: NAVY, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', right: -140, top: -140, width: 500, height: 500, borderRadius: '50%', border: `1px solid ${TEAL}10`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -70, top: -70, width: 300, height: 300, borderRadius: '50%', border: `1px solid ${TEAL}18`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -100, bottom: -100, width: 380, height: 380, borderRadius: '50%', border: `1px solid ${BLUE}14`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 300, borderRadius: '50%', background: `radial-gradient(ellipse, ${TEAL}07 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 860, padding: '0 64px', width: '100%' }}>
            {/* Big headline */}
            <p style={{ color: TEAL, fontSize: '0.65rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 20px', fontFamily: 'Inter, sans-serif' }}>
              Volgende stap
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, lineHeight: 1.0, margin: '0 0 20px' }}>
              <span style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${BLUE} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '4.2rem', display: 'block' }}>
                Kies één project.
              </span>
              <span style={{ color: WHITE, fontSize: '4.2rem', display: 'block' }}>
                Begin deze week.
              </span>
            </h2>
            <p style={{ color: `${WHITE}50`, fontSize: '1rem', lineHeight: 1.7, margin: '0 0 36px', fontFamily: 'Inter, sans-serif' }}>
              Ervaring opdoen is het enige wat écht telt. Niet lezen. Niet plannen.
            </p>

            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: `${WHITE}12`, marginBottom: 32 }} />

            {/* CTA two-liner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 28 }}>
              <div style={{ textAlign: 'center', padding: '0 48px' }}>
                <p style={{ color: `${TEAL}cc`, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>Klein project</p>
                <p style={{ color: WHITE, fontSize: '1.25rem', fontWeight: 800, margin: 0, fontFamily: 'Inter, sans-serif' }}>Begin zelf.</p>
              </div>
              <div style={{ width: 1, height: 48, background: `${WHITE}15`, flexShrink: 0 }} />
              <div style={{ textAlign: 'center', padding: '0 48px' }}>
                <p style={{ color: `${BLUE}cc`, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>Grotere ambitie</p>
                <p style={{ color: WHITE, fontSize: '1.25rem', fontWeight: 800, margin: 0, fontFamily: 'Inter, sans-serif' }}>Betrek een partner.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact footer — pinned to bottom, clearly separate */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${WHITE}0e`, background: `${WHITE}05`, padding: '14px 64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, backdropFilter: 'blur(4px)' }}>
          {[
            { name: 'Berten De Schutter', org: 'Collide', email: 'berten@collide.be', color: TEAL },
            { name: 'Rubin Beckers', org: 'The Value Hub', email: 'rubin@thevaluehub.be', color: BLUE },
          ].map(({ name, org, email, color }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 4, height: 28, borderRadius: 2, background: color, opacity: 0.5, flexShrink: 0 }} />
              <div>
                <p style={{ color: `${WHITE}70`, fontSize: '0.8rem', fontWeight: 600, margin: 0, fontFamily: 'Inter, sans-serif' }}>{name} · <span style={{ color: `${WHITE}40`, fontWeight: 400 }}>{org}</span></p>
                <p style={{ color: `${WHITE}30`, fontSize: '0.72rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{email}</p>
              </div>
            </div>
          ))}
        </div>
        <Notes>
          <em>[Samen in beeld]</em><br/><br/>
          <em>[Rubin]</em> "U heeft vandaag genoeg gezien om te beginnen. Het enige wat ontbreekt is die eerste stap."<br/><br/>
          "Kies één project. Begin deze week. Klein project? Begin zelf. Grotere ambitie — heel proces herdenken, team begeleiden? Dan helpen wij u graag."<br/><br/>
          <em>[Samen]</em> "We staan na de sessie beschikbaar. Onze contactgegevens staan op het scherm."
        </Notes>
      </Slide>

      {/* ── 11. Q&A ──────────────────────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: NAVY }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: NAVY, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', left: -160, top: -160, width: 520, height: 520, borderRadius: '50%', border: `1px solid ${BLUE}10`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -80, top: -80, width: 300, height: 300, borderRadius: '50%', border: `1px solid ${BLUE}18`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -120, bottom: -120, width: 400, height: 400, borderRadius: '50%', border: `1px solid ${TEAL}12`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 350, borderRadius: '50%', background: `radial-gradient(ellipse, ${BLUE}07 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 64px' }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, lineHeight: 1.0, margin: '0 0 24px' }}>
              <span style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${BLUE} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '7rem', display: 'block', letterSpacing: '-0.02em' }}>
                Vragen?
              </span>
            </h2>
            <p style={{ color: `${WHITE}45`, fontSize: '1rem', fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '0.03em' }}>
              We staan voor u klaar.
            </p>
          </div>
        </div>

        {/* Same contact footer */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${WHITE}0e`, background: `${WHITE}05`, padding: '14px 64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, backdropFilter: 'blur(4px)' }}>
          {[
            { name: 'Berten De Schutter', org: 'Collide', email: 'berten@collide.be', color: TEAL },
            { name: 'Rubin Beckers', org: 'The Value Hub', email: 'rubin@thevaluehub.be', color: BLUE },
          ].map(({ name, org, email, color }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 4, height: 28, borderRadius: 2, background: color, opacity: 0.5, flexShrink: 0 }} />
              <div>
                <p style={{ color: `${WHITE}70`, fontSize: '0.8rem', fontWeight: 600, margin: 0, fontFamily: 'Inter, sans-serif' }}>{name} · <span style={{ color: `${WHITE}40`, fontWeight: 400 }}>{org}</span></p>
                <p style={{ color: `${WHITE}30`, fontSize: '0.72rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{email}</p>
              </div>
            </div>
          ))}
        </div>
        <Notes>
          <em>[Samen] Open voor vragen.</em>
        </Notes>
      </Slide>

    </Deck>
  )
}
