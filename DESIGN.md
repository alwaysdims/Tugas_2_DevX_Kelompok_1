# DESIGN SYSTEM — DUO PORTFOLIO

> Dokumen ini adalah pedoman visual utama untuk seluruh project Duo Portfolio.
>
> Semua implementasi UI, komponen, halaman, animasi, dan responsive layout harus mengikuti aturan di dokumen ini agar desain tetap konsisten.

---

## 1. Design Direction

### Visual Concept

Project menggunakan pendekatan:

**Minimalist — Editorial — Premium — Digital**

Referensi visual mengarah pada website portfolio modern bergaya Awwwards, tetapi **tidak menyalin layout atau desain website tertentu**.

Prioritas visual:

```text
Visual
   ↓
Whitespace
   ↓
Typography
   ↓
Motion Halus
   ↓
Informasi Singkat
```

Website harus terasa:

* bersih
* modern
* profesional
* premium
* tenang
* memiliki ruang kosong yang cukup
* visual-first
* tidak penuh dekorasi
* tidak terlalu banyak teks
* tidak terlalu banyak animasi

### Prinsip Utama

> **Less UI, More Visual Impact.**

Jangan menambahkan elemen hanya karena "bisa dibuat".

Setiap elemen harus memiliki alasan visual atau fungsional.

---

# 2. Color System

## Primary Palette

### 50% — Background

```text
#FFFFFF
```

**Nama:** Pure White

Digunakan untuk:

* body background
* section background
* card background utama
* input background
* navigation background
* whitespace

Karakter:

* bersih
* ringan
* minimal
* memberikan ruang pada typography dan visual

---

### 30% — Structure & Text

```text
#1C1E1F
```

**Nama:** Charcoal Black

Digunakan untuk:

* heading
* body text
* navigation text
* footer
* border utama
* icon
* label
* metadata
* typography utama

Hindari penggunaan:

```text
#000000
```

sebagai warna utama.

Gunakan:

```text
#1C1E1F
```

agar tampilan terasa lebih soft dan premium.

---

### 20% — Accent

```text
#134E4A
```

**Nama:** Deep Forest Teal

Digunakan untuk:

* primary CTA
* active navigation
* accent text
* badge
* skill tag
* hover state tertentu
* border aktif
* interactive element
* highlight
* selected state

Accent tidak boleh memenuhi seluruh halaman.

Gunakan sebagai:

> **Visual emphasis, bukan visual dominance.**

---

# 3. Supporting Colors

Selain tiga warna utama, boleh menggunakan turunan warna untuk meningkatkan usability.

### Soft Surface

```text
#F7F7F5
```

Digunakan untuk:

* card alternatif
* section yang membutuhkan pemisah
* input
* hover background
* secondary surface

Tujuannya bukan menjadi warna brand baru, tetapi memberikan sedikit pemisahan dari background putih.

---

### Soft Border

Gunakan charcoal dengan opacity.

```css
border-color: rgb(28 30 31 / 12%);
```

Untuk border yang lebih jelas:

```css
border-color: rgb(28 30 31 / 20%);
```

Jangan menggunakan border hitam pekat pada semua komponen.

---

### Muted Text

Gunakan charcoal dengan opacity.

```css
color: rgb(28 30 31 / 60%);
```

Untuk metadata yang lebih ringan:

```css
color: rgb(28 30 31 / 45%);
```

---

### Accent Soft

Gunakan teal dengan opacity untuk background subtle.

```css
background: rgb(19 78 74 / 8%);
```

Contoh penggunaan:

* skill badge
* active state
* selected card
* subtle highlight

---

# 4. Color Usage Rule

Jangan menerapkan aturan:

```text
50% putih
30% charcoal
20% teal
```

secara literal pada setiap section.

Angka tersebut adalah **arah visual**, bukan perhitungan pixel.

Prioritas sebenarnya:

```text
WHITE
█████████████████████████

CHARCOAL
██████████████

TEAL
██████
```

