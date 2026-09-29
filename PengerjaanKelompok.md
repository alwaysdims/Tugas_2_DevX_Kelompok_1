# Pengerjaan Kelompok

## Duo Portfolio

Website portfolio dibuat menggunakan ReactJS, Vite, Tailwind CSS, React Router DOM, dan komponen/motion dari React Bits.

---

# 1. Anggota Kelompok

| No | Nama  | NIM        | Role                                          |
| -- | ----- | ---------- | --------------------------------------------- |
| 1  | Lutfi | 2604140069 | Frontend Developer — Interaction & Components |
| 2  | Dimas | 2605090004 | Frontend Developer — Visual & Layout          |

---

# 2. Pembagian Pengerjaan

Pengerjaan dibagi secara merata.

Kedua anggota memiliki tanggung jawab dalam:

* Coding
* Component development
* UI implementation
* Responsive design
* Testing
* Debugging
* GitHub
* Documentation

Tidak ada anggota yang hanya bertanggung jawab terhadap dokumentasi.

---

# 3. Pengerjaan Lutfi

## Role

**Frontend Developer — Interaction & Components**

Lutfi bertanggung jawab terhadap project, product, interaction, contact, dan beberapa reusable component.

### A. Projects

Tugas:

* Membuat Projects section.
* Membuat project card.
* Membuat project data.
* Membuat hover interaction.
* Membuat project detail interaction.
* Membuat responsive project grid.

File:

```text
src/components/ProjectCard.jsx
src/pages/ProjectsPage.jsx
src/data/projects.js
```

---

### B. Products

Tugas:

* Membuat Products section.
* Membuat ProductCard.
* Membuat product data.
* Membuat hover interaction.
* Membuat responsive product layout.

File:

```text
src/components/ProductCard.jsx
src/pages/ProductsPage.jsx
src/data/products.js
```

---

### C. Modal

Tugas:

* Membuat reusable Modal.
* Membuat open / close state.
* Membuat conditional rendering.
* Membuat project/product detail.
* Membuat close interaction.

File:

```text
src/components/Modal.jsx
```

---

### D. Contact

Tugas:

* Membuat Contact section/page.
* Membuat contact information.
* Membuat contact form.
* Membuat local validation.
* Membuat error state.
* Membuat submit interaction.
* Membuat responsive contact section.

File:

```text
src/components/Contact.jsx
src/pages/ContactPage.jsx
```

---

### E. Footer

Tugas:

* Membuat Footer.
* Membuat social links.
* Membuat copyright.
* Membuat responsive footer.

File:

```text
src/components/Footer.jsx
```

---

### F. Interaction

Lutfi juga bertanggung jawab terhadap beberapa interaction:

* Modal animation.
* Project hover.
* Product hover.
* Button interaction.
* Contact form interaction.
* Micro interaction menggunakan React Bits.

---

# 4. Pengerjaan Dimas

## Role

**Frontend Developer — Visual & Layout**

Dimas bertanggung jawab terhadap visual utama website, layout, navigation, hero, about, dan skills.

### A. Navbar

Tugas:

* Membuat struktur Navbar.
* Membuat desktop navigation.
* Membuat mobile navigation.
* Membuat responsive hamburger menu.
* Membuat active navigation state.
* Membantu implementasi theme toggle.

File:

```text
src/components/Navbar.jsx
```

---

### B. Hero Section

Tugas:

* Membuat Hero section.
* Membuat typography utama.
* Membuat CTA.
* Mengatur whitespace.
* Mengimplementasikan motion ringan.
* Membuat responsive Hero.
* Menggunakan React Bits jika sesuai.

File:

```text
src/components/Hero.jsx
```

---

### C. About

Tugas:

* Membuat About section/page.
* Menampilkan identitas Lutfi dan Dimas.
* Membuat layout profile.
* Mengatur visual hierarchy.
* Membuat responsive layout.

File:

```text
src/components/About.jsx
src/pages/AboutPage.jsx
src/data/members.js
```

---

### D. Skills

Tugas:

* Membuat Skills section.
* Menampilkan daftar skill.
* Membuat layout skill.
* Mengimplementasikan hover/motion.
* Membuat responsive skill layout.

File:

```text
src/components/Skills.jsx
src/pages/SkillsPage.jsx
src/data/skills.js
```

---

### E. Visual System

Dimas bertanggung jawab membantu menjaga konsistensi:

* Color palette.
* Typography.
* Spacing.
* Grid.
* Responsive breakpoint.
* Visual hierarchy.
* Whitespace.
* Visual consistency.

---

### F. Motion & Visual Effects

Dimas bertanggung jawab terhadap motion yang berhubungan dengan visual utama:

