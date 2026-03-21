const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('\n--- สร้างบทความบล็อกใหม่ (Hugo) ---');
  let title = await ask('ชื่อหัวข้อบทความ (ภาษาอังกฤษหรือภาษาไทย): ');
  
  if (!title) {
    console.error('กรุณาใส่ชื่อหัวข้อครับ');
    process.exit(1);
  }

  // Generate filename: convert spaces to dashes, lowercase (if EN)
  const filename = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0E00-\u0E7F-]/g, ''); // Keep Thai chars, English chars and dashes

  try {
    // Run hugo new command
    execSync(`hugo -s hugo_blog new posts/${filename}.md`);
    console.log(`\n✅ สร้างไฟล์บทความสำเร็จ: hugo_blog/content/posts/${filename}.md`);
    console.log('--- สามารถเข้าไปแก้ไขเนื้อหาในไฟล์ดังกล่าวได้เลยครับ ---');
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดในการรัน Hugo:', err.message);
  } finally {
    rl.close();
  }
}

main();
