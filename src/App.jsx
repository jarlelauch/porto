import MathField from './components/MathField'

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
    tags: ['Python', 'agents', 'live'],
    url: 'https://github.com/jarlelauch/j-sgent',
    linkLabel: 'repo',
  },
  {
    title: 'github-profile-blackhole',
    desc: 'Profil GitHub yang hidup — black hole, orbit, filotaksis, gelombang pendulum, ditutup seekor naga API (SVG CSS) dan halaman interaktif yang mengejar kursor.',
    tags: ['SVG', 'CSS', 'JS', 'demo'],
    url: 'https://github.com/jarlelauch/jarlelauch',
    linkLabel: 'profil',
    extra: {
      url: 'https://jarlelauch.github.io/jarlelauch/naga.html',
      label: 'naga interaktif',
    },
  },
  {
    title: 'porto — situs ini',
    desc: 'Portofolio minimal bertema matematika; dibangun di atas React dan dihidupkan lewat GitHub Pages.',
    tags: ['React', 'Vite', 'GitHub Pages'],
    url: 'https://jarlelauch.github.io/porto/',
    linkLabel: 'live',
    extra: { url: 'https://github.com/jarlelauch/porto', label: 'repo' },
  },
]

const SPEC = `> const jarle = {
>   nama:      "JARLE LAUCH",
>   bekerja:   ["sistem", "otomasi", "visualisasi"],
>   moto:      "minimal · konsisten · elegan"
> }`

function App() {
  return (
    <>
      <MathField />
      <header className="nav shell">
        <span className="brand">
          Σ(<b>JARLE LAUCH</b>)
        </span>
        <ul>
          <li>
            <a href="#tentang">tentang</a>
          </li>
          <li>
            <a href="#keterampilan">keterampilan</a>
          </li>
          <li>
            <a href="#proyek">proyek</a>
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
          <p className="eyebrow">status : membuka peluang</p>
          <h1 className="title">
            JARLE LAUCH<span className="dot">.</span>
          </h1>
          <div className="formula" aria-label="rumus e pangkat i pi ditambah satu sama dengan nol">
            <span className="italic">e</span>
            <span className="sup">iπ</span>
            <span> + 1 </span>
            <span className="equals">= 0</span>
          </div>
          <p className="lede">
            Aku merancang perangkat lunak seperti menyusun persamaan —
            mengambil variabel, memangkas yang tak perlu, sampai yang tersisa
            hanya kode yang minimal dan konsisten.
            <small>
              orbit: github.com/jarlelauch · dari profil yang hidup sampai
              sistem agen AI
            </small>
          </p>
          <div className="cta">
            <a className="btn solid" href="#proyek">
              lihat karya ↓
            </a>
            <a className="btn" href="https://github.com/jarlelauch" target="_blank" rel="noreferrer">
              github ↗
            </a>
          </div>
        </section>

        <section className="section shell about" id="tentang">
          <div className="s-head">
            <span className="s-num">01</span>
            <h2 className="s-name">tentang</h2>
          </div>
          <p>
            Sistem, otomasi, dan representasi visual yang presisi adalah tempat
            aku bekerja. Dari profil GitHub yang beranimasi penuh dengan SVG
            kalkulatif, sampai <em>j-sgent</em> — sebuah sistem intelijen agen
            pribadi — aku membuat mesin yang diam-diam bekerja: elegan dari
            dalam ke luar.
          </p>
          <p>
            Prinsipku sederhana: bila sesuatu bisa dijelaskan dalam sebaris
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

        <section className="section shell" id="keterampilan">
          <div className="s-head">
            <span className="s-num">02</span>
            <h2 className="s-name">keterampilan</h2>
          </div>
          <div className="grid">
            {SKILLS.map((g) => (
              <div className="cell" key={g.cat}>
                <h3>{g.cat}</h3>
                <div className="chips">
                  {g.items.map((it) => (
                    <span className="chip" key={it}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      <section className="section shell" id="proyek">
          <div className="s-head">
            <span className="s-num">03</span>
            <h2 className="s-name">proyek</h2>
          </div>
          <div className="cards">
            {PROJECTS.map((p) => (
              <article className="proj" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t) => (
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
          </div>
        </section>

        <section className="section shell" id="demo">
          <div className="s-head">
            <span className="s-num">04</span>
            <h2 className="s-name">demo — naga api</h2>
          </div>
          <div className="demo-frame">
            <iframe
              src="https://jarlelauch.github.io/jarlelauch/naga.html"
              title="Naga API interaktif — gerakkan kursor, tahan Spasi atau klik untuk nafas api"
              loading="lazy"
            />
          </div>
          <p className="demo-cap">
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

        <section className="section shell kontak" id="kontak">
          <div className="s-head">
            <span className="s-num">05</span>
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
          <p className="lede">
            <small>
              respon tercepat lewat GitHub — mulai dari isu, PR, atau pesan
              langsung
            </small>
          </p>
        </section>
      </main>

      <footer className="footer shell">
        <span>© 2026 JARLE LAUCH · dibuat dengan React</span>
        <span>
          <a href="https://jarlelauch.github.io/jarlelauch/naga.html" target="_blank" rel="noreferrer">
            main ke naga interaktif ↗
          </a>
        </span>
      </footer>
    </>
  )
}

export default App