* Hero text animation.
* Scroll reveal.
* Typography animation.
* Navigation transition.
* Subtle background effect.
* React Bits visual component.

Motion harus tetap mengikuti prinsip:

> **Visual → Whitespace → Typography → Motion Halus → Informasi Singkat**

---

# 5. Pengerjaan Bersama

Walaupun masing-masing memiliki bagian utama, beberapa bagian dikerjakan bersama.

## React Setup

Bersama:

* Vite setup.
* React setup.
* Tailwind CSS.
* React Router DOM.
* Folder structure.

---

## MainLayout

Bersama:

```text
src/layouts/MainLayout.jsx
```

Struktur:

```text
Navbar
   ↓
Outlet
   ↓
Footer
```

---

## App Routing

Bersama:

```text
src/App.jsx
```

Routing:

```text
/
 /about
 /skills
 /projects
 /products
 /contact
 /*
```

---

## Home

Halaman Home dikerjakan bersama karena menjadi halaman utama yang menggabungkan berbagai component.

Struktur:

```text
Home
│
├── Hero
├── About Preview
├── Skills Preview
├── Projects Preview
├── Products Preview
└── Contact CTA
```

Dimas bertanggung jawab terhadap visual/layout.

Lutfi bertanggung jawab terhadap component interaction yang digunakan di dalam Home.

---

# 6. Responsive Testing

Kedua anggota melakukan testing pada:

### Mobile

```text
320px
375px
390px
430px
```

### Desktop

```text
1024px
1280px
1440px
1920px
```

Testing meliputi:

* Navbar
* Hero
* About
* Skills
* Projects
* Products
* Contact
* Footer
* Modal
* Animation
* Typography
* Overflow

---

# 7. GitHub

Kedua anggota memiliki kontribusi langsung pada repository.

Branch:

### Lutfi

```text
feature/lutfi
```

### Dimas

```text
feature/dimas
```

### Main

```text
main
```

Alur:

```text
feature/lutfi
       │
       ▼
     review
       │
       ▼
      main


feature/dimas
       │
       ▼
     review
       │
       ▼
      main
```

---

# 8. Commit Convention

Commit menggunakan format:

```text
feat:
fix:
style:
refactor:
docs:
```

### Contoh commit Lutfi

```text
feat: create project card
feat: add projects page
feat: add products section
feat: create project modal
feat: add contact form
style: improve project hover interaction
fix: fix modal responsive layout
```

### Contoh commit Dimas

```text
feat: create responsive navbar
feat: add hero section
style: improve typography system
feat: create about section
feat: add skills section
style: improve hero animation
fix: fix mobile navigation
```

---

# 9. Dokumentasi

Dokumentasi dikerjakan bersama.

File:

```text
README.md
PRD.md
PengerjaanKelompok.md
```

### Lutfi

Bertanggung jawab terhadap dokumentasi:

* Component interaction.
* Project feature.
* Product feature.
* Modal.
* Contact.
* Technical implementation.

### Dimas

Bertanggung jawab terhadap dokumentasi:

* Design system.
* Visual direction.
* Typography.
* Color palette.
* Layout.
* Motion direction.

Keduanya melakukan final review dokumentasi.

---

# 10. Pembagian File

## Lutfi

```text
src/
├── components/
│   ├── ProjectCard.jsx
│   ├── ProductCard.jsx
│   ├── Modal.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── ProjectsPage.jsx
│   ├── ProductsPage.jsx
│   └── ContactPage.jsx
│
└── data/
    ├── projects.js
    └── products.js
```

---

## Dimas

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   └── Skills.jsx
│
├── pages/
│   ├── AboutPage.jsx
│   └── SkillsPage.jsx
│
└── data/
    ├── members.js
    └── skills.js
```

---

# 11. Pengerjaan Bersama

```text
src/
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Home.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── main.jsx
└── index.css

README.md
PRD.md
PengerjaanKelompok.md
vercel.json
```

---

# 12. Testing

Testing dilakukan bersama.

Checklist:

* [ ] Navbar bekerja.
* [ ] Mobile menu bekerja.
* [ ] Semua route dapat dibuka.
* [ ] Project card bekerja.
* [ ] Product card bekerja.
* [ ] Modal dapat dibuka.
* [ ] Modal dapat ditutup.
* [ ] Contact form bekerja.
* [ ] Validation bekerja.
* [ ] Theme toggle bekerja.
* [ ] Footer tampil.
* [ ] 404 page bekerja.
* [ ] Mobile responsive.
* [ ] Tablet responsive.
* [ ] Desktop responsive.
* [ ] Tidak terdapat horizontal overflow.
* [ ] Tidak terdapat console error.
* [ ] Animation berjalan dengan smooth.
* [ ]
