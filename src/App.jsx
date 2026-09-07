import { useEffect, useRef, useState } from 'react'
import AstroField from './components/AstroField'

const STRIP = [
  'e^{i\u03c0} + 1 = 0',
  '\u03a3 1/n\u00b2 = \u03c0\u00b2/6',
  '\u03c6 = (1+\u221a5)/2',
  '\u2207\u00b7E = \u03c1/\u03b5\u2080',
  '\u222b\u2080^\u03c0 sin x dx = 2',
  'F\u1d62 = F\u1d62\u208b\u2081 + F\u1d62\u208b\u2082',
  'lim (1+1/n)\u207f = e',
  'c = \u03bbf',
  'E = mc\u00b2',
]

const SKILLS = [
  { cat: 'Bahasa', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C'] },
  { cat: 'Frontend', items: ['React', 'HTML', 'CSS', 'SVG animasi'] },
  { cat: 'Sistem & tool', items: ['Git', 'Vite', 'GitHub Actions', 'Scripting'] },
  {
    cat: 'Deployment',
    items: ['GitHub Pages', 'gh-pages', 'strategi branch', 'cache-busting'],
  },
  {
    cat: 'Animasi vektor',
    items: ['SVG kalkulatif', 'Canvas', 'fisika lerp ringan'],
  },
  { cat: 'Bidang', items: ['Agen LLM', 'Otomasi data', 'Desain vektor'] },
]

const PROJECTS = [
  {
    title: 'j-sgent',
    desc: "J S'GENT Orbital AI System — intelijen agen pribadi untuk satu akun: menganalisis, mengotomatisasi, menjaga orbit.",
    tokens: ['Python', 'agents', 'live'],
    url: 'https://github.com/jarlelauch/j-sgent',
    linkLabel: 'repo',
  },
  {
    title: 'github-profile-blackhole',
    desc: 'Profil GitHub yang hidup — black hole, orbit, filotaksis, gelombang pendulum, ditutup seekor naga API dan halaman interaktif yang mengejar kursor.',
    tokens: ['SVG', 'CSS', 'JS', 'demo'],
    url: 'https://github.com/jarlelauch/jarlelauch',
    linkLabel: 'profil',
    extra: {
      url: 'https://jarlelauch.github.io/jarlelauch/naga.html',
      label: 'naga interaktif',
    },
  },
  {
    title: 'porto — situs ini',
    desc: 'Portofolio manuskrip matematika; dibangun di atas React dan dihidupkan lewat GitHub Pages.',
    tokens: ['React', 'Vite', 'GitHub Pages'],
    url: 'https://jarlelauch.github.io/porto/',
    linkLabel: 'live',
    extra: { url: 'https://github.com/jarlelauch/porto', label: 'repo' },
  },
]

const SPEC = `$ whoami
jarle · beroperasi di persilangan antara persamaan dan antarmuka
tempat    : orbit github.com/jarlelauch
prinsip   : minimal · konsisten · elegan`

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function MoonPhase() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    // simple approx: days since known new moon 2000-01-06
    const known = new Date('2000-01-06T18:14:00Z').getTime()
    const now = Date.now()
    const diff = now - known
    const lun = 29.53058867 * 24 * 3600 * 1000
    const p = ((diff % lun) + lun) % lun / lun
    setPhase(p)
  }, [])
  const pct = Math.round(phase * 100)
  // 0=new, 0.25=first quarter, 0.5=full, 0.75=last
  let label = 'new'
  if (phase < 0.03 || phase > 0.97) label = 'new'
  else if (phase < 0.22) label = 'waxing crescent'
  else if (phase < 0.28) label = 'first quarter'
  else if (phase < 0.47) label = 'waxing gibbous'
  else if (phase < 0.53) label = 'full'
  else if (phase < 0.72) label = 'waning gibbous'
  else if (phase < 0.78) label = 'last quarter'
  else label = 'waning crescent'
  return (
    <span className="moon" title={`${label} · ${pct}%`}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="5.2" fill="none" stroke="rgba(201,173,120,0.55)" strokeWidth="1" />
        <path
          d={`M 7 1.8 A ${5.2 + (phase - 0.5) * 8} 5.2 0 0 ${phase > 0.5 ? 1 : 0} 7 12.2`}
          fill="rgba(233,223,201,0.85)"
          opacity={phase < 0.02 || phase > 0.98 ? 0 : 0.95}
        />
        {phase > 0.48 && phase < 0.52 && <circle cx="7" cy="7" r="5.2" fill="rgba(233,223,201,0.9)" />}
      </svg>
      <span className="moon-label">{label} · {pct}%</span>
    </span>
  )
}