Teal harus menjadi warna yang paling jarang digunakan.

Jika seluruh halaman terlihat hijau/teal:

> penggunaan accent terlalu banyak.

Jika seluruh halaman hanya putih dan hitam:

> gunakan sedikit teal untuk memberikan visual anchor.

---

# 5. Typography

Typography adalah salah satu elemen utama desain.

Jangan menggunakan terlalu banyak jenis font.

## Font Structure

Gunakan maksimal:

```text
1 Font Family
2–4 Weight
```

Rekomendasi:

### Primary Font

Gunakan font sans-serif modern seperti:

* Inter
* Geist
* Manrope
* Plus Jakarta Sans

Prioritas:

```text
Geist / Inter / Manrope
```

Jangan menggunakan font dekoratif sebagai font utama.

---

# 6. Typography Hierarchy

## Display / Hero

Hero harus menjadi typography paling besar di halaman.

Contoh:

```text
WE BUILD
DIGITAL
EXPERIENCES.
```

Karakter:

* sangat besar
* bold
* tight line-height
* sedikit letter spacing
* maksimal beberapa baris

Jangan membuat paragraf panjang di Hero.

---

## H1

```text
font-size: clamp(3rem, 8vw, 8rem);
font-weight: 700–800;
line-height: 0.9–1;
```

---

## H2

```text
font-size: clamp(2rem, 5vw, 5rem);
font-weight: 700;
line-height: 0.95–1.05;
```

---

## H3

```text
font-size: clamp(1.25rem, 2vw, 2rem);
font-weight: 600–700;
```

---

## Body

```text
font-size: 1rem;
line-height: 1.6;
```

Body text harus mudah dibaca.

---

## Small / Metadata

Digunakan untuk:

* category
* year
* technology
* role
* NIM
* label

Contoh:

```text
PROJECT / 2026
```

Karakter:

* uppercase
* small
* letter spacing
* muted color

---

# 7. Typography Rules

### DO

Gunakan kontras:

```text
BIG TITLE

Small metadata
```

Gunakan:

```text
large heading
+
short description
```

### DON'T

Jangan membuat:

```text
Heading
Subheading
Paragraph panjang
Paragraph panjang
Paragraph panjang
Button
Button
Button
```

secara berurutan tanpa whitespace.

---

# 8. Whitespace

Whitespace adalah bagian penting dari desain.

Jangan takut menggunakan ruang kosong.

Gunakan spacing besar antar section.

Contoh:

```text
Section
        ↓

        whitespace

        ↓

Next Section
```

Recommended section spacing:

```text
py-20
py-24
py-32
py-40
```

Untuk desktop, beberapa section dapat menggunakan:

```text
py-40
py-48
```

Namun jangan semua section menggunakan spacing maksimal.

Spacing harus mengikuti hierarchy.

---

# 9. Layout System

Gunakan layout berbasis:

```text
Container
Grid
Flex
Whitespace
```

Recommended max-width:

```text
max-width: 1440px
```

Content width:

```text
max-width: 1200px
```

Text width:

```text
max-width: 650px
```

Jangan membuat paragraf memenuhi seluruh layar.

---

# 10. Grid

Gunakan grid untuk:

* Projects
* Products
* Skills
* About
* Member profiles

Desktop:

```text
12-column mindset
```

Contoh:

```text
┌──────────────┬──────────────┐
│              │              │
│   Project    │   Project    │
│              │              │
└──────────────┴──────────────┘
```

Mobile:

```text
┌─────────────────────┐
│       Project       │
└─────────────────────┘

┌─────────────────────┐
│       Project       │
└─────────────────────┘
```

---

# 11. Border

Gunakan border tipis.

Default:

```css
border: 1px solid rgb(28 30 31 / 12%);
```

Active:

```css
border: 1px solid #134E4A;
```

Jangan menggunakan:

```css
border: 3px solid black;
```

kecuali memang diperlukan untuk elemen tertentu.

