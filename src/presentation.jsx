import React from 'react'
import {
  Deck, Slide, Heading, Text, Notes, FlexBox, Box, UnorderedList, ListItem, Grid, useSteps, DeckContext,
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

const EyebrowLabel = ({ children, color = TEAL }) => (
  <Text style={{
    color,
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 14,
  }}>{children}</Text>
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

const Card = ({ children, accent = TEAL, style = {} }) => (
  <Box style={{
    background: WHITE,
    borderRadius: 12,
    padding: '24px 28px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
    borderTop: `3px solid ${accent}`,
    ...style,
  }}>{children}</Box>
)

const QuoteBlock = ({ children }) => (
  <Box style={{
    background: WHITE,
    borderRadius: 10,
    padding: '24px 32px',
    borderLeft: `4px solid ${TEAL}`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    maxWidth: '78%',
  }}>
    <Text style={{ color: NAVY, fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.6 }}>
      {children}
    </Text>
  </Box>
)

const TwoCol = ({ left, right, gap = '40px' }) => (
  <Grid gridTemplateColumns="1fr 1fr" gridColumnGap={gap} style={{ width: '100%', marginTop: 28 }}>
    <Box>{left}</Box>
    <Box>{right}</Box>
  </Grid>
)

const ThreeCol = ({ cols }) => (
  <Grid gridTemplateColumns="1fr 1fr 1fr" gridColumnGap="24px" style={{ width: '100%', marginTop: 28 }}>
    {cols.map((c, i) => <Box key={i}>{c}</Box>)}
  </Grid>
)

const Pill = ({ children, color = TEAL }) => (
  <Box style={{
    display: 'inline-block',
    background: `${color}14`,
    border: `1px solid ${color}30`,
    borderRadius: 100,
    padding: '4px 14px',
    marginBottom: 16,
  }}>
    <Text style={{ color, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {children}
    </Text>
  </Box>
)

const BigNumber = ({ n, color = TEAL }) => (
  <Text style={{
    color: `${color}20`,
    fontSize: '5.5rem',
    fontWeight: 900,
    lineHeight: 1,
    minWidth: 72,
    fontFamily: 'Inter, sans-serif',
    userSelect: 'none',
  }}>{n}</Text>
)

const ColumnDivider = () => (
  <Box style={{ width: 1, background: BORDER, margin: '0 32px', alignSelf: 'stretch' }} />
)

// ── Slide base styles ───────────────────────────────────────────────────────
const S  = { backgroundColor: BG,    padding: '52px 72px' }
const SW = { backgroundColor: WHITE, padding: '52px 72px' }
const SD = { backgroundColor: NAVY,  padding: '52px 72px' }

// ── Slide 5: Requirements evolutie (step-driven) ────────────────────────────

function Slide5Content() {
  const { step, placeholder } = useSteps(2)
  const ff = 'Inter, sans-serif'
  const anim = { animation: 'fadeUp 0.35s ease forwards' }
  const colGrid = '52px repeat(7, 1fr)'
  const colBg = { rev1: `${TEAL}07`, rev2: `${BLUE}05`, rev3: `${BLUE}09` }

  function NodeBox({ label, sub, active, old, mutedColor, isNew, dim }) {
    const c = active === 'teal' ? TEAL : active === 'blue' ? BLUE : old ? SLATE : mutedColor ? `${mutedColor}70` : MUTED
    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isNew && (
          <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: TEAL, color: WHITE, fontSize: '0.38rem', fontWeight: 800, padding: '1px 5px', borderRadius: 3, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.6, fontFamily: ff, whiteSpace: 'nowrap' }}>NIEUW</span>
        )}
        <div style={{
          padding: active ? '6px 10px' : dim ? '2px 0' : '4px 8px', borderRadius: 6,
          border: active === 'teal' ? `1.5px solid ${TEAL}` : active === 'blue' ? `1.5px solid ${BLUE}` : old ? `1.5px dashed ${SLATE}` : mutedColor ? `1px solid ${mutedColor}40` : 'none',
          background: active === 'teal' ? `${TEAL}12` : active === 'blue' ? `${BLUE}0e` : old ? `${SLATE}0a` : 'transparent',
          boxShadow: active === 'teal' ? `0 0 10px ${TEAL}20` : active === 'blue' ? `0 0 10px ${BLUE}18` : 'none',
          textAlign: 'center',
        }}>
          <p style={{ color: c, fontSize: dim ? '0.55rem' : '0.62rem', fontWeight: active ? 700 : old ? 600 : mutedColor ? 500 : 400, margin: 0, fontFamily: ff, lineHeight: 1.35 }}>{label}</p>
        </div>
        {sub && <p style={{ color: c, fontSize: '0.5rem', margin: '2px 0 0', textAlign: 'center', fontFamily: ff, maxWidth: 90, lineHeight: 1.2 }}>{sub}</p>}
      </div>
    )
  }

  function Cell({ id, children, first }) {
    return (
      <div style={{ borderLeft: first ? 'none' : `1px solid ${BORDER}`, background: colBg[id] || 'transparent', padding: '8px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 60 }}>
        {children}
      </div>
    )
  }

  // Spanning cell across multiple review columns — used for Vroeger and Fase 1
  function SpanCell({ from, to, children }) {
    const bg = [colBg.rev1, colBg.rev2, colBg.rev3].slice(from - 5, to - 4)
    return (
      <div style={{ gridColumn: `${from} / ${to}`, borderLeft: `1px solid ${BORDER}`, background: `linear-gradient(to right, ${bg.join(', ')})`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 60, padding: '8px' }}>
        {children}
      </div>
    )
  }

  function PhaseLabel({ children, color = MUTED }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>
        <p style={{ color, fontSize: '0.48rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, fontFamily: ff, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{children}</p>
      </div>
    )
  }

  const colHeaders = [
    { id: 'klant', label: 'Klant-\ngesprek' },
    { id: 'req',   label: 'Require-\nments' },
    { id: 'ac',    label: 'Acceptance\nCriteria' },
    { id: 'rev1',  label: 'Kwaliteits-\ncheck' },
    { id: 'rev2',  label: 'Intent' },
    { id: 'rev3',  label: 'Functionele\nreview' },
    { id: 'dev',   label: 'Develop-\nment' },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG, display: 'flex', flexDirection: 'column', padding: '34px 64px 28px', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ color: TEAL, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 5px', fontFamily: ff }}>1 van 3 · Requirements</p>
        <p style={{ color: NAVY, fontSize: '1.5rem', fontWeight: 900, margin: 0, fontFamily: ff }}>AI versterkt de analyserol.</p>
      </div>

      {/* Matrix */}
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' }}>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: colGrid, background: `${NAVY}04`, borderBottom: `1px solid ${BORDER}` }}>
          <div />
          {colHeaders.map(({ id, label }, i) => (
            <div key={id} style={{ borderLeft: i === 0 ? 'none' : `1px solid ${BORDER}`, background: colBg[id] || 'transparent', padding: '5px 6px', textAlign: 'center' }}>
              <p style={{ color: id === 'rev1' ? `${TEAL}99` : id === 'rev2' || id === 'rev3' ? `${BLUE}99` : MUTED, fontSize: '0.46rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: ff, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Vroeger row — Tech Team review spans rev1+rev2+rev3 (grid cols 5→8) */}
        <div style={{ display: 'grid', gridTemplateColumns: colGrid, borderBottom: `1px solid ${BORDER}` }}>
          <PhaseLabel>Vroeger</PhaseLabel>
          <Cell id="klant" first><NodeBox label="Klantgesprek" dim /></Cell>
          <Cell id="req"><NodeBox label="Requirements" sub="Analist" dim /></Cell>
          <Cell id="ac"><NodeBox label="Acceptance Criteria" sub="Analist" dim /></Cell>
          <SpanCell from={5} to={8}>
            <NodeBox label="kwaliteit · functioneel · intent" sub="Tech Team" old />
          </SpanCell>
          <Cell id="dev"><NodeBox label="Development" dim /></Cell>
        </div>

        {/* Fase 1 row — AI check (rev1), Tech Lead spans rev2+rev3 (grid cols 6→8) */}
        {step >= 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: colGrid, borderBottom: step >= 1 ? `1px solid ${BORDER}` : 'none', ...anim }}>
            <PhaseLabel color={TEAL}>Fase 1</PhaseLabel>
            <Cell id="klant" first><NodeBox label="Klantgesprek" dim /></Cell>
            <Cell id="req"><NodeBox label="Requirements" sub="Analist" dim /></Cell>
            <Cell id="ac"><NodeBox label="Acceptance Criteria" sub="Analist" dim /></Cell>
            <Cell id="rev1"><NodeBox label="Kwaliteitscheck" sub="AI Agent" active="teal" /></Cell>
            <SpanCell from={6} to={8}>
              <NodeBox label="functioneel & intent" sub="Tech Lead" active="blue" />
            </SpanCell>
            <Cell id="dev"><NodeBox label="Development" dim /></Cell>
          </div>
        )}

        {/* Fase 2 row — AI check (rev1, muted), AIGeneer schrijft (rev2), AI+AIGeneer review (rev3) */}
        {step >= 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: colGrid, ...anim }}>
            <PhaseLabel color={BLUE}>Fase 2</PhaseLabel>
            <Cell id="klant" first><NodeBox label="Klantgesprek" dim /></Cell>
            <Cell id="req"><NodeBox label="Requirements" sub="AIGeneer" dim /></Cell>
            <Cell id="ac"><NodeBox label="Acceptance Criteria" sub="AIGeneer" dim /></Cell>
            <Cell id="rev1"><NodeBox label="Kwaliteitscheck" sub="AI Agent" mutedColor={TEAL} /></Cell>
            <Cell id="rev2"><NodeBox label="Gedragsscenario's" sub="AIGeneer" active="teal" isNew /></Cell>
            <Cell id="rev3">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: '100%' }}>
                <NodeBox label="Compleetheid" sub="AI Agent" active="teal" />
                <NodeBox label="Eindverantwoordelijkheid" sub="AIGeneer" active="blue" />
              </div>
            </Cell>
            <Cell id="dev"><NodeBox label="Development + Tests" dim /></Cell>
          </div>
        )}

      </div>

      {/* Detail area */}
      <div style={{ flex: 1, position: 'relative', marginTop: 16 }}>
        {step === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 28, ...anim }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: ff }}>AI — stap 1</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>Kwaliteitscheck</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>Razendsnel: zijn er tegenstrijdigheden? Ontbreken er scenario's? Is de User Story helder genoeg?</p>
            </div>
            <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: ff }}>Tech Lead — stap 2</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: BLUE, marginRight: 8 }}>—</span>Functioneel & intent</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>Niet meer "is dit compleet?" — dat heeft AI al gedaan. Wel: "klopt dit functioneel en past het bij de bedoeling van de klant?"</p>
            </div>
          </div>
        )}
        {step >= 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 28, ...anim }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 2px', fontFamily: ff }}>Functionele review</p>
              {[
                { color: TEAL, label: 'AI Agent — compleetheid & scope', sub: 'Dekt elk Gedragsscenario de acceptance criteria? Zijn alle randgevallen gedekt? Is de scope beheersbaar?' },
                { color: BLUE, label: 'AIGeneer — eindverantwoordelijkheid', sub: 'AI Agent heeft de volledigheid gecheckt. De AIGeneer beslist: klopt dit met wat de klant bedoelt? De driving seat blijft bij de mens.' },
              ].map(({ color, label, sub }) => (
                <div key={label}>
                  <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color, marginRight: 8 }}>—</span>{label}</p>
                  <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>{sub}</p>
                </div>
              ))}
            </div>
            <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, fontFamily: ff }}>Waarom Gedragsscenario's de sleutel zijn</p>
              {[
                { label: 'Geen diepgaande technische kennis nodig', sub: 'De intent van een change begrijpen hoeft niet meer technisch te zijn — Gedragsscenario\'s maken het voor iedereen leesbaar.' },
                { label: 'Verificatie zonder tech-expertise', sub: 'De extra check op volledigheid? Ook die kan een AIGeneer doen. Geen developer vereist.' },
                { label: 'AIGeneer blijft in de driving seat', sub: 'Automatisering neemt het controlewerk over, maar de eindverantwoordelijkheid blijft bewust bij de AIGeneer.' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>{label}</p>
                  <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.5, margin: '0 0 0 16px', fontFamily: ff }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {placeholder}
    </div>
  )
}