function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <svg viewBox="0 0 320 320" width="100%" height="100%">
        {/* halo + ecliptic */}
        <circle cx="160" cy="160" r="134" fill="none" stroke="rgba(201,173,120,0.045)" strokeDasharray="3 7" />
        <circle cx="160" cy="160" r="122" fill="none" stroke="rgba(201,173,120,0.06)" strokeDasharray="3 7" />
        {/* axis */}
        <line x1="160" y1="18" x2="160" y2="302" stroke="rgba(201,173,120,0.08)" strokeWidth="0.7" />
        <line x1="18" y1="160" x2="302" y2="160" stroke="rgba(201,173,120,0.08)" strokeWidth="0.7" />
        <text x="164" y="22" fontFamily="ui-monospace" fontSize="5" letterSpacing="1" fill="rgba(201,173,120,0.28)">+y · ecliptic N</text>
        {/* milky way subtle band inside */}
        <ellipse cx="160" cy="160" rx="148" ry="18" fill="rgba(233,223,201,0.025)" transform="rotate(-18 160 160)" />
        {/* orbits — 6 Keplerian minimal, ecc hint via offset */}
        <g fill="none">
          <ellipse cx="164" cy="160" rx="42" ry="30" stroke="rgba(198,94,46,0.36)" strokeWidth="1" transform="rotate(-12 160 160)" />
          <ellipse cx="168" cy="160" rx="62" ry="44" stroke="rgba(201,173,120,0.22)" strokeWidth="1" transform="rotate(18 160 160)" />
          <ellipse cx="162" cy="160" rx="86" ry="60" stroke="rgba(111,143,127,0.20)" strokeWidth="1" transform="rotate(-24 160 160)" />
          <ellipse cx="172" cy="160" rx="112" ry="76" stroke="rgba(173,160,140,0.14)" strokeWidth="0.9" transform="rotate(9 160 160)" />
          <ellipse cx="166" cy="160" rx="132" ry="90" stroke="rgba(201,173,120,0.10)" strokeWidth="0.8" transform="rotate(-8 160 160)" />
        </g>
        {/* accretion disk */}
        <ellipse cx="160" cy="160" rx="16" ry="6.2" fill="rgba(198,94,46,0.08)" stroke="rgba(198,94,46,0.16)" strokeWidth="0.7" />
        {/* center singularity */}
        <circle cx="160" cy="160" r="6.5" fill="#12100c" stroke="rgba(198,94,46,0.65)" strokeWidth="1.1" />
        <circle cx="160" cy="160" r="1.7" fill="rgba(198,94,46,0.95)" />
        {/* perihelion dots subtle */}
        <circle cx="206" cy="158" r="0.9" fill="rgba(198,94,46,0.42)" />
        <circle cx="230" cy="172" r="0.9" fill="rgba(201,173,120,0.28)" />
        {/* planets — animated via CSS, non-uniform simulated via easing */}
        <g className="orbit-dot o1">
          <circle cx="0" cy="0" r="3.2" fill="rgba(198,94,46,0.95)" />
          <circle cx="0" cy="0" r="6" fill="rgba(198,94,46,0.14)" />
        </g>
        <g className="orbit-dot o2">
          <circle cx="0" cy="0" r="2.6" fill="rgba(233,223,201,0.92)" />
        </g>
        <g className="orbit-dot o3">
          <circle cx="0" cy="0" r="2.1" fill="rgba(111,143,127,0.9)" />
        </g>
        <g className="orbit-dot o4">
          <circle cx="0" cy="0" r="1.7" fill="rgba(173,160,140,0.9)" />
        </g>
        {/* labels */}
        <text x="160" y="34" textAnchor="middle" fontFamily="ui-monospace" fontSize="6.5" letterSpacing="1.5" fill="rgba(201,173,120,0.42)">MEMORY · L1</text>
        <text x="282" y="162" textAnchor="middle" fontFamily="ui-monospace" fontSize="6.5" letterSpacing="1.5" fill="rgba(201,173,120,0.32)">AGENTS · L2</text>
        <text x="160" y="288" textAnchor="middle" fontFamily="ui-monospace" fontSize="6.5" letterSpacing="1.5" fill="rgba(201,173,120,0.32)">INTERFACE · L3</text>
        <text x="160" y="304" textAnchor="middle" fontFamily="ui-monospace" fontSize="5.2" letterSpacing="1.2" fill="rgba(201,173,120,0.22)">kepler ecc 0.12—0.34 · precess</text>
      </svg>
      <div className="hero-orbit-caption">
        <span>◉ orbital system</span>
        <span>6 planes · 1 singularity · kepler II</span>
      </div>
    </div>
  )
}

