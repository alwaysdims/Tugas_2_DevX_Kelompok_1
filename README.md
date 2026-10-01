# Duo Portfolio — Tugas 2 DevX Kelompok 1

Website portfolio modern, editorial, dan interaktif yang dibangun oleh dua developer (**Lutfi** & **Dimas**). Mengadopsi prinsip desain terinspirasi standar **Awwwards**: *Visual First, Generous Whitespace, Strong Typography, dan Smooth Motion*.

Proyek ini merupakan implementasi Single Page Application (SPA) berbasis **React 19**, **Vite 8**, **React Router DOM 7**, visualisasi 3D WebGL interaktif menggunakan **Three.js** & **React Three Fiber**, simulasi fisika lanyard menggunakan **Rapier**, serta transisi pixel kustom **PixelSwap**.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Anggota Tim & Pembagian Tugas](#anggota-tim--pembagian-tugas)
- [Dokumentasi Library & Panduan Instalasi (Prompt CLI)](#dokumentasi-library--panduan-instalasi-prompt-cli)
- [Fitur Utama & Alur Pengalaman Pengguna](#fitur-utama--alur-pengalaman-pengguna)
- [Prasyarat Sistem](#prasyarat-sistem)
- [Panduan Menjalankan Proyek](#panduan-menjalankan-proyek)
- [Struktur Direktori](#struktur-direktori)
- [Halaman & Routing](#halaman--routing)
- [Alur Kerja Git & Konvensi Commit](#alur-kerja-git--konvensi-commit)
- [Konfigurasi Deployment](#konfigurasi-deployment)

---

## Tentang Proyek

**Duo Portfolio** dirancang sebagai representasi digital kolaboratif dari dua mahasiswa/developer untuk menampilkan karya terpilih (*Selected Projects*), produk digital (*Digital Products*), keahlian teknis (*Technical Skills*), serta identitas profesional.

Berbeda dari portfolio konvensional yang padat dengan teks, platform ini memprioritaskan komunikasi visual:
```text
Visual → Whitespace → Typography → Motion Halus → Informasi Singkat
```

Pengunjung disajikan pengalaman interaktif dengan transisi halus, kanvas 3D interaktif, morphing text sinematik, efek masuk kinetik bola pantul (*bouncing ball*), kartu tugas melayang (*floating task cards*), scroll-driven card stacking, micro-interactions responsif, serta dukungan tema terang (*light*) dan gelap (*dark*).

---

## Anggota Tim & Pembagian Tugas

| No | Nama | NIM | Role | Fokus Utama |
|---|---|---|---|---|
| 1 | **Lutfi** | 2604140069 | Frontend Developer — Interaction & Components | Projects Catalog, Products Section, Modal Reusable, Contact Form & Validasi, Footer, Micro-interactions. |
| 2 | **Dimas** | 2605090004 | Frontend Developer — Visual & Layout | Responsive Navbar & SideNav, Hero Section, About Layout & Three.js Canvas, Skills Matrix, Theme System. |

### Rincian Tanggung Jawab:

- **Lutfi**:
  - `src/components/ProjectCard.jsx` & `src/pages/ProjectsPage.jsx`
  - `src/components/ProductCard.jsx` & `src/pages/ProductsPage.jsx`
  - `src/components/Modal.jsx` (Detail dialog interaktif & focus-trap)
  - `src/components/Contact.jsx` & `src/pages/ContactPage.jsx` (Validasi form & feedback state)
  - `src/components/Footer.jsx`
  - `src/data/projects.js` & `src/data/products.js`

- **Dimas**:
  - `src/components/Navbar.jsx` (Header wrapper)
  - `src/components/SideNav.jsx` (Navigasi floating kanan dengan animasi slide-in & HyperText scramble)
  - `src/components/Hero.jsx` (Kinetic ball drop, floating task cards, tipografi editorial, dan integrasi PixelSwap)
  - `src/components/About.jsx` & `src/components/About3D.jsx` (Morphing text + scroll card stacking + Three.js 3D sculpture viewer)
  - `src/components/Lanyard.jsx` (Simulasi fisika tali lanyard 3D menggunakan Rapier & MeshLine)
  - `src/components/LightRays.jsx` (Shader WebGL OGL ray lighting background)
  - `src/components/Skills.jsx` & `src/pages/SkillsPage.jsx` (Bento grid dengan SpotlightCard & telemetry)
  - `src/data/skills.js`

- **Kolaborasi Bersama**:
  - Setup proyek (Vite, React 19, struktur folder, routing).
  - `src/layouts/MainLayout.jsx` & `src/App.jsx`.
  - Agregasi halaman beranda (`src/pages/Home.jsx`) dan penanganan `src/pages/NotFound.jsx`.
  - Pengujian responsif lintas perangkat (320px s/d 1920px), audit aksesibilitas (WCAG), dan dokumentasi.

---

## Dokumentasi Library & Panduan Instalasi (Prompt CLI)

Berikut adalah seluruh library pihak ketiga yang dipasang dan digunakan di dalam proyek ini beserta perintah CLI (*prompt terminal*) untuk menginstalnya.

### 1. One-Line Prompt Install (Semua Library Sekaligus)

Untuk menginstal seluruh dependensi produksi dalam satu baris perintah:

```bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline ogl cobe gsap @gsap/react lenis motion react-router-dom clsx tailwind-merge
```

---

### 2. Instalasi Berdasarkan Kategori & Kegunaan

#### A. 3D WebGL, Physics & Shader Canvas
Library yang digunakan untuk visualisasi 3D kartu ID badge lanyard berfisika nyata, 3D sculpture viewer, dan shader latar belakang:

```bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline ogl cobe
```

* **`three`** (`^0.186.1`): Pustaka inti WebGL 3D untuk merender mesh, geometri, material, dan pencahayaan.
* **`@react-three/fiber`** (`^9.8.1`): Declarative renderer React untuk Three.js (komponen `<Canvas />`).
* **`@react-three/drei`** (`^10.7.9`): Kumpulan helper, loader 3D GLTF (`useGLTF`), texture loader, dan lighting environment (`Environment`, `Lightformer`).
* **`@react-three/rapier`** (`^2.2.0`): Physics engine berbasis Rust WebAssembly untuk simulasi gravitasi, sambungan bola (*spherical joint*), dan ayunan kartu lanyard ID.
* **`meshline`** (`^3.3.1`): Pembuat geometri tali tebal dan halus (*thick 3D lines*) untuk strap lanyard.
* **`ogl`** (`^1.0.11`): WebGL library ultra-ringan berkinerja tinggi untuk shader berkas cahaya `LightRays.jsx`.
* **`cobe`** (`^0.6.5`): Library canvas 3D globe interaktif 60fps.

#### B. Animasi, Motion & Smooth Inertial Scroll
Library untuk mengontrol alur gerak, transisi fisika, dan scrolling halus:

```bash
npm install gsap @gsap/react lenis motion
```

* **`gsap`** (`^3.15.0`) & **`@gsap/react`** (`^2.1.2`): GreenSock Animation Platform untuk orkestrasi timeline dan transisi visual presisi tinggi.
* **`lenis`** (`^1.3.26`): Library smooth scroll inersia untuk sensasi scroll web bergaya Awwwards, dilengkapi kontrol programatis (`lenis.stop()` dan `lenis.start()`).
* **`motion`** (`^13.4.6`): Pustaka animasi deklaratif berbasis spring physics dan gesture handling.

#### C. Routing & CSS Utilities
Library untuk routing halaman SPA dan manajemen utility class CSS:

```bash
npm install react-router-dom clsx tailwind-merge
```

* **`react-router-dom`** (`^7.18.4`): Manajemen routing Single Page Application (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`).
* **`clsx`** (`^2.1.1`): Utility penggabungan conditional class name secara ringkas.
* **`tailwind-merge`** (`^3.7.0`): Penggabungan class Tailwind secara otomatis tanpa konflik spesifisitas.

#### D. Development Dependencies (Dev Tools & Linter)

```bash
npm install -D vite @vitejs/plugin-react oxlint @types/react @types/react-dom
```

* **`vite`** (`^8.3.0`): Build tool dan development server berkecepatan tinggi.
* **`@vitejs/plugin-react`** (`^6.1.1`): Plugin resmi React untuk Vite menggunakan compiler Oxc.
* **`oxlint`** (`^1.81.0`): High-performance Rust-based JavaScript/JSX linter.
* **`@types/react`** (`^19.2.18`) & **`@types/react-dom`** (`^19.2.7`): Definisi tipe untuk integrasi editor.

---

## Fitur Utama & Alur Pengalaman Pengguna

1. **Hero Section & Kinetic Entrance**:
   - **Layar Awal**: Kanvas bersih dengan latar krem hangat (`var(--paper)`) dan pola kisi-kisi milimeter halus (*graph paper grid*).
   - **Sidebar Hide & Sync Reveal**: Sidebar kanan (`SideNav`) disembunyikan di awal (`translate-x-[150%] opacity-0`).
   - **Bouncing Ball**: Bola hijau limau neon (`#D2F831`) jatuh dari atas layar dengan gravitasi nyata, menumbuk lantai tengah, terdeformasi lentur (*squash & stretch*), lalu memantul (*rebound*).
   - **Simultaneous Content Reveal**: Saat bola selesai memantul (~1050ms), bola menghilang lembut digantikan oleh teks utama tengah dan 7 kartu tugas floating, serta sidebar kanan meluncur masuk secara bersamaan dari kanan ke kiri (`translate-x-0 opacity-100`).
   - **Tipografi Bersih**: Teks sentral *"We make [digital] feel human."*, di mana kata `digital` berada di dalam badge blok hijau neon lime (`#d4ff00`), `feel` bergaya sans-serif bersih, dan `human.` bergaya serif miring (*italic*).
   - **7 Kartu Tugas Melayang (*Floating Task Cards*)**: Mengitari teks utama dengan sudut kemiringan dinamis (*negative tilt*) dan animasi mengapung (*idle 3D floating keyframes*):
     1. `Tubes Java OOP` • `DL - BESOK 08.00` (Ikon `<>`)
     2. `Analisis Regresi` • `DL - LUSA` (Ikon `📊`)
     3. `Bot Telegram` • `DL - 36 JAM` (Ikon `🤖`)
     4. `Tugas Mingguan` • `DL - 23.59` (Ikon `⏱`)
     5. `Dashboard Next.js` • `DL - 2 HARI` (Ikon `▤`)
     6. `Laporan Magang` • `DL - JUMAT` (Ikon `📋`)
     7. `ERD + DFD` • `DL - MALAM INI` (Ikon `🗄`)
   - **Scroll Pinning & PixelSwap Transition**: Hero section terkunci (`lenis.stop()`). Scroll ke bawah (wheel / touch swipe / panah keyboard) tidak menggeser halaman secara kasar, melainkan memicu efek transisi pixel dissolve **PixelSwap** menuju section `#about`. Setelah transisi selesai, halaman mendarat di `#about` dan scroll kembali normal.

2. **About Section — Morphing Text & Scroll Card Stacking**:
   - **MagicUI Morphing Text**: Teks *"ORANG DI BALIK INI"* muncul kata per kata dengan efek blur-morph menggunakan SVG filter `feColorMatrix` threshold.
   - **Scroll-Driven Card Stacking**: Section 320vh dengan sticky stage. Saat pengguna melakukan scroll:
     - Intro morphing text memudar keluar (*fade out*).
     - Kartu profil Lutfi naik dari bawah dan terkunci (*pinned*).
     - Kartu profil Lutfi meredup dan mundur ke belakang, disusul kartu profil Dimas yang naik menumpuk di depannya.
   - **3D Lanyard ID Badge**: Simulasi kartu identitas fisik 3D berayun mengikuti tarikan kursor dan gravitasi menggunakan Rapier physics.
   - **Three.js 3D Sculpture Modal**: Penampil patung 3D geometris interaktif dengan 3 pilihan mode (*Dual Synergy*, *Geodesic Core*, *Möbius Knot*).

3. **SideNav Floating Navigation**:
   - Navigasi terapung di sisi kanan layar dengan nomor urut section (`01 BERANDA`, `02 ANGGOTA`, `03 SKILLS`, `04 PROYEK`, `05 PRODUK`, `06 KONTAK`).
   - Efek hover *HyperText scramble* yang mengacak karakter huruf secara dinamis.
   - Deteksi posisi viewport otomatis untuk indikator garis aktif dan pembalik warna teks (*color inverter*) saat melintasi background gelap.
   - Tombol pengalih tema (Dark/Light mode) menggunakan komponen animasi `AnimatedThemeToggler`.

4. **Skills Bento Grid & Telemetry**:
   - Kartu keahlian berbasis Bento Grid dengan efek `SpotlightCard` (sorotan cahaya mengikuti posisi kursor).
   - Kartu Three.js dilengkapi kanvas interaktif `InteractiveWave`.
   - Badge telemetri dengan animasi dekripsi teks `DecryptedText` (*RUNTIME: CHROMIUM / V8*).
   - Filter domain keahlian (*ALL*, *CORE*, *FRAMEWORK*, *CREATIVE*, *SYSTEM*, *WORKFLOW*).

5. **Selected Projects & Digital Products**:
   - Showcase proyek pilihan dan produk digital dengan preview kartu interaktif, nomor seri, dan tag keahlian.
   - Klik kartu membuka modal dialog detail (*pop-up*) lengkap dengan penutup klik backdrop dan tombol `Escape`.

6. **Contact Section & Validasi Form**:
   - Formulir pesan langsung dengan validasi client-side (nama wajib, format email regex valid, isi pesan).
   - Indikator feedback pesan sukses terkirim dan state loading.

---

## Prasyarat Sistem

Sebelum menjalankan proyek di komputer lokal:

- **Node.js**: Versi `18.0.0` atau lebih baru (direkomendasikan LTS `20.x` atau `22.x`).
  - Cek versi: `node -v`
- **npm**: Versi `9.x` atau lebih baru.
  - Cek versi: `npm -v`
- **Git**: Untuk cloning repository.
  - Cek versi: `git --version`

---

## Panduan Menjalankan Proyek

### 1. Kloning Repository
```bash
git clone https://github.com/dimszyo/Tugas_2_DevX_Kelompok_1.git
```

### 2. Masuk ke Direktori Proyek
```bash
cd Tugas_2_DevX_Kelompok_1
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Server Lokal (Development)
```bash
npm run dev
```
Buka browser dan buka tautan:
```text
http://localhost:5173/
```

### 5. Memeriksa Kualitas Kode (Linting)
Gunakan Oxlint untuk mengecek kualitas dan potensi error kode (zero-warning):
```bash
npm run lint
```

### 6. Membangun Bundle Produksi (Production Build)
Untuk mengompilasi dan meminifikasi aset proyek ke dalam folder `dist/`:
```bash
npm run build
```

### 7. Meninjau Hasil Build Produksi (Preview)
Untuk menguji coba build produksi sebelum di-deploy:
```bash
npm run preview
```

---

## Struktur Direktori

Seluruh file yang tidak terpakai telah dibersihkan secara tuntas sehingga arsitektur proyek tetap ringkas, modular, dan bersih:

```text
Tugas_2_DevX_Kelompok_1/
├── public/                     # Aset statis publik
│   ├── dimas.jpeg              # Foto profil Dimas
│   └── lutfi.jpeg              # Foto profil Lutfi
│
├── src/
│   ├── assets/                 # Aset gambar & grafis
│   │
│   ├── components/             # Komponen UI modular
│   │   ├── ui/                 # Komponen efek mikro visual
│   │   │   ├── animated-theme-toggler.jsx # Toggle tema dengan animasi lingkaran
│   │   │   ├── DecryptedText.jsx          # Efek teks dekripsi hacker/telemetri
│   │   │   ├── InteractiveWave.jsx        # Gelombang matematika kanvas interaktif
│   │   │   └── SpotlightCard.jsx          # Kartu bento dengan spotlight cursor
│   │   ├── About.jsx           # Section About (morphing text + card stacking)
│   │   ├── About3D.jsx         # Penampil 3D Three.js sculpture viewer
│   │   ├── card.glb            # Model 3D ID Card untuk Lanyard
│   │   ├── Contact.jsx         # Section formulir & info kontak
│   │   ├── Footer.jsx          # Footer & copyright
│   │   ├── Hero.jsx            # Hero section (bouncing ball, task cards, PixelSwap)
│   │   ├── Lanyard.css         # Styling kanvas simulasi Lanyard
│   │   ├── Lanyard.jsx         # Simulasi fisika tali 3D Rapier
│   │   ├── lanyard.png         # Tekstur pita tali lanyard
│   │   ├── LightRays.jsx       # Shader berkas cahaya WebGL (OGL)
│   │   ├── Modal.jsx           # Reusable modal dialog detail
│   │   ├── Navbar.jsx          # Header navigasi
│   │   ├── PixelSwap.jsx       # Mesin transisi visual pixel dissolve
│   │   ├── ProductCard.jsx     # Kartu katalog produk digital
│   │   ├── ProjectCard.jsx     # Kartu showcase proyek pilihan
│   │   ├── SideNav.jsx         # Navigasi melayang kanan (HyperText scramble)
│   │   ├── SkillIcons.jsx      # Koleksi SVG ikon teknologi
│   │   ├── Skills.jsx          # Bento grid matriks keahlian
│   │   └── SmoothScroll.jsx    # Pembungkus Lenis smooth scroll
│   │
│   ├── data/                   # Data statis terstruktur
│   │   ├── products.js         # Data katalog produk digital
│   │   ├── projects.js         # Data showcase proyek
│   │   └── skills.js           # Data keahlian teknis
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx      # Layout utama (Navbar + Outlet + Footer + Modal)
│   │
│   ├── lib/
│   │   └── utils.js            # Helper cn() (clsx + tailwind-merge)
│   │
│   ├── pages/                  # Halaman rute React Router DOM
│   │   ├── AboutPage.jsx       # Halaman penuh About
│   │   ├── ContactPage.jsx     # Halaman penuh Contact
│   │   ├── Home.jsx            # Beranda utama (gabungan section)
│   │   ├── NotFound.jsx        # Halaman penanganan 404
│   │   ├── ProductsPage.jsx    # Halaman penuh Products
│   │   ├── ProjectsPage.jsx    # Halaman penuh Projects
│   │   └── SkillsPage.jsx      # Halaman penuh Skills
│   │
│   ├── App.css                 # Stylesheet utama & custom keyframes
│   ├── App.jsx                 # Root router & inisialisasi state
│   ├── index.css               # Reset font & CSS variables dasar
│   └── main.jsx                # Entry point ReactDOM React 19
│
├── components.json             # Konfigurasi shadcn UI
├── DESIGN.md                   # Pedoman desain visual, token & aturan gaya
├── jsconfig.json               # Konfigurasi path aliases editor (@/*)
├── package.json                # Daftar dependensi & npm scripts
├── package-lock.json           # Lockfile dependensi npm
├── PengerjaanKelompok.md       # Catatan pembagian kerja kelompok
├── PRD.md                      # Product Requirements Document
├── vercel.json                 # Konfigurasi rewrite SPA Vercel
├── vite.config.js              # Konfigurasi bundler Vite
└── README.md                   # Dokumentasi utama proyek
```

---

## Halaman & Routing

| Rute | Komponen Halaman | Deskripsi |
|---|---|---|
| `/` | `Home.jsx` | Landing page beranda utama yang menggabungkan seluruh section |
| `/about` | `AboutPage.jsx` | Halaman penuh profil anggota tim |
| `/skills` | `SkillsPage.jsx` | Halaman penuh matriks keahlian teknis |
| `/projects` | `ProjectsPage.jsx` | Halaman katalog showcase karya terpilih |
| `/products` | `ProductsPage.jsx` | Halaman katalog produk digital |
| `/contact` | `ContactPage.jsx` | Halaman formulir & kanal kontak |
| `*` | `NotFound.jsx` | Halaman 404 jika URL tidak ditemukan |

---

## Alur Kerja Git & Konvensi Commit

### Struktur Branch
- `main` — Branch utama produksi yang stabil dan terverifikasi lolos build.
- `feature/lutfi` — Branch pengembangan fitur untuk Lutfi (Components, Interaction, Modal, Form).
- `feature/dimas` — Branch pengembangan fitur untuk Dimas (Visual, Layout, Theme, 3D).

### Format Pesan Commit
Format commit mengacu pada aturan *Conventional Commits*:
- `feat: <deskripsi>` — Penambahan fitur atau komponen baru.
- `fix: <deskripsi>` — Perbaikan bug atau penyesuaian fungsi.
- `style: <deskripsi>` — Penyesuaian estetika, spacing, tata letak, atau tipografi.
- `refactor: <deskripsi>` — Pembersihan atau restrukturisasi kode tanpa mengubah perilaku.
- `docs: <deskripsi>` — Pembaruan dokumentasi proyek (`README.md`, `DESIGN.md`, dll.).

---

## Konfigurasi Deployment

Aplikasi siap di-deploy secara otomatis ke platform **Vercel**. Berkas `vercel.json` telah dikonfigurasi untuk menangani rewrite rute client-side SPA agar URL langsung (seperti `/projects`, `/about`, `/contact`) tidak mengalami error `404 Not Found`:

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

---

## Lisensi

Proyek ini dibuat untuk keperluan tugas akademik mata kuliah DevX Kelompok 1.
