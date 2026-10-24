import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Thêm đường dẫn chứa engine và converter vào sys.path
sys.path.insert(0, r"C:\Users\nguye\.gemini\config\skills\mathplus-giai-toan\scripts")
from mathplus_docx_engine import MathPlusDocxBuilder, COLOR_BLACK
from docx.shared import Pt, Mm

fig_dir = r"c:\code\mathplus\lop10\figures"

def build_document():
    builder = MathPlusDocxBuilder(
        title="ĐÁP ÁN & LỜI GIẢI CHI TIẾT ĐỀ CƯƠNG ÔN TẬP GIỮA HỌC KỲ I",
        subtitle="MÔN TOÁN LỚP 10 – TRƯỜNG THPT HOÀNG VĂN THỤ (NĂM HỌC 2026 – 2027)",
        time_limit="90 phút",
        is_solved=True,
        logo_path=r"C:\code\mathplus\public\images\logo.jpg"
    )

    # ==========================================
    # PHẦN A. TRẮC NGHIỆM NHIỀU LỰA CHỌN (24 CÂU)
    # ==========================================
    builder.add_section("A. PHẦN TRẮC NGHIỆM: 24 CÂU HỎI 4 PHƯƠNG ÁN LỰA CHỌN")

    # Bảng đáp án nhanh
    builder.add_solution_box([
        "• Câu 1: D   |   Câu 2: D   |   Câu 3: C   |   Câu 4: D   |   Câu 5: C   |   Câu 6: C",
        "• Câu 7: B   |   Câu 8: D   |   Câu 9: D   |   Câu 10: C  |   Câu 11: A  |   Câu 12: C",
        "• Câu 13: C  |   Câu 14: C  |   Câu 15: C  |   Câu 16: D  |   Câu 17: B  |   Câu 18: B",
        "• Câu 19: A  |   Câu 20: A  |   Câu 21: C  |   Câu 22: D  |   Câu 23: A  |   Câu 24: B"
    ], title="BẢNG ĐÁP ÁN TỔNG HỢP NHANH (24 CÂU)")

    # Câu 1
    builder.add_problem_header("Câu 1:", "Trong các câu sau, câu nào là mệnh đề?")
    builder.add_problem_statement([
        "A. Thời gian làm bài thi môn toán là bao nhiêu phút?                    B. Bạn có mệt không?",
        "C. Tôi hạnh phúc quá!                    D. Việt Nam có 34 tỉnh thành."
    ])
    builder.add_solution_box([
        "• Mệnh đề toán học là một câu khẳng định có tính đúng hoặc sai rõ ràng, không thể vừa đúng vừa sai.",
        "• Các câu A và B là câu hỏi nghi vấn, không phải câu khẳng định.",
        "• Câu C là câu cảm thán, không phải câu khẳng định có tính đúng sai.",
        "• Câu D: \"Việt Nam có 34 tỉnh thành\" là một câu khẳng định (dù khẳng định sai vì thực tế có 63 tỉnh thành), do đó câu này là một mệnh đề."
    ], conclusion="Chọn đáp án D.")

    # Câu 2
    builder.add_problem_header("Câu 2:", "Trong các mệnh đề sau, mệnh đề nào là mệnh đề đúng?")
    builder.add_problem_statement([
        "A. Tổng của hai số tự nhiên là một số chẵn khi và chỉ khi cả hai số đều là số chẵn.",
        "B. Tích của hai số tự nhiên là một số chẵn khi và chỉ khi cả hai số đều là số chẵn.",
        "C. Tổng của hai số tự nhiên là một số lẻ khi và chỉ khi cả hai số đều là số lẻ.",
        "D. Tích của hai số tự nhiên là một số lẻ khi và chỉ khi cả hai số đều là số lẻ."
    ])
    builder.add_solution_box([
        "• Phân tích từng phương án và phản ví dụ theo bút tích giáo viên:",
        "• Mệnh đề A sai: Ví dụ $3 + 7 = 10$, tổng của hai số lẻ là một số chẵn (Lẻ + Lẻ = Chẵn), không nhất thiết cả hai số đều chẵn.",
        "• Mệnh đề B sai: Ví dụ $2 \\cdot 3 = 6$, tích của số chẵn và số lẻ là số chẵn (Chẵn × Lẻ = Chẵn), chỉ cần có ít nhất một thừa số chẵn.",
        "• Mệnh đề C sai: Ví dụ $3 + 2 = 5$, tổng của một số lẻ và một số chẵn là số lẻ (Lẻ + Chẵn = Lẻ). Tổng hai số lẻ là số chẵn.",
        "• Mệnh đề D đúng: Tích hai số tự nhiên là số lẻ khi và chỉ khi cả hai thừa số đều là số lẻ."
    ], conclusion="Chọn đáp án D.")

    # Câu 3
    builder.add_problem_header("Câu 3:", "Hình nào sau đây minh họa tập hợp $A$ là tập con của tập hợp $B$ ($A \\subset B$)?")
    builder.add_problem_statement([
        "A. Hai hình tròn cắt nhau một phần.",
        "B. Hình tròn $B$ nằm hoàn toàn bên trong hình tròn $A$.",
        "C. Hình tròn $A$ nằm hoàn toàn bên trong hình tròn $B$.",
        "D. Hai hình tròn rời nhau."
    ])
    builder.add_solution_box([
        "• Theo định nghĩa tập hợp con: $A \\subset B \\iff \\forall x \\in A \\implies x \\in B$.",
        "• Trên biểu đồ Ven, mọi điểm thuộc miền đường cong kín biểu diễn tập $A$ đều phải nằm trọn vẹn bên trong miền kín biểu diễn tập $B$."
    ], image_path=os.path.join(fig_dir, "c3_venn.png"), image_width=3.8, conclusion="Chọn đáp án C.")

    # Câu 4
    builder.add_problem_header("Câu 4:", "Cho tập hợp $P$. Tìm mệnh đề sai trong các mệnh đề sau?")
    builder.add_problem_statement([
        "A. $P \\subset P$          B. $\\emptyset \\subset P$          C. $P \\in \\{P\\}$          D. $P \\in P$"
    ])
    builder.add_solution_box([
        "• Ghi chú sư phạm: Quan hệ giữa tập hợp và tập hợp dùng quan hệ bao hàm con $\\subset$, quan hệ phần tử thuộc tập hợp dùng ký hiệu $\\in$.",
        "• A. $P \\subset P$ đúng vì mọi tập hợp đều là tập con của chính nó.",
        "• B. $\\emptyset \\subset P$ đúng vì tập rỗng là tập con của mọi tập hợp.",
        "• C. $P \\in \\{P\\}$ đúng vì $\\{P\\}$ là tập hợp chứa phần tử duy nhất là tập $P$.",
        "• D. $P \\in P$ là mệnh đề sai (theo bút tích giáo viên: tập hợp phải dùng quan hệ $\\subset$)."
    ], conclusion="Chọn đáp án D.")

    # Câu 5
    builder.add_problem_header("Câu 5:", "Cho tập $X = \\{2; 4; 6; 9\\}$, $Y = \\{1; 2; 3; 4\\}$. Tập nào sau đây bằng tập $X \\setminus Y$?")
    builder.add_problem_statement([
        "A. $\\{1; 2; 3; 5\\}$          B. $\\{1; 3; 6; 9\\}$          C. $\\{6; 9\\}$          D. $\\{1\\}$"
    ])
    builder.add_solution_box([
        "• Phép hiệu $X \\setminus Y$ gồm các phần tử thuộc tập hợp $X$ nhưng không thuộc tập hợp $Y$:",
        "• Tập $X = \\{2; 4; 6; 9\\}$. Các phần tử của $X$ thuộc $Y$ là $\\{2; 4\\}$.",
        "• Loại bỏ các phần tử này, ta thu được: $X \\setminus Y = \\{6; 9\\}$."
    ], conclusion="Chọn đáp án C.")

    # Câu 6
    builder.add_problem_header("Câu 6:", "Trong các tập hợp sau, tập nào là tập rỗng?")
    builder.add_problem_statement([
        "A. $T_1 = \\{x \\in \\mathbb{N} \\mid x^2 + 3x - 4 = 0\\}$",
        "B. $T_1 = \\{x \\in \\mathbb{R} \\mid x^2 - 3 = 0\\}$",
        "C. $T_1 = \\{x \\in \\mathbb{N} \\mid x^2 = 2\\}$",
        "D. $T_1 = \\{x \\in \\mathbb{Q} \\mid (x^2 + 1)(2x - 5) = 0\\}$"
    ])
    builder.add_solution_box([
        "• Xét nghiệm của phương trình ở từng phương án:",
        "• A. $x^2 + 3x - 4 = 0 \\iff (x-1)(x+4) = 0 \\implies x = 1 \\in \\mathbb{N} \\implies T_1 = \\{1\\} \\ne \\emptyset$.",
        "• B. $x^2 - 3 = 0 \\iff x = \\pm \\sqrt{3} \\in \\mathbb{R} \\implies T_1 = \\{-\\sqrt{3}; \\sqrt{3}\\} \\ne \\emptyset$.",
        "• C. $x^2 = 2 \\iff x = \\pm \\sqrt{2}$. Vì $\\pm\\sqrt{2} \\notin \\mathbb{N}$ nên không có số tự nhiên nào thỏa mãn (bút tích viết tay: $x = \\pm\\sqrt{2} \\notin \\mathbb{N}$) $\\implies T_1 = \\emptyset$.",
        "• D. $(x^2+1)(2x-5) = 0 \\iff x = 2.5 = \\frac{5}{2} \\in \\mathbb{Q} \\implies T_1 = \\{\\frac{5}{2}\\} \\ne \\emptyset$."
    ], conclusion="Chọn đáp án C.")

    # Câu 7
    builder.add_problem_header("Câu 7:", "Cho tập hợp $A = \\{x \\in \\mathbb{R} \\mid -5 < x \\le 5\\}$. Tập hợp $A$ được viết dưới dạng khoảng, đoạn, nửa khoảng là:")
    builder.add_problem_statement([
        "A. $A = [-5; 5]$          B. $A = (-5; 5]$          C. $A = [-5; 5)$          D. $A = (-5; 5)$"
    ])
    builder.add_solution_box([
        "• Điểm đầu mút bên trái là $-5$ với dấu ngặt \"$<$\" tương ứng ngoặc tròn \"$(\".",
        "• Điểm đầu mút bên phải là $5$ với dấu không ngặt \"$\\le$\" tương ứng ngoặc vuông \"]\".",
        "• Do đó, $A = (-5; 5]$ là một nửa khoảng."
    ], conclusion="Chọn đáp án B.")

    # Câu 8
    builder.add_problem_header("Câu 8:", "Cho các tập hợp $P = (-2; 5)$, $Q = (0; +\\infty)$ và $R = [5; 7]$. Trong các mệnh đề sau mệnh đề nào đúng?")
    builder.add_problem_statement([
        "A. $P \\cup Q = (0; 5)$          B. $Q \\cap R = (5; 7]$          C. $P \\cap R = \\{5\\}$          D. $P \\cap Q = (0; 5)$"
    ])
    builder.add_solution_box([
        "• Biểu diễn 3 tập hợp trên trục số theo đúng minh họa viết tay của giáo viên:",
        "• Giao của $P = (-2; 5)$ và $Q = (0; +\\infty)$ là phần chung của hai khoảng: $P \\cap Q = (0; 5)$.",
        "• A sai vì $P \\cup Q = (-2; +\\infty)$.",
        "• B sai vì $Q \\cap R = [5; 7]$.",
        "• C sai vì $5 \\notin P \\implies P \\cap R = \\emptyset$."
    ], image_path=os.path.join(fig_dir, "c8_axis.png"), image_width=4.5, conclusion="Chọn đáp án D.")

    # Câu 9
    builder.add_problem_header("Câu 9:", "Để phục vụ cho một hội nghị quốc tế, ban tổ chức huy động 35 người phiên dịch tiếng Anh, 30 người phiên dịch tiếng Pháp, trong đó có 16 người phiên dịch được cả tiếng Anh và tiếng Pháp. Ban tổ chức đã huy động cho hội nghị đó số người là:")
    builder.add_problem_statement([
        "A. 45          B. 81          C. 65          D. 49"
    ])
    builder.add_solution_box([
        "• Lời giải bằng biểu đồ Ven theo bút tích giáo viên:",
        "• Số người chỉ phiên dịch được tiếng Anh: $35 - 16 = 19$ người.",
        "• Số người chỉ phiên dịch được tiếng Pháp: $30 - 16 = 14$ người.",
        "• Số người phiên dịch được cả hai thứ tiếng: $16$ người.",
        "• Tổng số người được ban tổ chức huy động: $19 + 16 + 14 = 49$ người."
    ], image_path=os.path.join(fig_dir, "c9_venn.png"), image_width=4.0, conclusion="Chọn đáp án D.")

    # Câu 10
    builder.add_problem_header("Câu 10:", "Cho góc $\\alpha$ thỏa mãn $\\tan\\alpha = 2$. Tính giá trị của biểu thức $P = \\frac{-3\\sin\\alpha + 2\\cos\\alpha}{5\\cos\\alpha + 7\\sin\\alpha}$.")
    builder.add_problem_statement([
        "A. $P = -\\frac{4}{9}$          B. $P = \\frac{4}{9}$          C. $P = -\\frac{4}{19}$          D. $P = \\frac{4}{19}$"
    ])
    builder.add_solution_box([
        "• Vì $\\tan\\alpha = 2$ xác định nên $\\cos\\alpha \\ne 0$.",
        "• Chia cả tử và mẫu của biểu thức $P$ cho $\\cos\\alpha$ theo các bước viết tay:",
        "$$P = \\frac{-3\\frac{\\sin\\alpha}{\\cos\\alpha} + 2\\frac{\\cos\\alpha}{\\cos\\alpha}}{5\\frac{\\cos\\alpha}{\\cos\\alpha} + 7\\frac{\\sin\\alpha}{\\cos\\alpha}} = \\frac{-3\\tan\\alpha + 2}{5 + 7\\tan\\alpha}$$",
        "• Thay $\\tan\\alpha = 2$ vào biểu thức:",
        "$$P = \\frac{-3(2) + 2}{5 + 7(2)} = \\frac{-6 + 2}{5 + 14} = -\\frac{4}{19}$$"
    ], conclusion="Chọn đáp án C.")

    # Câu 11
    builder.add_problem_header("Câu 11:", "Rút gọn biểu thức $S = \\cos(90^\\circ - x) - \\sin(180^\\circ - x) - \\sin(90^\\circ - x) - \\cos(180^\\circ - x)$ ta được:")
    builder.add_problem_statement([
        "A. $S = 0$          B. $S = \\sin^2 x - \\cos^2 x$          C. $S = 2\\sin x$          D. $S = 1$"
    ])
    builder.add_solution_box([
        "• Sử dụng công thức lượng giác của hai góc phụ nhau và bù nhau:",
        "  + $\\cos(90^\\circ - x) = \\sin x$",
        "  + $\\sin(180^\\circ - x) = \\sin x$",
        "  + $\\sin(90^\\circ - x) = \\cos x$",
        "  + $\\cos(180^\\circ - x) = -\\cos x$",
        "• Thay các giá trị trên vào biểu thức $S$:",
        "$$S = \\sin x - \\sin x - \\cos x - (-\\cos x) = (\\sin x - \\sin x) + (-\\cos x + \\cos x) = 0$$"
    ], conclusion="Chọn đáp án A.")

    # Câu 12
    builder.add_problem_header("Câu 12:", "Tam giác $ABC$ có $AB = 5, BC = 7, CA = 8$. Số đo góc $A$ bằng:")
    builder.add_problem_statement([
        "A. $30^\\circ$          B. $45^\\circ$          C. $60^\\circ$          D. $90^\\circ$"
    ])
    builder.add_solution_box([
        "• Đặt $c = AB = 5, a = BC = 7, b = CA = 8$.",
        "• Áp dụng hệ quả của định lý côsin trong tam giác $ABC$:",
        "$$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{8^2 + 5^2 - 7^2}{2 \\cdot 8 \\cdot 5} = \\frac{64 + 25 - 49}{80} = \\frac{40}{80} = \\frac{1}{2}$$",
        "• Vì $0^\\circ < A < 180^\\circ$ và $\\cos A = \\frac{1}{2}$ nên $\\widehat{A} = 60^\\circ$."
    ], conclusion="Chọn đáp án C.")

    # Câu 13
    builder.add_problem_header("Câu 13:", "Tam giác $ABC$ có $AB = 2, AC = 5$ và $\\widehat{A} = 60^\\circ$. Tính độ dài cạnh $BC$.")
    builder.add_problem_statement([
        "A. $BC = 4$          B. $BC = 2$          C. $BC = \\sqrt{19}$          D. $BC = \\sqrt{29}$"
    ])
    builder.add_solution_box([
        "• Áp dụng định lý côsin trong tam giác $ABC$:",
        "$$BC^2 = AB^2 + AC^2 - 2 \\cdot AB \\cdot AC \\cdot \\cos A$$",
        "$$BC^2 = 2^2 + 5^2 - 2 \\cdot 2 \\cdot 5 \\cdot \\cos 60^\\circ = 4 + 25 - 20 \\cdot \\frac{1}{2} = 29 - 10 = 19$$",
        "• Do độ dài cạnh luôn dương nên $BC = \\sqrt{19}$."
    ], conclusion="Chọn đáp án C.")

    # Câu 14
    builder.add_problem_header("Câu 14:", "Tam giác $ABC$ có $AB = 4, BC = 6, AC = 2\\sqrt{7}$. Điểm $M$ thuộc đoạn thẳng $BC$ sao cho $MC = 2MB$. Tính độ dài cạnh $AM$.")
    builder.add_problem_statement([
        "A. $AM = 4\\sqrt{2}$          B. $AM = 3$          C. $AM = 2\\sqrt{3}$          D. $AM = 3\\sqrt{2}$"
    ])
    builder.add_solution_box([
        "• Vì $MC = 2MB$ và $MB + MC = BC = 6 \\implies 3MB = 6 \\implies MB = 2$ và $MC = 4$.",
        "• Tính $\\cos B$ trong tam giác $ABC$ theo định lý côsin:",
        "$$\\cos B = \\frac{AB^2 + BC^2 - AC^2}{2 \\cdot AB \\cdot BC} = \\frac{4^2 + 6^2 - (2\\sqrt{7})^2}{2 \\cdot 4 \\cdot 6} = \\frac{16 + 36 - 28}{48} = \\frac{24}{48} = \\frac{1}{2}$$",
        "• Áp dụng định lý côsin trong tam giác $ABM$ để tính độ dài $AM$:",
        "$$AM^2 = AB^2 + BM^2 - 2 \\cdot AB \\cdot BM \\cdot \\cos B = 4^2 + 2^2 - 2 \\cdot 4 \\cdot 2 \\cdot \\frac{1}{2} = 16 + 4 - 8 = 12$$",
        "• Suy ra $AM = \\sqrt{12} = 2\\sqrt{3}$."
    ], conclusion="Chọn đáp án C.")

    # Câu 15
    builder.add_problem_header("Câu 15:", "Tam giác $ABC$ có $AB = c, BC = a, CA = b$. Các cạnh $a, b, c$ liên hệ với nhau bởi đẳng thức $b(b^2 - a^2) = c(a^2 - c^2)$. Khi đó góc $\\widehat{BAC}$ bằng bao nhiêu?")
    builder.add_problem_statement([
        "A. $30^\\circ$          B. $45^\\circ$          C. $60^\\circ$          D. $90^\\circ$"
    ])
    builder.add_solution_box([
        "• Biến đổi đại số đẳng thức giả thiết theo đúng lời giải viết tay:",
        "$$b(b^2 - a^2) = c(a^2 - c^2) \\iff b^3 - a^2b = a^2c - c^3 \\iff b^3 + c^3 = a^2b + a^2c$$",
        "$$\\iff (b+c)(b^2 - bc + c^2) = a^2(b+c)$$",
        "• Vì $b+c > 0$ nên chia hai vế cho $b+c$ ta được:",
        "$$b^2 - bc + c^2 = a^2 \\iff a^2 = b^2 + c^2 - 2bc \\cdot \\frac{1}{2}$$",
        "• So sánh với định lý côsin $a^2 = b^2 + c^2 - 2bc \\cos A$, ta suy ra $\\cos A = \\frac{1}{2} \\implies \\widehat{BAC} = 60^\\circ$."
    ], conclusion="Chọn đáp án C.")

    # Câu 16
    builder.add_problem_header("Câu 16:", "Cho tam giác $ABC$ có $a = 4, c = 6, \\widehat{B} = 120^\\circ$. Diện tích của tam giác $ABC$ là:")
    builder.add_problem_statement([
        "A. $5\\sqrt{3}$          B. $5$          C. $12$          D. $6\\sqrt{3}$"
    ])
    builder.add_solution_box([
        "• Áp dụng công thức diện tích tam giác qua hai cạnh và sin góc xen giữa:",
        "$$S_{ABC} = \\frac{1}{2} a c \\sin B = \\frac{1}{2} \\cdot 4 \\cdot 6 \\cdot \\sin 120^\\circ$$",
        "• Vì $\\sin 120^\\circ = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$, ta có:",
        "$$S_{ABC} = 12 \\cdot \\frac{\\sqrt{3}}{2} = 6\\sqrt{3}$$"
    ], conclusion="Chọn đáp án D.")

    # Câu 17
    builder.add_problem_header("Câu 17:", "Cho tam giác $ABC$ có $b = 8, c = 5, \\cos A = \\frac{4}{5}$. Chiều cao $h_a$ của tam giác $ABC$ là:")
    builder.add_problem_statement([
        "A. $\\frac{7\\sqrt{2}}{2}$          B. $\\frac{24}{5}$          C. $12\\sqrt{23}$          D. $80\\sqrt{3}$"
    ])
    builder.add_solution_box([
        "• Tính $\\sin A$: $\\sin A = \\sqrt{1 - \\cos^2 A} = \\sqrt{1 - \\frac{16}{25}} = \\frac{3}{5}$.",
        "• Tính cạnh $a$ bằng định lý côsin:",
        "$$a^2 = b^2 + c^2 - 2bc \\cos A = 64 + 25 - 2 \\cdot 8 \\cdot 5 \\cdot \\frac{4}{5} = 89 - 64 = 25 \\implies a = 5$$",
        "• Diện tích tam giác $ABC$: $S = \\frac{1}{2} b c \\sin A = \\frac{1}{2} \\cdot 8 \\cdot 5 \\cdot \\frac{3}{5} = 12$.",
        "• Chiều cao $h_a$: $h_a = \\frac{2S}{a} = \\frac{2 \\cdot 12}{5} = \\frac{24}{5}$."
    ], conclusion="Chọn đáp án B.")

    # Câu 18
    builder.add_problem_header("Câu 18:", "Hai chiếc tàu thủy cùng xuất phát từ một vị trí $A$, đi thẳng theo hai hướng tạo với nhau góc $60^\\circ$. Tàu $B$ chạy với tốc độ 20 hải lí/giờ, tàu $C$ chạy với tốc độ 30 hải lí/giờ. Sau 2 giờ, khoảng cách giữa hai tàu là bao nhiêu?")
    builder.add_problem_statement([
        "A. 61 hải lí          B. 53 hải lí          C. 50 hải lí          D. 44 hải lí"
    ])
    builder.add_solution_box([
        "• Quãng đường tàu $B$ đi được sau 2 giờ: $AB = 20 \\cdot 2 = 40$ hải lí.",
        "• Quãng đường tàu $C$ đi được sau 2 giờ: $AC = 30 \\cdot 2 = 60$ hải lí.",
        "• Áp dụng định lý côsin trong tam giác $ABC$ với $\\widehat{BAC} = 60^\\circ$:",
        "$$BC^2 = AB^2 + AC^2 - 2 \\cdot AB \\cdot AC \\cdot \\cos 60^\\circ = 40^2 + 60^2 - 2 \\cdot 40 \\cdot 60 \\cdot \\frac{1}{2} = 1600 + 3600 - 2400 = 2800$$",
        "• Suy ra $BC = \\sqrt{2800} \\approx 52.915$ hải lí $\\approx 53$ hải lí."
    ], conclusion="Chọn đáp án B.")

    # Câu 19
    builder.add_problem_header("Câu 19:", "Từ vị trí $A$ quan sát một cây cao (hình vẽ). Biết $AH = 4\\text{ m}, HB = 20\\text{ m}, \\widehat{BAC} = 45^\\circ$. Chiều cao của cây gần nhất với giá trị nào sau đây?")
    builder.add_problem_statement([
        "A. $17,5\\text{ m}$          B. $17\\text{ m}$          C. $16,5\\text{ m}$          D. $16\\text{ m}$"
    ])
    builder.add_solution_box([
        "• Tính toán hình học chi tiết theo bút tích giáo viên:",
        "• Trong tam giác vuông $AHB$ vuông tại $H$:",
        "$$AB = \\sqrt{AH^2 + HB^2} = \\sqrt{4^2 + 20^2} = \\sqrt{416} = 4\\sqrt{26}\\text{ m}$$",
        "$$\\tan \\widehat{ABH} = \\frac{AH}{HB} = \\frac{4}{20} = 0.2 \\implies \\widehat{ABH} \\approx 11.31^\\circ$$",
        "• Góc $\\widehat{ABC} = 90^\\circ - \\widehat{ABH} \\approx 90^\\circ - 11.31^\\circ = 78.69^\\circ$.",
        "• Trong tam giác $ABC$: $\\widehat{C} = 180^\\circ - \\widehat{BAC} - \\widehat{ABC} = 180^\\circ - 45^\\circ - 78.69^\\circ = 56.31^\\circ$.",
        "• Áp dụng định lý hàm sin trong tam giác $ABC$:",
        "$$\\frac{BC}{\\sin 45^\\circ} = \\frac{AB}{\\sin C} \\implies BC = \\frac{AB \\cdot \\sin 45^\\circ}{\\sin C} = \\frac{4\\sqrt{26} \\cdot \\sin 45^\\circ}{\\sin 56.31^\\circ} \\approx 17.33\\text{ m} \\approx 17,5\\text{ m}$$"
    ], conclusion="Chọn đáp án A.")

    # Câu 20
    builder.add_problem_header("Câu 20:", "Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?")
    builder.add_problem_statement([
        "A. $2x - 3y > 0$          B. $x^2 + y^2 < 2$          C. $x + y^2 \\ge 0$          D. $x^2 - 3y \\ge 8$"
    ])
    builder.add_solution_box([
        "• Bất phương trình bậc nhất hai ẩn có dạng tổng quát $ax + by + c > 0$ (hoặc $<, \\ge, \\le$), trong đó $a, b$ không đồng thời bằng 0 và bậc của $x, y$ đều là bậc 1.",
        "• Các phương án B, C, D đều chứa ẩn bậc hai ($x^2$ hoặc $y^2$).",
        "• Phương án A: $2x - 3y > 0$ là bất phương trình bậc nhất hai ẩn."
    ], conclusion="Chọn đáp án A.")

    # Câu 21
    builder.add_problem_header("Câu 21:", "Cho bất phương trình $x + 5y - 3 \\le 0$ (1). Chọn khẳng định đúng trong các khẳng định sau:")
    builder.add_problem_statement([
        "A. Bất phương trình (1) chỉ có một nghiệm duy nhất.",
        "B. Bất phương trình (1) vô nghiệm.",
        "C. Bất phương trình (1) luôn có vô số nghiệm.",
        "D. Bất phương trình (1) có tập nghiệm là $\\mathbb{R}$."
    ])
    builder.add_solution_box([
        "• Miền nghiệm của bất phương trình bậc nhất hai ẩn $x + 5y - 3 \\le 0$ trên mặt phẳng tọa độ $Oxy$ là một nửa mặt phẳng kể cả bờ $x + 5y - 3 = 0$.",
        "• Nửa mặt phẳng chứa vô số điểm $(x; y)$, do đó bất phương trình luôn có vô số nghiệm."
    ], conclusion="Chọn đáp án C.")

    # Câu 22
    builder.add_problem_header("Câu 22:", "Miền nghiệm của bất phương trình $x - y \\ge -2$ là phần tô đậm trong hình vẽ của hình vẽ nào sau đây?")
    builder.add_problem_statement([
        "A. Nửa mặt phẳng bờ đi qua $(2; 0)$ và $(0; -2)$.",
        "B. Nửa mặt phẳng không chứa gốc tọa độ $O$.",
        "C. Nửa mặt phẳng bờ đi qua $(0; 2)$ và $(-2; 0)$ nhưng không chứa $O$.",
        "D. Nửa mặt phẳng bờ đi qua $(-2; 0)$ và $(0; 2)$ chứa gốc tọa độ $O$."
    ])
    builder.add_solution_box([
        "• Đường thẳng bờ $x - y = -2$ đi qua hai điểm $(-2; 0)$ và $(0; 2)$.",
        "• Thay tọa độ gốc $O(0; 0)$ vào bất phương trình: $0 - 0 = 0 \\ge -2$ (thỏa mãn, là khẳng định đúng).",
        "• Do đó, miền nghiệm là nửa mặt phẳng bờ $x - y = -2$ chứa gốc tọa độ $O(0; 0)$, kể cả bờ."
    ], image_path=os.path.join(fig_dir, "c22_halfplane.png"), image_width=3.6, conclusion="Chọn đáp án D.")

    # Câu 23
    builder.add_problem_header("Câu 23:", "Miền không gạch chéo trên hình vẽ bên là biểu diễn miền nghiệm của hệ bất phương trình nào sau đây?")
    builder.add_problem_statement([
        "A. $\\begin{cases} y \\ge 0 \\\\ 3x + 2y \\le 6 \\end{cases}$          B. $\\begin{cases} y \\ge 0 \\\\ 3x + 2y \\le -6 \\end{cases}$          C. $\\begin{cases} x \\ge 0 \\\\ 3x + 2y \\le 6 \\end{cases}$          D. $\\begin{cases} x \\ge 0 \\\\ 3x + 2y \\ge -6 \\end{cases}$"
    ])
    builder.add_solution_box([
        "• Đường thẳng nằm ngang là trục hoành $y = 0$, miền nghiệm lấy phía trên trục hoành $\\implies y \\ge 0$.",
        "• Đường thẳng xiên đi qua $(2; 0)$ và $(0; 3)$ có phương trình $3x + 2y = 6$.",
        "• Gốc tọa độ $O(0; 0)$ thuộc miền nghiệm (phần không bị gạch chéo): $3(0) + 2(0) = 0 \\le 6$ (thỏa mãn) $\\implies 3x + 2y \\le 6$."
    ], image_path=os.path.join(fig_dir, "c23_halfplane.png"), image_width=3.6, conclusion="Chọn đáp án A.")

    # Câu 24
    builder.add_problem_header("Câu 24:", "Tìm giá trị nhỏ nhất của biểu thức $f(x; y) = x - 2y$ biết $x, y$ thỏa mãn hệ $\\begin{cases} x \\ge 0 \\\\ 0 \\le y \\le 5 \\\\ x + y - 2 \\ge 0 \\\\ x - y \\le 2 \\end{cases}$.")
    builder.add_problem_statement([
        "A. $-12$          B. $-10$          C. $-8$          D. $-6$"
    ])
    builder.add_solution_box([
        "• Miền nghiệm của hệ là miền tứ giác $ABCD$ với tọa độ các đỉnh:",
        "  + $A(0; 2)$ (giao của $x = 0$ và $x + y = 2$)",
        "  + $B(0; 5)$ (giao của $x = 0$ và $y = 5$)",
        "  + $C(7; 5)$ (giao của $y = 5$ và $x - y = 2$)",
        "  + $D(2; 0)$ (giao của $x + y = 2$ và $x - y = 2$)",
        "• Tính giá trị biểu thức $f(x; y) = x - 2y$ tại các đỉnh:",
        "  + $f(A) = 0 - 2(2) = -4$",
        "  + $f(B) = 0 - 2(5) = -10$",
        "  + $f(C) = 7 - 2(5) = -3$",
        "  + $f(D) = 2 - 2(0) = 2$",
        "• Giá trị nhỏ nhất là $\\min f = -10$ đạt tại đỉnh $B(0; 5)$."
    ], image_path=os.path.join(fig_dir, "c24_polygon.png"), image_width=3.8, conclusion="Chọn đáp án B.")


    # ==========================================
    # PHẦN B. TRẮC NGHIỆM ĐÚNG SAI (9 CÂU)
    # ==========================================
    builder.add_section("B. PHẦN TRẮC NGHIỆM ĐÚNG SAI (9 CÂU)")

    # Câu 1 Đúng/Sai
    builder.add_problem_header("Câu 1:", "Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) Tổng hai cạnh trong một tam giác lớn hơn cạnh thứ ba của tam giác đó.",
        "b) $\\sqrt{5}$ là số vô tỉ.",
        "c) $x^2 + 1 < 0$.",
        "d) Tích của ba số tự nhiên liên tiếp luôn chia hết cho 3."
    ])
    builder.add_solution_box([
        "• a) ĐÚNG: Theo bất đẳng thức tam giác trong hình học, tổng độ dài hai cạnh bất kỳ luôn lớn hơn độ dài cạnh còn lại.",
        "• b) ĐÚNG: $\\sqrt{5} \\approx 2.236...$ là số thập phân vô hạn không tuần hoàn, do đó $\\sqrt{5}$ là số vô tỉ.",
        "• c) SAI: Vì $x^2 \\ge 0$ với mọi $x \\in \\mathbb{R}$ nên $x^2 + 1 \\ge 1 > 0$ với mọi $x$. Mệnh đề $x^2 + 1 < 0$ luôn sai.",
        "• d) ĐÚNG: Trong ba số tự nhiên liên tiếp luôn tồn tại ít nhất một số chia hết cho 3, do đó tích của chúng luôn chia hết cho 3."
    ], conclusion="a) Đ – b) Đ – c) S – d) Đ")

    # Câu 2 Đúng/Sai
    builder.add_problem_header("Câu 2:", "Cho các tập hợp $A = \\{x \\in \\mathbb{R} \\mid -5 \\le x < 2\\}$, $B = \\{x \\in \\mathbb{R} \\mid x < 1\\}$, $C = \\{x \\in \\mathbb{R} \\mid x > 7\\}$. Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) $A = (-5; 2)$          b) $B = (-\\infty; 1)$          c) $A \\subset B$          d) $B \\subset C$"
    ])
    builder.add_solution_box([
        "• a) SAI: Tập hợp $A$ có dấu \"$\\le$\" tại $-5$ nên $A = [-5; 2)$, không phải khoảng $(-5; 2)$.",
        "• b) ĐÚNG: $x < 1 \\iff x \\in (-\\infty; 1)$, vậy $B = (-\\infty; 1)$.",
        "• c) SAI: Phần tử $1.5 \\in A$ nhưng $1.5 > 1$ nên $1.5 \\notin B$. Do đó $A$ không phải là tập con của $B$.",
        "• d) SAI: $B = (-\\infty; 1)$ và $C = (7; +\\infty)$ là hai tập hợp hoàn toàn rời nhau ($B \\cap C = \\emptyset$)."
    ], conclusion="a) S – b) Đ – c) S – d) S")

    # Câu 3 Đúng/Sai
    builder.add_problem_header("Câu 3:", "Cho hai tập hợp $A = [-5; 1]$ và $B = (-3; 2)$. Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) $A \\cup B = [-3; 2)$          b) $A \\cap B = (-3; 1]$          c) $A \\setminus B = [-5; -3]$          d) $C_\\mathbb{R}(A \\cup B) = (-\\infty; -5) \\cup [1; +\\infty)$"
    ])
    builder.add_solution_box([
        "• a) SAI: Hợp của hai tập hợp là $A \\cup B = [-5; 2)$, không phải $[-3; 2)$.",
        "• b) ĐÚNG: Giao của hai tập hợp là phần chung: $A \\cap B = (-3; 1]$.",
        "• c) ĐÚNG: Hiệu $A \\setminus B$ gồm các phần tử thuộc $A$ nhưng không thuộc $B$: $A \\setminus B = [-5; -3]$.",
        "• d) SAI: Vì $A \\cup B = [-5; 2)$ nên phần bù trong $\\mathbb{R}$ là $C_\\mathbb{R}(A \\cup B) = (-\\infty; -5) \\cup [2; +\\infty)$."
    ], conclusion="a) S – b) Đ – c) Đ – d) S")

    # Câu 4 Đúng/Sai
    builder.add_problem_header("Câu 4:", "Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) Cho bất phương trình $3 - 2y > 0$ có miền nghiệm là nửa mặt phẳng bờ $3 - 2y = 0$ chứa $O$ (không kể bờ).",
        "b) Cho bất phương trình $x + 2y > 1$ có miền nghiệm chứa gốc tọa độ $O(0; 0)$.",
        "c) Cho bất phương trình $x - 2y \\ge 1$, điểm $(1; 1)$ thuộc miền nghiệm.",
        "d) Cho bất phương trình $x - y < 0$, điểm $(2; 1)$ thuộc miền nghiệm."
    ])
    builder.add_solution_box([
        "• a) ĐÚNG: Thay $O(0; 0)$ vào: $3 - 2(0) = 3 > 0$ (mệnh đề đúng). BPT có dấu \"$>$\" nên miền nghiệm không kể bờ.",
        "• b) SAI: Thay $O(0; 0)$ vào: $0 + 0 = 0 > 1$ (mệnh đề sai), do đó miền nghiệm không chứa gốc $O$.",
        "• c) SAI: Thay $(1; 1)$ vào: $1 - 2(1) = -1 \\ge 1$ (sai), vậy $(1; 1)$ không thuộc miền nghiệm.",
        "• d) SAI: Thay $(2; 1)$ vào: $2 - 1 = 1 < 0$ (sai), vậy $(2; 1)$ không thuộc miền nghiệm."
    ], conclusion="a) Đ – b) S – c) S – d) S")

    # Câu 5 Đúng/Sai
    builder.add_problem_header("Câu 5:", "Một đội sản xuất cần 3 giờ để làm xong 1 sản phẩm loại I và 2,5 giờ để làm xong 1 sản phẩm loại II. Thời gian tối đa là 20 giờ. Gọi $x, y$ lần lượt là số sản phẩm loại I và loại II đội sản xuất ($x, y \\ge 0$). Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) Bất phương trình biểu thị mối quan hệ thời gian là $3x + 2,5y \\ge 20$.",
        "b) Bất phương trình biểu thị mối quan hệ thời gian là $3x + 2,5y < 20$.",
        "c) Bất phương trình biểu thị mối quan hệ thời gian là $3x + 2,5y \\le 20$.",
        "d) Cặp số $(5; 3)$ thuộc miền nghiệm của bất phương trình trên."
    ])
    builder.add_solution_box([
        "• Tổng thời gian sản xuất $x$ sản phẩm loại I và $y$ sản phẩm loại II là: $3x + 2,5y$ (giờ).",
        "• Vì thời gian tối đa là 20 giờ (không vượt quá 20 giờ) nên ta có điều kiện: $3x + 2,5y \\le 20$.",
        "• Do đó a) SAI, b) SAI (vì được phép bằng 20), c) ĐÚNG.",
        "• d) SAI: Thay $(5; 3)$ vào: $3(5) + 2,5(3) = 15 + 7,5 = 22,5 > 20$ (không thỏa mãn)."
    ], conclusion="a) S – b) S – c) Đ – d) S")

    # Câu 6 Đúng/Sai
    builder.add_problem_header("Câu 6:", "Bác Minh có kế hoạch đầu tư không quá 240 triệu đồng vào hai khoản X và khoản Y. Để đạt lợi nhuận thì khoản Y phải đầu tư ít nhất 40 triệu đồng và số tiền đầu tư cho khoản X phải ít nhất gấp ba lần số tiền cho khoản Y. Gọi $x, y$ (triệu đồng) lần lượt là số tiền đầu tư vào khoản X và Y. Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) Hệ bất phương trình mô tả bài toán là $\\begin{cases} x + y \\le 240 \\\\ y \\ge 40 \\\\ x \\ge 3y \\end{cases}$.",
        "b) Miền nghiệm của hệ bất phương trình là một tứ giác.",
        "c) Điểm $C(200; 40)$ không thuộc miền nghiệm của hệ bất phương trình.",
        "d) Điểm $A(180; 60)$ là điểm có tung độ lớn nhất thuộc miền nghiệm."
    ])
    builder.add_solution_box([
        "• a) ĐÚNG: Tổng vốn không quá 240 triệu ($x + y \\le 240$), Y ít nhất 40 triệu ($y \\ge 40$), X gấp ít nhất 3 lần Y ($x \\ge 3y$).",
        "• b) SAI: Miền nghiệm là một hình tam giác có 3 đỉnh: $A(180; 60), B(120; 40), C(200; 40)$ (bút tích sửa: tam giác).",
        "• c) SAI: Thay $C(200; 40)$ vào: $200 + 40 = 240 \\le 240$, $40 \\ge 40$, $200 \\ge 3(40) = 120$ thỏa mãn tất cả các điều kiện, nên $C$ thuộc miền nghiệm.",
        "• d) ĐÚNG: Giao của $x = 3y$ và $x + y = 240$ là $3y + y = 240 \\iff 4y = 240 \\iff y = 60 \\implies x = 180$. Điểm $A(180; 60)$ có tung độ lớn nhất $y_{max} = 60$."
    ], conclusion="a) Đ – b) S – c) S – d) Đ")

    # Câu 7 Đúng/Sai
    builder.add_problem_header("Câu 7:", "Cho $\\sin\\alpha = \\frac{3}{5}$ với $90^\\circ < \\alpha < 180^\\circ$. Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) $\\cos\\alpha > 0$          b) $\\cos^2\\alpha = \\frac{16}{25}$          c) $\\cos\\alpha = \\frac{4}{5}$          d) $\\tan\\alpha = \\frac{3}{4}$"
    ])
    builder.add_solution_box([
        "• Vì $90^\\circ < \\alpha < 180^\\circ$ (góc tù, thuộc góc phần tư thứ II) nên $\\cos\\alpha < 0$ và $\\tan\\alpha < 0$.",
        "• a) SAI: Vì $\\cos\\alpha < 0$.",
        "• b) ĐÚNG: $\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}$.",
        "• c) SAI: Vì $\\cos\\alpha < 0$ nên $\\cos\\alpha = -\\sqrt{\\frac{16}{25}} = -\\frac{4}{5}$.",
        "• d) SAI: $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{3/5}{-4/5} = -\\frac{3}{4}$."
    ], conclusion="a) S – b) Đ – c) S – d) S")

    # Câu 8 Đúng/Sai
    builder.add_problem_header("Câu 8:", "Cho $\\cot\\alpha = -\\sqrt{2}$ với $0^\\circ < \\alpha < 180^\\circ$. Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) $\\sin\\alpha > 0$          b) $\\sin\\alpha = \\pm \\frac{1}{\\sqrt{3}}$          c) $\\cos\\alpha = -\\frac{\\sqrt{6}}{3}$          d) $\\tan\\alpha = \\frac{1}{2}$"
    ])
    builder.add_solution_box([
        "• Vì $\\cot\\alpha = -\\sqrt{2} < 0$ và $0^\\circ < \\alpha < 180^\\circ$ nên $\\alpha$ là góc tù ($90^\\circ < \\alpha < 180^\\circ$) $\\implies \\sin\\alpha > 0$ và $\\cos\\alpha < 0$.",
        "• a) ĐÚNG: Sin của một góc trong khoảng $(0^\\circ; 180^\\circ)$ luôn dương.",
        "• b) SAI: Áp dụng $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha} \\iff 1 + 2 = \\frac{1}{\\sin^2\\alpha} \\implies \\sin^2\\alpha = \\frac{1}{3}$. Vì $\\sin\\alpha > 0$ nên $\\sin\\alpha = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$, không lấy dấu âm.",
        "• c) ĐÚNG: $\\cos\\alpha = \\cot\\alpha \\cdot \\sin\\alpha = -\\sqrt{2} \\cdot \\frac{1}{\\sqrt{3}} = -\\frac{\\sqrt{6}}{3}$.",
        "• d) SAI: $\\tan\\alpha = \\frac{1}{\\cot\\alpha} = -\\frac{1}{\\sqrt{2}} = -\\frac{\\sqrt{2}}{2}$."
    ], conclusion="a) Đ – b) S – c) Đ – d) S")

    # Câu 9 Đúng/Sai
    builder.add_problem_header("Câu 9:", "Cho tam giác $ABC$ có $AC = 8, AB = 5, \\widehat{A} = 60^\\circ$. Các mệnh đề sau đúng hay sai?")
    builder.add_problem_statement([
        "a) $BC = 7$",
        "b) $S_{ABC} = 10$",
        "c) Bán kính đường tròn ngoại tiếp $\\Delta ABC$ bằng $\\frac{7\\sqrt{3}}{3}$",
        "d) Bán kính đường tròn nội tiếp $\\Delta ABC$ bằng $\\frac{\\sqrt{3}}{2}$"
    ])
    builder.add_solution_box([
        "• a) ĐÚNG: Định lý côsin: $BC^2 = AB^2 + AC^2 - 2 \\cdot AB \\cdot AC \\cos A = 25 + 64 - 2(5)(8)\\frac{1}{2} = 49 \\implies BC = 7$.",
        "• b) SAI: $S_{ABC} = \\frac{1}{2} AB \\cdot AC \\sin A = \\frac{1}{2} \\cdot 5 \\cdot 8 \\cdot \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}$ (bút tích sửa 10 thành $10\\sqrt{3}$).",
        "• c) ĐÚNG: $R = \\frac{abc}{4S} = \\frac{5 \\cdot 8 \\cdot 7}{4 \\cdot 10\\sqrt{3}} = \\frac{280}{40\\sqrt{3}} = \\frac{7}{\\sqrt{3}} = \\frac{7\\sqrt{3}}{3}$.",
        "• d) SAI: Nửa chu vi $p = \\frac{5 + 8 + 7}{2} = 10$. Bán kính $r = \\frac{S}{p} = \\frac{10\\sqrt{3}}{10} = \\sqrt{3}$ (bút tích sửa thành $\\sqrt{3}$)."
    ], conclusion="a) Đ – b) S – c) Đ – d) S")


    # ==========================================
    # PHẦN C. TỰ LUẬN (10 BÀI)
    # ==========================================
    builder.add_section("C. PHẦN TỰ LUẬN (10 BÀI)")

    # Bài 1
    builder.add_problem_header("Bài 1:", "Cho hai tập hợp $A = \\{x \\in \\mathbb{R} \\mid -2 < x \\le 1\\}$ và $B = \\{x \\in \\mathbb{R} \\mid x > 0\\}$.")
    builder.add_problem_statement([
        "a) Dùng kí hiệu khoảng, đoạn, nửa khoảng viết lại các tập hợp $A, B$.",
        "b) Xác định các tập hợp sau: $A \\cap B$; $A \\cup B$; $B \\setminus A$; $C_\\mathbb{R} A$."
    ])
    builder.add_solution_box([
        "• a) Viết lại các tập hợp dưới dạng kí hiệu chuẩn:",
        "  + $A = (-2; 1]$ (nửa khoảng từ $-2$ đến $1$).",
        "  + $B = (0; +\\infty)$ (khoảng từ $0$ đến dương vô cực).",
        "• b) Thực hiện các phép toán tập hợp:",
        "  + $A \\cap B$: Lấy phần chung giữa $(-2; 1]$ và $(0; +\\infty)$:",
        "    $$A \\cap B = (0; 1]$$",
        "  + $A \\cup B$: Lấy tất cả các phần tử thuộc ít nhất một trong hai tập hợp:",
        "    $$A \\cup B = (-2; +\\infty)$$ ",
        "  + $B \\setminus A$: Lấy các phần tử thuộc $B$ nhưng không thuộc $A$:",
        "    $$B \\setminus A = (1; +\\infty)$$",
        "  + $C_\\mathbb{R} A$: Phần bù của tập $A$ trong tập số thực $\\mathbb{R}$:",
        "    $$C_\\mathbb{R} A = \\mathbb{R} \\setminus A = (-\\infty; -2] \\cup (1; +\\infty)$$"
    ], conclusion="Đã hoàn thành đầy đủ các phép toán tập hợp.")

    # Bài 2
    builder.add_problem_header("Bài 2:", "Cho số nguyên $m$ và hai tập hợp: $X = \\{x \\in \\mathbb{Z} \\mid 2x^2 - (2m+1)x + m = 0\\}$, $Y = \\{x \\in \\mathbb{Z} \\mid (x^3+1)(2x^2-3x+1) = 0\\}$. Tìm $m$ để $X = Y$?")
    builder.add_solution_box([
        "• Tìm các phần tử của tập hợp $Y$:",
        "  + Phương trình $(x^3+1)(2x^2-3x+1) = 0 \\iff \\left[ \\begin{array}{l} x^3 + 1 = 0 \\\\ 2x^2 - 3x + 1 = 0 \\end{array} \\right.$",
        "  + $x^3 + 1 = 0 \\iff x = -1 \\in \\mathbb{Z}$.",
        "  + $2x^2 - 3x + 1 = 0 \\iff (x-1)(2x-1) = 0 \\implies x = 1 \\in \\mathbb{Z}$ hoặc $x = \\frac{1}{2} \\notin \\mathbb{Z}$ (loại).",
        "  + Do đó, tập hợp $Y$ có đúng 2 phần tử nguyên: $Y = \\{-1; 1\\}$.",
        "• Để $X = Y$, phương trình bậc hai $2x^2 - (2m+1)x + m = 0$ phải có đúng 2 nghiệm nguyên là $x = 1$ và $x = -1$:",
        "  + Thay $x = 1$ vào phương trình:",
        "    $$2(1)^2 - (2m+1)(1) + m = 0 \\iff 2 - 2m - 1 + m = 0 \\iff 1 - m = 0 \\iff m = 1$$",
        "  + Kiểm tra lại với $m = 1$: Phương trình trở thành $2x^2 - 3x + 1 = 0 \\implies x = 1, x = \\frac{1}{2} \\notin \\mathbb{Z} \\implies X = \\{1\\} \\ne Y$.",
        "  + Thay $x = -1$ vào phương trình:",
        "    $$2(-1)^2 - (2m+1)(-1) + m = 0 \\iff 2 + 2m + 1 + m = 0 \\iff 3 + 3m = 0 \\iff m = -1$$",
        "  + Kiểm tra lại với $m = -1$: Phương trình trở thành $2x^2 + x - 1 = 0 \\implies x = -1, x = \\frac{1}{2} \\notin \\mathbb{Z} \\implies X = \\{-1\\} \\ne Y$.",
        "• Kết luận: Không tồn tại số nguyên $m$ nào để $X = Y$ (hay $m \\in \\emptyset$)."
    ], conclusion="Không tồn tại số nguyên m thỏa mãn điều kiện đề bài.")

    # Bài 3
    builder.add_problem_header("Bài 3:", "Cho 2 tập hợp khác rỗng $A = (-3; m+1]$ và $B = [2m-4; 6]$ ($m \\in \\mathbb{R}$). Tìm $m$ để $A \\subset B$?")
    builder.add_solution_box([
        "• Bước 1: Tìm điều kiện để các tập hợp $A$ và $B$ khác rỗng:",
        "  + Tập $A \\ne \\emptyset \\iff m + 1 > -3 \\iff m > -4$.",
        "  + Tập $B \\ne \\emptyset \\iff 2m - 4 \\le 6 \\iff 2m \\le 10 \\iff m \\le 5$.",
        "  + Điều kiện để cả $A$ và $B$ đều khác rỗng là: $-4 < m \\le 5$.",
        "• Bước 2: Điều kiện để $A \\subset B$:",
        "  + Để $(-3; m+1] \\subset [2m-4; 6]$ thì đầu mút trái của $B$ phải nằm bên trái đầu mút trái của $A$, và đầu mút phải của $A$ phải nằm bên trái hoặc trùng đầu mút phải của $B$:",
        "  $$\\begin{cases} 2m - 4 \\le -3 \\\\ m + 1 \\le 6 \\end{cases} \\iff \\begin{cases} 2m \\le 1 \\\\ m \\le 5 \\end{cases} \\iff \\begin{cases} m \\le \\frac{1}{2} \\\\ m \\le 5 \\end{cases} \\iff m \\le \\frac{1}{2}$$",
        "• Bước 3: Kết hợp với điều kiện khác rỗng $-4 < m \\le 5$:",
        "  $$-4 < m \\le \\frac{1}{2}$$"
    ], conclusion="Giá trị cần tìm là -4 < m ≤ 1/2.")

    # Bài 4
    builder.add_problem_header("Bài 4:", "Cho hệ bất phương trình $(I): \\begin{cases} x \\le 0 \\\\ y \\ge -1 \\\\ 4x - 3y \\ge -12 \\\\ x + y \\le 1 \\end{cases}$.")
    builder.add_problem_statement([
        "a) Biểu diễn miền nghiệm của hệ bất phương trình $(I)$ trên mặt phẳng hệ trục tọa độ $Oxy$.",
        "b) Tìm giá trị lớn nhất và giá trị nhỏ nhất của biểu thức $f(x; y) = 4x - 3y$ biết $(x; y)$ thỏa mãn hệ $(I)$."
    ])
    builder.add_solution_box([
        "• a) Biểu diễn miền nghiệm:",
        "  + Miền nghiệm của hệ là miền tứ giác $ABCD$ (kể cả biên) có các đỉnh là giao điểm của các đường thẳng bờ:",
        "  + Đỉnh $A\\left(-\\frac{9}{7}; \\frac{16}{7}\\right)$ là giao của $4x - 3y = -12$ và $x + y = 1$.",
        "  + Đỉnh $B\\left(-\\frac{15}{4}; -1\\right)$ là giao của $4x - 3y = -12$ và $y = -1$.",
        "  + Đỉnh $C(0; -1)$ là giao của $y = -1$ và $x = 0$.",
        "  + Đỉnh $D(0; 1)$ là giao của $x + y = 1$ và $x = 0$.",
        "• b) Tìm GTLN và GTNN của biểu thức $f(x; y) = 4x - 3y$:",
        "  + Tính giá trị của $f(x; y)$ tại 4 đỉnh của tứ giác:",
        "    $$f(A) = 4\\left(-\\frac{9}{7}\\right) - 3\\left(\\frac{16}{7}\\right) = -\\frac{36}{7} - \\frac{48}{7} = -\\frac{84}{7} = -12$$",
        "    $$f(B) = 4\\left(-\\frac{15}{4}\\right) - 3(-1) = -15 + 3 = -12$$",
        "    $$f(C) = 4(0) - 3(-1) = 3$$",
        "    $$f(D) = 4(0) - 3(1) = -3$$",
        "  + So sánh các giá trị:",
        "    Giá trị lớn nhất: $\\max f(x; y) = 3$ đạt tại đỉnh $C(0; -1)$.",
        "    Giá trị nhỏ nhất: $\\min f(x; y) = -12$ đạt tại mọi điểm trên đoạn thẳng $AB$ (vì đường thẳng $4x - 3y = -12$ song song với mức của $f$)."
    ], image_path=os.path.join(fig_dir, "part_c_b4.png"), image_width=4.0, conclusion="Max f = 3 tại C(0; -1); Min f = -12 trên đoạn thẳng AB.")

    # Bài 5
    builder.add_problem_header("Bài 5:", "Cho tam giác $ABC$ có $a = 12, b = 15, c = 13$.")
    builder.add_problem_statement([
        "a) Tính số đo các góc của tam giác $ABC$ (làm tròn đến phút).",
        "b) Tính diện tích $S$, bán kính ngoại tiếp $R$, bán kính nội tiếp $r$.",
        "c) Gọi $M$ thuộc cạnh $BC$ sao cho $BM = 8$. Tính độ dài đoạn thẳng $AM$."
    ])
    builder.add_solution_box([
        "• a) Áp dụng hệ quả định lý côsin tính các góc:",
        "  + $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{15^2 + 13^2 - 12^2}{2 \\cdot 15 \\cdot 13} = \\frac{225 + 169 - 144}{390} = \\frac{250}{390} = \\frac{25}{39} \\implies \\widehat{A} \\approx 50^\\circ 8'$.",
        "  + $\\cos B = \\frac{a^2 + c^2 - b^2}{2ac} = \\frac{12^2 + 13^2 - 15^2}{2 \\cdot 12 \\cdot 13} = \\frac{144 + 169 - 225}{312} = \\frac{88}{312} = \\frac{11}{39} \\implies \\widehat{B} \\approx 73^\\circ 37'$.",
        "  + $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) \\approx 180^\\circ - 123^\\circ 45' = 56^\\circ 15'$.",
        "• b) Tính $S, R, r$:",
        "  + Nửa chu vi $p = \\frac{12 + 15 + 13}{2} = 20$.",
        "  + Áp dụng công thức Heron:",
        "    $$S = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{20(20-12)(20-15)(20-13)} = \\sqrt{20 \\cdot 8 \\cdot 5 \\cdot 7} = \\sqrt{5600} = 20\\sqrt{14}$$",
        "  + Bán kính đường tròn ngoại tiếp: $R = \\frac{abc}{4S} = \\frac{12 \\cdot 15 \\cdot 13}{4 \\cdot 20\\sqrt{14}} = \\frac{2340}{80\\sqrt{14}} = \\frac{117\\sqrt{14}}{56} \\approx 7.82$.",
        "  + Bán kính đường tròn nội tiếp: $r = \\frac{S}{p} = \\frac{20\\sqrt{14}}{20} = \\sqrt{14} \\approx 3.74$.",
        "• c) Tính độ dài đoạn thẳng $AM$:",
        "  + Xét tam giác $ABM$ có $AB = 13, BM = 8, \\cos B = \\frac{11}{39}$:",
        "  + Định lý côsin: $AM^2 = AB^2 + BM^2 - 2 \\cdot AB \\cdot BM \\cdot \\cos B$",
        "    $$AM^2 = 13^2 + 8^2 - 2 \\cdot 13 \\cdot 8 \\cdot \\frac{11}{39} = 169 + 64 - \\frac{176}{3} = 233 - \\frac{176}{3} = \\frac{523}{3}$$",
        "  + Suy ra $AM = \\sqrt{\\frac{523}{3}} \\approx 13.2$."
    ], conclusion="A ≈ 50°8'; B ≈ 73°37'; C ≈ 56°15'; S = 20√14; R = 117√14/56; r = √14; AM ≈ 13.2.")

    # Bài 6
    builder.add_problem_header("Bài 6:", "Cho tam giác $ABC$ có $AB = 6, AC = 8, \\widehat{A} = 120^\\circ$.")
    builder.add_problem_statement([
        "a) Tính diện tích tam giác $ABC$.",
        "b) Tính độ dài cạnh $BC$ và độ dài đường cao $AH$ của tam giác $ABC$."
    ])
    builder.add_solution_box([
        "• a) Diện tích tam giác $ABC$:",
        "  $$S = \\frac{1}{2} AB \\cdot AC \\cdot \\sin A = \\frac{1}{2} \\cdot 6 \\cdot 8 \\cdot \\sin 120^\\circ = 24 \\cdot \\frac{\\sqrt{3}}{2} = 12\\sqrt{3}$$",
        "• b) Độ dài cạnh $BC$ và đường cao $AH$:",
        "  + Áp dụng định lý côsin:",
        "    $$BC^2 = AB^2 + AC^2 - 2 \\cdot AB \\cdot AC \\cdot \\cos 120^\\circ = 6^2 + 8^2 - 2 \\cdot 6 \\cdot 8 \\cdot \\left(-\\frac{1}{2}\\right) = 36 + 64 + 48 = 148$$",
        "    $$BC = \\sqrt{148} = 2\\sqrt{37} \\approx 12.17$$",
        "  + Chiều cao $AH$ hạ từ đỉnh $A$:",
        "    $$AH = \\frac{2S}{BC} = \\frac{2 \\cdot 12\\sqrt{3}}{2\\sqrt{37}} = \\frac{12\\sqrt{3}}{\\sqrt{37}} = \\frac{12\\sqrt{111}}{37} \\approx 3.42$$"
    ], conclusion="S = 12√3; BC = 2√37; AH = 12√111/37 ≈ 3.42.")

    # Bài 7
    builder.add_problem_header("Bài 7:", "Cho tam giác $ABC$ có $\\widehat{A} = 30^\\circ, \\widehat{B} = 120^\\circ, b = 8$.")
    builder.add_problem_statement([
        "a) Tính độ dài cạnh $a, c$.",
        "b) Tính bán kính đường tròn ngoại tiếp tam giác $ABC$.",
        "c) Tính diện tích tam giác $ABC$."
    ])
    builder.add_solution_box([
        "• a) Tính các cạnh $a, c$:",
        "  + Góc $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - 150^\\circ = 30^\\circ$.",
        "  + Do $\\widehat{A} = \\widehat{C} = 30^\\circ$ nên tam giác $ABC$ cân tại $B \\implies a = c$.",
        "  + Áp dụng định lý sin:",
        "    $$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\implies a = c = \\frac{b \\cdot \\sin 30^\\circ}{\\sin 120^\\circ} = \\frac{8 \\cdot \\frac{1}{2}}{\\frac{\\sqrt{3}}{2}} = \\frac{8}{\\sqrt{3}} = \\frac{8\\sqrt{3}}{3}$$",
        "• b) Bán kính đường tròn ngoại tiếp $R$:",
        "  $$R = \\frac{b}{2\\sin B} = \\frac{8}{2 \\sin 120^\\circ} = \\frac{8}{2 \\cdot \\frac{\\sqrt{3}}{2}} = \\frac{8}{\\sqrt{3}} = \\frac{8\\sqrt{3}}{3}$$",
        "• c) Diện tích tam giác $ABC$:",
        "  $$S = \\frac{1}{2} a c \\sin B = \\frac{1}{2} \\cdot \\frac{8\\sqrt{3}}{3} \\cdot \\frac{8\\sqrt{3}}{3} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{16\\sqrt{3}}{3}$$"
    ], conclusion="a = c = 8√3/3; R = 8√3/3; S = 16√3/3.")

    # Bài 8
    builder.add_problem_header("Bài 8:", "Cho bất phương trình $x + 8y - 200 \\ge 0$.")
    builder.add_problem_statement([
        "a) Chỉ ra một cặp số $(a; b)$ là nghiệm của bất phương trình trên.",
        "b) Chỉ ra một cặp số $(c; d)$ không là nghiệm của bất phương trình trên.",
        "c) Biểu diễn miền nghiệm của bất phương trình trên mặt phẳng tọa độ $Oxy$."
    ])
    builder.add_solution_box([
        "• a) Tìm cặp nghiệm thỏa mãn:",
        "  + Chọn $x = 0$, bất phương trình trở thành $8y - 200 \\ge 0 \\iff y \\ge 25$. Chọn $y = 30$, ta được cặp $(0; 30)$ là nghiệm (hoặc chọn $(200; 0)$).",
        "• b) Tìm cặp số không phải là nghiệm:",
        "  + Chọn gốc tọa độ $O(0; 0)$: thay $x = 0, y = 0$ ta có $0 + 8(0) - 200 = -200 < 0$ (không thỏa mãn). Do đó $(0; 0)$ không là nghiệm.",
        "• c) Biểu diễn miền nghiệm:",
        "  + Vẽ đường thẳng $d: x + 8y - 200 = 0$ đi qua hai điểm $A(0; 25)$ và $B(200; 0)$.",
        "  + Miền nghiệm của bất phương trình là nửa mặt phẳng bờ $d$ không chứa gốc tọa độ $O(0; 0)$, kể cả bờ $d$."
    ], conclusion="Cặp nghiệm: (0; 30); Cặp không là nghiệm: (0; 0); Miền nghiệm là nửa mp không chứa O.")

    # Bài 9
    builder.add_problem_header("Bài 9:", "Một xưởng cơ khí có hai công nhân là Chiến và Bình sản xuất loại sản phẩm I và II. Mỗi sản phẩm I bán lãi 500 nghìn đồng, mỗi sản phẩm II bán lãi 400 nghìn đồng. Để làm 1 sản phẩm I cần Chiến làm trong 3 giờ và Bình làm trong 1 giờ. Để làm 1 sản phẩm II cần Chiến làm trong 2 giờ và Bình làm trong 6 giờ. Một tháng Chiến làm không quá 180 giờ, Bình làm không quá 220 giờ. Hỏi xưởng nên sản xuất bao nhiêu sản phẩm mỗi loại để tiền lãi lớn nhất?")
    builder.add_solution_box([
        "• Gọi $x, y$ lần lượt là số sản phẩm loại I và loại II xưởng sản xuất trong một tháng ($x, y \\ge 0, x, y \\in \\mathbb{N}$).",
        "• Tổng tiền lãi thu được là $L(x; y) = 500x + 400y$ (nghìn đồng).",
        "• Thời gian làm việc của Chiến: $3x + 2y \\le 180$.",
        "• Thời gian làm việc của Bình: $x + 6y \\le 220$.",
        "• Hệ bất phương trình mô tả các điều kiện thực tế:",
        "  $$\\begin{cases} 3x + 2y \\le 180 \\\\ x + 6y \\le 220 \\\\ x \\ge 0, y \\ge 0 \\end{cases}$$",
        "• Miền nghiệm của hệ là miền tứ giác $OABC$ với các đỉnh:",
        "  + $O(0; 0)$",
        "  + $A(60; 0)$ (giao của $3x + 2y = 180$ và $y = 0$)",
        "  + $B(40; 30)$ (nghiệm của hệ $\\begin{cases} 3x + 2y = 180 \\\\ x + 6y = 220 \\end{cases}$)",
        "  + $C\\left(0; \\frac{110}{3}\\right)$ (giao của $x + 6y = 220$ và $x = 0$)",
        "• Tính giá trị tiền lãi $L(x; y)$ tại các đỉnh:",
        "  + $L(O) = 0$",
        "  + $L(A) = 500(60) + 400(0) = 30\\,000$ nghìn đồng.",
        "  + $L(B) = 500(40) + 400(30) = 20\\,000 + 12\\,000 = 32\\,000$ nghìn đồng (32 triệu đồng).",
        "  + $L(C) = 500(0) + 400\\left(\\frac{110}{3}\\right) \\approx 14\\,667$ nghìn đồng.",
        "• Tiền lãi lớn nhất là $32\\,000\\,000$ đồng khi xưởng sản xuất 40 sản phẩm loại I và 30 sản phẩm loại II."
    ], image_path=os.path.join(fig_dir, "part_c_b9.png"), image_width=4.0, conclusion="Sản xuất 40 sản phẩm loại I và 30 sản phẩm loại II để đạt tiền lãi lớn nhất là 32 000 000 đồng.")

    # Bài 10
    builder.add_problem_header("Bài 10:", "Anh An làm nghề thợ mộc chuyên đóng bàn và ghế học sinh. Mỗi cái bàn bán lãi 150 nghìn đồng, mỗi cái ghế bán lãi 100 nghìn đồng. Một tuần anh làm việc không quá 60 giờ. Đóng 1 cái bàn tốn 6 giờ, đóng 1 cái ghế tốn 3 giờ. Để có lãi, anh phải làm số ghế nhiều hơn số bàn ít nhất 2 lần. Hỏi một tuần anh An phải đóng bao nhiêu bàn và ghế để số tiền lãi thu về lớn nhất?")
    builder.add_solution_box([
        "• Gọi $x, y$ lần lượt là số bàn và ghế anh An đóng trong một tuần ($x, y \\ge 0, x, y \\in \\mathbb{N}$).",
        "• Tiền lãi thu về là biểu thức: $L(x; y) = 150x + 100y$ (nghìn đồng).",
        "• Điều kiện thời gian làm việc: $6x + 3y \\le 60 \\iff 2x + y \\le 20$.",
        "• Điều kiện số ghế nhiều hơn số bàn ít nhất 2 lần: $y \\ge 2x$.",
        "• Hệ bất phương trình ràng buộc:",
        "  $$\\begin{cases} 2x + y \\le 20 \\\\ y \\ge 2x \\\\ x \\ge 0, y \\ge 0 \\end{cases}$$",
        "• Miền nghiệm của hệ là miền tam giác $OAB$ với các đỉnh:",
        "  + Gốc $O(0; 0)$",
        "  + Đỉnh $A(0; 20)$ (giao của $2x + y = 20$ và $x = 0$)",
        "  + Đỉnh $B(5; 10)$ (giao của $2x + y = 20$ và $y = 2x \\implies 2x + 2x = 20 \\implies x = 5, y = 10$)",
        "• Tính tiền lãi $L(x; y)$ tại các đỉnh:",
        "  + $L(O) = 0$",
        "  + $L(A) = 150(0) + 100(20) = 2\\,000$ nghìn đồng (2 triệu đồng).",
        "  + $L(B) = 150(5) + 100(10) = 750 + 1000 = 1\\,750$ nghìn đồng.",
        "• Tiền lãi lớn nhất đạt được là $2\\,000\\,000$ đồng/tuần khi anh An đóng 0 chiếc bàn và 20 chiếc ghế."
    ], image_path=os.path.join(fig_dir, "part_c_b10.png"), image_width=4.0, conclusion="Đóng 0 cái bàn và 20 cái ghế để đạt tiền lãi lớn nhất là 2 000 000 đồng/tuần.")

    # ==========================================
    # PHẦN III. TỰ ĐÁNH GIÁ SAU BUỔI ÔN
    # ==========================================
    builder.add_self_evaluation([
        "Nắm vững lý thuyết mệnh đề toán học, phủ định, kéo theo và xác định tính đúng/sai.",
        "Thành thạo các phép toán hợp, giao, hiệu, phần bù trên tập hợp và khoảng, đoạn số thực.",
        "Biểu diễn chính xác miền nghiệm của bất phương trình và hệ bất phương trình bậc nhất hai ẩn trên hệ trục Oxy.",
        "Vận dụng thành thạo bài toán quy hoạch tuyến tính tìm giá trị lớn nhất, nhỏ nhất trong bài toán thực tế sản xuất.",
        "Thuộc lòng định lý sin, côsin và các công thức tính diện tích tam giác, bán kính ngoại tiếp, nội tiếp."
    ])

    out_path = r"c:\code\mathplus\lop10\ĐA GKI T10 Hoàng Văn Thụ.docx"
    builder.doc.save(out_path)
    print(f"Document saved successfully to: {out_path}")

if __name__ == "__main__":
    build_document()
