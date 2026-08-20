export interface QuizOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: QuizOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  image?: string;
  iconType?: string;
}

export const mathQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    topic: "TOÁN THỰC TẾ & TÍNH TOÁN",
    question: "Sản lượng gieo trồng lúa vụ Thu Đông năm 2025 của vùng Đồng bằng sông Cửu Long ước tính đạt được 763 tấn thóc, tăng 103 tấn so với năm 2024. Hãy tính sản lượng thóc thu được vào năm 2024.",
    options: [
      { key: "A", text: "660 (tấn)" },
      { key: "B", text: "760 (tấn)" },
      { key: "C", text: "866 (tấn)" },
      { key: "D", text: "766 (tấn)" }
    ],
    correctAnswer: "A",
    explanation: "Sản lượng thóc thu được vào năm 2024 là: 763 - 103 = 660 (tấn).",
    iconType: "🌾"
  },
  {
    id: 2,
    topic: "TÍNH CHẤT PHÉP CỘNG",
    question: "Thay dấu ? bằng số thích hợp: ? + 2 874 = 2 874 + 7 869.",
    options: [
      { key: "A", text: "7 869." },
      { key: "B", text: "10 743." },
      { key: "C", text: "4 962." },
      { key: "D", text: "13 617." }
    ],
    correctAnswer: "A",
    explanation: "Áp dụng tính chất giao hoán của phép cộng (a + b = b + a), ta có ngay số thích hợp thay thế cho dấu ? là 7 869.",
    iconType: "❓"
  },
  {
    id: 3,
    topic: "TÌM SỐ TỰ NHIÊN X",
    question: "Tìm số tự nhiên x, biết: x + (120 – 25) = 345",
    options: [
      { key: "A", text: "x = 240" },
      { key: "B", text: "x = 250" },
      { key: "C", text: "x = 300" },
      { key: "D", text: "x = 255" }
    ],
    correctAnswer: "B",
    explanation: "Thực hiện phép tính trong ngoặc: 120 - 25 = 95. Biểu thức trở thành: x + 95 = 345 => x = 345 - 95 = 250.",
    iconType: "🔢"
  },
  {
    id: 4,
    topic: "BÀI TOÁN CỘNG THÊM",
    question: "Bạn Hùng có 127 viên bi, bạn An cho bạn Hùng thêm 17 viên bi nữa. Hỏi bạn Hùng có tất cả bao nhiêu viên bi?",
    options: [
      { key: "A", text: "134 viên bi" },
      { key: "B", text: "124 viên bi" },
      { key: "C", text: "144 viên bi" },
      { key: "D", text: "149 viên bi" }
    ],
    correctAnswer: "C",
    explanation: "Số viên bi bạn Hùng có tất cả là: 127 + 17 = 144 (viên bi).",
    iconType: "🔮"
  },
  {
    id: 5,
    topic: "BÀI TOÁN SĨ SỐ HỌC SINH",
    question: "Lớp 6A có 37 học sinh. Đầu năm lớp có 3 bạn chuyển đến và cuối năm có 4 bạn chuyển đi. Hỏi sĩ số của lớp 6A cuối năm là bao nhiêu?",
    options: [
      { key: "A", text: "36 học sinh." },
      { key: "B", text: "35 học sinh." },
      { key: "C", text: "33 học sinh." },
      { key: "D", text: "40 học sinh." }
    ],
    correctAnswer: "A",
    explanation: "Sĩ số của lớp 6A vào cuối năm là: 37 + 3 - 4 = 36 (học sinh).",
    iconType: "🏫"
  },
  {
    id: 6,
    topic: "BÀI TOÁN TỔNG SỐ SÁCH",
    question: "Bạn Thu An có 5 quyển sách ngữ văn, 12 quyển sách toán và 26 quyển sách tiếng anh. Hỏi bạn Thu An có tất cả bao nhiêu quyển sách?",
    options: [
      { key: "A", text: "17 quyển sách." },
      { key: "B", text: "43 quyển sách." },
      { key: "C", text: "38 quyển sách." },
      { key: "D", text: "31 quyển sách" }
    ],
    correctAnswer: "B",
    explanation: "Tổng số quyển sách bạn Thu An có là: 5 + 12 + 26 = 43 (quyển sách).",
    iconType: "📚"
  },
  {
    id: 7,
    topic: "BÀI TOÁN MUA SẮM TIỀN THỪA",
    question: "Mai đi chợ mua cà tím hết 18 nghìn đồng, cà chua hết 21 nghìn đồng và rau cải hết 30 nghìn đồng. Mai đưa cô bán hàng tờ 100 nghìn đồng thì được trả lại bao nhiêu tiền?",
    options: [
      { key: "A", text: "30 nghìn đồng." },
      { key: "B", text: "31 nghìn đồng." },
      { key: "C", text: "21 nghìn đồng." },
      { key: "D", text: "41 nghìn đồng" }
    ],
    correctAnswer: "B",
    explanation: "Tổng số tiền mua hàng là: 18 + 21 + 30 = 69 (nghìn đồng). Số tiền Mai được trả lại là: 100 - 69 = 31 (nghìn đồng).",
    iconType: "🛒"
  },
  {
    id: 8,
    topic: "TÍNH TOÁN CHI PHÍ HỌC TẬP",
    question: "An có 100 000 đồng để mua đồ dùng học tập. An đã mua 5 quyển vở, 6 cái bút bi và 2 cái bút chì. Biết rằng mỗi quyển vở có giá 6 000 đồng, mỗi cái bút bi hoặc bút chì có giá 5 000 đồng. Hỏi An còn lại bao nhiêu tiền?",
    options: [
      { key: "A", text: "20 000 đồng" },
      { key: "B", text: "70 000 đồng" },
      { key: "C", text: "100 000 đồng" },
      { key: "D", text: "30 000 đồng" }
    ],
    correctAnswer: "D",
    explanation: "Tiền mua 5 quyển vở: 5 × 6 000 = 30 000 đồng. Tổng số bút mua là: 6 + 2 = 8 cái bút => Tiền mua bút: 8 × 5 000 = 40 000 đồng. Tổng số tiền đã chi: 30 000 + 40 000 = 70 000 đồng. Số tiền An còn lại: 100 000 - 70 000 = 30 000 đồng.",
    iconType: "✏️"
  }
];
