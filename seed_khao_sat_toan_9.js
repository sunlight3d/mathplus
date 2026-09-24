const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const srcFolder = path.join(__dirname, 'documents', 'de_khao_sat_toan_9_2025_2026');
const destFolder = path.join(__dirname, 'public', 'documents');

if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

const colors = [
  'from-blue-600 to-indigo-500',
  'from-emerald-600 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-purple-600 to-pink-500',
  'from-rose-500 to-red-500',
  'from-cyan-600 to-blue-500',
  'from-violet-600 to-purple-500',
  'from-teal-600 to-emerald-500',
  'from-sky-600 to-cyan-500'
];

const newDocs = [
  {
    file: 'de-khao-sat-toan-9-nam-2025-2026-truong-thpt-chuyen-ha-noi-amsterdam.pdf',
    title: 'Đề khảo sát Toán 9 THPT Chuyên Hà Nội – Amsterdam (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thpt-chuyen-ha-noi-amsterdam-2025-2026',
    description: 'Đề khảo sát chất lượng đầu năm môn Toán lớp 9 trường THPT Chuyên Hà Nội - Amsterdam năm học 2025 - 2026.'
  },
  {
    file: 'de-khao-sat-toan-9-thang-9-nam-2025-truong-thcs-nguyen-gia-thieu-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS Nguyễn Gia Thiều (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-nguyen-gia-thieu-2025-2026',
    description: 'Đề khảo sát chất lượng môn Toán lớp 9 tháng 9 năm 2025 trường THCS Nguyễn Gia Thiều, Long Biên, Hà Nội.'
  },
  {
    file: 'de-khao-sat-toan-9-thang-9-nam-2025-truong-thcs-gia-thuy-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS Gia Thụy (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-gia-thuy-2025-2026',
    description: 'Đề khảo sát chất lượng môn Toán lớp 9 tháng 9 năm 2025 trường THCS Gia Thụy, Long Biên, Hà Nội.'
  },
  {
    file: 'de-khao-sat-toan-9-thang-9-nam-2025-truong-thcs-tho-an-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS Thọ An (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-tho-an-2025-2026',
    description: 'Đề khảo sát chất lượng môn Toán lớp 9 tháng 9 năm 2025 trường THCS Thọ An, Đan Phượng, Hà Nội.'
  },
  {
    file: 'de-khao-sat-toan-9-dau-nam-2025-2026-truong-thcs-chu-van-an-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS Chu Văn An (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-chu-van-an-2025-2026',
    description: 'Đề khảo sát chất lượng đầu năm môn Toán lớp 9 trường THCS Chu Văn An, Tây Hồ, Hà Nội năm học 2025 - 2026.'
  },
  {
    file: 'de-khao-sat-toan-9-thang-9-nam-2025-truong-thcs-thang-long-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS Thăng Long (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-thang-long-2025-2026',
    description: 'Đề khảo sát chất lượng môn Toán lớp 9 tháng 9 năm 2025 trường THCS Thăng Long, Ba Đình, Hà Nội.'
  },
  {
    file: 'de-khao-sat-toan-9-thang-9-nam-2025-truong-m-v-lomonoxop-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS & THPT M.V. Lômônôxốp (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-thpt-mv-lomonoxop-2025-2026',
    description: 'Đề khảo sát chất lượng môn Toán lớp 9 tháng 9 năm 2025 trường THCS & THPT M.V. Lômônôxốp, Nam Từ Liêm, Hà Nội.'
  },
  {
    file: 'de-kiem-tra-toan-9-thang-9-nam-2025-truong-thcs-khuong-dinh-ha-noi.pdf',
    title: 'Đề kiểm tra Toán 9 THCS Khương Đình (Năm học 2025 – 2026)',
    slug: 'de-kiem-tra-toan-9-thcs-khuong-dinh-2025-2026',
    description: 'Đề kiểm tra chất lượng môn Toán lớp 9 tháng 9 năm 2025 trường THCS Khương Đình, Thanh Xuân, Hà Nội.'
  },
  {
    file: 'de-khao-sat-toan-9-dau-nam-2025-2026-truong-thcs-giang-vo-ha-noi.pdf',
    title: 'Đề khảo sát Toán 9 THCS Giảng Võ (Năm học 2025 – 2026)',
    slug: 'de-khao-sat-toan-9-thcs-giang-vo-2025-2026',
    description: 'Đề khảo sát chất lượng đầu năm môn Toán lớp 9 trường THCS Giảng Võ, Ba Đình, Hà Nội năm học 2025 - 2026.'
  }
];

async function run() {
  for (let i = 0; i < newDocs.length; i++) {
    const item = newDocs[i];
    const srcPath = path.join(srcFolder, item.file);
    const destPath = path.join(destFolder, item.file);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${item.file} -> public/documents/`);
    } else {
      console.warn(`File not found at source: ${srcPath}`);
    }

    const fileUrl = `/documents/${item.file}`;
    const color = colors[i % colors.length];

    const result = await prisma.document.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        description: item.description,
        fileUrl: fileUrl,
        color: color
      },
      create: {
        title: item.title,
        slug: item.slug,
        description: item.description,
        fileUrl: fileUrl,
        color: color
      }
    });

    console.log(`Saved doc to DB: [${result.id}] ${result.title}`);
  }
}

run()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
