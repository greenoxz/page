# ppknr.com (Pisitz Projects)

เว็บไซต์ส่วนตัวและชุดมินิโปรเจกต์ที่สร้างขึ้นเพื่อความบันเทิงและเพิ่มความสะดวกในชีวิตประจำวัน พัฒนาโดย **Pisitz** สามารถเข้าใช้งานได้ที่ [ppknr.com](https://ppknr.com)

## ✨ ฟีเจอร์และเครื่องมือต่างๆ (Features & Tools)

1. **สุ่มร้านอาหาร (Random Dish)**
   - คิดไม่ออกว่าจะกินอะไรดี? ระบบจะช่วยสุ่มร้านอาหารรอบตัวคุณจาก Google Maps
   - สามารถกรองตามประเภทร้านอาหาร (ชาบู, หมูกระทะ, คาเฟ่ ฯลฯ) ระดับราคา และคะแนนดาวได้
2. **สุ่มที่เที่ยว (Random Place)**
   - สุ่มสถานที่น่าสนใจหรือสถานที่ท่องเที่ยวใกล้ตัว (วัด, ทะเล, ภูเขา, ตลาดกลางคืน) พร้อมระบบนำทางผ่าน Google Maps
3. **PisitPop (Popcat Clone)**
   - มินิเกมคลิกรัวๆ สไตล์ Popcat เอาไว้กดเล่นเพลินๆ แข่งขันความเร็วในการคลิก
4. **วงล้อเสี่ยงทาย (Wheel of Fortune)**
   - วงล้อสุ่มแบบกำหนดเองได้ สำหรับจับฉลากหรือสุ่มตัวเลือกต่างๆ
5. **เว็บบล็อก (Blog)**
   - แหล่งรวบรวมบทความและเรื่องราวต่างๆ สร้างโดยใช้ Hugo (Static Site Generator)

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Tailwind CSS (v4) พร้อมดีไซน์แนว Liquid Glassmorphism & Aurora Background
- **Blog Engine:** [Hugo](https://gohugo.io/) สำหรับสร้างบล็อกด้วยไฟล์ Markdown
- **APIs:** Google Maps Places API (สำหรับระบบสุ่มแผนที่)

## 📂 โครงสร้างของโปรเจกต์ (Project Structure)

```text
/
├── index.html            # หน้าแรกของเว็บไซต์ (Home)
├── /pages/               # โฟลเดอร์เก็บหน้ามินิโปรเจกต์และหน้าอื่นๆ (Tools, About, Contact)
├── /components/          # โฟลเดอร์เก็บ HTML Components ย่อยที่ใช้ซ้ำ (Navbar, Footer)
├── /css/                 # โฟลเดอร์เก็บไฟล์ CSS หลักที่ Compile แล้ว
├── input.css             # ไฟล์ต้นฉบับสำหรับตั้งค่า Tailwind CSS และ Custom CSS
├── /js/                  # ฟังก์ชัน JavaScript หลักของเว็บไซต์ (Theme, Toggle Menu, Components Loader)
├── /hugo_blog/           # Source code สำหรับระบบเว็บบล็อก (Hugo)
└── package.json          # จัดการ Scripts และ Dependencies (Tailwind, Hugo)
```

## 🚀 การรันโปรเจกต์และคำสั่งที่สำคัญ (Development & Build)

โปรเจกต์นี้ใช้ `npm` ในการจัดการสคริปต์ต่างๆ สามารถใช้งานได้ดังนี้:

**1. สร้างไฟล์ CSS (Tailwind)**
หากมีการแก้ไขไฟล์ `input.css` หรือคลาส Tailwind ใน `.html` จำเป็นต้องรันคำสั่งเพื่อบิวด์ CSS ใหม่:
```bash
npx @tailwindcss/cli -i ./input.css -o ./css/style.css --watch
```

**2. รันเซอร์เวอร์สำหรับ Blog (Hugo Local Server)**
เปิดเพื่อทดสอบระบบหน้าบล็อกและเขียนบทความ (จะเปิดเซอร์เวอร์ไว้ที่ พอร์ต 1313):
```bash
npm run blog:serve
```

**3. บิวด์หน้า Blog ทิ้งไว้สำหรับการ Deploy**
แปลงบทความทั้งหมดใน `hugo_blog` ออกมาเป็นไฟล์ HTML เตรียมอัปโหลดขึ้นเซิร์ฟเวอร์ (ไฟล์จะไปอยู่ที่โฟลเดอร์ `/blog/` ด้านนอกสุด):
```bash
npm run blog:build
```

## 📝 การ Deploy

เมื่อทำการเว็บ Deploy ขึ้น Hosting (เช่น Cloudflare Pages หรือ Vercel) **จำเป็นต้องกำหนด Build Settings ดังนี้:**
- **Build command:** `npm run blog:build` (เพื่อให้ระบบสร้างไฟล์บล็อก)
- **Build output directory:** เว้นว่างไว้ หรือตั้งค่าเป็น `.` , `/` (เพื่อให้ Hosting ดึงหน้าเว็บเครื่องมือต่างๆ ที่อยู่ด้านนอกเข้าแอปไปด้วย ไม่ใช่อยู่แค่ในบล็อก)
