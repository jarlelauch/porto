import { useEffect, useRef } from 'react'
import AxisField from './components/AxisField'

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

function App() {
  const tentang = useReveal()
  const keterampilan = useReveal()
  const karya = useReveal()
  const demo = useReveal()
  const kontak = useReveal()

  return (
    <>
      <AxisField />
      <header className="nav shell" id="top">
        <span className="brand">
          <i>Σ</i> JARLE LAUCH
        </span>
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
            <a href="#kontak">kontak</a>
          </li>
          <li>
            <a
              href="https://github.com/jarlelauch"
              target="_blank"
              rel="noreferrer"
            >
              github ↗
            </a>
          </li>
        </ul>
      </header>

      <main>
        <section className="hero shell">
          <p className="eyebrow">
            <b>◈</b> orbit : membuka peluang
          </p>
          <h1 className="title">
            <span className="title-line">JARLE LAUCH<span className="dot">.</span></span>
          </h1>
          <p className="sub">matematika dalam kode — sistem, otomasi, representasi yang presisi</p>
          <p className="coord">@ asal : 0 . 0 — segalanya valid sebelum nol</p>
          <div
            className="formula"
            role="img"
            aria-label="e pangkat i pi tambah satu sama dengan nol"
          >
            <span className="it">e</span>
            <sup>π</sup> + 1 <span className="eq">= 0</span>
          </div>
          <p className="lede">
            Aku merancang perangkat lunak seperti menyusun persamaan —
            mengambil variabel, memangkas yang tak perlu, sampai tersisa hanya
            kode yang minimal dan konsisten.
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
          </div>
          <p>
            Sistem, otomasi, dan representasi visual yang presisi adalah tempat
            aku bekerja. Dari <b>profil GitHub</b> yang beranimasi penuh SVG
            kalkulatif, sampai <b>j-sgent</b> — sistem intelijen agen pribadi —
            aku membuat mesin yang diam-diam bekerja: elegan dari dalam ke luar.
          </p>
          <p>
            Prinsipku sederhana, bila sesuatu bisa dijelaskan dalam sebaris
            persamaan, ia layak menjadi bagian dari sistem.
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

        <section className="section shell" id="demo" ref={demo}>
          <div className="s-head">
            <span className="s-num">§04</span>
            <h2 className="s-name">demo — naga api</h2>
          </div>
          <div className="frame">
            <iframe
              src="https://jarlelauch.github.io/jarlelauch/naga.html"
              title="Naga API interaktif — gerakkan kursor, tahan Spasi atau klik untuk nafas api"
              loading="lazy"
            />
          </div>
          <p className="frame-cap">
            main langsung di sini — gerakkan kursor · tahan <b>spasi</b> /
            klik untuk nafas api &middot;{' '}
            <a
              href="https://jarlelauch.github.io/jarlelauch/naga.html"
              target="_blank"
              rel="noreferrer"
            >
              layar penuh ↗
            </a>
          </p>
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
          <p className="muted">
            respon tercepat lewat GitHub — mulai dari isu, PR, atau pesan langsung
          </p>
        </section>
      </main>

      <footer className="footer shell">
        <span>© 2026 JARLE LAUCH · persamaan demi persamaan</span>
        <span>
          <a href="#top">kembali ke asal ↑</a>
        </span>
      </footer>
    </>
  )
}

export default App