---

# 12. Border Radius

Gunakan radius secara konsisten.

Rekomendasi:

```text
small element:
8px

card:
16px

large visual:
20px

button:
9999px atau 10–12px
```

Jangan setiap elemen menggunakan radius berbeda tanpa alasan.

Untuk visual editorial yang lebih premium, beberapa image/card dapat menggunakan:

```text
0px
```

atau radius kecil.

Tidak semua elemen harus rounded.

---

# 13. Button System

## Primary Button

Warna:

```text
Background: #134E4A
Text: #FFFFFF
```

Contoh:

```text
LET'S TALK →
```

Karakter:

* simple
* tegas
* tidak terlalu besar
* memiliki hover transition

---

## Secondary Button

Background:

```text
transparent
```

Border:

```text
#1C1E1F
```

Text:

```text
#1C1E1F
```

Hover dapat berubah menjadi:

```text
background: #1C1E1F
color: #FFFFFF
```

---

# 14. Navigation

Navbar harus:

* minimal
* clean
* tidak terlalu tinggi
* mudah dibaca
* responsive
* memiliki active state

Desktop:

```text
LOGO                         ABOUT
                             SKILLS
                             PROJECTS
                             PRODUCTS
                             CONTACT
```

Mobile:

```text
LOGO                    MENU
```

Mobile menu menggunakan conditional rendering.

---

# 15. Hero

Hero adalah visual statement utama website.

Hero harus memiliki:

```text
Large Typography
+
Short Supporting Text
+
CTA
+
Visual Element
```

Jangan membuat Hero seperti landing page SaaS dengan terlalu banyak informasi.

Contoh struktur:

```text
DIGITAL
CREATORS
& DEVELOPERS

Two minds.
One digital space.

[ EXPLORE WORK ]
```

---

# 16. About

About harus singkat.

Fokus pada:

* siapa kita
* apa yang kita lakukan
* pendekatan kerja

Contoh:

```text
Two minds.
One digital space.

We design and build digital experiences
with a focus on clarity, interaction,
and meaningful visuals.
```

Informasi member dapat menggunakan card.

---

# 17. Skills

Skills tidak perlu menjadi tabel panjang.

Gunakan:

* tag
* horizontal list
* marquee
* interactive list
* typography
* minimal card

Contoh:

```text
REACT
JAVASCRIPT
TAILWIND
FIGMA
GIT
GITHUB
```

Hover dapat memberikan accent teal.

---

# 18. Projects

Projects adalah salah satu visual utama website.

Prioritas:

```text
Image
↓
Title
↓
Category
↓
Technology
```

Bukan:

```text
Title
Paragraph panjang
Paragraph panjang
Button
Button
```

Project card harus menerima data melalui props.

Contoh:

```jsx
<ProjectCard project={project} />
```

Data berasal dari:

```text
src/data/projects.js
```

---

# 19. Products

Products menggunakan pendekatan editorial.

Boleh menggunakan:

* asymmetric grid
* large image
* horizontal layout
* hover interaction

Hindari card yang semuanya terlihat identik seperti ecommerce template.

---

# 20. Contact

Contact harus terasa seperti invitation.

Contoh heading:

```text
HAVE AN IDEA?

LET'S BUILD
SOMETHING.
```

Form tetap sederhana.

Minimal:

```text
Name
Email
Message
Submit
```

Validation dilakukan secara lokal.

Tidak menggunakan external API.

---

# 21. Footer

Footer harus minimal.

Contoh:

```text
DUO PORTFOLIO

Lutfi — 2604140069
Dimas — 2605090004

© 2026
```

Footer menggunakan:

```text
#1C1E1F
```

dengan text:

```text
#FFFFFF
```

Jangan membuat footer terlalu penuh.

---

# 22. Image Direction

Image harus menjadi bagian dari visual storytelling.

Gunakan:

* high-quality image
* consistent aspect ratio
* clean composition
* minimal overlay
* subtle hover

