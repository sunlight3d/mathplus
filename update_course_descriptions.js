const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const descriptions = {
  "Toán cho học sinh lớp 6 đến 9": `<h2>Chương Trình Toán THCS Chất Lượng Cao (Lớp 6 - 9)</h2>
<p>Khóa học bám sát chương trình sách giáo khoa mới của Bộ Giáo dục, giúp các em học sinh xây dựng nền tảng tư duy toán học vững chắc ngay từ những năm đầu cấp 2.</p>
<h3>Mục tiêu khóa học:</h3>
<ul>
  <li>Nắm vững kiến thức trọng tâm từng khối lớp.</li>
  <li>Rèn luyện kỹ năng giải các dạng toán từ cơ bản đến nâng cao.</li>
  <li>Phát triển tư duy logic và khả năng phân tích vấn đề.</li>
  <li>Chuẩn bị hành trang vững chắc cho kỳ thi chuyển cấp.</li>
</ul>
<p><strong>Lộ trình học tập:</strong> Được cá nhân hóa theo năng lực của từng học sinh, kèm cặp sát sao bởi đội ngũ giáo viên giàu kinh nghiệm.</p>`,
  "Toán cho người mất gốc": `<h2>Khóa Học Lấy Lại Gốc Toán Học Nhanh Chóng</h2>
<p>Dành riêng cho các bạn học sinh đang gặp khó khăn với môn Toán, sợ học Toán hoặc đã hổng kiến thức từ các lớp dưới. Khóa học được thiết kế đặc biệt để giúp học sinh vượt qua rào cản tâm lý và lấy lại sự tự tin.</p>
<h3>Điểm nổi bật của khóa học:</h3>
<ul>
  <li>Hệ thống lại toàn bộ kiến thức nền tảng một cách dễ hiểu nhất.</li>
  <li>Phương pháp giảng dạy chậm rãi, tỉ mỉ, đi từ bản chất vấn đề.</li>
  <li>Luyện tập qua các ví dụ thực tế, tránh học vẹt, học tủ.</li>
  <li>Sĩ số lớp nhỏ, giáo viên kèm cặp 1-1 sát sao.</li>
</ul>
<p><strong>Cam kết:</strong> Học sinh sẽ tiến bộ rõ rệt chỉ sau 1-2 tháng học tập, không còn sợ môn Toán và tự tin đạt điểm khá trên lớp.</p>`,
  "Lớp toán luyện thi học sinh khá giỏi": `<h2>Bồi Dưỡng Học Sinh Giỏi Toán - Đột Phá Tư Duy</h2>
<p>Khóa học chuyên sâu dành cho các bạn học sinh có tố chất, đam mê môn Toán và có nguyện vọng tham gia các kỳ thi Học sinh giỏi các cấp hoặc thi vào trường Chuyên.</p>
<h3>Nội dung chương trình:</h3>
<ul>
  <li>Mở rộng và đào sâu kiến thức vượt chương trình SGK.</li>
  <li>Tiếp cận các chuyên đề Toán khó, các dạng bài thi HSG qua các năm.</li>
  <li>Rèn luyện kỹ năng giải toán tốc độ, tư duy nhạy bén và sáng tạo.</li>
  <li>Thi thử liên tục để rèn luyện tâm lý phòng thi.</li>
</ul>
<p><strong>Đội ngũ giáo viên:</strong> Là những chuyên gia luyện thi, từng đào tạo nhiều lứa học sinh đạt giải cao cấp Thành phố và Quốc gia.</p>`,
  "Toán cơ bản và nâng cao dần": `<h2>Chương Trình Toán Phổ Thông - Vững Bước Thành Công</h2>
<p>Khóa học lý tưởng cho mọi đối tượng học sinh muốn học chắc kiến thức cơ bản và từng bước thử sức với các bài toán nâng cao để đạt điểm 8, 9, 10.</p>
<h3>Cấu trúc khóa học:</h3>
<ul>
  <li><strong>Giai đoạn 1:</strong> Xây dựng nền tảng, nắm chắc 100% lý thuyết và dạng bài cơ bản.</li>
  <li><strong>Giai đoạn 2:</strong> Rèn kỹ năng giải bài tập tự luận và trắc nghiệm chính xác.</li>
  <li><strong>Giai đoạn 3:</strong> Tiếp xúc với các bài toán vận dụng, vận dụng cao để bứt phá điểm số.</li>
</ul>
<p><strong>Phương pháp:</strong> Học đi đôi với hành, hệ thống bài tập phong phú đa dạng giúp học sinh ghi nhớ sâu và lâu.</p>`,
  "Luyện thi đại học": `<h2>Luyện Thi THPT Quốc Gia & Đánh Giá Năng Lực (Khối A, A1, B, D)</h2>
<p>Khóa học mang tính quyết định, được thiết kế chuyên biệt để giúp các sĩ tử 2K bứt phá điểm số trong kỳ thi quan trọng nhất của thời học sinh.</p>
<h3>Chiến thuật ôn thi toàn diện:</h3>
<ul>
  <li><strong>Quét sạch mọi chuyên đề:</strong> Ôn tập toàn diện chương trình lớp 12 và kiến thức trọng tâm 10, 11.</li>
  <li><strong>Luyện đề thực chiến:</strong> Cọ xát với hàng trăm bộ đề thi thử bám sát ma trận đề của Bộ GD&ĐT.</li>
  <li><strong>Tối ưu thời gian:</strong> Trang bị kỹ năng giải nhanh trắc nghiệm bằng máy tính Casio và tư duy giải nhanh.</li>
  <li><strong>Chiến thuật phòng thi:</strong> Cách phân bổ thời gian, tránh bẫy, xử lý các câu Vận dụng cao (câu 9, 10 điểm).</li>
</ul>
<p><strong>Cam kết:</strong> Hỗ trợ giải đáp thắc mắc 24/7, đồng hành cùng các em cho đến sát ngày thi.</p>`,
  "Luyện thi vào 10": `<h2>Chinh Phục Kỳ Thi Vào Lớp 10 THPT</h2>
<p>Kỳ thi chuyển cấp vào lớp 10 luôn vô cùng khốc liệt. Khóa học này cung cấp lộ trình ôn thi bài bản, giúp các em tự tin bước vào cánh cổng trường THPT mơ ước.</p>
<h3>Lộ trình ôn thi 3 giai đoạn:</h3>
<ul>
  <li><strong>Tổng ôn kiến thức:</strong> Hệ thống hóa toàn bộ kiến thức Toán 9 (Đại số và Hình học).</li>
  <li><strong>Luyện chuyên đề thi:</strong> Đi sâu vào các dạng bài chắc chắn có trong đề thi (Rút gọn biểu thức, Giải bài toán bằng cách lập PT/HPT, Hình học tổng hợp...).</li>
  <li><strong>Luyện đề tổng lực:</strong> Giải đề thi chính thức của các Sở GD&ĐT qua các năm, rèn kỹ năng trình bày tự luận chặt chẽ để ăn trọn điểm.</li>
</ul>
<p><strong>Đặc biệt:</strong> Có các lớp luyện thi riêng biệt cho học sinh thi trường Công lập bình thường và lớp luyện thi trường Chuyên (Toán chuyên, Tin chuyên).</p>`
};

async function main() {
  const courses = await prisma.course.findMany();
  for (const course of courses) {
    const newDesc = descriptions[course.title];
    if (newDesc) {
      await prisma.course.update({
        where: { id: course.id },
        data: { description: newDesc }
      });
      console.log(`Updated description for: ${course.title}`);
    } else {
      console.log(`No new description found for: ${course.title}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