// ── Code evolutie (step-driven) ──────────────────────────────────────────────

function CodeEvolutieContent() {
  const { step, placeholder } = useSteps(2)
  const ff = 'Inter, sans-serif'
  const anim = { animation: 'fadeUp 0.35s ease forwards' }
  const colGrid = '48px repeat(5, 1fr)'
  const colBg = { impl: `${TEAL}06`, test: `${TEAL}04`, pr1: `${BLUE}08`, pr2: `${BLUE}05` }

  function NodeBox({ label, sub, active, old, mutedColor, dim, isNew }) {
    const c = active === 'teal' ? TEAL : active === 'blue' ? BLUE : old ? SLATE : mutedColor ? `${mutedColor}70` : MUTED
    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isNew && (
          <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: TEAL, color: WHITE, fontSize: '0.38rem', fontWeight: 800, padding: '1px 5px', borderRadius: 3, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.6, fontFamily: ff, whiteSpace: 'nowrap' }}>NIEUW</span>
        )}
        <div style={{
          padding: active ? '6px 10px' : dim ? '2px 0' : '4px 8px', borderRadius: 6,
          border: active === 'teal' ? `1.5px solid ${TEAL}` : active === 'blue' ? `1.5px solid ${BLUE}` : old ? `1.5px dashed ${SLATE}` : mutedColor ? `1px solid ${mutedColor}40` : 'none',
          background: active === 'teal' ? `${TEAL}12` : active === 'blue' ? `${BLUE}0e` : old ? `${SLATE}0a` : 'transparent',
          boxShadow: active === 'teal' ? `0 0 10px ${TEAL}20` : active === 'blue' ? `0 0 10px ${BLUE}18` : 'none',
          textAlign: 'center',
        }}>
          <p style={{ color: c, fontSize: dim ? '0.55rem' : '0.62rem', fontWeight: active ? 700 : old ? 600 : mutedColor ? 500 : 400, margin: 0, fontFamily: ff, lineHeight: 1.35, whiteSpace: 'pre-line' }}>{label}</p>
        </div>
        {sub && <p style={{ color: c, fontSize: '0.5rem', margin: '2px 0 0', textAlign: 'center', fontFamily: ff, maxWidth: 90, lineHeight: 1.2 }}>{sub}</p>}
      </div>
    )
  }

  function Cell({ id, children, first }) {
    return (
      <div style={{ borderLeft: first ? 'none' : `1px solid ${BORDER}`, background: colBg[id] || 'transparent', padding: '8px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56 }}>
        {children}
      </div>
    )
  }

  function SpanCell({ from, to, children }) {
    return (
      <div style={{ gridColumn: `${from} / ${to}`, borderLeft: `1px solid ${BORDER}`, background: `linear-gradient(to right, ${colBg.pr1}, ${colBg.pr2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56, padding: '8px' }}>
        {children}
      </div>
    )
  }

  function PhaseLabel({ children, color = MUTED }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>
        <p style={{ color, fontSize: '0.48rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, fontFamily: ff, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{children}</p>
      </div>
    )
  }

  const colHeaders = [
    { id: 'arch', label: 'Tech. Analyse\n& Arch.' },
    { id: 'impl', label: 'Implementatie' },
    { id: 'test', label: 'Auto.\nTesten' },
    { id: 'pr1',  label: 'PR ·\nKwaliteitscheck' },
    { id: 'pr2',  label: 'PR ·\nDeep-dive' },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG, display: 'flex', flexDirection: 'column', padding: '34px 64px 28px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ color: BLUE, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 5px', fontFamily: ff }}>2 van 3 · Code-ontwikkeling</p>
        <p style={{ color: NAVY, fontSize: '1.5rem', fontWeight: 900, margin: 0, fontFamily: ff }}>AI neemt de uitvoering over.</p>
      </div>

      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: colGrid, background: `${NAVY}04`, borderBottom: `1px solid ${BORDER}` }}>
          <div />
          {colHeaders.map(({ id, label }, i) => (
            <div key={id} style={{ borderLeft: i === 0 ? 'none' : `1px solid ${BORDER}`, background: colBg[id] || 'transparent', padding: '5px 6px', textAlign: 'center' }}>
              <p style={{ color: (id === 'impl' || id === 'test') ? `${TEAL}99` : (id === 'pr1' || id === 'pr2') ? `${BLUE}99` : MUTED, fontSize: '0.46rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: ff, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Vroeger row — PR spans pr1+pr2 */}
        <div style={{ display: 'grid', gridTemplateColumns: colGrid, borderBottom: `1px solid ${BORDER}` }}>
          <PhaseLabel>Vroeger</PhaseLabel>
          <Cell id="arch" first><NodeBox label={'Tech. Analyse\n& Arch.'} sub="Architect / Tech Lead" dim /></Cell>
          <Cell id="impl"><NodeBox label="Implementatie" sub="Developer" dim /></Cell>
          <Cell id="test"><NodeBox label="Auto. Testen" sub="Developer" dim /></Cell>
          <SpanCell from={5} to={7}><NodeBox label="Pull Request" sub="Dev Team" old /></SpanCell>
        </div>

        {/* Fase 1 row */}
        {step >= 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: colGrid, borderBottom: step >= 1 ? `1px solid ${BORDER}` : 'none', ...anim }}>
            <PhaseLabel color={TEAL}>Fase 1</PhaseLabel>
            <Cell id="arch" first><NodeBox label={'Tech. Analyse\n& Arch.'} sub="Architect / Tech Lead" dim /></Cell>
            <Cell id="impl"><NodeBox label="Implementatie" sub="Developer + AI" active="teal" /></Cell>
            <Cell id="test"><NodeBox label="Auto. Testen" sub="Developer + AI" active="teal" /></Cell>
            <Cell id="pr1"><NodeBox label="Kwaliteitscheck" sub="AI Agent" active="teal" isNew /></Cell>
            <Cell id="pr2"><NodeBox label="Deep-dive" sub="Dev Team" active="blue" isNew /></Cell>
          </div>
        )}

        {/* Fase 2 row */}
        {step >= 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: colGrid, ...anim }}>
            <PhaseLabel color={BLUE}>Fase 2</PhaseLabel>
            <Cell id="arch" first><NodeBox label={'Arch.\nin code'} sub="AIGeneer" active="teal" isNew /></Cell>
            <Cell id="impl"><NodeBox label="Implementatie" sub="AI Agent" active="teal" /></Cell>
            <Cell id="test"><NodeBox label="Auto. Testen" sub="AI Agent" active="teal" /></Cell>
            <Cell id="pr1"><NodeBox label="Kwaliteitscheck" sub="AI Agent" active="teal" /></Cell>
            <Cell id="pr2"><NodeBox label="Deep-dive" sub="AIGeneer" active="blue" /></Cell>
          </div>
        )}
      </div>

      {/* Detail area */}
      <div style={{ flex: 1, position: 'relative', marginTop: 16 }}>
        {step === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 28, ...anim }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: ff }}>AI versnelt — stap 1</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>Implementatie & testen AI-assisted</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>AI stelt code voor, developer beslist en verfijnt. Testen worden automatisch gegenereerd vanuit de Gedragsscenario's.</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: BLUE, marginRight: 8 }}>—</span>PR gesplitst in twee</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>AI Agent screent snel op kwaliteit. Dev Team focust enkel op wat AI niet begrijpt: context en intent.</p>
            </div>
            <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: ff }}>Wat verandert</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>Minder boilerplate, meer focus</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>Developers beoordelen en sturen — geen standaardcode meer schrijven.</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: BLUE, marginRight: 8 }}>—</span>Fast feedback loop</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>Kleine bugs worden direct gevangen door de AI Agent — vóór de human review.</p>
            </div>
          </div>
        )}
        {step >= 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 28, ...anim }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 2px', fontFamily: ff }}>AI Agent in de cockpit</p>
              {[
                { color: TEAL, label: 'AI Agent — schrijft & test', sub: "Implementatie én automatische testen worden volledig door de AI Agent uitgevoerd, op basis van de Gedragsscenario's." },
                { color: BLUE, label: 'AIGeneer — architect & reviewer', sub: 'AIGeneer bepalen de context en architectuur, en keuren de AI-output goed via de PR deep-dive. Geen diepgaande technische kennis vereist.' },
              ].map(({ color, label, sub }) => (
                <div key={label}>
                  <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color, marginRight: 8 }}>—</span>{label}</p>
                  <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>{sub}</p>
                </div>
              ))}
            </div>
            <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, fontFamily: ff }}>De rol van de developer verschuift</p>
              {[
                { label: 'AIGeneer bepalen de koers', sub: 'Context, architectuur, aanpak — AIGeneer stuurt. Architect / Tech Lead adviseert. AI Agent voert uit.' },
                { label: 'Architectuur leeft in de code', sub: 'De architectuur is beschreven als deel van de code zelf — AI Agents lezen die context en gebruiken ze rechtstreeks voor hun implementatie.' },
                { label: 'Deep-dive door AIGeneer', sub: 'In Fase 2 hoeft de reviewer niet technisch te zijn — AIGeneer keurt goed op intent en gedrag.' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>{label}</p>
                  <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.5, margin: '0 0 0 16px', fontFamily: ff }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {placeholder}
    </div>
  )
}

// ── Testing evolutie (step-driven) ──────────────────────────────────────────

function TestingEvolutieContent() {
  const { step, placeholder } = useSteps(2)
  const ff = 'Inter, sans-serif'
  const anim = { animation: 'fadeUp 0.35s ease forwards' }
  const colGrid = '48px repeat(5, 1fr)'
  const colBg = { scen: `${TEAL}06`, test: `${TEAL}04`, verif: `${BLUE}08`, cicd: `${BLUE}03` }

  function NodeBox({ label, sub, active, old, mutedColor, dim, isNew, badge }) {
    const c = active === 'teal' ? TEAL : active === 'blue' ? BLUE : old ? SLATE : mutedColor ? `${mutedColor}70` : MUTED
    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(isNew || badge) && (
          <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: badge ? BLUE : TEAL, color: WHITE, fontSize: '0.38rem', fontWeight: 800, padding: '1px 5px', borderRadius: 3, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.6, fontFamily: ff, whiteSpace: 'nowrap' }}>{badge || 'NIEUW'}</span>
        )}
        <div style={{
          padding: active ? '6px 10px' : dim ? '2px 0' : '4px 8px', borderRadius: 6,
          border: active === 'teal' ? `1.5px solid ${TEAL}` : active === 'blue' ? `1.5px solid ${BLUE}` : old ? `1.5px dashed ${SLATE}` : mutedColor ? `1px solid ${mutedColor}40` : 'none',
          background: active === 'teal' ? `${TEAL}12` : active === 'blue' ? `${BLUE}0e` : old ? `${SLATE}0a` : 'transparent',
          boxShadow: active === 'teal' ? `0 0 10px ${TEAL}20` : active === 'blue' ? `0 0 10px ${BLUE}18` : 'none',
          textAlign: 'center',
        }}>
          <p style={{ color: c, fontSize: dim ? '0.55rem' : '0.62rem', fontWeight: active ? 700 : old ? 600 : mutedColor ? 500 : 400, margin: 0, fontFamily: ff, lineHeight: 1.35, whiteSpace: 'pre-line' }}>{label}</p>
        </div>
        {sub && <p style={{ color: c, fontSize: '0.5rem', margin: '2px 0 0', textAlign: 'center', fontFamily: ff, maxWidth: 90, lineHeight: 1.2 }}>{sub}</p>}
      </div>
    )
  }

  function Cell({ id, children, first }) {
    return (
      <div style={{ borderLeft: first ? 'none' : `1px solid ${BORDER}`, background: colBg[id] || 'transparent', padding: '8px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56 }}>
        {children}
      </div>
    )
  }

  function PhaseLabel({ children, color = MUTED }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>
        <p style={{ color, fontSize: '0.48rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, fontFamily: ff, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{children}</p>
      </div>
    )
  }

  const colHeaders = [
    { id: 'scen',  label: "E2E\nScenario's" },
    { id: 'test',  label: 'Auto.\nE2E Testen' },
    { id: 'verif', label: 'Verificatie /\nGoedkeuring' },
    { id: 'cicd',  label: 'CI/CD' },
    { id: 'uat',   label: 'User\nAcceptance' },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG, display: 'flex', flexDirection: 'column', padding: '34px 64px 28px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ color: BLUE, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 5px', fontFamily: ff }}>3 van 3 · Testing & Delivery</p>
        <p style={{ color: NAVY, fontSize: '1.5rem', fontWeight: 900, margin: 0, fontFamily: ff }}>AI genereert de tests.</p>
      </div>

      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: colGrid, background: `${NAVY}04`, borderBottom: `1px solid ${BORDER}` }}>
          <div />
          {colHeaders.map(({ id, label }, i) => (
            <div key={id} style={{ borderLeft: i === 0 ? 'none' : `1px solid ${BORDER}`, background: colBg[id] || 'transparent', padding: '5px 6px', textAlign: 'center' }}>
              <p style={{ color: (id === 'scen' || id === 'test') ? `${TEAL}99` : id === 'verif' ? `${BLUE}99` : MUTED, fontSize: '0.46rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: ff, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Vroeger row */}
        <div style={{ display: 'grid', gridTemplateColumns: colGrid, borderBottom: `1px solid ${BORDER}` }}>
          <PhaseLabel>Vroeger</PhaseLabel>
          <Cell id="scen" first><NodeBox label={"E2E Scenario's"} sub="QA-Engineer" dim /></Cell>
          <Cell id="test"><NodeBox label="Auto. E2E Testen" sub="QA-Engineer" dim /></Cell>
          <Cell id="verif"><NodeBox label="Manuele verificatie" sub="QA-Engineer" old /></Cell>
          <Cell id="cicd"><NodeBox label="CI/CD" sub="geautomatiseerd" dim /></Cell>
          <Cell id="uat"><NodeBox label="User Acceptance" sub="Klant / Business" dim /></Cell>
        </div>

        {/* Fase 1 row */}
        {step >= 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: colGrid, borderBottom: step >= 1 ? `1px solid ${BORDER}` : 'none', ...anim }}>
            <PhaseLabel color={TEAL}>Fase 1</PhaseLabel>
            <Cell id="scen" first><NodeBox label={"E2E Scenario's"} sub="QA-Engineer + AI" active="teal" /></Cell>
            <Cell id="test"><NodeBox label="Auto. E2E Testen" sub="QA-Engineer + AI" active="teal" /></Cell>
            <Cell id="verif"><NodeBox label="Verificatie" sub="QA-Engineer" active="blue" /></Cell>
            <Cell id="cicd"><NodeBox label="CI/CD" sub="geautomatiseerd" dim /></Cell>
            <Cell id="uat"><NodeBox label="User Acceptance" sub="Klant / Business" dim /></Cell>
          </div>
        )}

        {/* Fase 2 row */}
        {step >= 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: colGrid, ...anim }}>
            <PhaseLabel color={BLUE}>Fase 2</PhaseLabel>
            <Cell id="scen" first><NodeBox label={"Gedragsscenario's"} sub="reeds beschikbaar" active="teal" badge="VAN STAP 1" /></Cell>
            <Cell id="test"><NodeBox label="Auto. E2E Testen" sub="AI Agent" active="teal" isNew /></Cell>
            <Cell id="verif"><NodeBox label="Goedkeuring" sub="AIGeneer" active="blue" /></Cell>
            <Cell id="cicd"><NodeBox label="CI/CD" sub="geautomatiseerd" dim /></Cell>
            <Cell id="uat"><NodeBox label="User Acceptance" sub="Klant / Business" dim /></Cell>
          </div>
        )}
      </div>

      {/* Detail area */}
      <div style={{ flex: 1, position: 'relative', marginTop: 16 }}>
        {step === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 28, ...anim }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: ff }}>Fase 1 — AI-assisted testing</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>{"Scenario's en testen AI-assisted"}</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>QA-Engineer schrijft scenario's en stelt testen op met AI-hulp. Sneller, betere dekking, minder handmatig werk.</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: BLUE, marginRight: 8 }}>—</span>QA-Engineer als kwaliteitspoort</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>{"'Is dit wat de klant bedoelde?' — die vraag stelt de QA-Engineer nog steeds. Met betere automatische dekking is er meer tijd voor de echte edge cases."}</p>
            </div>
            <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: ff }}>Wat verandert</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>Snellere testcyclus, hogere dekking</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>AI genereert testgevallen die een mens snel zou missen — randgevallen zijn nu de norm.</p>
              <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color: BLUE, marginRight: 8 }}>—</span>Manuele verificatie gereduceerd</p>
              <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>Betere automatische dekking betekent minder manueel checken — QA-Engineer focust op intentie en gedrag.</p>
            </div>
          </div>
        )}
        {step >= 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 28, ...anim }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 2px', fontFamily: ff }}>De cirkel sluit</p>
              {[
                { color: TEAL, label: "Gedragsscenario's → E2E testen", sub: "De scenario's uit stap 1 zijn de bron. AI Agent genereert automatisch alle E2E testen — geen apart schrijfmoment meer." },
                { color: BLUE, label: 'AIGeneer — finale goedkeuring', sub: "De vraag 'is dit wat de klant bedoelde?' werd al beantwoord in de requirements fase. AIGeneer verifieert hier: gedraagt de code zich zoals beschreven? Daarna deployt CI/CD automatisch." },
              ].map(({ color, label, sub }) => (
                <div key={label}>
                  <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', fontFamily: ff }}><span style={{ color, marginRight: 8 }}>—</span>{label}</p>
                  <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.55, margin: '0 0 0 16px', fontFamily: ff }}>{sub}</p>
                </div>
              ))}
            </div>
            <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ color: MUTED, fontSize: '0.57rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, fontFamily: ff }}>Waarom dit zo krachtig is</p>
              {[
                { label: "Scenario's schrijven = testen schrijven", sub: "Eén investering in stap 1 betaalt dubbel: betere requirements én gratis E2E testen." },
                { label: '"Is dit wat de klant wil?" verschuift naar stap 1', sub: 'Die vraag werd al gesteld door de AIGeneer in de requirements fase — niet meer door QA op het einde.' },
                { label: 'AIGeneer als finale kwaliteitspoort', sub: 'Geen technisch profiel vereist — AIGeneer toetst op gedrag en intent. Na goedkeuring deployt CI/CD.' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p style={{ color: NAVY, fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px', fontFamily: ff }}><span style={{ color: TEAL, marginRight: 8 }}>—</span>{label}</p>
                  <p style={{ color: SLATE, fontSize: '0.75rem', lineHeight: 1.5, margin: '0 0 0 16px', fontFamily: ff }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {placeholder}
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
                <p style={{ color: TEAL, fontSize: '0.85rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>Collide NV</p>
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
              width: 88, height: 88, borderRadius: '50%',
              background: '#37E28420',
              border: '2px solid #37E28460',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 28,
              fontSize: '1.6rem', fontWeight: 800,
              color: '#37E284',
              fontFamily: 'Inter, sans-serif',
              overflow: 'hidden',
            }}>
              {/* Swap with: <img src="/berten.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
              BD
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
              width: 88, height: 88, borderRadius: '50%',
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
              {/* Swap with: <img src="/rubin.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
              RB
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

      {/* ── 3. Ons vibe coding experiment ───────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: WHITE }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', overflow: 'hidden' }}>

          {/* Left — the story, no boxes */}
          <div style={{
            flex: '0 0 58%',
            padding: '52px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0,
            minWidth: 0,
            boxSizing: 'border-box',
          }}>
            <p style={{ color: MUTED, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 20px', fontFamily: 'Inter, sans-serif' }}>
              Ons eerste experiment
            </p>
            <h2 style={{ color: NAVY, fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 40px', fontFamily: 'Inter, sans-serif' }}>
              Dus hebben we het<br />gewoon geprobeerd.
            </h2>

            {/* Act 1 */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ color: TEAL, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>
                De verwachting
              </p>
              <p style={{ color: NAVY, fontSize: '1.05rem', fontWeight: 600, margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>
                Snel resultaat, weinig werk.
              </p>
              <p style={{ color: SLATE, fontSize: '0.9rem', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                {/* ⚠ Invullen: welk project, wat verwachtten jullie? */}
                Een werkende feature in een middag — zonder dat iemand er diep in moest duiken.
              </p>
            </div>

            {/* Connector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{ width: 20, height: 1, background: MUTED }} />
              <p style={{ color: MUTED, fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '0.05em' }}>maar</p>
              <div style={{ flex: 1, height: 1, background: `${MUTED}40` }} />
            </div>

            {/* Act 2 */}
            <div>
              <p style={{ color: SLATE, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>
                De realiteit
              </p>
              <p style={{ color: NAVY, fontSize: '1.05rem', fontWeight: 600, margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>
                Het werkte. En toen niet meer.
              </p>
              <p style={{ color: SLATE, fontSize: '0.9rem', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                {/* ⚠ Invullen: wat ging mis? Welk moment van "we begrijpen dit niet meer"? */}
                De code deed iets, maar niemand begreep meer precies wat — of waarom.
              </p>
            </div>
          </div>

          {/* Right — the punchline, dark panel */}
          <div style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: NAVY,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '52px 48px',
            boxSizing: 'border-box',
          }}>
            <p style={{ color: TEAL, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 20px', fontFamily: 'Inter, sans-serif' }}>
              De les
            </p>
            <p style={{
              color: WHITE,
              fontSize: '1.75rem',
              fontWeight: 800,
              lineHeight: 1.3,
              margin: '0 0 28px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Snel werkt.<br />Tot het niet meer werkt.
            </p>
            <p style={{ color: `${WHITE}77`, fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 36px', fontFamily: 'Inter, sans-serif' }}>
              {/* ⚠ Invullen: wat was het keerpunt? */}
              AI bouwt razendsnel — maar zonder inzicht verlies je algauw het overzicht.
            </p>
            <div style={{ height: 1, background: `${WHITE}15`, marginBottom: 28 }} />
            <p style={{ color: `${WHITE}88`, fontSize: '0.85rem', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
              Hoe combineer je die snelheid met de controle die je als team nodig hebt?
            </p>
          </div>
        </div>
        <Notes>
          <em>⚠ Vóór de presentatie invullen: welk project, wat ging goed, wat ging mis, wat was het keerpunt.</em><br/><br/>
          "We zijn het gewoon gaan doen. We hebben een prompt geschreven, AI laten werken, en in het begin was het... eigenlijk best indrukwekkend."<br/><br/>
          "Maar op een bepaald moment stonden we voor een scherm vol code die niemand van ons nog helemaal kon doorgronden. AI had gebouwd, maar wij hadden geen controle meer."<br/><br/>
          "De snelheid is reëel — maar zonder structuur is het geen vooruitgang. Het is schuld die je opbouwt."
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

      {/* ── 6. Requirements evolutie — stap-voor-stap ────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <Slide5Content />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "Laten we even terugkijken naar hoe het vroeger werkte. Klantgesprek → requirements → acceptance criteria → en dan: was het goed genoeg? Één persoon die dat allemaal moet beoordelen."<br/><br/>
          <em>Stap 1 (klik):</em><br/>
          "In Fase 1 hebben we die review opgesplitst. AI doet de snelle volledigheidscheck. Tech Lead focust op intentie en toepasbaarheid. Elk in hun sterkste rol."<br/><br/>
          <em>Stap 2 (klik):</em><br/>
          "In Fase 2 zijn we verder gegaan. We schrijven nu Gedragsscenario's. Vóór er nagedacht wordt over architectuur of implementatie beschrijft het hele team samen hoe het systeem zich moet gedragen — in elk denkbaar scenario. En die scenario's verdwijnen niet. Ze leven in de codebase."
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

      {/* ── 7+8. Code evolutie — stap-voor-stap ─────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <CodeEvolutieContent />
        <Notes>
          <em>[Berten]</em><br/><br/>
          "Vroeger deed de developer alles zelf: analyse, schrijven, testen, pull request. Eén kwaliteitscheck aan het einde — door het Dev Team."<br/><br/>
          <em>Stap 1 (klik):</em><br/>
          "In Fase 1 gaat AI helpen bij het schrijven en testen. AI-assisted — de developer beslist nog steeds, maar gaat sneller. De PR splitst: AI Agent doet de snelle kwaliteitscheck, Dev Team focust op context en intent."<br/><br/>
          <em>Stap 2 (klik):</em><br/>
          "In Fase 2 neemt de AI Agent de uitvoering volledig over. Implementatie en testen worden gegenereerd op basis van de Gedragsscenario's. De developer verschuift naar architect en reviewer. Deep-dive blijft menselijk."
        </Notes>
      </Slide>

      {/* ── 8. Testing evolutie — stap-voor-stap ────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <TestingEvolutieContent />
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "Vroeger schreef een QA-Engineer scenario's specifiek voor testen — vaak nadat de code al af was. Dan automatische testen draaien, manuele verificatie, en de vraag: 'is dit wat de klant bedoelde?' Die vraag landde steeds bij de QA-Engineer, op het einde van het proces."<br/><br/>
          <em>Stap 1 (klik):</em><br/>
          "In Fase 1 wordt de QA-Engineer geholpen door AI. Scenario's schrijven gaat sneller, testdekking verbetert. Maar de vraag 'klopt dit met de intent?' blijft bij de QA-Engineer."<br/><br/>
          <em>Stap 2 (klik):</em><br/>
          "In Fase 2 sluit de cirkel. De Gedragsscenario's die we in stap 1 schreven zijn nu ook de bron voor onze E2E testen. AI Agent genereert de testen, AIGeneer keurt goed. En die vraag 'is dit wat de klant bedoelde?' werd al beantwoord in de requirements fase — hier controleer je enkel nog of de code doet wat beschreven staat."
        </Notes>
      </Slide>

      {/* ── 10. Begin morgen ─────────────────────────────────────────── */}
      <Slide style={{ padding: 0, backgroundColor: BG }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ backgroundColor: NAVY, padding: '32px 64px 28px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -60, top: -60, width: 260, height: 260, borderRadius: '50%', border: `1px solid ${TEAL}12`, pointerEvents: 'none' }} />
            <p style={{ color: TEAL, fontSize: '0.63rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 8px', fontFamily: 'Inter, sans-serif' }}>Quick wins</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
              <h2 style={{ color: WHITE, fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, margin: 0, fontFamily: 'Inter, sans-serif' }}>Begin morgen.</h2>
              <p style={{ color: `${WHITE}50`, fontSize: '0.9rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>Geen grote investering. Geen reorganisatie.</p>
            </div>
          </div>

          {/* Table */}
          <div style={{ flex: 1, padding: '20px 64px 28px', display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 88px 88px', padding: '0 16px 8px', gap: 8 }}>
              <span />
              {['Effort', 'Return'].map(h => (
                <span key={h} style={{ color: MUTED, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>{h}</span>
              ))}
            </div>

            {/* Section 1 — direct */}
            <div style={{ background: `${TEAL}18`, borderRadius: '8px 8px 0 0', padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
              <span style={{ color: TEAL, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Direct starten — geen voorbereiding nodig</span>
            </div>
            {[
              { title: 'AI meelezer', desc: 'Stuur AI een document, mail of voorstel. "Wat mist hier? Wat klopt niet?" Vijf minuten. Voor élk team.', effort: 1, ret: 2 },
              { title: 'Kern uit een klantenvraag', desc: 'Geef AI de ruwe input van een klant. Laat het de essentie vatten: wat wil de klant écht, wat blijft impliciet?', effort: 1, ret: 3 },
              { title: 'Blinde vlekken benoemen', desc: '"Wat kan er misgaan? Wat ontbreekt?" AI bedenkt systematisch de gaps en scenario\'s die u zou missen.', effort: 1, ret: 3 },
            ].map((item, i, arr) => (
              <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '1fr 88px 88px', padding: '10px 16px', gap: 8, background: WHITE, marginBottom: i < arr.length - 1 ? 1 : 0, borderBottom: `1px solid ${BG}` }}>
                <div>
                  <p style={{ color: NAVY, fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>{item.title}</p>
                  <p style={{ color: SLATE, fontSize: '0.78rem', lineHeight: 1.5, margin: 0, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  {[1,2,3].map(d => <span key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: d <= item.effort ? SLATE : `${SLATE}20`, display: 'block' }} />)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  {[1,2,3,4].map(d => <span key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: d <= item.ret ? TEAL : `${TEAL}20`, display: 'block' }} />)}
                </div>
              </div>
            ))}

            {/* Section 2 — requires foundation */}
            <div style={{ background: `${BLUE}14`, padding: '5px 16px', marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, borderRadius: '8px 8px 0 0' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
              <span style={{ color: BLUE, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Met fundament — definieer eerst uw proces, dan doet AI het zware werk</span>
            </div>
            {[
              { title: 'Offerte generatie', desc: 'Leg criteria vast: structuur, argumentatie, prijsbepaling. AI genereert vervolgens complete offertedraften — consistent en snel.', effort: 3, ret: 4 },
              { title: 'Contract screening', desc: 'Definieer uw standaardvoorwaarden en risicovlaggen. AI screent elk binnenkomend contract automatisch op afwijkingen.', effort: 2, ret: 4 },
              { title: 'Aanvraagvalidatie', desc: 'Beschrijf wat een complete briefing inhoudt. AI valideert meteen of alle informatie aanwezig is voor project-start.', effort: 2, ret: 3 },
            ].map((item, i, arr) => (
              <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '1fr 88px 88px', padding: '10px 16px', gap: 8, background: WHITE, marginBottom: i < arr.length - 1 ? 1 : 0, borderBottom: `1px solid ${BG}` }}>
                <div>
                  <p style={{ color: NAVY, fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>{item.title}</p>
                  <p style={{ color: SLATE, fontSize: '0.78rem', lineHeight: 1.5, margin: 0, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  {[1,2,3].map(d => <span key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: d <= item.effort ? SLATE : `${SLATE}20`, display: 'block' }} />)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  {[1,2,3,4].map(d => <span key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: d <= item.ret ? BLUE : `${BLUE}20`, display: 'block' }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Notes>
          <em>[Rubin]</em><br/><br/>
          "De eerste drie kunt u morgen al doen. Geen nieuwe tools, geen reorganisatie. AI meelaten lezen op een document of offerte — dat kost vijf minuten en levert direct waarde op."<br/><br/>
          "De tweede rij vraagt voorbereiding: beschrijf uw proces, uw criteria, uw regels. Maar eens dat fundament er ligt, doet AI het zware werk — consistent, snel, schaalbaar."<br/><br/>
          "De offerte-case is een goed voorbeeld: als u vandaag tien offertes schrijft, schrijft u er morgen honderd — even goed."
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
            { name: 'Berten De Schutter', org: 'Collide NV', email: 'berten@collide.be', color: TEAL },
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
            { name: 'Berten De Schutter', org: 'Collide NV', email: 'berten@collide.be', color: TEAL },
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
