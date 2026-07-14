import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const posts = [
  {
    title: "Toán 6: Lý thuyết và bài tập về Phân số",
    slug: "toan-6-phan-so",
    summary: "Ôn tập lý thuyết cơ bản về phân số, các phép toán cộng, trừ, nhân, chia phân số và một số bài tập ứng dụng thực tế.",
    content: `<h2>1. Lý thuyết cơ bản về Phân số</h2>
<p>Phân số là sự biểu diễn một số hữu tỉ dưới dạng tỉ lệ của hai số nguyên. Phân số có dạng a/b (b khác 0), trong đó a là tử số và b là mẫu số.</p>
<p><strong>Tính chất cơ bản:</strong></p>
<ul>
  <li>Nếu nhân hoặc chia cả tử và mẫu của một phân số cho cùng một số nguyên khác 0, ta được phân số mới bằng phân số đã cho.</li>
  <li>Các phép toán: Cộng, Trừ (cần quy đồng mẫu số), Nhân (tử nhân tử, mẫu nhân mẫu), Chia (nhân với phân số nghịch đảo).</li>
</ul>
<h2>2. Bài tập vận dụng</h2>
<p><strong>Bài 1:</strong> Tính giá trị của biểu thức: 3/4 + 5/6 - 1/2.</p>
<p><strong>Bài 2:</strong> Một lớp có 40 học sinh, trong đó 3/5 là học sinh giỏi. Tính số học sinh giỏi của lớp.</p>
<p><strong>Bài 3:</strong> Tìm x biết: x - 1/3 = 2/5.</p>
<p>Hãy làm bài tập vào vở và so sánh kết quả nhé!</p>`,
    imageUrl: "/images/math_1.jpg",
    published: true,
  },
  {
    title: "Toán 6: Hình học trực quan - Hình tam giác đều, Hình vuông",
    slug: "toan-6-hinh-hoc-truc-quan",
    summary: "Tìm hiểu đặc điểm, tính chất và công thức tính chu vi, diện tích của hình tam giác đều, hình vuông, lục giác đều.",
    content: `<h2>1. Lý thuyết trọng tâm</h2>
<p><strong>Hình tam giác đều:</strong> Là tam giác có 3 cạnh bằng nhau, 3 góc bằng nhau và mỗi góc bằng 60 độ.</p>
<p><strong>Hình vuông:</strong> Là tứ giác có 4 góc vuông và 4 cạnh bằng nhau. Hai đường chéo bằng nhau và vuông góc với nhau.</p>
<h2>2. Bài tập tự luyện</h2>
<p><strong>Bài 1:</strong> Tính chu vi và diện tích một hình vuông có cạnh là 5cm.</p>
<p><strong>Bài 2:</strong> Dùng thước và compa vẽ một tam giác đều có cạnh 4cm.</p>
<p><strong>Bài 3:</strong> Một khu vườn hình vuông có chu vi là 120m. Tính diện tích của khu vườn đó.</p>`,
    imageUrl: "/images/math_2.jpg",
    published: true,
  },
  {
    title: "Toán 7: Tỉ lệ thức và dãy tỉ số bằng nhau",
    slug: "toan-7-ti-le-thuc",
    summary: "Nắm vững khái niệm tỉ lệ thức, tính chất dãy tỉ số bằng nhau và cách giải các bài toán chia tỉ lệ.",
    content: `<h2>1. Tỉ lệ thức là gì?</h2>
<p>Tỉ lệ thức là đẳng thức của hai tỉ số: a/b = c/d.</p>
<p><strong>Tính chất:</strong> Nếu a/b = c/d thì ad = bc.</p>
<p><strong>Tính chất dãy tỉ số bằng nhau:</strong> a/b = c/d = (a+c)/(b+d) = (a-c)/(b-d).</p>
<h2>2. Luyện tập</h2>
<p><strong>Bài 1:</strong> Lập tất cả các tỉ lệ thức từ đẳng thức 2.15 = 3.10.</p>
<p><strong>Bài 2:</strong> Tìm hai số x, y biết x/3 = y/5 và x + y = 32.</p>
<p><strong>Bài 3:</strong> Số học sinh của 3 khối 6, 7, 8 tỉ lệ với 9, 8, 7. Biết khối 6 nhiều hơn khối 8 là 50 học sinh. Tính số học sinh mỗi khối.</p>`,
    imageUrl: "/images/math_3.jpg",
    published: true,
  },
  {
    title: "Toán 7: Tổng ba góc của một tam giác",
    slug: "toan-7-tong-ba-goc-tam-giac",
    summary: "Khám phá định lý quan trọng nhất của hình học phẳng: Tổng 3 góc trong một tam giác luôn bằng 180 độ.",
    content: `<h2>1. Định lý tổng ba góc của một tam giác</h2>
<p>Tổng ba góc của một tam giác luôn luôn bằng 180°.</p>
<p><strong>Hệ quả:</strong></p>
<ul>
  <li>Trong tam giác vuông, hai góc nhọn phụ nhau (tổng bằng 90°).</li>
  <li>Góc ngoài của một tam giác bằng tổng hai góc trong không kề với nó.</li>
</ul>
<h2>2. Bài tập thực hành</h2>
<p><strong>Bài 1:</strong> Cho tam giác ABC có góc A = 60°, góc B = 80°. Tính số đo góc C.</p>
<p><strong>Bài 2:</strong> Cho tam giác ABC vuông tại A, có góc C = 35°. Tính góc B.</p>
<p><strong>Bài 3:</strong> Tính các góc của tam giác ABC biết chúng tỉ lệ với 2, 3, 4.</p>`,
    imageUrl: "/images/math_1.jpg",
    published: true,
  },
  {
    title: "Toán 8: Bảy Hằng Đẳng Thức Đáng Nhớ",
    slug: "toan-8-hang-dang-thuc",
    summary: "Hệ thống lại 7 hằng đẳng thức đáng nhớ trong đại số và phương pháp áp dụng vào bài toán phân tích đa thức thành nhân tử.",
    content: `<h2>1. Bảy hằng đẳng thức đáng nhớ</h2>
<ol>
  <li>Bình phương của một tổng: (A + B)² = A² + 2AB + B²</li>
  <li>Bình phương của một hiệu: (A - B)² = A² - 2AB + B²</li>
  <li>Hiệu hai bình phương: A² - B² = (A - B)(A + B)</li>
  <li>Lập phương của một tổng: (A + B)³ = A³ + 3A²B + 3AB² + B³</li>
  <li>Lập phương của một hiệu: (A - B)³ = A³ - 3A²B + 3AB² - B³</li>
  <li>Tổng hai lập phương: A³ + B³ = (A + B)(A² - AB + B²)</li>
  <li>Hiệu hai lập phương: A³ - B³ = (A - B)(A² + AB + B²)</li>
</ol>
<h2>2. Vận dụng</h2>
<p><strong>Bài 1:</strong> Khai triển các hằng đẳng thức sau: (x + 3)², (2x - y)².</p>
<p><strong>Bài 2:</strong> Rút gọn biểu thức: (x - 2)(x + 2) - x(x - 5).</p>
<p><strong>Bài 3:</strong> Tìm x biết: x² - 6x + 9 = 0.</p>`,
    imageUrl: "/images/math_2.jpg",
    published: true,
  },
  {
    title: "Toán 8: Định lý Ta-lét trong tam giác",
    slug: "toan-8-dinh-ly-ta-let",
    summary: "Hiểu sâu về Định lý Ta-lét thuận, đảo và hệ quả của nó. Vận dụng để tính độ dài đoạn thẳng và chứng minh song song.",
    content: `<h2>1. Lý thuyết trọng tâm</h2>
<p><strong>Định lý Ta-lét thuận:</strong> Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.</p>
<p><strong>Định lý Ta-lét đảo:</strong> Nếu một đường thẳng cắt hai cạnh của một tam giác và định ra trên hai cạnh này những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó song song với cạnh còn lại của tam giác.</p>
<h2>2. Bài tập luyện tập</h2>
<p><strong>Bài 1:</strong> Cho tam giác ABC, DE // BC (D thuộc AB, E thuộc AC). Biết AD = 2cm, BD = 3cm, AE = 4cm. Tính CE.</p>
<p><strong>Bài 2:</strong> Nêu ứng dụng của Định lý Ta-lét trong việc đo chiều cao một cái cây hoặc chiều rộng một khúc sông.</p>`,
    imageUrl: "/images/math_3.jpg",
    published: true,
  },
  {
    title: "Toán 6: Tính chất của phép cộng và phép nhân số nguyên",
    slug: "toan-6-so-nguyen",
    summary: "Củng cố kiến thức về số nguyên, quy tắc dấu ngoặc và thứ tự thực hiện phép tính.",
    content: `<h2>1. Các tính chất quan trọng</h2>
<p>Phép cộng và phép nhân số nguyên có các tính chất: giao hoán, kết hợp, cộng với số 0, nhân với số 1, và tính chất phân phối của phép nhân đối với phép cộng.</p>
<p><strong>Quy tắc dấu ngoặc:</strong></p>
<ul>
  <li>Khi bỏ dấu ngoặc có dấu "+" đằng trước, ta giữ nguyên dấu của các số hạng.</li>
  <li>Khi bỏ dấu ngoặc có dấu "-" đằng trước, ta phải đổi dấu tất cả các số hạng bên trong.</li>
</ul>
<h2>2. Bài tập</h2>
<p><strong>Bài 1:</strong> Thực hiện phép tính: 15 - (-20) + 5 - 12.</p>
<p><strong>Bài 2:</strong> Tính nhanh: (-15) * 45 + (-15) * 55.</p>`,
    imageUrl: "/images/math_1.jpg",
    published: true,
  },
  {
    title: "Toán 7: Các trường hợp bằng nhau của tam giác",
    slug: "toan-7-tam-giac-bang-nhau",
    summary: "Tổng hợp 3 trường hợp bằng nhau của tam giác thường và áp dụng vào tam giác vuông.",
    content: `<h2>1. Ba trường hợp bằng nhau</h2>
<p>- Cạnh - cạnh - cạnh (c.c.c)</p>
<p>- Cạnh - góc - cạnh (c.g.c)</p>
<p>- Góc - cạnh - góc (g.c.g)</p>
<p><strong>Đối với tam giác vuông:</strong> Cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông.</p>
<h2>2. Bài tập chứng minh</h2>
<p><strong>Bài 1:</strong> Cho góc xOy. Trên Ox lấy điểm A, trên Oy lấy điểm B sao cho OA = OB. Gọi M là trung điểm của AB. Chứng minh tam giác OAM bằng tam giác OBM.</p>
<p><strong>Bài 2:</strong> Từ kết quả bài 1, chứng minh OM là tia phân giác của góc xOy.</p>`,
    imageUrl: "/images/math_2.jpg",
    published: true,
  },
  {
    title: "Toán 8: Phân tích đa thức thành nhân tử",
    slug: "toan-8-phan-tich-da-thuc",
    summary: "Các phương pháp phân tích đa thức thành nhân tử: Đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử.",
    content: `<h2>1. Phương pháp giải</h2>
<p>Để phân tích một đa thức thành nhân tử, chúng ta có thể sử dụng linh hoạt các phương pháp:</p>
<ul>
  <li>Phương pháp đặt nhân tử chung.</li>
  <li>Phương pháp dùng hằng đẳng thức.</li>
  <li>Phương pháp nhóm hạng tử.</li>
  <li>Phối hợp nhiều phương pháp.</li>
</ul>
<h2>2. Bài tập áp dụng</h2>
<p><strong>Bài 1:</strong> Phân tích thành nhân tử: 5x² - 10x.</p>
<p><strong>Bài 2:</strong> Phân tích thành nhân tử: x² - y² + 2x + 1.</p>
<p><strong>Bài 3:</strong> Tìm x biết: 2x(x-3) - x + 3 = 0.</p>`,
    imageUrl: "/images/math_3.jpg",
    published: true,
  },
  {
    title: "Toán 6, 7, 8: Phương pháp học giỏi Toán hiệu quả",
    slug: "phuong-phap-hoc-gioi-toan",
    summary: "Chia sẻ những bí quyết giúp học sinh THCS học tốt môn Toán, tư duy logic và không sợ Toán.",
    content: `<h2>1. Đừng học vẹt, hãy hiểu bản chất</h2>
<p>Toán học là môn của tư duy logic. Bạn cần hiểu tại sao lại có công thức đó, thay vì chỉ cố học thuộc lòng.</p>
<h2>2. Làm bài tập thường xuyên</h2>
<p>\"Trăm hay không bằng tay quen\". Giải nhiều bài tập giúp bạn nhận diện dạng toán và phản xạ nhanh hơn.</p>
<h2>3. Học cách tự tóm tắt kiến thức</h2>
<p>Sử dụng sơ đồ tư duy (mindmap) để liên kết các bài học lại với nhau.</p>
<p><strong>Lời khuyên:</strong> Hãy luôn hỏi \"Tại sao?\" khi gặp một vấn đề khó, và đừng ngại nhờ giáo viên hỗ trợ nhé!</p>`,
    imageUrl: "/images/math_1.jpg",
    published: true,
  }
];

async function main() {
  console.log("Xóa các bài viết cũ...");
  await prisma.post.deleteMany({});

  console.log("Đang tạo 10 bài viết mới...");
  for (const p of posts) {
    await prisma.post.create({
      data: p
    });
  }
  console.log("Thành công!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