function App() {
  const tentang = useReveal()
  const keterampilan = useReveal()
  const karya = useReveal()
  const aizen = useReveal()
  const kontak = useReveal()

  return (
    <>
      <AstroField />
      <header className="nav shell" id="top">
        <span className="brand">JARLELAUCH · <MoonPhase /></span>
        <ul>
          <li>
            <a href="#tentang">tentang</a>
          </li>
          <li>
            <a href="#keterampilan">keterampilan</a>
          </li>
          <li>
            <a href="#karya">karya</a>
          </li>
          <li>
            <a href="#aizen">aizen</a>
          </li>
          <li>
            <a href="#kontak">kontak</a>
          </li>
          <li>
            <a href="https://github.com/jarlelauch" target="_blank" rel="noreferrer">
              github ↗
            </a>
          </li>
        </ul>
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-grid">
            <div className="hero-text">
              <p className="eyebrow">
                <b>◈</b> orbit : membuka peluang
                <span className="eyebrow-live">● live sky</span>
              </p>
              <h1 className="title">
                <span className="title-line">
                  JARLELAUCH<span className="dot">.</span>
                </span>
              </h1>
              <p className="sub">matematika dalam kode — sistem, otomasi, representasi yang presisi</p>
              <p className="coord">@ asal : 0 . 0 — segalanya valid sebelum nol</p>
              <div className="formula" role="img" aria-label="e pangkat i pi tambah satu sama dengan nol">
                <span className="it">e</span>
                <sup>π</sup> + 1 <span className="eq">= 0</span>
              </div>
              <p className="lede">
                Aku merancang perangkat lunak seperti menyusun persamaan — mengambil variabel, memangkas
                yang tak perlu, sampai tersisa hanya kode yang minimal dan konsisten.
              </p>
              <div className="cta">
                <a className="btn solid" href="#karya">
                  buka karya ↓
                </a>
                <a className="btn" href="https://github.com/jarlelauch" target="_blank" rel="noreferrer">
                  github ↗
                </a>
                <a className="btn" href="https://jarlelauch.github.io/jarlelauch/naga.html" target="_blank" rel="noreferrer">
                  naga api ↗
                </a>
              </div>
            </div>
            <HeroOrbit />
          </div>
        </section>

        <div className="strip" aria-hidden="true">
          <div className="strip-track">
            {[...STRIP, ...STRIP].map((f, i) => (
              <span key={i}>
                <b>∫</b> {f} <b>∫</b>
              </span>
            ))}
          </div>
        </div>

        <section className="section shell about" id="tentang" ref={tentang}>
          <div className="s-head">
            <span className="s-num">§01</span>
            <h2 className="s-name">tentang</h2>
            <span className="s-meta">◈ konstelasi φ · Σ · ∫ terlihat di langit</span>
          </div>
          <p>
            Sistem, otomasi, dan representasi visual yang presisi adalah tempat aku bekerja. Dari{' '}
            <b>profil GitHub</b> yang beranimasi penuh SVG kalkulatif, sampai <b>j-sgent</b> — sistem
            intelijen agen pribadi — aku membuat mesin yang diam-diam bekerja: elegan dari dalam ke luar.
          </p>
            <p>
            Prinsipku sederhana, bila sesuatu bisa dijelaskan dalam sebaris persamaan, ia layak menjadi
            bagian dari sistem. Langit di belakangmu bukan hiasan — ia adalah <b>warp grid</b> yang
            melengkung oleh massa di pusat (lensing), <b>Milky Way</b> diagonal ultra-halus, 5 konstelasi
            yang menyala saat hover (<b>φ Σ ∫ π ∞</b>), 6 orbit Kepler eccentric dengan precession, dan
            bintang jatuh multi-trail. <b>Kursormu adalah black hole</b>: gerakkan untuk melensakan bintang & grid, <b>tahan klik</b> untuk放大 massa & menyedot debu, <b>hover</b> konstelasi, <b>klik</b> kosong untuk nova ripple.
          </p>
          <pre className="spec">{SPEC}</pre>
          <div className="stats">
            <span>
              <b>∫</b> e<sup>iπ</sup> = −1
            </span>
            <span>
              <b>π</b> ≈ 3,14159…
            </span>
            <span>
              <b>∞</b> belum selesai
            </span>
            <span style={{ color: 'var(--rust)' }}>✦ 360 bintang · 6 orbit Kepler · 5 konstelasi · cursor = BH · hold → suck</span>
          </div>
        </section>

        <section className="section shell" id="keterampilan" ref={keterampilan}>
          <div className="s-head">
            <span className="s-num">§02</span>
            <h2 className="s-name">keterampilan</h2>
          </div>
          <dl className="ledger">
            {SKILLS.map((g) => (
              <div className="led-row" key={g.cat}>
                <dt>{g.cat}</dt>
                <dd>
                  {g.items.map((it) => (
                    <span key={it}>{it}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section shell" id="karya" ref={karya}>
          <div className="s-head">
            <span className="s-num">§03</span>
            <h2 className="s-name">karya</h2>
          </div>
          {PROJECTS.map((p, idx) => (
            <article className="card" key={p.title}>
              <span className="idx">0{idx + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tokens">
                {p.tokens.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="links">
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.linkLabel} ↗
                </a>
                {p.extra && (
                  <a href={p.extra.url} target="_blank" rel="noreferrer">
                    {p.extra.label} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="section shell aizen" id="aizen" ref={aizen}>
          <div className="s-head">
            <span className="s-num">§04</span>
            <h2 className="s-name">aizen · 藍染惣右介</h2>
            <span className="s-meta">— bleach · kyōka suigetsu</span>
          </div>
          <div className="aizen-grid">
            <div className="aizen-frame">
              <img
                src="/porto/aizen.png"
                alt="Aizen Sousuke — Bleach (official art © Tite Kubo / Shueisha, Studio Pierrot)"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = 'https://bleach-anime.com/assets/img/character/chara_50.png'; e.currentTarget.onerror = null }}
              />
              <span>藍染 惣右介 — Aizen Sōsuke</span>
              <span className="aizen-cap">“sejak awal, tak ada yang berdiri di langit”</span>
            </div>
            <div className="aizen-quote">
              <blockquote>
                <p className="jp">人間は猿を模倣し、神は人間を模倣する。</p>
                <p className="rm">Ningen wa saru o mohō shi, kami wa ningen o mohō suru.</p>
                <p className="id">“Manusia adalah imitasi dari kera, dewa adalah imitasi dari manusia.”</p>
                <footer>— 藍染 惣右介 · <em>Bleach</em> · 惣右介の箴言</footer>
              </blockquote>
              <p className="aizen-note">
                Ditempatkan di antara karya dan kontak sebagai <b>orbit etika</b>: setiap imitasi menuntut presisi,
                setiap evolusi menuntut pengkhianatan terhadap bentuk sebelumnya. — minimal, seperti lensing di pusat canvas.
              </p>
              <div className="aizen-tokens">
                <span>模倣</span><span>mohō</span><span>超越</span><span>chōetsu</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell kontak" id="kontak" ref={kontak}>
          <div className="s-head">
            <span className="s-num">§05</span>
            <h2 className="s-name">kontak</h2>
          </div>
          <p className="big">
            Ada persamaan yang ingin dipecahkan <em>bersama</em>?
          </p>
          <div className="cta">
            <a className="btn solid" href="https://github.com/jarlelauch" target="_blank" rel="noreferrer">
              github ↗
            </a>
            <a className="btn" href="https://github.com/jarlelauch/jarlelauch" target="_blank" rel="noreferrer">
              profil ↗
            </a>
          </div>
          <p className="muted">respon tercepat lewat GitHub — mulai dari isu, PR, atau pesan langsung</p>
        </section>
      </main>

      <footer className="footer shell">
        <span>
          © 2026 JARLELAUCH · persamaan demi persamaan · dihosting di{' '}
          <a href="https://js.org" target="_blank" rel="noreferrer">
            js.org ↗
          </a>
        </span>
        <span>
          <a href="#top">kembali ke asal ↑</a>
        </span>
      </footer>
      <div className="bh-hint" aria-hidden="true">● kursor = black hole · gerak = lensing · tahan klik = sedot · klik kosong = nova</div>
    </>
  )
}

export default App
