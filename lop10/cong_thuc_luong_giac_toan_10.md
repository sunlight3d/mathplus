# TỔNG KẾT CÔNG THỨC LƯỢNG GIÁC TOÁN 10
> **GIÁ TRỊ LƯỢNG GIÁC CỦA GÓC $\alpha$ ($0^\circ \le \alpha \le 180^\circ$)**  
> *Trung tâm MathPlus Academy – Hotline: 0977 961 189 – Thầy Nguyễn Văn Dũng*

---

## 1. Dấu của các hàm số lượng giác ($0^\circ \le \alpha \le 180^\circ$)

* **Hàm $\sin \alpha$**:
  $$\sin \alpha \ge 0 \quad \text{với mọi } 0^\circ \le \alpha \le 180^\circ$$
  - $\sin \alpha > 0$ khi $0^\circ < \alpha < 180^\circ$.
  - $\sin 0^\circ = \sin 180^\circ = 0$; $\sin 90^\circ = 1$.

* **Hàm $\cos \alpha$**:
  - $\cos \alpha > 0$ khi $\alpha$ nhọn ($0^\circ \le \alpha < 90^\circ$).
  - $\cos \alpha < 0$ khi $\alpha$ tù ($90^\circ < \alpha \le 180^\circ$).
  - $\cos 90^\circ = 0$.

* **Hàm $\tan \alpha$ và $\cot \alpha$**:
  - Khi $\alpha$ nhọn ($0^\circ < \alpha < 90^\circ$): $\tan \alpha > 0$ và $\cot \alpha > 0$.
  - Khi $\alpha$ tù ($90^\circ < \alpha < 180^\circ$): $\tan \alpha < 0$ và $\cot \alpha < 0$.
  - Không xác định $\tan 90^\circ$; không xác định $\cot 0^\circ, \cot 180^\circ$.

---

## 2. Quan hệ giữa các góc có liên quan đặc biệt

### a) Hai góc bù nhau ($\alpha$ và $180^\circ - \alpha$) – *"Sin bù"*:
$$\sin(180^\circ - \alpha) = \sin \alpha$$
$$\cos(180^\circ - \alpha) = -\cos \alpha$$
$$\tan(180^\circ - \alpha) = -\tan \alpha \quad (\alpha \ne 90^\circ)$$
$$\cot(180^\circ - \alpha) = -\cot \alpha \quad (\alpha \ne 0^\circ, 180^\circ)$$

### b) Hai góc phụ nhau ($\alpha$ và $90^\circ - \alpha$) – *"Phụ chéo"*:
$$\sin(90^\circ - \alpha) = \cos \alpha$$
$$\cos(90^\circ - \alpha) = \sin \alpha$$
$$\tan(90^\circ - \alpha) = \cot \alpha \quad (0^\circ < \alpha < 90^\circ)$$
$$\cot(90^\circ - \alpha) = \tan \alpha \quad (0^\circ < \alpha < 90^\circ)$$

---

## 3. 4 Hằng đẳng thức lượng giác cơ bản

1. **Hệ thức Pythagoras**:
   $$\sin^2 \alpha + \cos^2 \alpha = 1 \implies \sin \alpha = \sqrt{1 - \cos^2 \alpha}$$
   *(luôn lấy dấu dương vì $\sin \alpha \ge 0$ với mọi $\alpha \in [0^\circ; 180^\circ]$)*

2. **Liên hệ giữa $\tan$ và $\cos$** ($\alpha \ne 90^\circ$):
   $$1 + \tan^2 \alpha = \frac{1}{\cos^2 \alpha} \implies \cos^2 \alpha = \frac{1}{1 + \tan^2 \alpha}$$

3. **Liên hệ giữa $\cot$ và $\sin$** ($\alpha \ne 0^\circ, 180^\circ$):
   $$1 + \cot^2 \alpha = \frac{1}{\sin^2 \alpha} \implies \sin^2 \alpha = \frac{1}{1 + \cot^2 \alpha}$$

