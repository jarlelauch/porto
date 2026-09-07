# Σ(porto) — portofolio JARLE LAUCH

Web portofolio minimal bertema matematika. Dibangun dengan **React + Vite**,
di-hosting lewat **GitHub Pages**.

Live: **https://jarlelauch.github.io/porto/**

## Bagian

- **Hero** — formula `e^{iπ} + 1 = 0`, status, CTA
- **Tentang** — profil singkat + kartu spesifik `const jarle = { … }`
- **Keterampilan** — chips 4 kategori
- **Proyek** — katalog karya (j-sgent, github-profile-blackhole, situs ini)
- **Demo — naga api** — embed langsung dari halaman naga interaktif (bisa dimainkan di dalam situs)
- **Kontak** — lewat GitHub

Latar belakang berupa kanvas glif matematika (`Σ π φ ∂ ∞ …`) yang melayang,
dengan penghormatan pada `prefers-reduced-motion`.

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