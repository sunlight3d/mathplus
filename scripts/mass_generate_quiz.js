const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
const OLLAMA_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const TARGET_PER_GRADE = 310;
const BATCH_SIZE = 10;
const CONCURRENCY = 4;

const GRADE_TOPICS = {
  6: [
    "Tập hợp và các phép tính trong tập hợp số tự nhiên (Cộng, trừ, nhân, chia, lũy thừa, thứ tự thực hiện phép tính)",
    "Tính chất chia hết, dấu hiệu chia hết cho 2, 3, 5, 9",
    "Số nguyên tố, hợp số, phân tích một số ra thừa số nguyên tố, ước chung và bội chung, ƯCLN và BCNN",
    "Số nguyên âm, tập hợp số nguyên, thứ tự trong tập hợp số nguyên, so sánh số nguyên",
    "Các phép tính cộng, trừ, nhân, chia số nguyên, quy tắc dấu ngoặc, quy tắc chuyển vế",
    "Bội và ước của một số nguyên, bài toán tìm x với số nguyên",
    "Phân số, phân số bằng nhau, tính chất cơ bản của phân số, rút gọn phân số",
    "So sánh phân số, các phép tính cộng, trừ, nhân, chia phân số, hỗn số",
    "Hai bài toán cơ bản về phân số: tìm giá trị phân số của một số, tìm một số biết giá trị phân số của nó",
    "Số thập phân, các phép tính với số thập phân, làm tròn số và ước lượng kết quả",
    "Tỉ số, tỉ số phần trăm, bài toán thực tế mua bán, giảm giá, lãi suất đơn giản",
    "Hình tam giác đều, hình vuông, hình lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân",
    "Chu vi và diện tích các hình phẳng trong thực tiễn (hình chữ nhật, hình vuông, hình thang, hình thoi, hình bình hành)",
    "Hình có trục đối xứng, hình có tâm đối xứng, tính đối xứng trong tự nhiên và đời sống",
    "Điểm, đường thẳng, tia, đoạn thẳng, độ dài đoạn thẳng, trung điểm của đoạn thẳng",
    "Góc, các góc đặc biệt (góc nhọn, góc vuông, góc tù, góc bẹt), số đo góc"
  ],
  7: [
    "Tập hợp các số hữu tỉ, biểu diễn số hữu tỉ trên trục số, số đối của số hữu tỉ",
    "Cộng, trừ, nhân, chia số hữu tỉ, quy tắc dấu ngoặc trong số hữu tỉ",
    "Lũy thừa với số mũ tự nhiên của một số hữu tỉ, nhân chia hai lũy thừa cùng cơ số, lũy thừa của lũy thừa",
    "Thứ tự thực hiện các phép tính, quy tắc chuyển vế trong tập hợp số hữu tỉ",
    "Số thập phân vô hạn tuần hoàn, làm tròn số thập phân, số vô tỉ và căn bậc hai số học",
    "Tập hợp số thực, trục số thực, giá trị tuyệt đối của một số thực",
    "Tỉ lệ thức, tính chất của tỉ lệ thức, tìm x trong tỉ lệ thức",
    "Tính chất của dãy tỉ số bằng nhau và ứng dụng chia tỉ lệ",
    "Đại lượng tỉ lệ thuận, hệ số tỉ lệ, giải toán đại lượng tỉ lệ thuận",
    "Đại lượng tỉ lệ nghịch, hệ số tỉ lệ, giải toán đại lượng tỉ lệ nghịch",
    "Biểu thức đại số, giá trị của biểu thức đại số, đơn thức và đa thức một biến",
    "Cộng và trừ đa thức một biến, nhân và chia đa thức một biến, nghiệm của đa thức một biến",
    "Góc ở vị trí đặc biệt (hai góc kề bù, hai góc đối đỉnh), tia phân giác của một góc",
    "Hai đường thẳng song song, dấu hiệu nhận biết, tiên đề Euclid, định lý và chứng minh định lý",
    "Tổng các góc trong một tam giác, góc ngoài của tam giác",
    "Hai tam giác bằng nhau, trường hợp bằng nhau thứ nhất (c-c-c), thứ hai (c-g-c), thứ ba (g-c-g)",
    "Các trường hợp bằng nhau của tam giác vuông (cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông)",
    "Tam giác cân, tam giác đều, đường trung trực của đoạn thẳng",
    "Quan hệ giữa góc và cạnh đối diện trong tam giác, bất đẳng thức tam giác",
    "Sự đồng quy của ba đường trung tuyến, ba đường phân giác, ba đường trung trực, ba đường cao trong tam giác"
  ],
  8: [
    "Đơn thức nhiều biến, đa thức nhiều biến, thu gọn đa thức",
    "Cộng, trừ, nhân, chia đa thức nhiều biến",
    "7 Hằng đẳng thức đáng nhớ (Bình phương tổng/hiệu, hiệu hai bình phương, lập phương tổng/hiệu, tổng/hiệu hai lập phương)",
    "Phân tích đa thức thành nhân tử bằng phương pháp đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử",
    "Phân thức đại số, điều kiện xác định, tính chất cơ bản của phân thức đại số",
    "Rút gọn phân thức đại số, quy đồng mẫu thức nhiều phân thức",
    "Cộng, trừ, nhân, chia phân thức đại số, rút gọn biểu thức chứa phân thức",
    "Hàm số, mặt phẳng tọa độ, đồ thị của hàm số",
    "Hàm số bậc nhất y = ax + b (a ≠ 0), tính đồng biến nghịch biến, hệ số góc",
    "Phương trình bậc nhất một ẩn ax + b = 0, giải phương trình đưa về dạng bậc nhất",
    "Giải bài toán bằng cách lập phương trình bậc nhất (Toán chuyển động, năng suất, quan hệ số, phần trăm)",
    "Tứ giác, tổng các góc của một tứ giác, hình thang, hình thang cân",
    "Hình bình hành, hình thoi, hình chữ nhật, hình vuông, dấu hiệu nhận biết và tính chất",
    "Định lý Thales trong tam giác, định lý đảo và hệ quả của định lý Thales",
    "Tính chất đường phân giác trong tam giác",
    "Tam giác đồng dạng, các trường hợp đồng dạng của tam giác (c-c-c, c-g-c, g-g)",
    "Các trường hợp đồng dạng của tam giác vuông, định lý Pythagore đảo",
    "Hình chóp tam giác đều, hình chóp tứ giác đều, diện tích xung quanh và thể tích"
  ],
  9: [
    "Căn bậc hai số học, điều kiện xác định của căn thức bậc hai √A",
    "Liên hệ giữa phép nhân, phép chia và phép khai phương",
    "Các phép biến đổi đơn giản biểu thức chứa căn thức bậc hai (Đưa thừa số ra/vào dấu căn, khử mẫu, trục căn thức)",
    "Rút gọn biểu thức chứa căn thức bậc hai và các câu hỏi phụ liên quan (tìm x nguyên, so sánh, min max)",
    "Phương trình bậc nhất hai ẩn, hệ hai phương trình bậc nhất hai ẩn",
    "Giải hệ phương trình bằng phương pháp thế và phương pháp cộng đại số",
    "Giải bài toán bằng cách lập hệ phương trình bậc nhất hai ẩn (Toán làm chung làm riêng, hình học, chuyển động)",
    "Hàm số y = ax² (a ≠ 0), tính chất, đồ thị parabol và vị trí tương đối giữa Parabol và đường thẳng d: y = mx + n",
    "Phương trình bậc hai một ẩn ax² + bx + c = 0, công thức nghiệm, công thức nghiệm thu gọn",
    "Hệ thức Vi-ét và ứng dụng (Tính giá trị biểu thức đối xứng, tìm hai số biết tổng và tích, lập phương trình)",
    "Phương trình quy về phương trình bậc hai (phương trình trùng phương, phương trình chứa ẩn ở mẫu, phương trình tích)",
    "Hệ thức lượng trong tam giác vuông (Hệ thức cạnh và đường cao)",
    "Tỉ số lượng giác của góc nhọn (sin, cos, tan, cot), hệ thức giữa cạnh và góc trong tam giác vuông",
    "Ứng dụng thực tế của tỉ số lượng giác (đo chiều cao cây, tháp, khoảng cách hai bờ sông)",
    "Đường tròn: Sự xác định đường tròn, tính chất đối xứng, liên hệ giữa đường kính và dây cung, liên hệ giữa cung và dây",
    "Vị trí tương đối của đường thẳng và đường tròn, dấu hiệu nhận biết tiếp tuyến của đường tròn, tính chất hai tiếp tuyến cắt nhau",
    "Góc ở tâm, số đo cung, góc nội tiếp, góc tạo bởi tia tiếp tuyến và dây cung",
    "Góc có đỉnh ở bên trong/bên ngoài đường tròn, cung bị chắn",
    "Tứ giác nội tiếp đường tròn, dấu hiệu nhận biết tứ giác nội tiếp (tổng hai góc đối bằng 180°, hai đỉnh kề nhìn cạnh đối diện)",
    "Độ dài đường tròn, cung tròn, diện tích hình tròn, hình quạt tròn",
    "Hình trụ, hình nón, hình cầu: Diện tích xung quanh, diện tích toàn phần, thể tích và bài toán thực tế"
  ],
  10: [
    "Mệnh đề, mệnh đề phủ định, mệnh đề kéo theo, mệnh đề tương đương, kí hiệu ∀ và ∃",
    "Tập hợp, các phép toán trên tập hợp (giao, hợp, hiệu, phần bù), biểu diễn tập hợp con của ℝ trên trục số",
    "Bất phương trình bậc nhất hai ẩn, biểu diễn miền nghiệm trên mặt phẳng tọa độ",
    "Hệ bất phương trình bậc nhất hai ẩn và bài toán quy hoạch tuyến tính tối ưu thực tế (tìm lợi nhuận tối đa, chi phí tối thiểu)",
    "Giá trị lượng giác của một góc từ 0° đến 180°, công thức lượng giác cơ bản",
    "Hệ thức lượng trong tam giác: Định lý côsin, định lý sin, các công thức tính diện tích tam giác (Heron, S = 1/2ab.sinC, S = pr, S = abc/4R)",
    "Khái niệm vector, vector cùng phương, vector cùng hướng, hai vector bằng nhau, vector không",
    "Tổng và hiệu của hai vector, quy tắc ba điểm, quy tắc hình bình hành, quy tắc trung điểm, quy tắc trọng tâm",
    "Tích của một vector với một số, điều kiện để hai vector cùng phương, biểu thị một vector theo hai vector không cùng phương",
    "Tích vô hướng của hai vector, góc giữa hai vector, biểu thức tọa độ của tích vô hướng, độ dài vector",
    "Tọa độ của vector, tọa độ của một điểm trong mặt phẳng Oxy, tọa độ trung điểm và trọng tâm",
    "Hàm số bậc hai y = ax² + bx + c, tọa độ đỉnh, trục đối xứng, bảng biến thiên và đồ thị",
    "Dấu của tam thức bậc hai, giải bất phương trình bậc hai một ẩn",
    "Phương trình quy về phương trình bậc hai (chứa căn bậc hai: √(ax²+bx+c) = √(dx²+ex+f), √(ax²+bx+c) = dx+e)",
    "Phương trình đường thẳng trong mặt phẳng: Vectơ chỉ phương, vectơ pháp tuyến, PT tham số, PT tổng quát",
    "Vị trí tương đối giữa hai đường thẳng, góc giữa hai đường thẳng, khoảng cách từ một điểm đến một đường thẳng",
    "Phương trình đường tròn trong mặt phẳng, phương trình tiếp tuyến của đường tròn",
    "Ba đường Conic: Phương trình chính tắc của Elip, Hypebol, Parabol và các yếu tố tiêu điểm, tiêu cự, đỉnh, tâm sai",
    "Quy tắc đếm: Quy tắc cộng, quy tắc nhân, sơ đồ cây",
    "Hoán vị, chỉnh hợp, tổ hợp: Định nghĩa, công thức tính và bài toán đếm sắp xếp/chọn lựa",
    "Khai triển nhị thức Newton với số mũ n = 4, n = 5",
    "Xác suất cổ điển: Không gian mẫu, biến cố, công thức tính xác suất của biến cố, quy tắc cộng xác suất"
  ],
  11: [
    "Góc lượng giác, đơn vị radian, công thức đổi độ sang radian, độ dài cung tròn",
    "Giá trị lượng giác của góc lượng giác, công thức lượng giác cơ bản, cung liên kết (cos đối, sin bù, phụ chéo, hơn kém pi tan)",
    "Công thức cộng lượng giác, công thức nhân đôi, công thức hạ bậc, công thức biến đổi tích thành tổng và tổng thành tích",
    "Hàm số lượng giác: y = sin x, y = cos x, y = tan x, y = cot x (Tập xác định, tính chẵn lẻ, tuần hoàn, đồ thị)",
    "Phương trình lượng giác cơ bản: sin x = m, cos x = m, tan x = m, cot x = m",
    "Dãy số: Định nghĩa, cách cho dãy số, dãy số tăng, giảm, dãy số bị chặn",
    "Cấp số cộng: Định nghĩa, số hạng tổng quát un = u1 + (n-1)d, tính chất, tổng n số hạng đầu Sn",
    "Cấp số nhân: Định nghĩa, số hạng tổng quát un = u1 . q^(n-1), tổng n số hạng đầu Sn, tổng cấp số nhân lùi vô hạn",
    "Giới hạn của dãy số: Định nghĩa, các giới hạn đặc biệt, định lý về giới hạn hữu hạn, tính giới hạn vô cực",
    "Giới hạn của hàm số tại một điểm, giới hạn một bên, giới hạn tại vô cực, các dạng vô định 0/0, ∞/∞, ∞ - ∞",
    "Hàm số liên tục tại một điểm, liên tục trên một khoảng, định lý giá trị trung gian và chứng minh phương trình có nghiệm",
    "Định nghĩa đạo hàm, ý nghĩa hình học của đạo hàm (hệ số góc của tiếp tuyến, phương trình tiếp tuyến của đồ thị hàm số)",
    "Các quy tắc tính đạo hàm (tổng, hiệu, tích, thương, hàm hợp)",
    "Đạo hàm của hàm số lượng giác (sin, cos, tan, cot)",
    "Đạo hàm cấp hai và ý nghĩa cơ học (vận tốc tức thời, gia tốc)",
    "Điểm, đường thẳng và mặt phẳng trong không gian, các tiên đề thừa nhận, cách xác định mặt phẳng",
    "Hai đường thẳng song song trong không gian, hai đường thẳng chéo nhau",
    "Đường thẳng song song với mặt phẳng (d // (α)), định lý và dấu hiệu nhận biết",
    "Hai mặt phẳng song song ((α) // (β)), tính chất và định lý Thales trong không gian, hình lăng trụ, hình hộp, hình chóp cụt",
    "Phép chiếu song song, hình biểu diễn của một hình không gian",
    "Góc giữa hai đường thẳng trong không gian, hai đường thẳng vuông góc",
    "Đường thẳng vuông góc với mặt phẳng (d ⊥ (α)), định lý ba đường vuông góc",
    "Hai mặt phẳng vuông góc, góc giữa hai mặt phẳng, góc nhị diện, hình chóp đều, lăng trụ đứng",
    "Khoảng cách trong không gian: Từ điểm đến đường thẳng, điểm đến mặt phẳng, hai đường thẳng song song, đường thẳng đến mp song song, hai mp song song",
    "Khoảng cách giữa hai đường thẳng chéo nhau (đoạn vuông góc chung)",
    "Thể tích các khối đa diện: Khối chóp, khối lăng trụ, khối hộp chữ nhật, khối lập phương",
    "Mẫu số liệu ghép nhóm, bảng tần số ghép nhóm, biểu đồ ghép nhóm",
    "Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm: Số trung bình, trung vị, tứ phân vị, mốt",
    "Biến cố hợp, biến cố giao, biến cố độc lập, quy tắc cộng và quy tắc nhân xác suất"
  ],
  12: [
    "Sự đồng biến, nghịch biến của hàm số (Định lý mở rộng, xét dấu đạo hàm f'(x))",
    "Cực trị của hàm số (Điều kiện cần và đủ, quy tắc 1 dùng bảng biến thiên, quy tắc 2 dùng đạo hàm cấp 2 f''(x))",
    "Giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên một đoạn [a, b], trên khoảng (a, b) và bài toán ứng dụng thực tế tối ưu hóa",
    "Đường tiệm cận của đồ thị hàm số: Tiệm cận đứng (x = x0), tiệm cận ngang (y = y0), tiệm cận xiên (y = ax + b)",
    "Khảo sát sự biến thiên và vẽ đồ thị hàm số: Hàm bậc ba y = ax³ + bx² + cx + d, Hàm phân thức bậc 1/bậc 1 y = (ax+b)/(cx+d), Hàm phân thức bậc 2/bậc 1 y = (ax²+bx+c)/(dx+e)",
    "Nhận dạng đồ thị, biện luận số nghiệm của phương trình f(x) = m dựa vào đồ thị, tương giao đồ thị",
    "Khái niệm lũy thừa với số mũ thực, các tính chất của lũy thừa",
    "Logarit: Định nghĩa, các tính chất, quy tắc tính logarit (tổng, hiệu, đổi cơ số, logarit tự nhiên ln, logarit thập phân log)",
    "Hàm số lũy thừa, hàm số mũ y = a^x, hàm số logarit y = log_a(x): Tập xác định, đạo hàm, tính đơn điệu và đồ thị",
    "Phương trình mũ và bất phương trình mũ (đưa về cùng cơ số, đặt ẩn phụ, logarit hóa, dùng tính đơn điệu)",
    "Phương trình logarit và bất phương trình logarit (đưa về cùng cơ số, đặt ẩn phụ, mũ hóa)",
    "Nguyên hàm: Khái niệm, tính chất, bảng nguyên hàm cơ bản và mở rộng của các hàm số thường gặp",
    "Phương pháp tính nguyên hàm: Phương pháp đổi biến số, phương pháp nguyên hàm từng phần (u.dv = u.v - ∫v.du)",
    "Tích phân: Định nghĩa, tính chất của tích phân (cận đảo, tách cận, hằng số), phương pháp đổi biến số và từng phần",
    "Ứng dụng hình học của tích phân: Tính diện tích hình phẳng giới hạn bởi các đường cong, tính thể tích khối tròn xoay quanh trục Ox/Oy",
    "Ứng dụng vật lý của tích phân: Tính quãng đường s(t) từ vận tốc v(t), vận tốc từ gia tốc a(t), bài toán công",
    "Hệ tọa độ trong không gian Oxyz: Tọa độ điểm, tọa độ vector, các phép toán vector, tích vô hướng, tích có hướng của hai vector [u, v]",
    "Ứng dụng tích có hướng: Tính diện tích tam giác, tính thể tích khối tứ diện, khối hộp, xét tính đồng phẳng của 3 vector",
    "Phương trình mặt cầu: Tâm I(a,b,c), bán kính R, dạng chính tắc (x-a)²+(y-b)²+(z-c)²=R², dạng khai triển x²+y²+z²-2ax-2by-2cz+d=0",
    "Phương trình mặt phẳng: Vectơ pháp tuyến, PT tổng quát Ax + By + Cz + D = 0, PT mặt phẳng đi qua 3 điểm, PT đoạn chắn",
    "Phương trình đường thẳng trong không gian: Vectơ chỉ phương, PT tham số, PT chính tắc",
    "Vị trí tương đối giữa hai đường thẳng, đường thẳng và mặt phẳng, hai mặt phẳng, đường thẳng/mặt phẳng với mặt cầu",
    "Khoảng cách và góc trong không gian Oxyz: Khoảng cách từ điểm đến mp, điểm đến đt, khoảng cách giữa 2 mp song song, góc giữa 2 mp, góc giữa đt và mp, góc giữa 2 đt",
    "Hình chiếu vuông góc của một điểm lên mặt phẳng, lên đường thẳng, điểm đối xứng",
    "Các số đặc trưng đo độ phân tán của mẫu số liệu ghép nhóm: Khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn",
    "Xác suất có điều kiện: Định nghĩa P(A|B), công thức nhân xác suất P(A ∩ B) = P(B).P(A|B)",
    "Công thức xác suất toàn phần và công thức Bayes trong thực tế y học, kinh doanh, kiểm định chất lượng",
    "Biến cố độc lập và sơ đồ hình cây trong giải toán xác suất",
    "Bài toán thực tế tích hợp liên môn: Tối ưu hóa chi phí sản xuất, bài toán quỹ đạo bay, bài toán tăng trưởng dân số/vi khuẩn/lãi suất kép"
  ]
};

