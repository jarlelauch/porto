import MathField from './components/MathField'

const SKILLS = [
  { cat: 'Bahasa', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C'] },
  { cat: 'Frontend', items: ['React', 'HTML', 'CSS', 'SVG animasi'] },
  { cat: 'Sistem & tool', items: ['Git', 'Vite', 'GitHub Actions', 'Scripting'] },
  { cat: 'Bidang', items: ['Agen LLM', 'Otomasi data', 'Desain vektor'] },
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
            <a className="btn solid" href="#tentang">
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