Hindari:

* image dengan kualitas buruk
* terlalu banyak filter
* terlalu banyak gradient
* random stock image
* image yang tidak memiliki hubungan dengan project

---

# 23. Motion Design

Motion harus:

> **Subtle, Smooth, Intentional.**

Animasi bukan tujuan utama.

Animasi digunakan untuk:

* memberikan feedback
* memperjelas hierarchy
* meningkatkan perceived quality
* membuat transisi terasa natural

---

## Recommended Motion

### Page Enter

```text
opacity: 0 → 1
transform: translateY(20px) → 0
```

Durasi:

```text
400–800ms
```

---

### Hover

Gunakan:

```text
200–400ms
```

Contoh:

```text
scale: 1 → 1.02
```

Jangan:

```text
scale: 1 → 1.2
```

---

### Button

Gunakan:

```text
background transition
transform
arrow movement
```

---

### Image Reveal

Boleh menggunakan:

```text
clip-path
opacity
scale
```

secara subtle.

---

# 24. React Bits Usage

React Bits digunakan sebagai **enhancement**, bukan sebagai fondasi seluruh desain.

Gunakan hanya ketika efek tersebut benar-benar meningkatkan pengalaman.

Recommended:

* Text Animation
* Split Text
* Blur Text
* Magnetic Button
* Image Reveal
* Card Hover
* Spotlight
* Scroll Reveal
* Marquee
* subtle background effect

Jangan menggunakan React Bits pada setiap section.

Contoh:

```text
Hero
✓ Text animation

Skills
✓ Marquee

Projects
✓ Image/card hover

Contact
✓ Magnetic CTA

Footer
✗ Tidak perlu animation
```

---

# 25. Animation Restrictions

Hindari:

* particle berlebihan
* cursor effect yang mengganggu
* excessive glow
* infinite animation pada semua elemen
* parallax berlebihan
* text bergerak terus-menerus
* efek yang membuat website lambat
* animasi yang mengganggu readability

Jika sebuah animasi membuat user lebih memperhatikan animasi daripada content:

> kurangi atau hapus.

---

# 26. Interaction

Interaction harus memiliki feedback.

Contoh:

```text
Button hover
→ visual berubah

Card hover
→ image bergerak sedikit

Navigation active
→ accent berubah

Modal open
→ backdrop + transition

Form error
→ error message muncul
```

Gunakan React state untuk interaction.

---

# 27. Accessibility

UI harus tetap dapat digunakan tanpa animation.

Gunakan:

```html
alt=""
aria-label=""
button
nav
header
main
section
footer
```

Jangan menggunakan:

```html
<div onClick="">
```

untuk sesuatu yang seharusnya merupakan button.

---

# 28. Responsive Design

Website harus dirancang untuk:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Prioritas:

```text
Mobile First
```

Breakpoint tidak boleh menjadi tujuan desain.

Konten harus tetap bagus meskipun ukuran layar berubah.

---

# 29. Mobile Rules

Pada mobile:

* typography mengecil secara proporsional
* grid berubah menjadi single column
* navbar berubah menjadi hamburger
* spacing dikurangi
* image tetap memiliki aspect ratio
* tombol mudah ditekan
* modal tidak keluar layar
* tidak boleh ada horizontal overflow

Wajib melakukan pengecekan:

```text
320px
375px
390px
768px
1024px
1440px
```

---

# 30. Dark Mode

Jika dark mode digunakan karena requirement project, jangan membuat desain gelap yang sepenuhnya berbeda.

Gunakan versi inversi dari design system.

### Light

```text
Background: #FFFFFF
Text: #1C1E1F
Accent: #134E4A
```

### Dark

```text
Background: #1C1E1F
Text: #FFFFFF
Accent: #134E4A
```

Untuk dark mode, teal tetap menjadi accent.

Jangan menambahkan banyak warna baru hanya untuk dark mode.

---

# 31. Component Rules

