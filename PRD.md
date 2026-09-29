# Product Requirements Document

# Duo Portfolio

**Project Type:** Personal / Team Portfolio Website
**Development:** ReactJS + Vite
**Styling:** Tailwind CSS
**Routing:** React Router DOM
**Component Reference:** React Bits
**Deployment:** Vercel
**Version:** 1.0
**Year:** 2026

---

# 1. Project Overview

Duo Portfolio adalah website portfolio yang dibuat oleh dua mahasiswa, **Lutfi** dan **Dimas**, untuk menampilkan identitas, kemampuan, project, dan produk digital yang telah atau sedang dikembangkan.

Website tidak dirancang seperti portfolio konvensional yang penuh dengan paragraf dan informasi.

Konsep utama website adalah:

> **Visual → Whitespace → Typography → Motion Halus → Informasi Singkat**

Website harus terasa modern, premium, minimal, dan memiliki pengalaman visual yang kuat.

Pengunjung tidak perlu membaca banyak teks untuk memahami siapa pembuat website dan apa yang mereka kerjakan.

Informasi penting akan disampaikan menggunakan:

* Typography yang kuat
* Visual hierarchy
* Image
* Grid
* Spacing
* Motion
* Micro interaction
* Interactive components

---

# 2. Design Direction

## Awwwards-Inspired

Referensi visual utama berasal dari karakteristik website portfolio modern yang umum ditemukan pada Awwwards.

Website tidak meniru website tertentu.

Prinsip desain yang digunakan:

* Minimalist
* Editorial
* Creative developer
* Large typography
* Generous whitespace
* Strong visual hierarchy
* Smooth transition
* Subtle animation
* Interactive elements
* Asymmetric layout
* Clean grid
* High-quality imagery

---

# 3. Core Design Philosophy

## Visual First

Visual menjadi elemen utama website.

Pengunjung harus dapat memahami identitas portfolio hanya dengan melihat:

* Typography
* Warna
* Layout
* Project preview
* Animation

Tanpa harus membaca paragraf panjang.

---

## Whitespace

Whitespace digunakan secara luas agar setiap section memiliki ruang bernapas.

Website tidak boleh terasa padat.

Setiap section harus memiliki spacing yang cukup antara:

```text
Heading
↓
Description
↓
Content
```

---

## Typography

Typography menjadi salah satu elemen visual utama.

Heading menggunakan ukuran besar dan memiliki hierarchy yang jelas.

Contoh:

```text
WE
BUILD
DIGITAL
EXPERIENCES.
```

Body text dibuat singkat.

Contoh:

> Two developers creating digital experiences.

---

## Motion

Motion digunakan untuk meningkatkan pengalaman pengguna, bukan sebagai dekorasi berlebihan.

Animasi harus:

* Smooth
* Cepat
* Subtle
* Tidak mengganggu readability
* Tidak memperlambat website

---

## Information

Informasi yang ditampilkan harus singkat dan langsung.

Hindari:

* Paragraf panjang
* Penjelasan berulang
* Section yang terlalu banyak
* Text decoration yang tidak memiliki fungsi

---

# 4. Color System

Website menggunakan color palette yang telah ditentukan.

| Role             | Color            | Hex       |
| ---------------- | ---------------- | --------- |
| Main Background  | Warm Cream       | `#FCF9EA` |
| Text / Structure | Charcoal Black   | `#1C1E1F` |
| Accent / CTA     | Deep Forest Teal | `#134E4A` |

Komposisi visual:

```text
50% → #FCF9EA
30% → #1C1E1F
20% → #134E4A
```

## Warm Cream

Digunakan sebagai:

* Background utama
* Section background
* Space / whitespace

## Charcoal Black

Digunakan sebagai:

* Heading
* Body text
* Navigation
* Border
* Structural element

## Deep Forest Teal

Digunakan sebagai:

* CTA
* Hover
* Active state
* Highlight
* Accent
* Interactive element

---

# 5. Target User

Website ditujukan kepada:

* Dosen
* Recruiter
* Client
* Developer
* Designer
* Teman sesama mahasiswa
* Pengunjung umum

---

# 6. Website Structure

Website terdiri dari beberapa section utama:

```text
Navbar
   ↓
Hero
   ↓
About
   ↓
Skills
   ↓
Projects
   ↓
Products
   ↓
Contact
   ↓
Footer
```

---

# 7. Navbar

Navbar harus minimal dan clean.

Content:

```text
DUO
PORTFOLIO

About
Skills
Projects
Products
Contact
```

Pada desktop:

* Logo kiri
* Navigation kanan

Pada mobile:

