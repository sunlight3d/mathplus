# SỔ TAY CÔNG THỨC TOÁN 10 – GIỮA HỌC KỲ I
> **TRUNG TÂM MATHPLUS ACADEMY – BỒI DƯỠNG TOÁN & LUYỆN THI CHUYÊN / ĐẠI HỌC**  
> *Giáo viên phụ trách: Thầy Nguyễn Văn Dũng – Hotline: 0977 961 189 – Website: mathplus.com.vn*

---

## MỤC LỤC
1. [Chương I. Mệnh đề & Tập hợp](#chuong-1)
2. [Chương II. Bất phương trình & Hệ bất phương trình bậc nhất hai ẩn](#chuong-2)
3. [Chương III. Giá trị lượng giác của một góc từ $0^\circ$ đến $180^\circ$](#chuong-3)
4. [Chương IV. Hệ thức lượng trong tam giác & Bài toán thực tế](#chuong-4)
5. [Mẹo & Kỹ thuật giải nhanh trắc nghiệm](#chuong-5)

---

<a name="chuong-1"></a>
## CHƯƠNG I. MỆNH ĐỀ & TẬP HỢP

### 1. Mệnh đề toán học
- **Định nghĩa**: Mệnh đề là một khẳng định có tính chất hoặc đúng hoặc sai. Một khẳng định không thể vừa đúng vừa sai.
- **Mệnh đề chứa biến**: Ký hiệu $P(x)$, đúng hay sai phụ thuộc vào giá trị của biến $x$.
- **Mệnh đề phủ định**:
  - Phủ định của mệnh đề $P$ ký hiệu là $\overline{P}$. Nếu $P$ đúng thì $\overline{P}$ sai và ngược lại.
  - Phủ định với mọi ($\forall$) và tồn tại ($\exists$):
    $$\overline{\forall x \in X, P(x)} \iff \exists x \in X, \overline{P(x)}$$
    $$\overline{\exists x \in X, P(x)} \iff \forall x \in X, \overline{P(x)}$$
  - *Ví dụ*: Phủ định của "$\forall x \in \mathbb{R}, x^2 + 1 > 0$" là "$\exists x \in \mathbb{R}, x^2 + 1 \le 0$".

### 2. Mệnh đề kéo theo & Mệnh đề tương đương
- **Kéo theo**: $P \implies Q$ ("Nếu $P$ thì $Q$").
  - Mệnh đề $P \implies Q$ **chỉ sai** khi $P$ đúng mà $Q$ sai.
  - $P$ là điều kiện đủ để có $Q$; $Q$ là điều kiện cần để có $P$.
- **Mệnh đề đảo**: Của $P \implies Q$ là $Q \implies P$.
- **Tương đương**: $P \iff Q$ ("$P$ khi và chỉ khi $Q$").
  - $P \iff Q$ đúng khi và chỉ khi cả $P$ và $Q$ cùng đúng hoặc cùng sai.

### 3. Tập hợp & Các phép toán tập hợp
- **Tập con**: $A \subset B \iff (\forall x \in A \implies x \in B)$.
  - Tập rỗng $\emptyset \subset A$ với mọi tập $A$.
  - Số tập con của tập có $n$ phần tử là $2^n$.
- **Giao**: $A \cap B = \{x \mid x \in A \text{ và } x \in B\}$.
- **Hợp**: $A \cup B = \{x \mid x \in A \text{ hoặc } x \in B\}$.
- **Hiệu**: $A \setminus B = \{x \mid x \in A \text{ và } x \notin B\}$.
- **Phần bù**: Khi $A \subset E$, phần bù của $A$ trong $E$ là $C_E A = E \setminus A$.

### 4. Các tập con của tập số thực $\mathbb{R}$
| Ký hiệu | Tên gọi | Định nghĩa |
| :--- | :--- | :--- |
| $(a; b)$ | Khoảng | $\{x \in \mathbb{R} \mid a < x < b\}$ |
| $[a; b]$ | Đoạn | $\{x \in \mathbb{R} \mid a \le x \le b\}$ |
| $[a; b)$ | Nửa khoảng | $\{x \in \mathbb{R} \mid a \le x < b\}$ |
| $(a; b]$ | Nửa khoảng | $\{x \in \mathbb{R} \mid a < x \le b\}$ |
| $(-\infty; a)$ | Khoảng vô hạn | $\{x \in \mathbb{R} \mid x < a\}$ |
| $[a; +\infty)$ | Nửa khoảng vô hạn | $\{x \in \mathbb{R} \mid x \ge a\}$ |

> **Lưu ý bài toán chứa tham số $m$**:
> - Tập $[a; b]$ khác rỗng $\iff a \le b$.
> - Tập $(a; b)$ khác rỗng $\iff a < b$.
> - Để $A \cap B = \emptyset$: xác định vị trí tương đối trên trục số rồi suy ra điều kiện của $m$.

---

<a name="chuong-2"></a>
## CHƯƠNG II. BẤT PHƯƠNG TRÌNH & HỆ BPT BẬC NHẤT HAI ẨN

### 1. Bất phương trình bậc nhất hai ẩn
- **Dạng chuẩn**: $ax + by + c \le 0$ (hoặc $\ge 0, < 0, > 0$) với $a^2 + b^2 \ne 0$.
- **Quy trình xác định miền nghiệm trên mặt phẳng $Oxy$**:
  1. Vẽ đường thẳng bờ $d: ax + by + c = 0$.
  2. Lấy một điểm thử $M(x_0; y_0) \notin d$ (thường chọn gốc tọa độ $O(0; 0)$ nếu $c \ne 0$).
  3. Tính $ax_0 + by_0 + c$:
     - Nếu thỏa mãn BPT: Nửa mặt phẳng chứa điểm $M$ là miền nghiệm.
     - Nếu không thỏa mãn: Nửa mặt phẳng không chứa $M$ (gạch bỏ nửa mặt phẳng chứa $M$) là miền nghiệm.
  4. **Ký hiệu**: Nếu dấu $\le, \ge$ thì lấy cả bờ $d$ (đường nét liền). Nếu dấu $<, >$ thì không lấy bờ (đường nét đứt).

### 2. Hệ bất phương trình bậc nhất hai ẩn
- **Miền nghiệm của hệ**: Là giao các miền nghiệm của từng bất phương trình trong hệ (thường là một miền đa giác lồi: tam giác, tứ giác...).

### 3. Bài toán tối ưu thực tế (Quy hoạch tuyến tính)
- **Mục tiêu**: Tìm giá trị lớn nhất (GTLN) hoặc giá trị nhỏ nhất (GTNN) của biểu thức tuyến tính:
  $$F(x, y) = ax + by + c$$
  với $(x; y)$ thuộc miền nghiệm đa giác $A_1A_2...A_n$.
- **Định lý then chốt**: Giá trị $F(x, y)$ lớn nhất và nhỏ nhất **luôn đạt tại một trong các đỉnh** $A_1, A_2, ..., A_n$ của miền đa giác nghiệm.
- **3 bước giải bài toán thực tế**:
  1. Đặt ẩn $x, y$ và ghi rõ điều kiện (ví dụ: $x \ge 0, y \ge 0, x, y \in \mathbb{N}$).
  2. Lập hệ bất phương trình theo ràng buộc nguyên liệu, vốn, nhân công... rồi vẽ miền đa giác nghiệm.
  3. Tìm tọa độ tất cả các đỉnh giao điểm bằng cách giải từng hệ phương trình, tính giá trị biểu thức $F(x, y)$ tại các đỉnh và kết luận.

---

<a name="chuong-3"></a>
## CHƯƠNG III. GIÁ TRỊ LƯỢNG GIÁC CỦA GÓC $\alpha$ ($0^\circ \le \alpha \le 180^\circ$)

### 1. Định nghĩa trên nửa đường tròn đơn vị
Lấy điểm $M(x_0; y_0)$ trên nửa đường tròn đơn vị (bán kính $R = 1$) sao cho $\widehat{xOM} = \alpha$:
- $\sin \alpha = y_0$ *(tung độ của điểm $M$)*
- $\cos \alpha = x_0$ *(hoành độ của điểm $M$)*
- $\tan \alpha = \frac{\sin \alpha}{\cos \alpha} = \frac{y_0}{x_0}$ *(với $x_0 \ne 0 \iff \alpha \ne 90^\circ$)*
- $\cot \alpha = \frac{\cos \alpha}{\sin \alpha} = \frac{x_0}{y_0}$ *(với $y_0 \ne 0 \iff \alpha \ne 0^\circ, 180^\circ$)*

---

### 2. Bảng xét dấu các giá trị lượng giác
| Hàm số | Góc nhọn ($0^\circ < \alpha < 90^\circ$) | Góc vuông ($\alpha = 90^\circ$) | Góc tù ($90^\circ < \alpha < 180^\circ$) |
| :---: | :---: | :---: | :---: |
| $\sin \alpha$ | **$+$ (Dương)** | **$1$** | **$+$ (Dương)** |
| $\cos \alpha$ | **$+$ (Dương)** | **$0$** | **$-$ (Âm)** |
| $\tan \alpha$ | **$+$ (Dương)** | Không xác định | **$-$ (Âm)** |
| $\cot \alpha$ | **$+$ (Dương)** | **$0$** | **$-$ (Âm)** |

> ⚠️ **QUY TẮC CỐT TỬ CẦN NHỚ**:
> - Với mọi $0^\circ \le \alpha \le 180^\circ$, ta luôn có: **$\sin \alpha \ge 0$**.
> - Do đó khi biết $\cos \alpha$, ta luôn suy ra:
>   $$\sin \alpha = +\sqrt{1 - \cos^2 \alpha} \quad (\text{LUÔN LẤY DẤU DƯƠNG})$$
> - Ngược lại, khi biết $\sin \alpha$, $\cos \alpha$ phụ thuộc vào góc nhọn hay tù:
>   $$\cos \alpha = \begin{cases} +\sqrt{1 - \sin^2 \alpha} & (0^\circ \le \alpha < 90^\circ) \\ -\sqrt{1 - \sin^2 \alpha} & (90^\circ < \alpha \le 180^\circ) \end{cases}$$

---

### 3. Quan hệ giữa các góc có liên quan đặc biệt

#### a) Hai góc bù nhau ($\alpha$ và $180^\circ - \alpha$) – *"Sin bù"*:
> *"Chỉ có hàm Sin giữ nguyên giá trị, còn Cos, Tan, Cot đều đổi dấu"*

$$\sin(180^\circ - \alpha) = \sin \alpha$$
$$\cos(180^\circ - \alpha) = -\cos \alpha$$
$$\tan(180^\circ - \alpha) = -\tan \alpha \quad (\alpha \ne 90^\circ)$$
$$\cot(180^\circ - \alpha) = -\cot \alpha \quad (\alpha \ne 0^\circ, 180^\circ)$$

#### b) Hai góc phụ nhau ($\alpha$ và $90^\circ - \alpha$) – *"Phụ chéo"*:
> *"Sin góc này bằng Cos góc kia, Tan góc này bằng Cot góc kia"*

$$\sin(90^\circ - \alpha) = \cos \alpha$$
$$\cos(90^\circ - \alpha) = \sin \alpha$$
$$\tan(90^\circ - \alpha) = \cot \alpha \quad (0^\circ < \alpha < 90^\circ)$$
$$\cot(90^\circ - \alpha) = \tan \alpha \quad (0^\circ < \alpha < 90^\circ)$$

---

### 4. 4 Hằng đẳng thức lượng giác cơ bản
Áp dụng cho mọi góc $\alpha$ trong tập xác định:

1. **Hệ thức Pythagoras cơ bản**:
   $$\sin^2 \alpha + \cos^2 \alpha = 1$$

2. **Liên hệ giữa $\tan$ và $\cos$** ($\alpha \ne 90^\circ$):
   $$1 + \tan^2 \alpha = \frac{1}{\cos^2 \alpha} \iff \cos^2 \alpha = \frac{1}{1 + \tan^2 \alpha}$$

3. **Liên hệ giữa $\cot$ và $\sin$** ($\alpha \ne 0^\circ, 180^\circ$):
   $$1 + \cot^2 \alpha = \frac{1}{\sin^2 \alpha} \iff \sin^2 \alpha = \frac{1}{1 + \cot^2 \alpha}$$

4. **Nghịch đảo giữa $\tan$ và $\cot$** ($\alpha \ne 0^\circ, 90^\circ, 180^\circ$):
   $$\tan \alpha \cdot \cot \alpha = 1 \iff \cot \alpha = \frac{1}{\tan \alpha}$$

---

### 5. Bảng giá trị lượng giác các góc đặc biệt
| $\alpha$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ | $120^\circ$ | $135^\circ$ | $150^\circ$ | $180^\circ$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$\sin \alpha$** | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ |
| **$\cos \alpha$** | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ | $-\frac{1}{2}$ | $-\frac{\sqrt{2}}{2}$ | $-\frac{\sqrt{3}}{2}$ | $-1$ |
| **$\tan \alpha$** | $0$ | $\frac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | $\parallel$ | $-\sqrt{3}$ | $-1$ | $-\frac{\sqrt{3}}{3}$ | $0$ |
| **$\cot \alpha$** | $\parallel$ | $\sqrt{3}$ | $1$ | $\frac{\sqrt{3}}{3}$ | $0$ | $-\frac{\sqrt{3}}{3}$ | $-1$ | $-\sqrt{3}$ | $\parallel$ |

*(Ký hiệu $\parallel$ là không xác định)*

---

### 6. Kỹ thuật giải nhanh biểu thức thuần nhất khi biết $\tan \alpha = k$

#### Dạng 1: Phân thức bậc 1 đối với $\sin \alpha, \cos \alpha$
$$P = \frac{a\sin\alpha + b\cos\alpha}{c\sin\alpha + d\cos\alpha}$$
- **Phương pháp**: Chia cả tử số và mẫu số cho $\cos \alpha$ (với $\cos \alpha \ne 0$):
  $$P = \frac{a\frac{\sin\alpha}{\cos\alpha} + b}{c\frac{\sin\alpha}{\cos\alpha} + d} = \frac{a\tan\alpha + b}{c\tan\alpha + d}$$
- **Ví dụ**: Cho $\tan \alpha = 2$. Tính $P = \frac{3\sin\alpha - \cos\alpha}{\sin\alpha + 2\cos\alpha}$.
  $$\implies P = \frac{3(2) - 1}{2 + 2} = \frac{5}{4}$$

#### Dạng 2: Phân thức bậc 2 đối với $\sin \alpha, \cos \alpha$
$$Q = \frac{a\sin^2\alpha + b\sin\alpha\cos\alpha + c\cos^2\alpha}{m\sin^2\alpha + n\cos^2\alpha}$$
- **Phương pháp**: Chia cả tử số và mẫu số cho $\cos^2 \alpha$:
  $$Q = \frac{a\tan^2\alpha + b\tan\alpha + c}{m\tan^2\alpha + n}$$
- **Ví dụ**: Cho $\tan \alpha = 3$. Tính $Q = \frac{\sin^2\alpha - 2\sin\alpha\cos\alpha + 3\cos^2\alpha}{2\sin^2\alpha + \cos^2\alpha}$.
  $$\implies Q = \frac{3^2 - 2(3) + 3}{2(3^2) + 1} = \frac{9 - 6 + 3}{18 + 1} = \frac{6}{19}$$

#### Dạng 3: Biểu thức bậc 2 KHÔNG CÓ MẪU (Dạng tự do)
$$M = a\sin^2\alpha + b\sin\alpha\cos\alpha + c\cos^2\alpha$$
- **Mẹo xử lý**: Nhân thêm với $1 = \frac{1}{\sin^2\alpha + \cos^2\alpha}$ để tạo mẫu số bậc 2, sau đó chia cho $\cos^2\alpha$:
  $$M = \frac{a\sin^2\alpha + b\sin\alpha\cos\alpha + c\cos^2\alpha}{\sin^2\alpha + \cos^2\alpha} = \frac{a\tan^2\alpha + b\tan\alpha + c}{\tan^2\alpha + 1}$$
- **Ví dụ**: Biết $\tan \alpha = 2$. Tính $M = 2\sin^2\alpha - 3\cos^2\alpha$.
  $$\implies M = \frac{2\tan^2\alpha - 3}{\tan^2\alpha + 1} = \frac{2(2^2) - 3}{2^2 + 1} = \frac{8 - 3}{4 + 1} = \frac{5}{5} = 1$$

---

<a name="chuong-4"></a>
## CHƯƠNG IV. HỆ THỨC LƯỢNG TRONG TAM GIÁC

Trong tam giác $ABC$, quy ước các cạnh đối diện đỉnh $A, B, C$ lần lượt là $a, b, c$. Nửa chu vi $p = \frac{a+b+c}{2}$.

### 1. Định lý Cosin
$$a^2 = b^2 + c^2 - 2bc\cos A$$
$$b^2 = a^2 + c^2 - 2ac\cos B$$
$$c^2 = a^2 + b^2 - 2ab\cos C$$

- **Hệ quả tính số đo góc**:
  $$\cos A = \frac{b^2 + c^2 - a^2}{2bc}, \quad \cos B = \frac{a^2 + c^2 - b^2}{2ac}, \quad \cos C = \frac{a^2 + b^2 - c^2}{2ab}$$

- **Mẹo nhận biết góc tam giác**:
  - $\cos A > 0 \iff \widehat{A} < 90^\circ$ (góc nhọn).
  - $\cos A = 0 \iff \widehat{A} = 90^\circ$ (góc vuông $\iff b^2 + c^2 = a^2$).
  - $\cos A < 0 \iff \widehat{A} > 90^\circ$ (góc tù $\iff a^2 > b^2 + c^2$).

---

### 2. Định lý Sin
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$
*(với $R$ là bán kính đường tròn ngoại tiếp tam giác $ABC$)*

- **Hệ quả rút cạnh và góc**:
  - $a = 2R\sin A, \quad b = 2R\sin B, \quad c = 2R\sin C$
  - $\sin A = \frac{a}{2R}, \quad \sin B = \frac{b}{2R}, \quad \sin C = \frac{c}{2R}$
  - $R = \frac{a}{2\sin A} = \frac{b}{2\sin B} = \frac{c}{2\sin C}$

---

### 3. Công thức độ dài đường trung tuyến
Gọi $m_a, m_b, m_c$ lần lượt là độ dài các đường trung tuyến kẻ từ $A, B, C$:
$$m_a^2 = \frac{2(b^2 + c^2) - a^2}{4}$$
$$m_b^2 = \frac{2(a^2 + c^2) - b^2}{4}$$
$$m_c^2 = \frac{2(a^2 + b^2) - c^2}{4}$$

---

### 4. Bộ 5 công thức tính diện tích tam giác $S$

| STT | Tên công thức | Biểu thức | Trường hợp nên dùng |
| :---: | :--- | :--- | :--- |
| **1** | Chiều cao đáy | $S = \frac{1}{2}ah_a = \frac{1}{2}bh_b = \frac{1}{2}ch_c$ | Biết 1 cạnh và chiều cao tương ứng |
| **2** | 2 cạnh & góc xen giữa | $S = \frac{1}{2}ab\sin C = \frac{1}{2}bc\sin A = \frac{1}{2}ac\sin B$ | Biết 2 cạnh và góc kẹp giữa |
| **3** | Bán kính ngoại tiếp $R$ | $S = \frac{abc}{4R} \implies R = \frac{abc}{4S}$ | Tính $R$ hoặc tính diện tích khi biết $R$ |
| **4** | Bán kính nội tiếp $r$ | $S = p \cdot r \implies r = \frac{S}{p}$ | Tính $r$ (với $p = \frac{a+b+c}{2}$) |
| **5** | Công thức Heron | $S = \sqrt{p(p-a)(p-b)(p-c)}$ | Biết độ dài cả 3 cạnh của tam giác |

---

<a name="chuong-5"></a>
## CHƯƠNG V. MẸO & KỸ THUẬT GIẢI NHANH TRẮC NGHIỆM

1. **Rút gọn biểu thức lượng giác độc lập với $\alpha$**:
   - Thay $\alpha$ bằng một góc cụ thể bất kỳ (ví dụ $\alpha = 30^\circ$ hoặc $\alpha = 45^\circ$) rồi bấm máy tính `CALC` để ra kết quả số ngay trong 5 giây.
2. **Kiểm tra tam giác vuông hay tù bằng 3 cạnh**:
   - Sắp xếp $a \ge b \ge c$ (với $a$ là cạnh lớn nhất).
   - So sánh $a^2$ với $b^2 + c^2$:
     - $a^2 = b^2 + c^2 \implies$ Tam giác vuông tại $A$.
     - $a^2 > b^2 + c^2 \implies$ Tam giác tù tại $A$.
     - $a^2 < b^2 + c^2 \implies$ Tam giác có 3 góc đều nhọn.
3. **Bán kính đường tròn ngoại tiếp tam giác vuông**:
   - Tâm là trung điểm cạnh huyền $a$, bán kính $R = \frac{a}{2}$.
4. **Bán kính đường tròn nội tiếp tam giác vuông**:
   - $r = \frac{b + c - a}{2} = p - a$.

---
*Biên soạn bởi Trung tâm MathPlus Academy – Hotline: 0977 961 189*