Komponen harus modular.

Minimal:

```text
Navbar
Hero
SectionTitle
About
Skills
ProjectCard
ProductCard
Modal
Contact
Footer
ThemeToggle
```

Reusable component harus menerima props.

Contoh:

```jsx
<ProjectCard project={project} />
```

bukan:

```jsx
<ProjectCard
  title="Project 1"
  image="/image.jpg"
  description="..."
/>
```

yang diulang berkali-kali di halaman.

---

# 32. Data Driven UI

Content harus disimpan di:

```text
src/data/
```

Contoh:

```text
members.js
skills.js
projects.js
products.js
```

Render menggunakan:

```jsx
.map()
```

Contoh:

```jsx
{projects.map((project) => (
  <ProjectCard
    key={project.id}
    project={project}
  />
))}
```

---

# 33. Visual Consistency

Semua halaman harus terasa berasal dari website yang sama.

Harus konsisten dalam:

* typography
* color
* spacing
* border
* radius
* button
* animation
* image treatment
* grid
* navigation
* footer

Jangan membuat:

```text
About → minimal

Projects → colorful

Products → ecommerce

Contact → corporate
```

Semua harus tetap memiliki DNA visual yang sama.

---

# 34. What To Avoid

Jangan gunakan:

### ❌ Terlalu banyak warna

```text
red
blue
purple
orange
green
pink
```

Tanpa alasan.

---

### ❌ Gradient berlebihan

Terutama:

```text
purple → blue
```

yang membuat website terlihat seperti template AI.

---

### ❌ Glassmorphism berlebihan

Jangan membuat semua card:

```text
backdrop-blur
glass
shadow
glow
gradient
```

---

### ❌ Shadow berlebihan

Gunakan shadow hanya jika membantu hierarchy.

---

### ❌ Excessive Rounded Cards

Tidak semua elemen harus:

```text
rounded-full
rounded-3xl
```

Gunakan radius dengan sadar.

---

### ❌ Excessive Text

Website portfolio bukan dokumen.

Prioritaskan:

```text
visual
+
headline
+
short information
```

---

### ❌ AI-looking Design

Hindari kombinasi otomatis:

```text
gradient
+
glassmorphism
+
glow
+
huge rounded card
+
floating blobs
+
purple/blue
```

Jika semua digunakan sekaligus, desain kehilangan karakter.

---

# 35. Visual Priority

Setiap halaman harus memiliki hierarchy.

Urutan perhatian:

```text
1. Main Visual / Hero
2. Main Heading
3. CTA / Important Action
4. Supporting Information
5. Metadata
```

Jangan membuat semua elemen terlihat sama penting.

---

# 36. Design Decision Rule

Sebelum menambahkan elemen baru, tanyakan:

### 1. Apakah dibutuhkan?

Jika tidak:

```text
REMOVE
```

### 2. Apakah membantu hierarchy?

Jika tidak:

```text
REMOVE
```

### 3. Apakah sesuai design system?

Jika tidak:

```text
ADJUST
```

### 4. Apakah terlalu banyak?

Jika iya:

```text
SIMPLIFY
```

### 5. Apakah animation benar-benar membantu?

Jika tidak:

```text
REMOVE ANIMATION
```

---

# 37. Final Design Formula

Keseluruhan website mengikuti formula:

```text
WHITE SPACE
      +
STRONG TYPOGRAPHY
      +
EDITORIAL GRID
      +
CHARCOAL STRUCTURE
      +
FOREST TEAL ACCENT
      +
SUBTLE MOTION
      +
HIGH QUALITY VISUAL
      =
PREMIUM DIGITAL PORTFOLIO
```

---

# 38. Golden Rule

> **Jika ragu antara menambahkan sesuatu atau menghapusnya, pilih desain yang lebih sederhana.**

Design tidak harus terlihat ramai untuk terlihat profesional.

Target akhir:

**Simple enough to understand.
Distinct enough to remember.**