* Logo kiri
* Hamburger kanan

Mobile menu menggunakan animation yang halus.

---

# 8. Hero Section

Hero menjadi visual utama website.

Hero tidak menggunakan paragraf panjang.

Contoh struktur:

```text
DIGITAL
CREATORS
& DEVELOPERS

Lutfi × Dimas

[Explore Work]
```

Alternatif copy:

> We build digital experiences.

Hero menggunakan:

* Large typography
* Generous whitespace
* Subtle motion
* Decorative visual
* Cursor interaction jika sesuai

CTA:

```text
Explore Work
```

---

# 9. About Section

About dibuat singkat.

Contoh:

```text
ABOUT

Two minds.
One digital space.

We are Lutfi & Dimas —
students building digital products
through code and design.
```

Informasi utama:

* Nama
* Role
* Short description
* Small visual / photo

Tidak menggunakan biography panjang.

---

# 10. Skills Section

Skills ditampilkan secara visual.

Tidak menggunakan daftar panjang.

Contoh:

```text
SKILLS

React
JavaScript
Tailwind
UI / UX
Git
Figma
```

Skills dapat menggunakan:

* Animated text
* Hover interaction
* Marquee
* Magnetic interaction
* Stagger animation

Jika menggunakan React Bits, efek harus tetap ringan.

---

# 11. Projects Section

Projects menjadi salah satu section utama.

Layout menggunakan visual project sebagai fokus utama.

Contoh:

```text
SELECTED
PROJECTS
```

Kemudian project ditampilkan menggunakan card besar.

Contoh:

```text
┌───────────────────────────────┐
│                               │
│       PROJECT IMAGE           │
│                               │
├───────────────────────────────┤
│ School System                 │
│ React · Laravel               │
└───────────────────────────────┘
```

Project card dapat menggunakan:

* Image reveal
* Hover scale
* Cursor interaction
* Smooth transition

Informasi yang ditampilkan:

* Project name
* Category
* Technology
* Short description

Tidak menampilkan deskripsi panjang.

---

# 12. Products Section

Products digunakan untuk menampilkan produk digital atau karya yang dapat digunakan.

Contoh:

```text
PRODUCTS

01  UI Kit
02  Website Template
03  Digital Tool
```

Setiap product hanya menampilkan informasi penting.

Contoh:

```text
UI KIT
Interface components for modern websites.

[View]
```

Section ini dapat menggunakan layout horizontal atau editorial grid.

---

# 13. Contact Section

Contact dibuat sebagai closing statement.

Bukan form yang terlalu besar.

Contoh:

```text
HAVE AN IDEA?

LET'S BUILD
SOMETHING.

hello@example.com

[Get In Touch]
```

Contact information:

* Email
* GitHub
* Instagram
* LinkedIn

Contact form bersifat sederhana apabila digunakan.

Field:

```text
Name
Subject
Message
```

Validasi dilakukan menggunakan React state.

Karena website bersifat static, form tidak membutuhkan backend.

---

# 14. Footer

Footer dibuat minimal.

Contoh:

```text
DUO PORTFOLIO

Lutfi × Dimas

GitHub
Instagram
LinkedIn

© 2026
```

Footer tidak menggunakan informasi berlebihan.

---

# 15. React Bits

React Bits digunakan sebagai referensi utama untuk komponen visual dan motion.

Komponen React Bits yang dapat digunakan:

* Text animations
* Blur text
* Split text
* Animated cursor
* Magnetic buttons
* Spotlight
* Marquee
* Image reveal
* Card hover
* Gradient effects
* Scroll animation

Tidak semua efek harus digunakan.

Prinsip:

> **One interaction should have one purpose.**

Jika sebuah animation tidak meningkatkan UX atau visual hierarchy, animation tersebut tidak digunakan.

---

# 16. Motion Guidelines

Motion harus memiliki karakter:

### Duration

Umumnya:

```text
200ms – 500ms
```

Untuk transition sederhana.

Scroll animation dapat menggunakan durasi yang sedikit lebih panjang.

---

### Easing

Gunakan easing yang smooth.

Contoh:

```text
ease-out
ease-in-out
```

---

### Hover

Hover digunakan untuk:

* Button
* Project card
* Navigation
* Social link
* Product

Hover tidak boleh menyebabkan layout bergeser secara berlebihan.

---

# 17. Responsive Design

Website wajib responsive.

## Mobile

Layout:

```text
Navbar
↓
Hero
↓
About
↓
Skills
↓
Projects
↓
Products
↓
Contact
↓
Footer
```

Karakter:

* Single column
* Large typography tetapi disesuaikan
* Hamburger navigation
* Touch-friendly button
* Reduced animation jika diperlukan

