const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const posts = [
  {
    title: "Toán lớp 6: Ôn tập về Số tự nhiên và các phép toán",
    slug: "toan-lop-6-on-tap-ve-so-tu-nhien",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Tập hợp các số tự nhiên được kí hiệu là $\\mathbb{N} = \\{0; 1; 2; 3; ...\\}$.</p>
      <p>Phép cộng và phép nhân các số tự nhiên có các tính chất giao hoán, kết hợp, phân phối của phép nhân đối với phép cộng.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Tính nhanh: $25 \\times 12 \\times 4$</li>
        <li>Tìm x, biết: $2x + 15 = 45$</li>
        <li>Một quyển sách có 200 trang. Hỏi cần bao nhiêu chữ số để đánh số trang của quyển sách đó?</li>
      </ol>
      <p>Các em hãy thử sức nhé!</p>
    `,
    image: "/images/math_chalkboard.jpg",
    published: true,
  },
  {
    title: "Toán lớp 6: Phân số và các phép tính",
    slug: "toan-lop-6-phan-so-va-cac-phep-tinh",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.</p>
      <p>Quy tắc quy đồng mẫu số, rút gọn phân số là những bước nền tảng để thực hiện các phép tính cộng, trừ, nhân, chia phân số.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Tính: $\\frac{3}{4} + \\frac{5}{6}$</li>
        <li>Tìm x: $x - \\frac{1}{2} = \\frac{3}{5}$</li>
      </ol>
    `,
    image: "/images/math_digital.jpg",
    published: true,
  },
  {
    title: "Toán lớp 6: Số nguyên và ứng dụng",
    slug: "toan-lop-6-so-nguyen",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Tập hợp số nguyên $\\mathbb{Z} = \\{...; -3; -2; -1; 0; 1; 2; 3; ...\\}$</p>
      <p>Quy tắc dấu ngoặc: Khi bỏ dấu ngoặc có dấu "-" đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Thực hiện phép tính: $15 - (-20) + 10$</li>
        <li>Tìm x: $x + 12 = -5$</li>
      </ol>
    `,
    image: "/images/math_notebook.jpg",
    published: true,
  },
  {
    title: "Toán lớp 7: Tập hợp các số hữu tỉ",
    slug: "toan-lop-7-tap-hop-so-huu-ti",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$. Tập hợp số hữu tỉ được kí hiệu là $\\mathbb{Q}$.</p>
      <p>Mỗi số hữu tỉ có thể được biểu diễn bởi một điểm trên trục số.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>So sánh các số hữu tỉ: $\\frac{-3}{4}$ và $\\frac{-4}{5}$</li>
        <li>Thực hiện phép tính: $\\frac{1}{2} + \\frac{-2}{3} \\times \\frac{3}{4}$</li>
      </ol>
    `,
    image: "/images/math_digital.jpg",
    published: true,
  },
  {
    title: "Toán lớp 7: Đại lượng tỉ lệ thuận, tỉ lệ nghịch",
    slug: "toan-lop-7-dai-luong-ti-le",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Hai đại lượng $y$ và $x$ tỉ lệ thuận nếu $y = kx$ ($k \\neq 0$). Hai đại lượng $y$ và $x$ tỉ lệ nghịch nếu $y = \\frac{a}{x}$ ($a \\neq 0$).</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Biết $x$ và $y$ là hai đại lượng tỉ lệ thuận, khi $x = 3$ thì $y = 6$. Tính $y$ khi $x = 5$.</li>
        <li>Ba lớp 7A, 7B, 7C trồng được 120 cây. Biết số cây trồng được tỉ lệ với 3, 4, 5. Tính số cây mỗi lớp.</li>
      </ol>
    `,
    image: "/images/math_chalkboard.jpg",
    published: true,
  },
  {
    title: "Toán lớp 7: Các trường hợp bằng nhau của tam giác",
    slug: "toan-lop-7-cac-truong-hop-bang-nhau-tam-giac",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Ba trường hợp bằng nhau của tam giác: Cạnh - Cạnh - Cạnh (c.c.c), Cạnh - Góc - Cạnh (c.g.c), Góc - Cạnh - Góc (g.c.g).</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Cho tam giác ABC cân tại A. Lấy D, E trên cạnh BC sao cho BD = CE. Chứng minh tam giác ABD = tam giác ACE.</li>
        <li>Cho góc xOy, phân giác Oz. Lấy A thuộc Ox, B thuộc Oy sao cho OA = OB. Lấy C thuộc Oz. Chứng minh $\\Delta AOC = \\Delta BOC$.</li>
      </ol>
    `,
    image: "/images/math_notebook.jpg",
    published: true,
  },
  {
    title: "Toán lớp 8: Nhân, chia đa thức",
    slug: "toan-lop-8-nhan-chia-da-thuc",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Quy tắc nhân đơn thức với đa thức, đa thức với đa thức.</p>
      <p>7 hằng đẳng thức đáng nhớ: $(A+B)^2, (A-B)^2, A^2-B^2, (A+B)^3, (A-B)^3, A^3+B^3, A^3-B^3$.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Khai triển: $(2x - 3y)^2$</li>
        <li>Rút gọn biểu thức: $(x-2)(x+2) - x(x-1)$</li>
      </ol>
    `,
    image: "/images/math_chalkboard.jpg",
    published: true,
  },
  {
    title: "Toán lớp 8: Phân thức đại số",
    slug: "toan-lop-8-phan-thuc-dai-so",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Phân thức đại số là một biểu thức có dạng $\\frac{A}{B}$, trong đó $A, B$ là những đa thức và $B$ khác đa thức $0$.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Rút gọn phân thức: $\\frac{x^2 - 4x + 4}{x^2 - 4}$</li>
        <li>Thực hiện phép tính: $\\frac{x}{x-1} + \\frac{2}{x+1} - \\frac{2}{x^2-1}$</li>
      </ol>
    `,
    image: "/images/math_digital.jpg",
    published: true,
  },
  {
    title: "Toán lớp 8: Tứ giác, Hình thang, Hình bình hành",
    slug: "toan-lop-8-tu-giac-hinh-thang",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Tổng các góc của một tứ giác bằng $360^\\circ$.</p>
      <p>Dấu hiệu nhận biết hình bình hành, hình chữ nhật, hình thoi, hình vuông.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Cho hình bình hành ABCD. Gọi M, N lần lượt là trung điểm của AB, CD. Chứng minh AMCN là hình bình hành.</li>
        <li>Tính các góc của hình thang cân ABCD biết góc A = $60^\\circ$.</li>
      </ol>
    `,
    image: "/images/math_notebook.jpg",
    published: true,
  },
  {
    title: "Toán lớp 8: Định lý Thalès trong tam giác",
    slug: "toan-lop-8-dinh-ly-thales",
    content: `
      <h2>Lý thuyết cơ bản</h2>
      <p>Nếu một đường thẳng cắt hai cạnh của một tam giác và song song với cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.</p>
      <p>Hệ quả định lý Thalès và tính chất đường phân giác trong tam giác.</p>
      <h2>Bài tập vận dụng</h2>
      <ol>
        <li>Cho $\\Delta ABC$, MN // BC (M thuộc AB, N thuộc AC). Biết AM = 2, MB = 3, AN = 4. Tính NC.</li>
      </ol>
    `,
    image: "/images/math_chalkboard.jpg",
    published: true,
  },
];

async function main() {
  await prisma.post.deleteMany();
  
  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }
  console.log('Seeded 10 math posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