4. **Nghịch đảo giữa $\tan$ và $\cot$** ($\alpha \ne 0^\circ, 90^\circ, 180^\circ$):
   $$\tan \alpha \cdot \cot \alpha = 1 \implies \cot \alpha = \frac{1}{\tan \alpha}$$

---

## 4. Kỹ thuật tính biểu thức thuần nhất khi biết $\tan \alpha$

### Dạng 1: Phân thức bậc 1 đối với $\sin \alpha, \cos \alpha$
Chia cả tử và mẫu cho $\cos \alpha$ (với $\cos \alpha \ne 0$):
$$P = \frac{a\sin\alpha + b\cos\alpha}{c\sin\alpha + d\cos\alpha} = \frac{a\frac{\sin\alpha}{\cos\alpha} + b}{c\frac{\sin\alpha}{\cos\alpha} + d} = \frac{a\tan\alpha + b}{c\tan\alpha + d}$$

*Ví dụ*: Cho $\tan \alpha = 2$. Tính $P = \frac{3\sin\alpha - \cos\alpha}{\sin\alpha + 2\cos\alpha}$.
$$P = \frac{3(2) - 1}{2 + 2} = \frac{5}{4}$$

### Dạng 2: Phân thức bậc 2 đối với $\sin \alpha, \cos \alpha$
Chia cả tử và mẫu cho $\cos^2 \alpha$ (với $\cos \alpha \ne 0$):
$$Q = \frac{a\sin^2\alpha + b\sin\alpha\cos\alpha + c\cos^2\alpha}{m\sin^2\alpha + n\cos^2\alpha} = \frac{a\tan^2\alpha + b\tan\alpha + c}{m\tan^2\alpha + n}$$

*Ví dụ*: Cho $\tan \alpha = 3$. Tính $Q = \frac{\sin^2\alpha - 2\sin\alpha\cos\alpha + 3\cos^2\alpha}{2\sin^2\alpha + \cos^2\alpha}$.
$$Q = \frac{3^2 - 2(3) + 3}{2(3^2) + 1} = \frac{6}{19}$$

### Dạng 3: Biểu thức bậc 2 không có mẫu (Dạng tự do)
Nhân với $1 = \frac{1}{\sin^2\alpha + \cos^2\alpha}$, sau đó chia cả tử và mẫu cho $\cos^2\alpha$:
$$M = a\sin^2\alpha + c\cos^2\alpha = \frac{a\sin^2\alpha + c\cos^2\alpha}{\sin^2\alpha + \cos^2\alpha} = \frac{a\tan^2\alpha + c}{\tan^2\alpha + 1}$$

*Ví dụ*: Cho $\tan \alpha = 2$. Tính $M = 2\sin^2\alpha - 3\cos^2\alpha$.
$$M = \frac{2(2^2) - 3}{2^2 + 1} = \frac{5}{5} = 1$$

---

## 5. Bảng giá trị lượng giác các góc đặc biệt

| $\alpha$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ | $120^\circ$ | $135^\circ$ | $150^\circ$ | $180^\circ$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$\sin \alpha$** | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ |
| **$\cos \alpha$** | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ | $-\frac{1}{2}$ | $-\frac{\sqrt{2}}{2}$ | $-\frac{\sqrt{3}}{2}$ | $-1$ |
| **$\tan \alpha$** | $0$ | $\frac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | $\parallel$ | $-\sqrt{3}$ | $-1$ | $-\frac{\sqrt{3}}{3}$ | $0$ |
| **$\cot \alpha$** | $\parallel$ | $\sqrt{3}$ | $1$ | $\frac{\sqrt{3}}{3}$ | $0$ | $-\frac{\sqrt{3}}{3}$ | $-1$ | $-\sqrt{3}$ | $\parallel$ |
