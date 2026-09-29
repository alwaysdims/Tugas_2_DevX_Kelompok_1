# Duo Portfolio — Tugas 2 DevX Kelompok 1

Website portfolio modern, editorial, dan interaktif yang dibangun oleh dua developer (**Lutfi** & **Dimas**). Mengadopsi prinsip desain terinspirasi standar **Awwwards**: *Visual First, Generous Whitespace, Strong Typography, dan Smooth Motion*.

Proyek ini merupakan implementasi Single Page Application (SPA) berbasis **React 19**, **Vite 8**, **React Router DOM 7**, dan visualisasi 3D WebGL interaktif menggunakan **Three.js**.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Filosofi & Konsep Desain](#filosofi--konsep-desain)
- [Anggota Tim & Pembagian Tugas](#anggota-tim--pembagian-tugas)
- [Fitur Utama & Alur Pengalaman Pengguna](#fitur-utama--alur-pengalaman-pengguna)
- [Tech Stack & Dependensi](#tech-stack--dependensi)
- [Prasyarat Sistem](#prasyarat-sistem)
- [Panduan Instalasi & Menjalankan Proyek](#panduan-instalasi--menjalankan-proyek)
- [Struktur Direktori](#struktur-direktori)
- [Alur Kerja Git & Konvensi Commit](#alur-kerja-git--konvensi-commit)
- [Konfigurasi Deployment](#konfigurasi-deployment)

---

## Tentang Proyek

**Duo Portfolio** dirancang sebagai representasi digital kolaboratif dari dua mahasiswa/developer untuk menampilkan karya terpilih (*Selected Projects*), produk digital (*Digital Products*), keahlian teknis (*Technical Skills*), serta identitas profesional.

Berbeda dari portfolio konvensional yang padat dengan teks, platform ini memprioritaskan komunikasi visual:
```text
Visual → Whitespace → Typography → Motion Halus → Informasi Singkat
```
Pengunjung disajikan pengalaman interaktif dengan transisi halus, kanvas 3D interaktif, micro-interactions responsif, serta dukungan tema terang (*light*) dan gelap (*dark*).

---

## Filosofi & Konsep Desain

1. **Visual First**: Pengunjung memahami identitas dan karya melalui hierarki visual yang jelas tanpa harus membaca paragraf panjang.
2. **Generous Whitespace**: Setiap bagian diberikan ruang bernapas yang cukup agar fokus mata tetap nyaman dan estetika editorial terasa kuat.
3. **Editorial Typography**: Menggunakan kontras skala tipografi tajam antara judul besar (*display heading*) dan teks deskriptif yang ringkas.
4. **Subtle Motion**: Animasi dirancang fungsional dan halus untuk meningkatkan pengalaman interaktif tanpa memperlambat performa.
5. **Color System**:
   - **Warm Cream (`#FCF9EA`)**: Warna dasar latar belakang yang ramah di mata.
   - **Charcoal Black (`#1C1E1F`)**: Struktur layout, pembatas border, dan tipografi utama.
   - **Deep Forest Teal (`#134E4A`)**: Aksen interaktif, Call to Action (CTA), status badge, dan hover highlight.

---

## Anggota Tim & Pembagian Tugas

| No | Nama | NIM | Role | Fokus Utama |
|---|---|---|---|---|
| 1 | **Lutfi** | 2604140069 | Frontend Developer — Interaction & Components | Projects Catalog, Products Section, Modal Reusable, Contact Form & Validasi, Micro-interactions. |
| 2 | **Dimas** | 2605090004 | Frontend Developer — Visual & Layout | Responsive Navbar & Menu, Hero Section, About Layout & Three.js Canvas, Skills Matrix, Theme System. |

### Rincian Tanggung Jawab:
- **Lutfi**:
  - `src/components/ProjectCard.jsx` & `src/pages/ProjectsPage.jsx`
  - `src/components/ProductCard.jsx` & `src/pages/ProductsPage.jsx`
  - `src/components/Modal.jsx` (Detail dialog interaktif)
  - `src/components/Contact.jsx` & `src/pages/ContactPage.jsx` (Validasi form & state kirim)
  - `src/components/Footer.jsx`
  - `src/data/projects.js` & `src/data/products.js`
- **Dimas**:
  - `src/components/Navbar.jsx` (Navigasi desktop, mobile menu drawer, dan indicator)
  - `src/components/Hero.jsx` (Tipografi hero editorial & dual CTA)
  - `src/components/About.jsx` & `src/components/About3D.jsx` (Canvas Three.js dengan 3 mode geometri interaktif)
  - `src/components/Skills.jsx` & `src/pages/SkillsPage.jsx`
  - `src/components/ThemeToggle.jsx`
  - `src/data/members.js` & `src/data/skills.js`
- **Kolaborasi Bersama**:
  - Setup proyek (Vite, React, struktur folder, routing).
  - `src/layouts/MainLayout.jsx` & `src/App.jsx`.
  - Agregasi halaman beranda (`src/pages/Home.jsx`) dan penanganan `src/pages/NotFound.jsx`.
  - Pengujian responsif lintas perangkat (320px s/d 1920px), audit aksesibilitas, dan dokumentasi.

---

## Fitur Utama & Alur Pengalaman Pengguna

Alur pengguna dari awal memasuki website hingga selesai:

1. **Intro Loader (Preloader)**:
   - Layar pemuatan awal dengan penghitung angka persentase (0–100%) dan teks transisi editorial berganti secara berkala.
   - Mendukung skip cepat via keyboard (`Esc`) dan secara otomatis menghormati preferensi aksesibilitas `prefers-reduced-motion`.
2. **Hero Section**:
   - Judul editorial dramatis dengan layout grid asimetris.
   - Tombol Call to Action langsung menuju katalog karya (*View Projects*) dan kontak (*Get in Touch*).
3. **About Section & 3D WebGL Canvas**:
   - Pengenalan dua profil pengembang kolaboratif.
   - Kanvas 3D interaktif yang dapat dirotasi menggunakan drag kursor / inersia mouse, lengkap dengan opsi beralih 3 mode geometri matematis:
     - *Dual Synergy* (Dua cincin torus berpotongan)
     - *Geodesic Core* (Icosahedron wireframe)
     - *Möbius Knot* (Torus knot kompleks)
4. **Skills Matrix**:
   - Pemetaan keahlian teknis (Core Frontend, Framework, Styling, 3D WebGL, Design & Tooling) dengan kartu interaktif.
5. **Selected Projects & Showcase**:
   - Daftar proyek utama dengan nomor seri, tag teknologi, deskripsi ringkas, dan efek visual saat di-hover.
6. **Digital Products**:
   - Bagian khusus untuk publikasi digital dan sumber daya desain yang dikembangkan.
7. **Interactive Modal Dialog**:
   - Klik pada kartu proyek atau produk membuka pop-up modal detail tanpa berpindah halaman.
   - Dilengkapi penutup klik backdrop, tombol close, dan event listener tombol `Escape`.
8. **Contact Section & Form Validation**:
   - Formulir pesan dengan validasi lokal langsung (nama, email berformat valid, isi pesan).
   - Indikator status error dan animasi feedback sukses terkirim.
9. **Dark Mode / Light Mode Toggle**:
   - Pergantian tema instan dengan penyesuaian kontras menyeluruh pada warna teks, latar, kartu, dan material 3D Three.js.
10. **404 Not Found Handling**:
    - Penanganan rute URL yang salah dengan tombol kembali ke beranda.

---

## Tech Stack & Dependensi

### Dependensi Utama (Production)
- **Node.js**: Runtime environment JavaScript (`^22.23.3` / kompatibel `>= 18.0.0`)
- **React (`^19.2.8`)**: Library UI berbasis komponen
- **React DOM (`^19.2.8`)**: Renderer React untuk peramban web
- **React Router DOM (`^7.18.4`)**: Manajemen routing SPA (Single Page Application)
- **Three.js (`^0.186.1`)**: Library render 3D WebGL interaktif

### Dependensi Pengembangan (Development)
- **Vite (`^8.3.0`)**: Build tool & local development server kilat
- **@vitejs/plugin-react (`^6.1.1`)**: Plugin React resmi berbasis compiler Oxc
- **Oxlint (`^1.81.0`)**: High-performance linter kode JavaScript/JSX
- **@types/react & @types/react-dom**: Definisi tipe untuk integrasi editor

---

## Prasyarat Sistem

Sebelum melakukan instalasi, pastikan lingkungan lokal Anda telah terpasang:
- **Node.js**: Versi `18.0.0` atau lebih baru (direkomendasikan LTS `20.x` atau `22.x`).
  - Cek versi: `node -v`
- **npm**: Versi `9.x` atau lebih baru (biasanya terpasang bersama Node.js).
  - Cek versi: `npm -v`
- **Git**: Untuk proses cloning repository.
  - Cek versi: `git --v`

---

## Panduan Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut secara berurutan untuk menjalankan proyek di komputer lokal:

### 1. Kloning Repository
Buka terminal dan jalankan perintah clone:
```bash
git clone https://github.com/dimszyo/Tugas_2_DevX_Kelompok_1.git
```

### 2. Masuk ke Direktori Proyek
```bash
cd Tugas_2_DevX_Kelompok_1
```

### 3. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh semua modul yang terdaftar di `package.json`:
```bash
npm install
```

### 4. Menjalankan Development Server
Mulai server lokal dengan Vite:
```bash
npm run dev
```
Setelah server aktif, buka peramban dan akses alamat yang tertera di terminal:
```text
http://localhost:5173/
```

### 5. Memeriksa Kualitas Kode (Linting)
Gunakan Oxlint untuk mengecek kualitas dan potensi error pada sintaks:
```bash
npm run lint
```

### 6. Membangun Proyek untuk Produksi (Production Build)
Untuk membuat bundle aset produksi yang telah dioptimasi dan diminifikasi ke dalam folder `dist/`:
```bash
npm run build
```

### 7. Meninjau Hasil Build Produksi (Preview)
Uji coba hasil build lokal sebelum deployment:
```bash
npm run preview
```

---

## Struktur Direktori

Berikut adalah struktur berkas dan direktori utama proyek:

```text
Tugas_2_DevX_Kelompok_1/
├── public/                 # Berkas statis publik
├── src/
│   ├── assets/             # Gambar, ikon, dan aset grafis
│   ├── components/         # Komponen UI modular
│   │   ├── About.jsx       # Section profil About
│   │   ├── About3D.jsx     # Visualisasi 3D Three.js interaktif
│   │   ├── Contact.jsx     # Section & form kontak
│   │   ├── Footer.jsx      # Footer & tautan sosial
│   │   ├── Hero.jsx        # Hero section beranda
│   │   ├── IntroLoader.jsx # Preloader animasi pembuka
│   │   ├── Modal.jsx       # Modal detail project/product
│   │   ├── Navbar.jsx      # Navigasi utama & mobile menu
│   │   ├── ProductCard.jsx # Kartu katalog produk
│   │   ├── ProjectCard.jsx # Kartu showcase proyek
│   │   ├── SectionTitle.jsx# Komponen header section seragam
│   │   ├── Skills.jsx      # Section daftar keahlian
│   │   └── ThemeToggle.jsx # Pengalih mode gelap/terang
│   ├── data/               # Data statis
│   │   ├── members.js      # Data profil pengembang
│   │   ├── products.js     # Data katalog produk digital
│   │   ├── projects.js     # Data showcase proyek
│   │   └── skills.js       # Data keahlian teknis
│   ├── layouts/
│   │   └── MainLayout.jsx  # Layout utama pembungkus Navbar, Outlet, Footer, Modal
│   ├── pages/              # Halaman rute React Router
│   │   ├── AboutPage.jsx   # Halaman penuh About
│   │   ├── ContactPage.jsx # Halaman penuh Contact
│   │   ├── Home.jsx        # Halaman Beranda gabungan
│   │   ├── NotFound.jsx    # Halaman error 404
│   │   ├── ProductsPage.jsx# Halaman penuh Products
│   │   ├── ProjectsPage.jsx# Halaman penuh Projects
│   │   └── SkillsPage.jsx  # Halaman penuh Skills
│   ├── App.css             # Styling styling global & modul
│   ├── App.jsx             # Root router & inisialisasi state
│   ├── index.css           # Basis CSS & reset font
│   └── main.jsx            # Entry point ReactDOM
├── .gitignore              # Konfigurasi file yang diabaikan Git
├── DESIGN.md               # Pedoman desain visual & token
├── package.json            # Daftar dependensi & script proyek
├── PengerjaanKelompok.md   # Catatan pembagian kerja kelompok
├── PRD.md                  # Product Requirements Document
├── README.md               # Dokumentasi utama proyek
├── vercel.json             # Konfigurasi routing rewrite SPA Vercel
└── vite.config.js          # Konfigurasi bundler Vite
```

---

## Alur Kerja Git & Konvensi Commit

Proyek ini menggunakan branching strategy terstruktur untuk menjaga stabilitas branch utama:

### Struktur Branch
- `main`: Branch utama produksi yang selalu stabil.
- `feature/dimas`: Branch kerja fitur untuk Dimas (Visual, Layout, Theme, 3D).
- `feature/lutfi`: Branch kerja fitur untuk Lutfi (Components, Interaction, Modal, Form).

### Format Pesan Commit
Format commit mengacu pada *Conventional Commits*:
- `feat: <deskripsi>` — Penambahan fitur atau komponen baru.
- `fix: <deskripsi>` — Perbaikan bug atau penyesuaian tata letak.
- `style: <deskripsi>` — Penyesuaian estetika, spacing, atau tipografi tanpa mengubah logika.
- `refactor: <deskripsi>` — Restrukturisasi kode tanpa mengubah perilaku fitur.
- `docs: <deskripsi>` — Pembaruan berkas dokumentasi (`README.md`, `PRD.md`, dll.).

---

## Konfigurasi Deployment

Aplikasi ini siap di-deploy ke platform **Vercel** atau penyedia hosting statis lainnya. Berkas `vercel.json` telah dikonfigurasi untuk menangani rewrite rute client-side SPA agar URL langsung (misal `/projects`, `/about`) tidak menghasilkan error `404 Not Found`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Pengaturan Build di Vercel:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
