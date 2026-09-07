# Σ(porto) — portofolio JARLE LAUCH

Web portofolio manuskrip matematika. Dibangun dengan **React + Vite**,
di-hosting lewat **GitHub Pages**.

Live: **https://jarlelauch.github.io/porto/**

## Bagian

- **Hero** — judul `JARLELAUCH.`, formula `e^{iπ} + 1 = 0`, koordinat, CTA
- **Strip formula** — teles berjalan persamaan (Euler, Basel, Fibonacci, …)
- **Tentang** — profil singkat + `$ whoami` dan baris presisi
- **Keterampilan** — tabel book-keeping 6 kategori (variabel :: nilai) termasuk deployment & animasi vektor
- **Karya** — katalog karya bernomor (j-sgent, github-profile-blackhole, situs ini)
- **Demo — naga api** — embed langsung dari halaman naga interaktif (bisa dimainkan di dalam situs)
- **Kontak** — lewat GitHub

Latar berupa **bidang kartesian** (kisi kertas grafik, sumbu, kurva sinus yang
dipelan) dengan gaya manuskrip hangat — arang, krim, aksen karat; tanpa glow,
bergerak halus dan menghormati `prefers-reduced-motion`.

## Menjalankan lokal

```sh
npm install
npm run dev
```

Build produksi & pratinjau:

```sh
npm run build
npm run preview
```

Lint:

```sh
npm run lint
```

## Deploy

Konfigurasi `base: '/porto/'` di `vite.config.js` (proyek-site GitHub Pages).

```sh
npm run build
npx gh-pages -d dist
```

Pages di-repo ini: source **gh-pages / (root)**.