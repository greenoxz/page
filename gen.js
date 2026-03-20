const fs = require('fs');
let html = fs.readFileSync('c:/Users/Green/Desktop/ppknr.com/antigravity-page/page/randomdish.html', 'utf8');

const replacements = [
  ['สุ่มร้านอาหาร', 'สุ่มที่เที่ยว'],
  ['สุ่มของกิน', 'สุ่มสถานที่เที่ยว'],
  ['วันนี้กินอะไรดี?', 'วันนี้ไปเที่ยวไหนดี?'],
  ['ไม่ต้องคิดให้ปวดหัว! ใช้หน้าเว็บสุ่มร้านอาหารรอบตัวคุณ ค้นหาร้านอร่อยใกล้ฉัน ชาบู หมูกระทะ คาเฟ่', 'ไม่ต้องคิดให้ปวดหัว! ใช้หน้าเว็บสุ่มที่เที่ยวรอบตัวคุณ ค้นหาสถานที่น่าสนใจใกล้ฉัน'],
  ['ไม่ต้องคิดให้ปวดหัว! ใช้เว็บเว็บสุ่มร้านอาหารง่ายๆ เลือกร้านใกล้ตัว เลือกระดับราคา พร้อมเปิดนำทางบน Google Maps ทันที', 'ไม่ต้องคิดให้ปวดหัว! ใช้เว็บสุ่มที่เที่ยวง่ายๆ เลือกสถานที่ใกล้ตัว เลือกระดับราคา พร้อมเปิดนำทางบน Google Maps ทันที'],
  ['แอปสุ่มร้านอาหารง่ายๆ', 'แอปสุ่มที่เที่ยวง่ายๆ'],
  ['เว็บเว็บสุ่มร้านอาหารง่ายๆ', 'เว็บสุ่มที่เที่ยวง่ายๆ'],
  ['แอพสุ่มอาหาร', 'แอพสุ่มที่เที่ยว'],
  ['ร้านอาหารใกล้ฉัน', 'ที่เที่ยวใกล้ฉัน'],
  ['ร้านอร่อย', 'สถานที่เที่ยว'],
  ['ชาบูใกล้ฉัน, หมูกระทะใกล้ฉัน, คาเฟ่ใกล้ฉัน, ร้านอาหารเปิดอยู่', 'วัดใกล้ฉัน, สวนสาธารณะใกล้ฉัน, ทะเลใกล้ฉัน, ที่เที่ยวเปิดอยู่'],
  ['เครื่องมือสุ่มร้านอาหารใกล้ตัวผ่าน Google Maps เลือกร้านได้ตรงใจทั้งงบและชนิดอาหาร สำหรับคนที่คิดไม่ออกว่าจะกินอะไรดี', 'เครื่องมือสุ่มสถานที่ใกล้ตัวผ่าน Google Maps เลือกสถานที่ได้ตรงใจ สำหรับคนที่คิดไม่ออกว่าจะไปเที่ยวไหนดี'],
  ['randomdish', 'randomplace'],
  ['ข้อมูลร้านจาก Google Maps แสดงผลสูงสุด 20 ร้าน', 'ข้อมูลสถานที่จาก Google Maps แสดงผลสูงสุด 20 แห่ง'],
  ['หมวดหมู่อาหาร', 'ประเภทสถานที่'],
  ['id="foodCat"', 'id="placeCat"'],
  [`<label class="cat-label"><input type="checkbox" value="ชาบู">🍲 ชาบู/สุกี้</label>
                <label class="cat-label"><input type="checkbox" value="หมูกระทะ">🥓 หมูกระทะ</label>
                <label class="cat-label"><input type="checkbox" value="ก๋วยเตี๋ยว">🍜 ก๋วยเตี๋ยว</label>
                <label class="cat-label"><input type="checkbox" value="อาหารตามสั่ง">🍛 ตามสั่ง</label>
                <label class="cat-label"><input type="checkbox" value="อาหารญี่ปุ่น">🍣 ญี่ปุ่น</label>
                <label class="cat-label"><input type="checkbox" value="ส้มตำ">🌶️ ส้มตำ/ยำ</label>
                <label class="cat-label"><input type="checkbox" value="คาเฟ่">☕ คาเฟ่/ของหวาน</label>`, `<label class="cat-label"><input type="checkbox" value="วัด">🛕 วัด/ทำบุญ</label>
                <label class="cat-label"><input type="checkbox" value="สวนสาธารณะ">🌳 สวนสาธารณะ</label>
                <label class="cat-label"><input type="checkbox" value="ทะเล">🏖️ ทะเล</label>
                <label class="cat-label"><input type="checkbox" value="ภูเขา">⛰️ ธรรมชาติ/ภูเขา</label>
                <label class="cat-label"><input type="checkbox" value="พิพิธภัณฑ์">🏛️ พิพิธภัณฑ์</label>
                <label class="cat-label"><input type="checkbox" value="จุดชมวิว">🌅 จุดชมวิว</label>
                <label class="cat-label"><input type="checkbox" value="ตลาดกลางคืน">🌃 ตลาดกลางคืน</label>
                <label class="cat-label"><input type="checkbox" value="ห้างสรรพสินค้า">🛍️ ห้างสรรพสินค้า</label>`],
  ['fetchRestaurants()', 'fetchPlaces()'],
  ['ร้านอาหาร', 'ที่เที่ยว'],
  ['ค้นหาร้านอาหาร', 'ค้นหาที่เที่ยว'],
  ['restaurantStatus', 'placeStatus'],
  ['เจอ ${options.length} ร้าน', 'เจอ ${options.length} แห่ง'],
  ['ประวัติร้านที่ได้', 'ประวัติสถานที่ที่ได้'],
  ['ลบร้านที่สุ่มได้ออกอัตโนมัติ', 'ลบสถานที่ที่สุ่มได้ออกอัตโนมัติ'],
  ['ภาพถ่ายร้านอาหารที่สุ่มได้', 'ภาพถ่ายสถานที่ที่สุ่มได้'],
  ['มื้อนี้กินที่นี่เลย!', 'วันนี้ไปเที่ยวที่นี่เลย!'],
  ['ประวัติร้านอาหาร', 'ประวัติสถานที่'],
  ['ไม่พบร้าน', 'ไม่พบสถานที่'],
  ['เลือกร้าน', 'เลือกสถานที่'],
  ["type: 'restaurant',", ''],
  ['keyword: keyword', "keyword: keyword || 'สถานที่ท่องเที่ยว'"],
  ['fa-utensils', 'fa-map-marked-alt'],
  ['ภาพถ่ายที่เที่ยวที่สุ่มได้', 'ภาพถ่ายสถานที่ที่สุ่มได้'],
  ['กำลังค้นหาที่เที่ยว... (อาจใช้เวลาสักครู่)', 'กำลังค้นหาสถานที่... (อาจใช้เวลาสักครู่)'],
  ['กรุณาเลือกตำแหน่งบนแผนที่ก่อนครับ', 'กรุณาเลือกตำแหน่งบนแผนที่ก่อนครับ'],
  ['ไม่พบที่เที่ยวที่ตรงกับเงื่อนไขราคา/ดาว', 'ไม่พบสถานที่ที่ตรงกับเงื่อนไขราคา/ดาว'],
  ['ไม่พบที่เที่ยวในระยะนี้', 'ไม่พบสถานที่ในระยะนี้'],
  ['เจอ ${options.length} ที่เที่ยว', 'เจอ ${options.length} แห่ง'],
  ['รวมที่เที่ยว', 'รวมสถานที่']
];

for (let i = 0; i < replacements.length; i++) {
  const [a, b] = replacements[i];
  html = html.split(a).join(b);
}

fs.writeFileSync('c:/Users/Green/Desktop/ppknr.com/antigravity-page/page/randomplace.html', html, 'utf8');
