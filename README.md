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