---

## Desktop

Layout dapat menggunakan:

* Grid
* Two-column layout
* Asymmetric layout
* Large typography
* Horizontal composition

---

# 18. Component Architecture

Minimal component:

```text
Navbar
Hero
SectionTitle
About
Skills
ProjectCard
ProductCard
Contact
Footer
ThemeToggle
```

Component tambahan dapat digunakan apabila diperlukan.

---

# 19. Props

Data tidak ditulis berulang di dalam component.

Contoh:

```jsx
<ProjectCard
    title="School Information System"
    category="Web Development"
    image="/images/projects/school.jpg"
    technologies={["React", "Laravel"]}
/>
```

Project card harus bersifat reusable.

Hal yang sama diterapkan pada:

* Project
* Product
* Skill
* Member

---

# 20. State

Minimal tiga state React digunakan.

## Mobile Navigation

```jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

## Project / Product Modal

```jsx
const [selectedItem, setSelectedItem] = useState(null);
```

## Theme

```jsx
const [darkMode, setDarkMode] = useState(false);
```

State dapat dikembangkan sesuai kebutuhan UI.

---

# 21. Event Handling

Website menggunakan event handling seperti:

```text
onClick
onChange
onSubmit
onMouseEnter
onMouseLeave
```

Contoh penggunaan:

* Open mobile menu
* Close mobile menu
* Open project detail
* Close modal
* Toggle theme
* Form input
* Form submit
* Hover interaction

---

# 22. Conditional Rendering

Conditional rendering digunakan untuk:

* Mobile navigation
* Modal
* Form validation message
* Dark/light theme
* Interactive content

Contoh:

```jsx
{selectedItem && (
    <Modal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
    />
)}
```

---

# 23. Routing

Website menggunakan React Router DOM.

Route:

| Route       | Page     |
| ----------- | -------- |
| `/`         | Home     |
| `/about`    | About    |
| `/skills`   | Skills   |
| `/projects` | Projects |
| `/products` | Products |
| `/contact`  | Contact  |
| `*`         | NotFound |

Walaupun beberapa section dapat berada dalam halaman utama, setiap menu utama tetap memiliki route/page yang jelas sesuai requirement project.

---

# 24. Folder Structure

```text
duo-portfolio/
│
├── public/
│   ├── images/
│   │   ├── profile/
│   │   │   ├── lutfi.jpg
│   │   │   └── dimas.jpg
│   │   │
│   │   ├── projects/
│   │   │   ├── project-01.jpg
│   │   │   ├── project-02.jpg
│   │   │   └── project-03.jpg
│   │   │
│   │   └── products/
│   │       ├── product-01.jpg
│   │       └── product-02.jpg
│   │
│   └── favicon.svg
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeToggle.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AboutPage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFound.jsx
│   │
│   ├── data/
│   │   ├── members.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── products.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── README.md
├── PRD.md
├── PengerjaanKelompok.md
├── vercel.json
├── package.json
├── vite.config.js
└── index.html
```

---

# 25. File Responsibilities

## `Navbar.jsx`

Mengatur:

* Navigation
* Mobile menu
* Active state
* Theme toggle

---

## `Hero.jsx`

Mengatur:

* Main heading
* CTA
* Hero animation

---

## `About.jsx`

Mengatur:

* Short introduction
* Member information
* Visual identity

---

## `Skills.jsx`

Mengatur:

* Skills list
* Skill animation
* Hover interaction

---

## `ProjectCard.jsx`

Mengatur:

* Project image
* Project title
* Category
* Technology
* Hover state

---

## `ProductCard.jsx`

Mengatur:

* Product image
* Product title
* Description
* CTA

---

## `Modal.jsx`

Mengatur detail:

* Project
* Product

---

## `Contact.jsx`

Mengatur:

* Contact information
* Contact form
* Local validation

---

## `Footer.jsx`

Mengatur:

* Social links
* Copyright
* Closing branding

---

# 26. Data Structure

## `members.js`

```js
export const members = [
  {
    id: 1,
    name: "Lutfi",
    nim: "2604140069",
    role: "Developer",
    image: "/images/profile/lutfi.jpg"
  },
  {
    id: 2,
    name: "Dimas",
    nim: "2605090004",
    role: "Developer",
    image: "/images/profile/dimas.jpg"
  }
];
```

---

## `skills.js`

```js
export const skills = [
  "JavaScript",
  "React",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "Figma"
];
```

---

## `projects.js`

```js
export const projects = [
  {
    id: 1,
    title: "Project One",
    category: "Web Development",
    description: "Short project description.",
    image: "/images/projects/project-01.jpg",
    technologies: ["React", "Tailwind"]
  },
  {
    id: 2,
    title: "Project Two",
    category: "Web Development",
    description: "Short project description.",
    image: "/images/projects/project-02.jpg",
    technologies: ["React", "JavaScript"]
  }
];
```

---

## `products.js`

```js
export const products = [
  {
    id: 1,
    title: "Product One",
    description: "Short product description.",
    image: "/images/products/product-01.jpg"
  },
  {
    id: 2,
    title: "Product Two",
    description: "Short product description.",
    image: "/images/products/product-02.jpg"
  }
];
```

---

# 27. Semantic HTML

Website menggunakan semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Tujuannya meningkatkan:

* Accessibility
* SEO
* Struktur HTML
* Maintainability

---

# 28. Performance

Karena website berfokus pada visual dan animation, performance harus tetap diperhatikan.

Ketentuan:

* Image menggunakan ukuran yang sesuai.
* Hindari animation berlebihan.
* Gunakan lazy loading pada image yang diperlukan.
* Jangan menggunakan library animation yang tidak diperlukan.
* Component harus reusable.
* Hindari rendering yang tidak diperlukan.

---

# 29. Accessibility

Website harus memiliki:

* Alt text pada image.
* Button dengan label yang jelas.
* Link yang memiliki tujuan jelas.
* Kontras warna yang cukup.
* Keyboard-friendly navigation.
* Focus state.

---

# 30. Deployment

Website di-deploy menggunakan Vercel.

File:

```text
vercel.json
```

Configuration:

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

Tujuannya agar React Router tetap dapat bekerja ketika route di-refresh.

---

# 31. Git Workflow

Repository menggunakan GitHub.

Branch:

```text
main
```

Feature branch:

```text
feature/lutfi
feature/dimas
```

Commit menggunakan format:

```text
feat:
fix:
style:
refactor:
docs:
```

Contoh:

```text
feat: create hero section
feat: add project cards
style: improve responsive layout
feat: add mobile navigation
fix: fix project modal
docs: update project documentation
```

---

# 32. Team Members

## Lutfi

NIM:

`2604140069`

Role:

Frontend Developer / Visual Implementation

---

## Dimas

NIM:

`2605090004`

Role:

Frontend Developer / Interaction & Component Implementation

---

# 33. AI Usage

AI digunakan sebagai development assistant.

AI dapat digunakan untuk:

* Brainstorming
* Membantu memahami React
* Debugging
* Membantu struktur component
* Membantu dokumentasi
* Membantu mencari solusi teknis

AI tidak digunakan untuk menggantikan pemahaman anggota terhadap source code.

Setiap anggota wajib memahami kode yang digunakan dalam project.

AI yang digunakan:

* ChatGPT
* React Bits sebagai referensi komponen dan motion

---

# 34. Success Criteria

Project dianggap selesai apabila:

* [x] ReactJS + Vite digunakan.
* [x] Tailwind CSS digunakan.
* [x] React Router DOM digunakan.
* [x] Navbar tersedia.
* [x] Hero tersedia.
* [x] About tersedia.
* [x] Skills tersedia.
* [x] Projects tersedia.
* [x] Products tersedia.
* [x] Contact tersedia.
* [x] Footer tersedia.
* [x] Minimal 6 reusable components tersedia.
* [x] Props digunakan.
* [x] Data menggunakan array.
* [x] `.map()` digunakan.
* [x] Minimal 3 `useState` digunakan.
* [x] Event handling digunakan.
* [x] Conditional rendering digunakan.
* [x] Mobile responsive.
* [x] Desktop responsive.
* [x] 404 page tersedia.
* [x] Modal tersedia.
* [x] Mobile navigation tersedia.
* [x] Theme toggle tersedia.
* [x] `README.md` tersedia.
* [x] `PengerjaanKelompok.md` tersedia.
* [x] `PRD.md` tersedia.
* [ ] `vercel.json` tersedia.
* [ ] Website berhasil di-deploy ke Vercel.

---

# 35. Final Design Principle

Seluruh keputusan desain harus mengikuti urutan prioritas:

## 01 — VISUAL

Visual menjadi first impression.

## 02 — WHITESPACE

Berikan ruang agar desain tidak terasa penuh.

## 03 — TYPOGRAPHY

Gunakan typography sebagai elemen visual utama.

## 04 — MOTION HALUS

Gunakan animation untuk meningkatkan pengalaman.

## 05 — INFORMASI SINGKAT

Tampilkan hanya informasi yang benar-benar diperlukan.

> **Less information. More visual impact.**