async function generateTopicBatch(grade, topicName, count = 10) {
  const prompt = `Bạn là chuyên gia sư phạm Toán học tại trung tâm MathPlus Academy.
Nhiệm vụ: Tạo đúng ${count} câu hỏi trắc nghiệm Toán học chất lượng cao dành cho học sinh Lớp ${grade} về chủ đề: "${topicName}".
Bám sát chương trình Giáo Dục Phổ Thông mới tại Việt Nam.

Yêu cầu chất lượng:
1. Đa dạng câu hỏi: 40% nhận biết - thông hiểu, 40% vận dụng tính toán, 20% tư duy logic hoặc toán thực tế.
2. Mỗi câu có 4 đáp án A, B, C, D (đúng 1 đáp án chính xác).
3. Lời giải thích chi tiết từng bước, rõ ràng, sư phạm.
4. Chọn 1 emoji icon phù hợp cho mỗi câu (ví dụ: 📐, 🧮, 🔢, 🌾, 📚, 🛒, 🔮, 📏, ✏️, 🎯, 💡, 📊, 🚀, 🏆).

Định dạng trả về: Duy nhất một JSON array gồm ${count} objects:
[
  {
    "topic": "${topicName.slice(0, 45)}",
    "question": "Nội dung câu hỏi",
    "options": [
      { "key": "A", "text": "Đáp án A" },
      { "key": "B", "text": "Đáp án B" },
      { "key": "C", "text": "Đáp án C" },
      { "key": "D", "text": "Đáp án D" }
    ],
    "correctAnswer": "A",
    "explanation": "Hướng dẫn giải chi tiết",
    "iconType": "📐"
  }
]
Tuyệt đối không xuất markdown backticks hoặc chữ nào ngoài JSON.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90000); // 90s timeout

    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen3.5:397b-cloud",
        prompt,
        stream: false,
        format: "json"
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    const data = await res.json();
    const parsed = JSON.parse(data.response);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.questions)) return parsed.questions;
    return [];
  } catch (err) {
    console.error(`[Grade ${grade}] Error generating topic "${topicName.slice(0, 30)}...":`, err.message);
    return [];
  }
}

async function runWorker(grade, queue, results) {
  while (queue.length > 0) {
    const currentCount = await prisma.quizQuestion.count({ where: { grade } });
    if (currentCount >= TARGET_PER_GRADE) {
      console.log(`[Grade ${grade}] Reached target ${currentCount}/${TARGET_PER_GRADE} questions!`);
      break;
    }

    const topic = queue.shift();
    if (!topic) break;

    console.log(`[Grade ${grade}] Generating topic: "${topic.slice(0, 40)}..." (Current DB: ${currentCount}/${TARGET_PER_GRADE})`);
    const questions = await generateTopicBatch(grade, topic, BATCH_SIZE);

    if (questions && questions.length > 0) {
      const insertData = questions.map(q => ({
        grade,
        topic: String(q.topic || `Toán Lớp ${grade}`).toUpperCase(),
        question: String(q.question || ""),
        options: q.options || [],
        correctAnswer: String(q.correctAnswer || "A"),
        explanation: String(q.explanation || ""),
        iconType: q.iconType || "📐"
      }));

      try {
        await prisma.quizQuestion.createMany({
          data: insertData
        });
        results.push(...questions);
        const newCount = await prisma.quizQuestion.count({ where: { grade } });
        console.log(`[Grade ${grade}] ✅ Saved +${questions.length} questions! Total now: ${newCount}/${TARGET_PER_GRADE}`);
      } catch (dbErr) {
        console.error(`[Grade ${grade}] DB Insert Error:`, dbErr.message);
      }
    } else {
      console.warn(`[Grade ${grade}] ⚠️ Batch empty for topic: "${topic.slice(0, 30)}", requeueing...`);
      queue.push(topic); // Requeue to retry
    }

    // Short sleep between calls
    await new Promise(r => setTimeout(r, 1000));
  }
}

async function processGrade(grade) {
  const existingCount = await prisma.quizQuestion.count({ where: { grade } });
  console.log(`\n======================================================`);
  console.log(`🚀 STARTING GRADE ${grade} (Existing in DB: ${existingCount}/${TARGET_PER_GRADE})`);
  console.log(`======================================================`);

  if (existingCount >= TARGET_PER_GRADE) {
    console.log(`Grade ${grade} already has ${existingCount} questions. Skipping.`);
    return;
  }

  const topics = GRADE_TOPICS[grade] || [];
  // Duplicate topics if needed to reach target count
  const neededBatches = Math.ceil((TARGET_PER_GRADE - existingCount) / BATCH_SIZE);
  const queue = [];
  while (queue.length < neededBatches) {
    for (const t of topics) {
      queue.push(t);
      if (queue.length >= neededBatches + 5) break;
    }
  }

  const results = [];
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(runWorker(grade, queue, results));
  }

  await Promise.all(workers);
  const finalCount = await prisma.quizQuestion.count({ where: { grade } });
  console.log(`\n🎉 FINISHED GRADE ${grade}! Total questions in DB: ${finalCount}`);
}

async function main() {
  console.log("🌟 MASS GENERATING 300+ QUESTIONS PER GRADE WITH QWEN 3.5 CLOUD 🌟");
  console.log(`Target: ${TARGET_PER_GRADE} questions/grade × 7 grades = ${TARGET_PER_GRADE * 7} total questions`);
  console.log(`Concurrency: ${CONCURRENCY} workers\n`);

  for (const grade of [6, 7, 8, 9, 10, 11, 12]) {
    await processGrade(grade);
  }

  // Export full backup of all questions in DB to JSON
  console.log("\nExporting all generated questions to defaultQuestionsByGrade.json...");
  const allDbQuestions = await prisma.quizQuestion.findMany({
    orderBy: { id: "asc" }
  });

  const exportMap = {};
  for (const q of allDbQuestions) {
    if (!exportMap[q.grade]) exportMap[q.grade] = [];
    exportMap[q.grade].push({
      id: q.id,
      grade: q.grade,
      topic: q.topic,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      iconType: q.iconType
    });
  }

  fs.writeFileSync('src/components/quiz/defaultQuestionsByGrade.json', JSON.stringify(exportMap, null, 2), 'utf-8');
  console.log(`\n✅ ALL DONE! Total ${allDbQuestions.length} questions saved to Database and defaultQuestionsByGrade.json!`);

  const summary = await prisma.quizQuestion.groupBy({
    by: ['grade'],
    _count: { id: true }
  });
  console.log("FINAL SUMMARY BY GRADE:", summary);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("FATAL ERROR in mass generation:", e);
  await prisma.$disconnect();
  process.exit(1);
});
