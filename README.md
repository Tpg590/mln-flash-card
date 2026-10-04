# 📕 MLN111 Flashcard & Quiz - Ôn Thi Triết Học Mác - Lênin

Ứng dụng web Flashcard & Trắc nghiệm thông minh, hiện đại hỗ trợ sinh viên ôn tập toàn diện học phần **Triết học Mác - Lênin (MLN111)** với trọn bộ **404 câu hỏi & đáp án** trích xuất từ đề cương ôn thi chính thức.

Website được tối ưu để triển khai tĩnh (Static Web) miễn phí 100% trên nền tảng **Vercel** (`*.vercel.app`).

---

## ✨ Tính Năng Nổi Bật

- 🗂️ **Lật Thẻ 3D (Flashcard Mode):**
  - Hiệu ứng lật thẻ 3D mượt mà với chiều sâu không gian.
  - Tự động hiển thị gợi ý các phương án lựa chọn và làm nổi bật đáp án chính xác ở mặt sau.
  - Đánh giá mức độ ghi nhớ: **Đã thuộc ✅** hoặc **Cần ôn lại ❌**.
  - **Tự động chạy (Autoplay):** Tự động lật và chuyển câu giúp bạn ôn thi rảnh tay.
  - **Phát âm Tiếng Việt (TTS):** Hỗ trợ đọc câu hỏi và câu trả lời bằng giọng đọc tự nhiên.
  - **Âm thanh sống động:** Hiệu ứng lật thẻ, chuông đúng/sai được tổng hợp trực tiếp bằng Web Audio API (không phụ thuộc file âm thanh ngoài).

- 📝 **Luyện Thi Trắc Nghiệm (Quiz Mode):**
  - Mô phỏng thi trắc nghiệm 4 lựa chọn ngẫu nhiên.
  - Nhận diện phản hồi tức thì (xanh khi đúng, đỏ khi sai kèm rung lắc).
  - Hệ thống tính điểm và đếm chuỗi liên tiếp (Combo Streak 🔥).

- 📋 **Tra Cứu Danh Sách & Tìm Kiếm Nhanh (Lookup Mode):**
  - Tìm kiếm tức thì theo từ khóa trong cả câu hỏi và câu trả lời.
  - Dạng danh sách accordion mở/đóng xem nhanh trước giờ vào phòng thi.

- 🏷️ **Phân Loại Theo Chương & Tiến Độ:**
  - **Chương 1:** Khái luận về Triết học & Triết học Mác - Lênin *(44 câu)*
  - **Chương 2:** Chủ nghĩa duy vật biện chứng *(78 câu)*
  - **Chương 3:** Chủ nghĩa duy vật lịch sử *(282 câu)*
  - **⭐ Đã lưu:** Lọc nhanh các câu hỏi bạn đánh dấu sao.
  - **❌ Cần ôn lại:** Tự động gom các câu bạn chưa thuộc hoặc làm sai trong phần trắc nghiệm.
  - **Thanh tiến độ học tập:** Đo lường phần trăm bài học đã thành thạo theo thời gian thực.

- 🎨 **Thiết Kế Hiện Đại (Rich Aesthetics):**
  - Hỗ trợ cả **Dark Mode (Giao diện tối)** và **Light Mode (Giao diện sáng)**.
  - Phong cách Glassmorphism với ánh sáng nền ambient gradient chuyển màu huyền ảo.
  - Tối ưu 100% cho màn hình di động (iOS/Android), máy tính bảng và máy tính để bàn.

- ⌨️ **Hệ Thống Phím Tắt Tiện Dụng:**
  - <kbd>Space</kbd> / <kbd>Enter</kbd>: Lật thẻ
  - <kbd>→</kbd> / <kbd>←</kbd>: Câu tiếp theo / Câu trước đó
  - <kbd>1</kbd>: Đánh dấu "Chưa thuộc"
  - <kbd>3</kbd>: Đánh dấu "Đã thuộc"
  - <kbd>S</kbd>: Đánh dấu sao (Lưu câu)
  - <kbd>R</kbd>: Xáo trộn câu hỏi ngẫu nhiên (Shuffle)
  - <kbd>A</kbd>: Bật/Tắt chế độ tự chạy (Autoplay)
  - <kbd>?</kbd>: Xem bảng phím tắt

---

## 🚀 Hướng Dẫn Đưa Lên GitHub & Deploy Lên Vercel (Miễn Phí)

### Bước 1: Tạo Repository trên GitHub

> [!NOTE]
> Lệnh `gh repo create` bị báo lỗi vì máy bạn chưa cài đặt **GitHub CLI** (`gh`). Bạn có thể tạo nhanh kho chứa trực tiếp trên trang web GitHub:

1. Đăng nhập vào [GitHub](https://github.com/).
2. Bấm vào nút **New** (hoặc truy cập [github.com/new](https://github.com/new)).
3. Điền tên Repository: `mln-flash-card`.
4. Chọn **Public**.
5. **Không** tích chọn *"Add a README file"* (vì ta đã có sẵn file trong máy).
6. Bấm **Create repository**.

---

### Bước 2: Đẩy Code từ máy tính lên GitHub

Mở Terminal / PowerShell tại thư mục `MLN_Flash_Card` và chạy các lệnh sau (thay `<username>` bằng tên tài khoản GitHub của bạn):

```bash
# 1. Đổi tên nhánh mặc định sang main
git branch -M main

# 2. Thêm tất cả file mã nguồn
git add .

# 3. Tạo commit
git commit -m "Hoàn thiện ứng dụng MLN Flashcard với 404 câu hỏi ôn tập"

# 4. Liên kết với kho chứa GitHub vừa tạo
git remote add origin https://github.com/<username>/mln-flash-card.git

# 5. Đẩy code lên GitHub
git push -u origin main
```

---

### Bước 3: Deploy lên Vercel để nhận link `*.vercel.app` (Miễn phí)

#### Cách 1: Thao tác trên giao diện Web Vercel (Khuyên dùng - Cực dễ)

1. Truy cập [vercel.com](https://vercel.com/) và bấm **Sign Up** (hoặc **Log In**) bằng tài khoản **GitHub**.
2. Trên màn hình Dashboard, bấm nút **"Add New..."** ➔ chọn **"Project"**.
3. Bạn sẽ thấy danh sách các repository GitHub của mình. Tìm `mln-flash-card` và bấm **Import**.
4. Ở màn hình cấu hình dự án:
   - **Project Name:** `mln-flash-card` (hoặc tên bất kỳ bạn thích).
   - **Framework Preset:** Chọn `Other` (hoặc để mặc định).
   - **Root Directory:** `./`
5. Bấm nút **Deploy**.
6. Sau khoảng 20 - 30 giây, Vercel sẽ hoàn tất việc triển khai và cấp cho bạn một đường dẫn dạng:
   ```text
   https://mln-flash-card.vercel.app
   ```
*(Từ nay, mỗi khi bạn `git push` cập nhật nội dung, Vercel sẽ tự động build lại website mới nhất!)*

---

#### Cách 2: Deploy trực tiếp bằng Vercel CLI (Qua dòng lệnh)

Nếu muốn deploy trực tiếp từ dòng lệnh mà không cần qua giao diện web:

```bash
# Cài đặt Vercel CLI qua npm (nếu đã có Node.js)
npm install -g vercel

# Đăng nhập và triển khai
vercel
```
Làm theo các bước hướng dẫn đơn giản trên terminal (chọn Yes cho các thiết lập mặc định).

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
MLN_Flash_Card/
├── index.html                      # Giao diện chính (HTML5 Semantic, chuẩn SEO)
├── style.css                       # Thiết kế CSS3 Vanilla, Glassmorphism, 3D transform, Dark/Light mode
├── app.js                          # Xử lý logic, Web Audio, Speech Synthesis, lưu LocalStorage
├── data.js                         # Cơ sở dữ liệu 404 câu hỏi & đáp án trích từ đề cương
├── export_data.py                  # Script Python trích xuất và chuẩn hóa dữ liệu từ file .docx
├── [MLN111] ĐỀ CƯƠNG ÔN TẬP.docx    # Tài liệu gốc đề cương ôn tập
├── vercel.json                     # Cấu hình tối ưu cache & bảo mật cho Vercel
└── README.md                       # Tài liệu hướng dẫn sử dụng và triển khai
```

---

## 🛠️ Chạy Thử Trên Máy (Local Preview)

Bạn chỉ cần mở trực tiếp file `index.html` bằng trình duyệt (Chrome, Edge, Firefox, Safari) hoặc khởi chạy một máy chủ cục bộ nhẹ:

```bash
# Sử dụng Python (có sẵn trên máy)
python -m http.server 8080

# Hoặc sử dụng Node.js
npx serve .
```
Truy cập: `http://localhost:8080` trên trình duyệt.

---

## 📄 Bản Quyền & Nguồn Dữ Liệu

- Dữ liệu câu hỏi được tổng hợp và chuẩn hóa từ đề cương ôn tập học phần **Triết học Mác - Lênin (MLN111)**.
- Dự án mã nguồn mở phục vụ mục đích học tập phi thương mại cho sinh viên.
