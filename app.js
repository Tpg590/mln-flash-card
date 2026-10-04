/**
 * MLN111 Flashcard & Quiz Application
 * Logic, State Management, Web Audio, Speech Synthesis & Persistence
 */

(() => {
  // URL validation & History guard: Luôn chuẩn hóa URL về trang chủ '/', không cho phép trỏ sang file/đường dẫn khác trong dự án
  if (window.location.pathname !== '/' && window.location.pathname !== '') {
    window.history.replaceState(null, '', '/');
  }
  window.addEventListener('popstate', () => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.replaceState(null, '', '/');
    }
  });

  const FLASHCARD_DATA = [
  {
    "id": 1,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 1.1",
    "question": "Ở Tây Âu thời trung cổ, khi quyền lực Giáo hội bao trùm mọi lĩnh vực trong đời sống xã hội thì triết học đã trở thành:",
    "options": [
      "Hoàng đế.",
      "Nữ tì.",
      "Khoa học.",
      "Nền triết học tự nhiên."
    ],
    "answer": "Nữ tì."
  },
  {
    "id": 2,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 1.2",
    "question": "Khi quyền lực của Giáo hội bao trùm mọi lĩnh vực thì triết học đã trở thành nữ tì của thần học ở:",
    "options": [
      "Ở Tây âu thời trung cổ.",
      "Ở Tây âu.",
      "Ở Mỹ.",
      "Ở Đông âu."
    ],
    "answer": "Ở Tây âu thời trung cổ."
  },
  {
    "id": 3,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 1",
    "question": "Triết học MLN kế thừa nền triết học nào? (phương án đúng nhất)",
    "options": [
      "a. Phương Tây.",
      "b. Phương Đông.",
      "c. Phương Đông và phương Tây.",
      "d. Tất cả các phương án trả lời đều đúng."
    ],
    "answer": "a. Phương Tây."
  },
  {
    "id": 4,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 2",
    "question": "Triết học là hoạt động:",
    "options": [
      "Tinh thần bậc cao.",
      "Vật chất.",
      "Vật chất và tinh thần.",
      "Hoạt động khoa học."
    ],
    "answer": "Tinh thần bậc cao."
  },
  {
    "id": 5,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 3",
    "question": "Triết học có mấy nguồn gốc?",
    "options": [
      "Có 2 nguồn gốc.",
      "Có 3 nguồn gốc.",
      "Có 4 nguồn gốc.",
      "Có 5 nguồn gốc."
    ],
    "answer": "Có 2 nguồn gốc."
  },
  {
    "id": 6,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 4",
    "question": "2 nguồn gốc của triết học là nguồn gốc nhận thức và …",
    "options": [
      "Nguồn gốc xã hội.",
      "Nguồn gốc tự nhiên.",
      "Nguồn gốc khoa học.",
      "Nguồn gốc tâm lý."
    ],
    "answer": "Nguồn gốc xã hội."
  },
  {
    "id": 7,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 5",
    "question": "Triết học là … và vị trí con người trong thế giới đó, là khoa học về những quy luật vận động, phát triển chung nhất của tự nhiên, xã hội và tư duy. Từ còn thiếu là:",
    "options": [
      "Hệ thống quan điểm lý luận chung nhất về thế giới.",
      "Hệ thống quan điểm chung nhất về thế giới.",
      "Hệ thống quan điểm lý luận về thế giới.",
      "Những quan điểm lý luận chung nhất về thế giới."
    ],
    "answer": "Hệ thống quan điểm lý luận chung nhất về thế giới."
  },
  {
    "id": 8,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 6",
    "question": "Cấu trúc của thế giới quan bao gồm:",
    "options": [
      "Tri thức.",
      "Niềm tin.",
      "Lý tưởng.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 9,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 7",
    "question": "Đối tượng nghiên cứu của triết học là:",
    "options": [
      "Nghiên cứu tự nhiên.",
      "Nghiên cứu xã hội.",
      "Nghiên cứu tư duy.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 10,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 8",
    "question": "Triết học là hoạt động gì?",
    "options": [
      "Hoạt động tinh thần.",
      "Hoạt động vật chất.",
      "Hoạt động vật chất và tinh thần.",
      "Hoạt động trừu tượng."
    ],
    "answer": "Hoạt động tinh thần."
  },
  {
    "id": 11,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 9",
    "question": "Vấn đề cơ bản của triết học là giải quyết mấy vấn đề?",
    "options": [
      "1 vấn đề.",
      "2 vấn đề.",
      "3 vấn đề.",
      "4 vấn đề."
    ],
    "answer": "1 vấn đề."
  },
  {
    "id": 12,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 10",
    "question": "Triết học bao gồm những trường phái triết học nào?",
    "options": [
      "Chủ nghĩa duy vật chất phác.",
      "Chủ nghĩa duy vật siêu hình.",
      "Chủ nghĩa duy vật biện chứng.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 13,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 11",
    "question": "Nền triết học nào xem Triết học là khoa học của mọi khoa học?",
    "options": [
      "Chủ nghĩa duy vật thời cổ đại.",
      "Chủ nghĩa duy vật siêu hình.",
      "Chủ nghĩa duy vật biện chứng.",
      "Chủ nghĩa duy tâm chủ quan."
    ],
    "answer": "Chủ nghĩa duy vật thời cổ đại."
  },
  {
    "id": 14,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 12",
    "question": "Vấn đề cơ bản của triết học hiện đại là mối quan hệ giữa:",
    "options": [
      "Tư duy và tồn tại.",
      "Ý thức và vật chất.",
      "Con người với tự nhiên.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 15,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 13",
    "question": "Ai đã nói: Triết học là khoa học của mọi khoa học?",
    "options": [
      "Ph. Hê ghen.",
      "C. Mác – V.I.Lê nin.",
      "L. Phoiơbắc.",
      "Đ. Ricácđô."
    ],
    "answer": "Ph. Hê ghen."
  },
  {
    "id": 16,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 14",
    "question": "Trong lịch sử, phương pháp biện chứng đã trải qua mấy hình thức?",
    "options": [
      "3 hình thức.",
      "2 hình thức.",
      "4 hình thức.",
      "5 hình thức."
    ],
    "answer": "3 hình thức."
  },
  {
    "id": 17,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 15",
    "question": "Triết học phương Đông và phương Tây coi triết học như là một hình thái gì?",
    "options": [
      "Hình thái ý thức xã hội.",
      "Hình thái ý thức.",
      "Hình thái xã hội.",
      "Hình thái kinh tế."
    ],
    "answer": "Hình thái ý thức xã hội."
  },
  {
    "id": 18,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 16",
    "question": "Nguồn gốc nhận thức khi con người đạt trình độ nhất định thì khi đó mới:",
    "options": [
      "Trừu tượng hóa.",
      "Khái quát hóa.",
      "Hệ thống hóa.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 19,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 17",
    "question": "Thế giới quan là khái niệm triết học chỉ …, quan điểm, tình cảm, …, lý tưởng xác định về thế giới và vị trí con người trong thế giới đó. Từ còn thiếu là?",
    "options": [
      "Hệ thống các tri thức/niềm tin.",
      "Hệ thống/niềm tin.",
      "Các tri thức/niềm tin.",
      "Hệ thống các tri thức/ý thức."
    ],
    "answer": "Hệ thống các tri thức/niềm tin."
  },
  {
    "id": 20,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 18",
    "question": "Khởi nghĩa công nhân dệt ở Lyông – Pháp vào năm nào?",
    "options": [
      "Năm 1831 – 1834.",
      "Năm 1835 – 1848.",
      "Năm 1845.",
      "Năm 1848."
    ],
    "answer": "Năm 1831 – 1834."
  },
  {
    "id": 21,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 19",
    "question": "Phong trào hiến chương ở Anh diễn ra vào năm:",
    "options": [
      "Năm 1835 – 1848.",
      "Năm 1831 – 1834.",
      "Năm 1845.",
      "Năm 1848."
    ],
    "answer": "Năm 1835 – 1848."
  },
  {
    "id": 22,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 20",
    "question": "Triết học MLN nghiên cứu vấn đề:",
    "options": [
      "Quy luật vận động và phát triển của tự nhiên, xã hội và tư duy.",
      "Quy luật kinh tế.",
      "Quy luật khách quan của quá trình cách mạng XHCN.",
      "Quy luật vận động và phát triển của xã hội và tư duy."
    ],
    "answer": "Quy luật vận động và phát triển của tự nhiên, xã hội và tư duy."
  },
  {
    "id": 23,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 21",
    "question": "Chọn phương án đúng nhất: Khoa học nào là hạt nhân của thế giới quan?",
    "options": [
      "Triết học.",
      "Khoa học tự nhiên.",
      "Khoa học xã hội.",
      "Khoa học chính trị."
    ],
    "answer": "Triết học."
  },
  {
    "id": 24,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 22",
    "question": "Những tiền đề cơ bản nào dẫn đến sự hình thành và phát triển của chủ nghĩa Mác?",
    "options": [
      "Tiền đề kinh tế xã hội.",
      "Tiền đề lý luận.",
      "Tiền đề khoa học tự nhiên.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 25,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 23",
    "question": "Khởi nghĩa của công nhân nhà máy dệt Xilêđi – Đức vào năm nào?",
    "options": [
      "Năm 1844.",
      "Năm 1835.",
      "Năm 1848",
      "Năm 1834."
    ],
    "answer": "Năm 1844."
  },
  {
    "id": 26,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 24",
    "question": "C. Mác đã kế thừa những thành tựu khoa học tự nhiên nào dẫn đến sự ra đời lý luận khoa học về CNXH?",
    "options": [
      "Quy luật về bảo toàn và chuyển hóa năng lượng.",
      "Thuyết tiến hóa.",
      "Thuyết tế bào.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 27,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 25",
    "question": "Ai đã phát minh ra thuyết tiến hóa?",
    "options": [
      "C. Đắcuynh.",
      "Rôbécmaye.",
      "J. Newtơn.",
      "R. Ôoen."
    ],
    "answer": "C. Đắcuynh."
  },
  {
    "id": 28,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 26",
    "question": "Tuyên ngôn Đảng Cộng sản ra đời năm nào?",
    "options": [
      "Năm 1848.",
      "Năm 1847.",
      "Năm 1845.",
      "Năm 1844"
    ],
    "answer": "Năm 1848."
  },
  {
    "id": 29,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 27",
    "question": "… là hệ thống quan điểm duy vật biện chứng về tự nhiên, xã hội và tư duy về thế giới quan và phương pháp luận khoa học, cách mạng của giai cấp công nhân, nhân dân lao động và các lực lượng xã hội tiến bộ trong nhận thức và cải tạo thế giới. Từ còn thiếu là:",
    "options": [
      "Triết học Mác – Lênin.",
      "Triết học.",
      "Chủ nghĩa Mác – Lênin.",
      "Lý luận Mác – Lênin."
    ],
    "answer": "Triết học Mác – Lênin."
  },
  {
    "id": 30,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 28",
    "question": "Triết học Mác – Lênin là hệ thống quan điểm … về tự nhiên, xã hội và tư duy về thế giới quan và phương pháp luận … của giai cấp công nhân, nhân dân lao động và các lực lượng xã hội tiến bộ trong nhận thức và cải tạo thế giới. Từ còn thiếu là:",
    "options": [
      "Duy vật biện chứng/khoa học, cách mạng.",
      "Duy vật/khoa học.",
      "Duy vật biện chứng/cách mạng.",
      "Biện chứng/khoa học cách mạng."
    ],
    "answer": "Duy vật biện chứng/khoa học, cách mạng."
  },
  {
    "id": 31,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 29",
    "question": "Chủ nghĩa Mác – Lênin bao gồm:",
    "options": [
      "Triết học.",
      "Kinh tế chính trị học.",
      "Chủ nghĩa xã hội khoa học.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 32,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 30",
    "question": "Triết học Mác – Lê nin có mấy chức năng nào?",
    "options": [
      "2 chức năng.",
      "3 chức năng.",
      "4 chức năng.",
      "5 chức năng."
    ],
    "answer": "2 chức năng."
  },
  {
    "id": 33,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 31",
    "question": "Điền từ còn thiếu vào (...): Triết học Mác - Lênin là hệ thống quan điểm duy vật biện chứng về tự nhiên, xã hội và tư duy, là thế giới quan và phương pháp luận khoa học, cách mạng giúp giai cấp công nhân, ... và các lực lượng xã hội tiến bộ nhận thức đúng đắn và cải tạo hiệu quả thế giới.",
    "options": [
      "Nhân dân lao động.",
      "Giai cấp nông dân.",
      "Giai cấp cách mạng.",
      "Tầng lớp cách mạng."
    ],
    "answer": "Nhân dân lao động."
  },
  {
    "id": 34,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 32",
    "question": "Đối tượng nghiên cứu của triết học là:",
    "options": [
      "Nghiên cứu những quy luật chung nhất của tự nhiên, xã hội và tư duy.",
      "Nghiên cứu các hiện tượng quá trình kinh tế, các quy luật kinh tế qua các giai đoạn phát triển của xã hội loại người.",
      "Nghiên cứu quy luật và tính quy luật chính trị xã hội trong đời sống xã hội con người.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Nghiên cứu những quy luật chung nhất của tự nhiên, xã hội và tư duy."
  },
  {
    "id": 35,
    "chapterId": "c1",
    "chapter": "Chương 1: Khái luận về Triết học & Triết học Mác - Lênin",
    "header": "Câu 33",
    "question": "Triết học ra đời vào khoảng:",
    "options": [
      "Trên 2.500 – 2.700 năm.",
      "Trên 2.000 năm",
      "Trên 2.700 – 3.000 năm.",
      "Trên 3.000 năm."
    ],
    "answer": "Trên 2.500 – 2.700 năm."
  },
  {
    "id": 36,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 1",
    "question": "Học thuyết triết học nào chỉ thừa nhận một trong hai thực thể (vật chất hoặc tinh thần) là bản nguyên (nguồn gốc) của thế giới?",
    "options": [
      "A. Nhất nguyên luận",
      "B. Nhị nguyên luận",
      "C. Tam nguyên luận",
      "D. Thống nhất luận"
    ],
    "answer": "A. Nhất nguyên luận"
  },
  {
    "id": 37,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 2",
    "question": "Thuyết có thể biết còn được gọi là gì?",
    "options": [
      "A. Thuyết nguyên tri",
      "B. Thuyết bất khả tri",
      "C. Thuyết tiên tri",
      "D. Thuyết khả tri"
    ],
    "answer": "D. Thuyết khả tri"
  },
  {
    "id": 38,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 4",
    "question": "Ai là người kế tục trung thành và phát triển sáng tạo chủ nghĩa Mác và triết học Mác?",
    "options": [
      "A. Ph. Ăngghen",
      "B. Chủ tịch Hồ Chí Minh",
      "C. V.I. Lênin",
      "D. Đặng Tiểu Bình"
    ],
    "answer": "C. V.I. Lênin"
  },
  {
    "id": 39,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 5",
    "question": "Lựa chọn đáp án đúng: Triết học Mác - Lênin là thế giới quan, phương pháp luận khoa học và cách mạng cho con người trong lĩnh vực nào?",
    "options": [
      "A. Nhận thức",
      "B. Nhận thức - Thực tiễn",
      "C. Thực tiễn",
      "D. Lý luận"
    ],
    "answer": "B. Nhận thức - Thực tiễn"
  },
  {
    "id": 40,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 6",
    "question": "Triết học Mác - Lênin có mấy chức năng?",
    "options": [
      "A. 1",
      "B. 2",
      "C. 3",
      "D. 4"
    ],
    "answer": "B. 2"
  },
  {
    "id": 41,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 7",
    "question": "Đâu là 1 trong các chức năng của Triết học Mác – Lênin?",
    "options": [
      "A. Chức năng thế giới quan",
      "B. Chức năng quan sát",
      "C. Chức năng phán đoán",
      "D. Chức năng dự báo"
    ],
    "answer": "A. Chức năng thế giới quan"
  },
  {
    "id": 42,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 7",
    "question": "Đâu là 1 trong các chức năng của Triết học Mác – Lênin?",
    "options": [
      "A. Chức năng thế giới quan",
      "B. Chức năng quan sát",
      "C. Chức năng phán đoán",
      "D. Chức năng dự báo"
    ],
    "answer": "A. Chức năng thế giới quan"
  },
  {
    "id": 43,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 8",
    "question": "Triết học Mác - Lênin là cơ sở của thế giới quan, phương pháp luận khoa học và cách mạng để phân tích vấn đề gì của xã hội?",
    "options": [
      "A. Phân tích xu hướng phát triển của xã hội",
      "B. Phân tích tình hình kinh tế",
      "C. Phân tích tri thức của con người",
      "D. Phân tích tâm lý của con người"
    ],
    "answer": "A. Phân tích xu hướng phát triển của xã hội"
  },
  {
    "id": 44,
    "chapterId": "c1",
    "chapter": "Chương 1: Bổ sung kiến thức",
    "header": "Câu 9",
    "question": "Triết học Mác - Lênin là gì của công cuộc xây dựng chủ nghĩa xã hội?",
    "options": [
      "A. Cơ sở lập luận",
      "B. Cơ sở nhận thức luận",
      "C. Cơ sở lý luận khoa học",
      "D. Cơ sở quan sát"
    ],
    "answer": "C. Cơ sở lý luận khoa học"
  },
  {
    "id": 45,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 1",
    "question": "Triết học Mác – Lê nin có những chức năng nào?",
    "options": [
      "Thế giới quan và phương pháp luận.",
      "Thế giới quan.",
      "Phương pháp luận.",
      "Thế giới quan và lý luận khoa học."
    ],
    "answer": "Thế giới quan và phương pháp luận."
  },
  {
    "id": 46,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 2",
    "question": "Vật chất là lửa là quan niệm của ai?",
    "options": [
      "Hêraclit.",
      "Talét.",
      "Anaximen.",
      "Đêmôcrit."
    ],
    "answer": "Hêraclit."
  },
  {
    "id": 47,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 3",
    "question": "Quan niệm vật chất là nước là quan niệm của ai?",
    "options": [
      "Talét.",
      "Hê ra clip.",
      "Anaximen.",
      "Đêmôcrit."
    ],
    "answer": "Talét."
  },
  {
    "id": 48,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 4",
    "question": "Vật chất là không khí là quan niệm của ai?",
    "options": [
      "Anaximen",
      "Hê ra clip.",
      "Talét.",
      "Đêmôcrit."
    ],
    "answer": "Anaximen"
  },
  {
    "id": 49,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 5",
    "question": "Ai đã phát hiện ra điện tử là một trong những thành phần cấu tạo nên nguyên tử?",
    "options": [
      "Đêmôcrít.",
      "J.Tômxơn.",
      "W. Rơnghen.",
      "H. Béccơren."
    ],
    "answer": "J.Tômxơn."
  },
  {
    "id": 50,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 6",
    "question": "Vật chất là phạm trù triết học dùng chỉ … đem lại cho con người trong cảm giác, được … của chúng ta chép lại, chụp lại, phản ánh lại và tồn tại không lệ thuộc vào cảm giác. Từ còn thiếu là:",
    "options": [
      "Thực tại khách quan/cảm giác.",
      "Khách quan/nhận thức.",
      "Thực tại/cảm giác.",
      "Thế giới/con người."
    ],
    "answer": "Thực tại khách quan/cảm giác."
  },
  {
    "id": 51,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 7",
    "question": "Theo chủ nghĩa duy vật biện chứng: Vận động là thuộc tính …của vật chất. Từ còn thiếu là?",
    "options": [
      "Cố hữu.",
      "Riêng.",
      "Đặc thù.",
      "Phổ biến."
    ],
    "answer": "Cố hữu."
  },
  {
    "id": 52,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 8",
    "question": "Có mấy hình thức vận động?",
    "options": [
      "Có 5 hình thức.",
      "Có 4 hình thức.",
      "Có 3 hình thức.",
      "Có 2 hình thức."
    ],
    "answer": "Có 5 hình thức."
  },
  {
    "id": 53,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 9",
    "question": "Quan điểm nào cho rằng: Không gian, thời gian và vận động không liên quan với nhau ở bên ngoài vật chất?",
    "options": [
      "Quan điểm chủ nghĩa duy vật siêu hình.",
      "Quan điểm chủ nghĩa duy vật biện chứng.",
      "Quan điểm chủ nghĩa duy tâm khách quan.",
      "Quan điểm chủ nghĩa duy vật chất phác."
    ],
    "answer": "Quan điểm chủ nghĩa duy vật siêu hình."
  },
  {
    "id": 54,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 10",
    "question": "Theo quan điểm chủ nghĩa duy vật biện chứng: Thế giới thống nhất ở:",
    "options": [
      "Tính vật chất.",
      "ý niệm tuyệt đối.",
      "Sự tồn tại.",
      "Ba nhận định trên sai."
    ],
    "answer": "Tính vật chất."
  },
  {
    "id": 55,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 11",
    "question": "Ý thức là:",
    "options": [
      "Sự phản ánh trung thực hiện thực khách quan.",
      "Thuộc tính của mọi dạng vật chất.",
      "Các nhận định trên sai.",
      "Sự phản ánh năng động, sáng tạo hiện thực khách quan."
    ],
    "answer": "Sự phản ánh năng động, sáng tạo hiện thực khách quan."
  },
  {
    "id": 56,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 12",
    "question": "Ý thức có mấy nguồn gốc?",
    "options": [
      "Có 2 nguồn gốc.",
      "Có 3 nguồn gốc.",
      "Có 4 nguồn gốc.",
      "Có 5 nguồn gốc."
    ],
    "answer": "Có 2 nguồn gốc."
  },
  {
    "id": 57,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 13",
    "question": "Trước hết là lao động, sau lao động và đồng thời với lao động là hoạt động gì?",
    "options": [
      "Ngôn ngữ.",
      "Nghỉ ngơi.",
      "Phản ánh.",
      "Nhận thức."
    ],
    "answer": "Ngôn ngữ."
  },
  {
    "id": 58,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 14",
    "question": "Quan điểm chủ nghĩa duy vật biện chứng, nguồn gốc xã hội của ý thức là:",
    "options": [
      "Lao động và ngôn ngữ.",
      "Lao động.",
      "Ngôn ngữ.",
      "Nhận thức."
    ],
    "answer": "Lao động và ngôn ngữ."
  },
  {
    "id": 59,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 15",
    "question": "Phản ánh và sáng tạo là 2 mặt thuộc bản chất của:",
    "options": [
      "Ý thức.",
      "Vật chất và ý thức.",
      "Vật chất.",
      "Thực tiễn."
    ],
    "answer": "Ý thức."
  },
  {
    "id": 60,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 16",
    "question": "Ai là người có ý thức?",
    "options": [
      "Con người.",
      "Người máy thông minh.",
      "Động vật thông minh.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Con người."
  },
  {
    "id": 61,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 17",
    "question": "Vai trò của vật chất với ý thức nó quyết định:",
    "options": [
      "Nguồn gốc.",
      "Nội dung.",
      "Bản chất.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 62,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 18",
    "question": "Trong phép Biện chứng duy vật bao gồm những biện chứng nào?",
    "options": [
      "Biện chứng khách quan và biện chứng chủ quan.",
      "Biện chứng cổ đại và biện chứng siêu hình.",
      "Duy vật và duy tâm.",
      "Duy vật siêu hình và duy vật biện chứng."
    ],
    "answer": "Biện chứng khách quan và biện chứng chủ quan."
  },
  {
    "id": 63,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 19",
    "question": "Biện chứng khách quan là:",
    "options": [
      "Biện chứng của thế giới vật chất, tồn tại khách quan độc lập với ý thức của con người.",
      "Biện chứng của thế giới vật chất, tồn tại khách quan với ý thức của con người.",
      "Biện chứng của thế giới, tồn tại khách quan độc lập với ý thức của con người.",
      "Biện chứng của vật chất, tồn tại khách quan độc lập với ý thức của con người."
    ],
    "answer": "Biện chứng của thế giới vật chất, tồn tại khách quan độc lập với ý thức của con người."
  },
  {
    "id": 64,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 20",
    "question": "Biện chứng khách quan chỉ có trong:",
    "options": [
      "Thế giới vật chất.",
      "Thế giới vật chất và thế giới tinh thần.",
      "Thế giới tinh thần.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Thế giới vật chất."
  },
  {
    "id": 65,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 21",
    "question": "Biện chứng chủ quan là gì? (phương án đúng nhất)",
    "options": [
      "Là sự phản ánh biện chứng khách quan vào trong bộ óc, trong đời sống ý thức, trong tư duy của con người.",
      "Là sự phản ánh vào trong bộ óc, trong đời sống ý thức, trong tư duy của con người.",
      "Là sự phản ánh khách quan vào trong đời sống ý thức, trong tư duy của con người.",
      "Là sự phản ánh biện chứng khách quan vào trong ý thức, trong tư duy của con người."
    ],
    "answer": "Là sự phản ánh biện chứng khách quan vào trong bộ óc, trong đời sống ý thức, trong tư duy của con người."
  },
  {
    "id": 66,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 22",
    "question": "Ai đã nói: Khoa học trước hết là vật lý học càng phát triển bao nhiêu thì các nhà khoa học càng cần trang bị cho mình phép biện chứng duy vật bấy nhiêu?",
    "options": [
      "A. Anhxtanh.",
      "C. Mác.",
      "C. Mác – V.I.Lênin.",
      "C. Mác – Ph. Ăngghen."
    ],
    "answer": "A. Anhxtanh."
  },
  {
    "id": 67,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 23",
    "question": "Ai đã nói: Phép biện chứng duy vật tức là học thuyết về sự phát triển dưới hình thức hoàn bị nhất, sâu sắc nhất và không phiến diện.",
    "options": [
      "V.I.Lênin.",
      "C. Mác.",
      "C. Mác – V.I.Lênin.",
      "C. Mác – Ph. Ăngghen."
    ],
    "answer": "V.I.Lênin."
  },
  {
    "id": 68,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 24",
    "question": "Phép biện chứng có mấy hình thức?",
    "options": [
      "Có 3 hình thức.",
      "Có 2 hình thức.",
      "Có 4 hình thức.",
      "Có 5 hình thức."
    ],
    "answer": "Có 3 hình thức."
  },
  {
    "id": 69,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 25",
    "question": "Mối liên hệ là gì?",
    "options": [
      "Dùng chỉ sự quy định.",
      "Sự ràng buộc, tương hỗ.",
      "Sự chuyển hóa lẫn nhau.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 70,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 26",
    "question": "Nguyên lý về mối liên hệ phổ biến phải gắn liền với:",
    "options": [
      "6 cặp phạm trù.",
      "3 quy luật.",
      "Các nguyên lý.",
      "Ba nhận định trên đúng."
    ],
    "answer": "6 cặp phạm trù."
  },
  {
    "id": 71,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 27",
    "question": "Tính khách quan, tính phổ biến và tính đa dạng phong phú được hiểu là:",
    "options": [
      "Tính chất của mối liên hệ phổ biến.",
      "Tính chất của sự phát triển.",
      "Nguyên lý của mối liên hệ phổ biến.",
      "Nguyên lý của sự phát triển."
    ],
    "answer": "Tính chất của mối liên hệ phổ biến."
  },
  {
    "id": 72,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 28",
    "question": "Nguyên lý về sự phát triển luôn gắn liền với:",
    "options": [
      "3 quy luật.",
      "6 cặp phạm trù.",
      "Các nguyên lý.",
      "Ba nhận định trên đúng."
    ],
    "answer": "3 quy luật."
  },
  {
    "id": 73,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 29",
    "question": "Xu hướng sự phát triển là:",
    "options": [
      "Phủ định của phủ định theo đường xoáy ốc.",
      "Phủ định của phủ định.",
      "Phủ định của phủ định theo hướng đi lên.",
      "Phủ định của phủ định theo đường tròn."
    ],
    "answer": "Phủ định của phủ định theo đường xoáy ốc."
  },
  {
    "id": 74,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 30",
    "question": "… phản ánh những mặt, những thuộc tính, những mối liên hệ chung, cơ bản nhất thuộc một lĩnh vực nhất định. Từ còn thiếu là?",
    "options": [
      "Phạm trù.",
      "Phạm trù triết học.",
      "Triết học.",
      "Chủ nghĩa Mác – Lênin."
    ],
    "answer": "Phạm trù."
  },
  {
    "id": 75,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 31",
    "question": "… phản ánh những mặt, những thuộc tính, những mối liên hệ cơ bản và phổ biến của toàn bộ thế giới hiện thực gồm tự nhiên, xã hội và tư duy. Từ còn thiếu là?",
    "options": [
      "Phạm trù triết học.",
      "Phạm trù.",
      "Triết học.",
      "Chủ nghĩa Mác – Lênin."
    ],
    "answer": "Phạm trù triết học."
  },
  {
    "id": 76,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 32",
    "question": "Cái … chỉ tồn tại trong cái … thông qua cái riêng mà biểu hiện sự tồn tại của mình. Từ còn thiếu là?",
    "options": [
      "Riêng/chung.",
      "Chung/riêng.",
      "Chung/đơn nhất.",
      "Đơn nhất/riêng."
    ],
    "answer": "Chung/riêng."
  },
  {
    "id": 77,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 33",
    "question": "Cái riêng là cái … hơn cái chung, còn cái chung là cái … nhưng sâu sắc, bản chất hơn cái riêng. Từ còn thiếu là?",
    "options": [
      "Toàn bộ/bộ phận.",
      "Bộ phận/toàn bộ.",
      "Tồn tại/bộ phận.",
      "Bộ phận/tồn tại."
    ],
    "answer": "Toàn bộ/bộ phận."
  },
  {
    "id": 78,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 34",
    "question": "Nguyên nhân là … chỉ sự tác động lẫn nhau giữa các mặt trong một sự vật hiện tượng gây ra sự biến đổi nhất định nào đó. Từ còn thiếu là?",
    "options": [
      "Phạm trù triết học.",
      "Phạm trù.",
      "Kết quả.",
      "Khách quan."
    ],
    "answer": "Phạm trù triết học."
  },
  {
    "id": 79,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 35",
    "question": "Mối quan hệ nguyên nhân và kết quả là:",
    "options": [
      "Mối quan hệ khách quan.",
      "Mối quan hệ khách quan và chủ quan.",
      "Mối quan hệ nhận thức và thực tiễn.",
      "Mối quan hệ biện chứng lịch sử."
    ],
    "answer": "Mối quan hệ khách quan."
  },
  {
    "id": 80,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 36",
    "question": "Cái do nguyên nhân cơ bản bên trong của kết cấu vật chất quyết định và trong những điều kiện nhất định nó phải sảy ra như thế chứ không thể khác, được gọi là:",
    "options": [
      "Tất nhiên.",
      "Ngẫu nhiên.",
      "Kết quả.",
      "Bản chất."
    ],
    "answer": "Tất nhiên."
  },
  {
    "id": 81,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 37",
    "question": "Cái không do mối liên hệ bản chất bên trong kết cấu vật chất, bên trong sự vật quyết định mà do nhân tố bên ngoài, do sự ngẫu hợp của nhiều hoàn cảnh bên ngoài quyết định, được hiểu là?",
    "options": [
      "Ngẫu nhiên.",
      "Tất nhiên.",
      "Khả năng.",
      "Hiện thực."
    ],
    "answer": "Ngẫu nhiên."
  },
  {
    "id": 82,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 38",
    "question": "… là phương thức tồn tại và phát triển của sự vật, là hệ thống các mối liên hệ tương đối bền vững giữa các yếu tố của sự vật đó. Từ còn thiếu là?",
    "options": [
      "Hình thức.",
      "Nội dung.",
      "Nguyên nhân.",
      "Kết quả."
    ],
    "answer": "Hình thức."
  },
  {
    "id": 83,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 39",
    "question": "Trong quá trình vận động và phát triển của sự vật … giữ vai trò quyết định … Từ còn thiếu là?",
    "options": [
      "Nội dung/hình thức.",
      "Hình thức/nội dung.",
      "Hiện tượng/bản chất.",
      "Ngẫu nhiên/tất nhiên."
    ],
    "answer": "Nội dung/hình thức."
  },
  {
    "id": 84,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 40",
    "question": "Tổng hợp tất cả những mặt, những mối liên hệ tất nhiên tương đối ổn định bên trong sự vật, quy định sự vận động và phát triển của sự vật, được gọi là?",
    "options": [
      "Bản chất.",
      "Hiện tượng.",
      "Nội dung.",
      "Hình thức."
    ],
    "answer": "Bản chất."
  },
  {
    "id": 85,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 41",
    "question": "Hiện tượng là:",
    "options": [
      "Biểu hiện bên ngoài của bản chất.",
      "Một bộ phận của bản chất.",
      "Luôn đồng nhất với bản chất.",
      "Kết quả của bản chất."
    ],
    "answer": "Biểu hiện bên ngoài của bản chất."
  },
  {
    "id": 86,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 42",
    "question": "Phạm trù triết học dùng chỉ những gì chưa có nhưng sẽ có, sẽ tới khi có điều kiện tương ứng thích hợp, được gọi là?",
    "options": [
      "Khả năng.",
      "Hiện thực.",
      "Kết quả.",
      "Hiện tượng."
    ],
    "answer": "Khả năng."
  },
  {
    "id": 87,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 43",
    "question": "Phạm trù triết học dùng chỉ những gì hiện có, hiện tồn tại thực sự, được gọi là?",
    "options": [
      "Hiện thực.",
      "Khả năng.",
      "Hiện thực khách quan.",
      "Kết quả."
    ],
    "answer": "Hiện thực."
  },
  {
    "id": 88,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 44",
    "question": "V.I.Lênin khẳng định: Chủ nghĩa Mác dựa vào … chứ không phải dựa vào … để vạch ra đường lối chính trị của mình. Từ còn thiếu là?",
    "options": [
      "Hiện thực/khả năng.",
      "Khả năng/hiện thực.",
      "Hiện thực/ngẫu nhiên.",
      "Tất nhiên/ngẫu nhiên."
    ],
    "answer": "Hiện thực/khả năng."
  },
  {
    "id": 89,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 45",
    "question": "Quy luật là:",
    "options": [
      "Những mối liên hệ phổ biến khách quan.",
      "Bản chất, bền vững, tất yếu.",
      "Bị tác động khi có điều kiện phù hợp.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 90,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 46",
    "question": "Trong phân loại quy luật nếu căn cứ tính phổ biến thì có:",
    "options": [
      "Quy luật riêng.",
      "Quy luật chung.",
      "Quy luật phổ biến.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 91,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 47",
    "question": "Căn cứ vào lĩnh vực tác động thì có:",
    "options": [
      "Quy luật tự nhiên.",
      "Quy luật xã hội.",
      "Quy luật tư duy.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 92,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 48",
    "question": "Quy luật chuyển hóa từ những thay đổi về lượng dẫn đến thay đổi về chất và ngược lại, nói lên đặc tính nào của sự phát triển?",
    "options": [
      "Cách thức sự vận động và phát triển.",
      "Nguồn gốc, động lực của sự phát triển.",
      "Khuynh hướng vận động và phát triển.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Cách thức sự vận động và phát triển."
  },
  {
    "id": 93,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 49",
    "question": "Quy luật thống nhất và đấu tranh giữa các mặt đối lập, nói lên đặc tính nào của sự phát triển?",
    "options": [
      "Nguồn gốc, động lực của sự phát triển",
      "Cách thức vận động của sự phát triển.",
      "Khuynh hướng vận động và phát triển.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Nguồn gốc, động lực của sự phát triển"
  },
  {
    "id": 94,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 50",
    "question": "Quy luật phủ định của phủ định, nói lên đặc tính nào của sự phát triển?",
    "options": [
      "Khuynh hướng sự vận động và phát triền.",
      "Cách thức vận động của sự phát triển.",
      "Nguồn gốc, động lực của sự phát triển.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Khuynh hướng sự vận động và phát triền."
  },
  {
    "id": 95,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 51",
    "question": "Vị trí của quy luật nào là hạt nhân của phép biện chứng duy vật trong triết học Mác – Lênin?",
    "options": [
      "Quy luật mâu thuẫn.",
      "Quy luật lượng – chất.",
      "Quy luật phủ định của phủ định.",
      "Cả ba quy luật trên."
    ],
    "answer": "Quy luật mâu thuẫn."
  },
  {
    "id": 96,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 52",
    "question": "Phủ định biện chứng theo hình thức nào?",
    "options": [
      "Đường xoắn ốc.",
      "Đường thẳng.",
      "Đường cong không cân đối.",
      "Không gian 3 chiều."
    ],
    "answer": "Đường xoắn ốc."
  },
  {
    "id": 97,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 53",
    "question": "Quy luật phủ định của phủ định có ý nghĩa phương pháp luận là:",
    "options": [
      "Ủng hộ cái mới.",
      "Khắc phục tư tưởng bảo thù, trì trệ, giáo điều.",
      "Kế thừa có chọn lọc, cải tạo cái cũ, xây dựng cái mới phù hợp.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 98,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 54",
    "question": "Mâu thuẫn nào tồn tại trong suốt quá trình vận động và phát triển của sự vật hiện tượng?",
    "options": [
      "Mâu thuẫn cơ bản.",
      "Mâu thuẫn chủ yếu.",
      "Mâu thuẫn đối kháng.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Mâu thuẫn cơ bản."
  },
  {
    "id": 99,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 55",
    "question": "Nhận thức là gì? (phương án đúng nhất)",
    "options": [
      "Là quá trình phản ánh tích cực, tự giác và sáng tạo thế giới khách quan vào bộ óc con người.",
      "Là quá trình phản ánh tích cực và sáng tạo thế giới khách quan vào bộ óc con người.",
      "Là quá trình phản ánh tự giác và sáng tạo thế giới khách quan vào bộ óc con người.",
      "Là quá trình phản ánh tích cực, tự giác thế giới vào bộ óc con người."
    ],
    "answer": "Là quá trình phản ánh tích cực, tự giác và sáng tạo thế giới khách quan vào bộ óc con người."
  },
  {
    "id": 100,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 56",
    "question": "Thực tiễn là toàn bộ hoạt động …, có tính lịch sử xã hội của con người nhằm cải tạo tự nhiên và xã hội phục vụ nhân loại tiến bộ. Từ còn thiếu là?",
    "options": [
      "Vật chất cảm tính.",
      "Vật chất.",
      "Cảm tính.",
      "Ý thức."
    ],
    "answer": "Vật chất cảm tính."
  },
  {
    "id": 101,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 57",
    "question": "Hoạt động thực tiễn có mấy hình thức?",
    "options": [
      "Có 3 hình thức.",
      "Có 2 hình thức.",
      "Có 4 hình thức.",
      "Có 5 hình thức."
    ],
    "answer": "Có 3 hình thức."
  },
  {
    "id": 102,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 58",
    "question": "Hình thức hoạt động thực tiễn là:",
    "options": [
      "Hoạt động sản xuất vật chất.",
      "Hoạt động chính trị xã hội.",
      "Hoạt động thực nghiệm khoa học.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 103,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 59",
    "question": "Hoạt động sản xuất vật chất, hoạt động chính trị xã hội, hoạt động thực nghiệm khoa học. Trong đó hoạt động nào là gốc, là cơ bản quan trọng quyết định nhất?",
    "options": [
      "Hoạt động sản xuất vật chất.",
      "Hoạt động chính trị xã hội.",
      "Hoạt động thực nghiệm khoa học.",
      "Cả ba nhận định trên."
    ],
    "answer": "Hoạt động sản xuất vật chất."
  },
  {
    "id": 104,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 60",
    "question": "Hoạt động sản xuất vật chất, hoạt động chính trị xã hội, hoạt động thực nghiệm khoa học. Trong đó hoạt động nào là hoạt động đặc biệt của thực tiễn?",
    "options": [
      "Hoạt động thực nghiệm khoa học.",
      "Hoạt động chính trị xã hội.",
      "Hoạt động sản xuất vật chất.",
      "Cả ba nhận định trên."
    ],
    "answer": "Hoạt động thực nghiệm khoa học."
  },
  {
    "id": 105,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 61",
    "question": "Là cơ sở, động lực; là mục đích của nhận thức; là tiêu chuẩn của chân lý. Được hiểu là vấn đề gì của thực tiễn với nhận thức?",
    "options": [
      "Vai trò thực tiễn với nhận thức.",
      "Hình thức của hoạt động thực tiễn.",
      "Đặc trưng của thực tiễn.",
      "Nguồn gốc của thực tiễn."
    ],
    "answer": "Vai trò thực tiễn với nhận thức."
  },
  {
    "id": 106,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 62",
    "question": "Tiêu chuẩn của chân lý là:",
    "options": [
      "Thực tiễn.",
      "Câu nói của vĩ nhân.",
      "Tri thức của nhân loại.",
      "Các nhận định trên đúng."
    ],
    "answer": "Thực tiễn."
  },
  {
    "id": 107,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 63",
    "question": "Từ trực quan sinh động đến tư duy trừu tượng và từ tư duy trừu tượng đến thực tiễn. Là câu nói của ai?",
    "options": [
      "V.I.Lênin.",
      "C. Mác – V.I. Lênin.",
      "C. Mác – Ph. Ăngghen.",
      "Ph. Ăngghen."
    ],
    "answer": "V.I.Lênin."
  },
  {
    "id": 108,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 64",
    "question": "Hình thức cao nhất của nhận thức cảm tính là hình thức nào?",
    "options": [
      "Biểu tượng.",
      "Cảm giác.",
      "Tri giác.",
      "Ba nhận định trên."
    ],
    "answer": "Biểu tượng."
  },
  {
    "id": 109,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 65",
    "question": "Nhận thức lý tính là:",
    "options": [
      "Là hình thức cơ bản của tư duy trừu tượng, phản ánh khái quát, gián tiếp thuộc tính chung nào đó của vật chất.",
      "Là phản ánh đúng đắn chân lý của nhận thức.",
      "Là phản ánh sơ khai, đơn giản của quá trình nhận thức.",
      "Là phản ánh toàn vẹn của quá trình nhận thức."
    ],
    "answer": "Là hình thức cơ bản của tư duy trừu tượng, phản ánh khái quát, gián tiếp thuộc tính chung nào đó của vật chất."
  },
  {
    "id": 110,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 66",
    "question": "Nhận thức lý tính thể hiện qua 3 hình thức cơ bản nào?",
    "options": [
      "Khái niệm, phán đoán, suy lý.",
      "Khái niệm, cảm giác, tri giác.",
      "Khái niệm, cảm giác, biểu tượng.",
      "Khái niệm, phán đoán, biểu tượng."
    ],
    "answer": "Khái niệm, phán đoán, suy lý."
  },
  {
    "id": 111,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 67",
    "question": "Tính chất của chân lý có:",
    "options": [
      "Tính khách quan.",
      "Tính tương đối và tuyệt đối.",
      "Tính cụ thể.",
      "Ba nhận định trên."
    ],
    "answer": "Ba nhận định trên."
  },
  {
    "id": 112,
    "chapterId": "c2",
    "chapter": "Chương 2: Chủ nghĩa duy vật biện chứng",
    "header": "Câu 68",
    "question": "Tính khách quan; tính tương đối và tuyệt đối; tính cụ thể. Được hiểu là:",
    "options": [
      "Tính chất của chân lý.",
      "Quan điểm của chân lý.",
      "Các giai đoạn của chân lý.",
      "Vai trò của chân lý."
    ],
    "answer": "Tính chất của chân lý."
  },
  {
    "id": 113,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 1",
    "question": "Chọn đáp án đúng nhất: Các nhà triết học nào phủ nhận đặc trưng “tự thân tồn tại” của sự vật, hiện tượng của thế giới?",
    "options": [
      "A. Các nhà triết học duy vật",
      "B. Các nhà triết học duy tâm",
      "C. Các nhà khoa học",
      "D. Các nhà vật lý"
    ],
    "answer": "B. Các nhà triết học duy tâm"
  },
  {
    "id": 114,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 2",
    "question": "Chọn đáp án đúng nhất: Các nhà triết học thời kỳ nào đã không đưa ra được những khái quát triết học đúng đắn?",
    "options": [
      "A. Các nhà triết học duy vật thời kỳ cận đại",
      "B. Các nhà triết học thời kỳ hậu hiện đại",
      "C. Các nhà triết học hiện đại",
      "D. Các nhà triết học cổ đại"
    ],
    "answer": "A. Các nhà triết học duy vật thời kỳ cận đại"
  },
  {
    "id": 115,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 3",
    "question": "Cuộc cách mạng trong khoa học tự nhiên cuối thế kỷ XIX, đầu thế kỷ XX và sự phá sản của các quan điểm duy vật nào sau đây?",
    "options": [
      "A. Duy vật Marxist",
      "B. Duy vật lỗi thời",
      "C. Duy vật biện chứng",
      "D. Duy vật siêu hình về vật chất"
    ],
    "answer": "D. Duy vật siêu hình về vật chất"
  },
  {
    "id": 116,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 4",
    "question": "Nhân vật nào sau đây đã phủ nhận sự tồn tại thực tế của nguyên tử và phân tử?",
    "options": [
      "A. Ốtvan",
      "B. A.Anhxtanh",
      "C. Béccơren",
      "D. Piếcsơn"
    ],
    "answer": "A. Ốtvan"
  },
  {
    "id": 117,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 5",
    "question": "Cuộc cách mạng trong khoa học tự nhiên cuối thế kỷ XIX, đầu thế kỷ XX và sự phá sản của các quan điểm duy vật nào sau đây?",
    "options": [
      "A. Duy vật Marxist",
      "B. Duy vật lỗi thời",
      "C. Duy vật biện chứng",
      "D. Duy vật siêu hình về vật chất"
    ],
    "answer": "D. Duy vật siêu hình về vật chất"
  },
  {
    "id": 118,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 6",
    "question": "Chức năng nào sau đây của triết học được xem là hạt nhân lý luận của thế giới quan?",
    "options": [
      "A. Chức năng phán đoán",
      "B. Chức năng tư duy",
      "C. Chức năng thế giới quan",
      "D. Chức năng ghi nhớ"
    ],
    "answer": "C. Chức năng thế giới quan"
  },
  {
    "id": 119,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 7",
    "question": "Căn cứ vào định nghĩa vật chất của V.I.Lênin thì vật chất tồn tại như thế nào với ý thức?",
    "options": [
      "A. Tồn tại hiện thức bên ngoài ý thức và không lệ thuộc vào ý thức",
      "B. Tồn tại hiện thức bên trong ý thức",
      "C. Tồn tại lệ thuộc vào ý thức",
      "D. Tồn tại hiện thức bên trong ý thức và không lệ thuộc vào ý thức"
    ],
    "answer": "A. Tồn tại hiện thức bên ngoài ý thức và không lệ thuộc vào ý thức"
  },
  {
    "id": 120,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 8",
    "question": "Vật chất quyết định những vấn đề gì của ý thức?",
    "options": [
      "A. Vận động, phát triển",
      "B. Đứng im",
      "C. Tồn tại của ý thức",
      "D. Phát triển của ý thức"
    ],
    "answer": "A. Vận động, phát triển"
  },
  {
    "id": 121,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 9",
    "question": "Mối liên hệ là phạm trù triết học dùng để chỉ vấn đề gì giữa các yếu tố, các bộ phận trong một đối tượng hoặc giữa các đối tượng với nhau?",
    "options": [
      "A. Các mối quan hệ ràng buộc tương hỗ, ảnh hưởng lẫn nhau",
      "B. Các mối quan hệ ràng buộc và ảnh hưởng lẫn nhau",
      "C. Các mối quan hệ ràng buộc ảnh hưởng lẫn nhau",
      "D. Các mối quan hệ ràng buộc tương hỗ, quy đinh và ảnh hưởng lẫn nhau"
    ],
    "answer": "D. Các mối quan hệ ràng buộc tương hỗ, quy đinh và ảnh hưởng lẫn nhau"
  },
  {
    "id": 122,
    "chapterId": "c2",
    "chapter": "Chương 2: Bổ sung kiến thức",
    "header": "Câu 10",
    "question": "Nếu cắt theo chiều dọc, thực tiễn có kết cấu như thế nào?",
    "options": [
      "A. Mục đích, phương tiện và kết quả",
      "B. Phản ánh mục đích",
      "C. Kế hoạch, và hoạt động thực tiễn",
      "D. Trí giác, nhận thức."
    ],
    "answer": "A. Mục đích, phương tiện và kết quả"
  },
  {
    "id": 123,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 1",
    "question": "Sản xuất là hoạt động có … và không ngừng … nhằm thỏa mãn … tồn tại và phát triển của con người. Từ còn thiếu là?",
    "options": [
      "Mục đích/sáng tạo/nhu cầu.",
      "Sáng tạo/lao động/nhu cầu.",
      "Mục đích/sáng tạo/ý thích.",
      "Sáng tạo/cải tiến/mục đích."
    ],
    "answer": "Mục đích/sáng tạo/nhu cầu."
  },
  {
    "id": 124,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 2",
    "question": "Sự sản xuất xã hội bao gồm:",
    "options": [
      "Sản xuất vật chất; sản xuất tinh thần và sản xuất ra chính bản thân con người.",
      "Sản xuất vật chất và sản xuất ra chính bản thân con người.",
      "Sản xuất tinh thần và sản xuất ra chính bản thân con người.",
      "Sản xuất vật chất và sản xuất tinh thần."
    ],
    "answer": "Sản xuất vật chất; sản xuất tinh thần và sản xuất ra chính bản thân con người."
  },
  {
    "id": 125,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 3",
    "question": "Sản xuất vật chất là quá trình mà trong đó con người sử dụng … tác động …, từ còn thiếu là?",
    "options": [
      "Công cụ lao động/trực tiếp hay gián tiếp vào tự nhiên.",
      "Sức của mình/trực tiếp hay gián tiếp vào tự nhiên.",
      "Lao động/trực tiếp vào tự nhiên.",
      "Công cụ/trực tiếp vào tự nhiên."
    ],
    "answer": "Công cụ lao động/trực tiếp hay gián tiếp vào tự nhiên."
  },
  {
    "id": 126,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 4",
    "question": "Phương thức sản xuất là:",
    "options": [
      "Cách thức con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định.",
      "Cách thức con người quan hệ với nhau trong sản xuất.",
      "Cách thức con người quan hệ với tự nhiên.",
      "Cách thức tái sản xuất ra của cải vật chất trong xã hội."
    ],
    "answer": "Cách thức con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định."
  },
  {
    "id": 127,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 5",
    "question": "Lịch sử xã hội loài người đã và đang trải qua mấy phương thức sản xuất?",
    "options": [
      "5 phương thức sản xuất.",
      "4 phương thức sản xuất.",
      "3 phương thức sản xuất.",
      "2 phương thức sản xuất."
    ],
    "answer": "5 phương thức sản xuất."
  },
  {
    "id": 128,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 6",
    "question": "Hình thái kinh tế xã hội bao gồm:",
    "options": [
      "Lực lượng sản xuất.",
      "Quan hệ sản xuất.",
      "Kiến trúc thượng tầng.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 129,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 7",
    "question": "Lực lượng sản xuất bao gồm:",
    "options": [
      "Người lao động và tư liệu sản xuất.",
      "Tư liệu lao động và đối tượng lao động.",
      "Tư liệu sản xuất và đối tượng sản xuất.",
      "Người lao động và tư liệu."
    ],
    "answer": "Người lao động và tư liệu sản xuất."
  },
  {
    "id": 130,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 8",
    "question": "Quan hệ sản xuất bao gồm:",
    "options": [
      "Quan hệ sở hữu về tư liệu sản xuất.",
      "Quan hệ tổ chức quản lý sản xuất.",
      "Quan hệ phân phối sản phẩm.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 131,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 9.1",
    "question": "Quan hệ về sở hữu TLSX; quan hệ về tổ chức quản lý sản xuất và quan hệ về phân phối sản phẩm, được hiểu là?",
    "options": [
      "Quan hệ sản xuất.",
      "Lực lượng sản xuất.",
      "Cơ sở hạ tầng.",
      "Kiến trúc thượng tầng."
    ],
    "answer": "Quan hệ sản xuất."
  },
  {
    "id": 132,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 9",
    "question": "Sự thống nhất giữa lực lượng sản xuất ở một trình độ nhất định và quan hệ sản xuất tương ứng tạo thành:",
    "options": [
      "Phương thức sản xuất.",
      "Cơ sở hạ tầng.",
      "Kiến trúc thượng tầng.",
      "Hình thái kinh tế."
    ],
    "answer": "Phương thức sản xuất."
  },
  {
    "id": 133,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 11",
    "question": "Yếu tố nào là yếu tố thường xuyên biến đổi nhất trong lực lượng sản xuất?",
    "options": [
      "Người lao động.",
      "Công cụ lao động.",
      "Đối tượng lao động.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Công cụ lao động."
  },
  {
    "id": 134,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 12",
    "question": "Yếu tố chủ thể hàng đầu của lực lượng sản xuất là:",
    "options": [
      "Người lao động.",
      "Tư liệu lao động.",
      "Đối tượng lao động.",
      "Công cụ lao động."
    ],
    "answer": "Người lao động."
  },
  {
    "id": 135,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 13",
    "question": "Điểm khác biệt căn bản của xã hội loài người với xã hội loài vật ở chỗ loài vật chỉ hái lượm, trong khi con người lại sản xuất. Ai đã nói?",
    "options": [
      "Ăng ghen.",
      "Lê nin.",
      "Mác.",
      "Mác – Lê nin."
    ],
    "answer": "Ăng ghen."
  },
  {
    "id": 136,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 14",
    "question": "Mục đích mà Đảng Cộng sản Việt Nam phát triển công nghiệp hóa, hiện đại hóa là phát triển?",
    "options": [
      "Lực lượng sản xuất.",
      "Quan hệ sản xuất.",
      "Cơ sở hạ tầng.",
      "Kiến trúc thượng tầng."
    ],
    "answer": "Lực lượng sản xuất."
  },
  {
    "id": 137,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 15",
    "question": "Trong 3 mặt của quan hệ sản xuất thì mặt quan hệ nào là cơ bản?",
    "options": [
      "Quan hệ sở hữu tư liệu sản xuất.",
      "Quan hệ tổ chức quản lý.",
      "Quan hệ phân phối sản phẩm.",
      "Các quan hệ có vị trí như nhau."
    ],
    "answer": "Quan hệ sở hữu tư liệu sản xuất."
  },
  {
    "id": 138,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 16",
    "question": "Chọn phương án sai: Quan hệ sản xuất bao gồm những yếu tố?",
    "options": [
      "Quan hệ mọi mặt giữa người lao động và người chủ.",
      "Quan hệ phân phối sản phẩm.",
      "Quan hệ tổ chức và quản lý sản xuất.",
      "Quan hệ sở hữu tư liệu sản xuất."
    ],
    "answer": "Quan hệ mọi mặt giữa người lao động và người chủ."
  },
  {
    "id": 139,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 17",
    "question": "Cơ sở hạ tầng của xã hội bao gồm?",
    "options": [
      "Quan hệ sản xuất thống trị.",
      "Quan hệ tàn dư của xã hội cũ.",
      "Quan hệ sản xuất mầm mống.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 140,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 18",
    "question": "Kiến trúc thượng tầng là?",
    "options": [
      "Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng.",
      "Các quan hệ sản xuất có trong xã hội.",
      "Các cơ sở kinh tế có trong xã hội.",
      "Các hệ tư tưởng của giai cấp thống trị."
    ],
    "answer": "Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng."
  },
  {
    "id": 141,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 19",
    "question": "Khi cơ sở kinh tế thay đổi thì toàn bộ cái kiến trúc thượng tầng đồ sộ cũng bị đảo lộn ít nhiều nhanh chóng. Ai đã nói?",
    "options": [
      "Mác.",
      "Mác – Lênin.",
      "Ăng ghen.",
      "Lênin."
    ],
    "answer": "Mác."
  },
  {
    "id": 142,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 20",
    "question": "Nền kinh tế Việt Nam hiện nay coi kinh tế tư nhân là:",
    "options": [
      "Động lực quan trọng.",
      "Chủ đạo của nền kinh tế.",
      "Nòng cốt phát triển hết tiềm năng.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Động lực quan trọng."
  },
  {
    "id": 143,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 21",
    "question": "Giai cấp là gì?",
    "options": [
      "Là những tập đoàn người to lớn.",
      "Khác nhau về địa vị, về hưởng thụ.",
      "Về quan hệ TLSX và tổ chức lao động.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 144,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 22",
    "question": "Đặc trưng của gia cấp là:",
    "options": [
      "Khác nhau về địa vị.",
      "Khác nhau về quan hệ và vai trò.",
      "Khác nhau về quy mô số lượng của cải.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 145,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 23",
    "question": "Giai cấp công nhân là một tập đoàn …, hình thành và phát triển cùng với quá trình phát triển của nền …, từ còn thiếu là?",
    "options": [
      "Xã hội ổn định/công nghiệp hiện đại.",
      "Người ổn định/công nghiệp.",
      "Xã hội/khoa học hiện đại.",
      "Người/công nghiệp hóa, hiện đại hóa."
    ],
    "answer": "Xã hội ổn định/công nghiệp hiện đại."
  },
  {
    "id": 146,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 24",
    "question": "Sứ mệnh lịch sử của giai cấp công nhân là:",
    "options": [
      "Xóa bỏ chế độ tư bản chủ nghĩa.",
      "Xây dựng chủ nghĩa xã hội.",
      "Xây dựng chủ nghĩa cộng sản.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 147,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 25",
    "question": "Trong lịch sử xã hội loài người đã có những cuộc đấu tranh giai cấp nào?",
    "options": [
      "Đấu tranh của giai cấp nô lệ với chủ nô.",
      "Đấu tranh giai cấp nông dân với giai cấp địa chủ.",
      "Đấu tranh giai cấp vô sản với giai cấp tư sản.",
      "Các nhận định trên đúng."
    ],
    "answer": "Các nhận định trên đúng."
  },
  {
    "id": 148,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 26",
    "question": "C. Mác đã có những phát kiến vĩ đại đó là những phát kiến nào?",
    "options": [
      "Chủ nghĩa duy vật lịch sử.",
      "Học thuyết giá trị thặng dư.",
      "Sứ mệnh của giai cấp công nhân.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 149,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 27",
    "question": "Trước khi hình thành dân tộc, loài người đã trải qua:",
    "options": [
      "Thị tộc.",
      "Bộ lạc.",
      "Bộ tộc.",
      "Ba nhận định trên."
    ],
    "answer": "Ba nhận định trên."
  },
  {
    "id": 150,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 28",
    "question": "Để dân tộc hình thành phải hội tụ đủ mấy điều kiện?",
    "options": [
      "2 điều kiện.",
      "3 điều kiện.",
      "4 điều kiện.",
      "5 điều kiện."
    ],
    "answer": "2 điều kiện."
  },
  {
    "id": 151,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 29",
    "question": "Điều kiện để dân tộc hình thành đó là:",
    "options": [
      "Chống thiên nhiên và chống giặc ngoại xâm.",
      "Chống thiên nhiên.",
      "Chống giặc ngoại xâm.",
      "Đoàn kết."
    ],
    "answer": "Chống thiên nhiên và chống giặc ngoại xâm."
  },
  {
    "id": 152,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 30",
    "question": "Dân tộc là một cộng đồng người ổn định được hình thành trong lịch sử trên cơ sở một …, một ngôn ngữ thống nhất, một nền kinh tế thống nhất, một nền văn hóa tâm lý, tính cách bền vững với một nhà nước và … thống nhất. Từ còn thiếu là?",
    "options": [
      "Lãnh thổ thống nhất/pháp luật.",
      "Thống nhất/pháp luật.",
      "Biên giới thống nhất/tiền tệ.",
      "Thói quen thống nhất/pháp luật."
    ],
    "answer": "Lãnh thổ thống nhất/pháp luật."
  },
  {
    "id": 153,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 31",
    "question": "Nhà nước có mấy đặc trưng?",
    "options": [
      "Có 3 đặc trưng.",
      "Có 2 đặc trưng.",
      "Có 4 đặc trưng.",
      "Có 5 đặc trưng."
    ],
    "answer": "Có 3 đặc trưng."
  },
  {
    "id": 154,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 32",
    "question": "Đặc trưng của nhà nước là:",
    "options": [
      "Quản lý dân trên một vùng lãnh thổ.",
      "Có hệ thống quyền lực chuyên nghiệp.",
      "Có hệ thống thuế khóa.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 155,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 33",
    "question": "Nhà nước có mấy chức năng?",
    "options": [
      "Có 2 chức năng.",
      "Có 3 chức năng.",
      "Có 4 chức năng.",
      "Có 5 chức năng."
    ],
    "answer": "Có 2 chức năng."
  },
  {
    "id": 156,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 34",
    "question": "Chức năng của nhà nước là:",
    "options": [
      "Thống trị chính trị và chức năng xã hội.",
      "Thống trị và chức năng xã hội.",
      "Bạo lực và tuyên truyền giáo dục.",
      "Quản lý và điều hành."
    ],
    "answer": "Thống trị chính trị và chức năng xã hội."
  },
  {
    "id": 157,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 35",
    "question": "Nhà nước nào là kiểu nhà nước đặc biệt?",
    "options": [
      "Nhà nước vô sản.",
      "Nhà nước chủ nô.",
      "Nhà nước phong kiến.",
      "Nhà nước tư sản."
    ],
    "answer": "Nhà nước vô sản."
  },
  {
    "id": 158,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 36",
    "question": "Đảng Cộng sản Việt Nam chủ trương xây dựng Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là:",
    "options": [
      "Nhà nước pháp quyền xã hội chủ nghĩa.",
      "Nhà nước xã hội chủ nghĩa.",
      "Nhà nước do Đảng lãnh đạo.",
      "Nhà nước của dân, do dân, vì dân."
    ],
    "answer": "Nhà nước pháp quyền xã hội chủ nghĩa."
  },
  {
    "id": 159,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 37",
    "question": "Cách mạng xã hội phụ thuộc vào:",
    "options": [
      "Nhân tố chủ quan.",
      "Điều kiện khách quan.",
      "Thời cơ cách mạng.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 160,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 38",
    "question": "Phương pháp cách mạng là: (phương án đúng nhất)",
    "options": [
      "Phương pháp cách mạng bạo lực và phương pháp cách mạng hòa bình.",
      "Phương pháp hòa bình.",
      "Phương pháp bạo lực.",
      "Phương pháp bạo động cùng giáo dục thuyết phục."
    ],
    "answer": "Phương pháp cách mạng bạo lực và phương pháp cách mạng hòa bình."
  },
  {
    "id": 161,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 39",
    "question": "Yếu tố cơ bản nào tạo thành tồn tại xã hội?",
    "options": [
      "Điều kiện tự nhiên, hoàn cảnh địa lý.",
      "Dân số và mật độ dân số.",
      "Phương thức sản xuất vật chất.",
      "Ba nhận định trên đúng."
    ],
    "answer": "Ba nhận định trên đúng."
  },
  {
    "id": 162,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 40",
    "question": "Ý thức xã hội là gì? (phương án đúng nhất)",
    "options": [
      "Chỉ toàn bộ sinh hoạt tinh thần của xã hội.",
      "Chỉ toàn bộ sinh hoạt vật chất của xã hội.",
      "Chỉ toàn bộ sinh hoạt vật chất và tinh thần của xã hội.",
      "Chỉ đời sống văn hóa của xã hội."
    ],
    "answer": "Chỉ toàn bộ sinh hoạt tinh thần của xã hội."
  },
  {
    "id": 163,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 41",
    "question": "Ý thức thông thường là toàn bộ những tri thức, quan niệm của con người trong cộng đồng người được hình thành … từ hoạt động … chưa được hệ thống hóa, khái quát hóa thành lý luận. Từ còn thiếu là?",
    "options": [
      "Trực tiếp/thực tiễn.",
      "Thực tiễn/trực tiếp.",
      "Trực tiếp/sản xuất.",
      "Trong quá trình nhận thức/lao động sản xuất."
    ],
    "answer": "Trực tiếp/thực tiễn."
  },
  {
    "id": 164,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 41",
    "question": "Dựa vào trình độ và phương thức phản ánh tồn tại xã hội thì ý thức xã hội được chia thành:",
    "options": [
      "Tâm lý xã hội và hệ tư tưởng xã hội.",
      "Tâm lý xã hội.",
      "Hệ tư tưởng xã hội.",
      "Tâm lý và hệ tư tưởng."
    ],
    "answer": "Tâm lý xã hội và hệ tư tưởng xã hội."
  },
  {
    "id": 165,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 42",
    "question": "Ý thức xã hội có mấy nội dung?",
    "options": [
      "Có 5 nội dung.",
      "Có 4 nội dung.",
      "Có 3 nội dung.",
      "Có 2 nội dung."
    ],
    "answer": "Có 5 nội dung."
  },
  {
    "id": 166,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 43",
    "question": "Con người là: (phương án đúng nhất)",
    "options": [
      "Thực thể sinh học và thực thể xã hội.",
      "Tổng hòa các mối quan hệ xã hội.",
      "Thực thể tự nhiên.",
      "Một bộ phận giới tự nhiên."
    ],
    "answer": "Thực thể sinh học và thực thể xã hội."
  },
  {
    "id": 167,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 44",
    "question": "Bản tính tự nhiên của con người là kết quả của quá trình:",
    "options": [
      "a. Tiến hóa và phát triển lâu dài của giới tự nhiên.",
      "B Tiến hóa của giới tự nhiên.",
      "C Phát triển lâu dài của giới tự nhiên.",
      "D Phát triển của giới tự nhiên."
    ],
    "answer": "a. Tiến hóa và phát triển lâu dài của giới tự nhiên."
  },
  {
    "id": 168,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "C 44.1",
    "question": "Bản tính tự nhiên của con người là từ…?",
    "options": [
      "Kết quả tiến hóa và phát triển lâu dài của giới tự nhiên và nguồn gốc hình thành phát triển của tự nhiên mà còn có nguồn gốc xã hội."
    ],
    "answer": "Kết quả tiến hóa và phát triển lâu dài của giới tự nhiên và nguồn gốc hình thành phát triển của tự nhiên mà còn có nguồn gốc xã hội."
  },
  {
    "id": 169,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 45",
    "question": "Con người bị quyết định bởi các hệ thống quy luật nào?",
    "options": [
      "Các quy luật tự nhiên.",
      "Các quy luật tâm lý, ý thức.",
      "Các quy luật xã hội.",
      "Các nhận định trên đúng."
    ],
    "answer": "Các nhận định trên đúng."
  },
  {
    "id": 170,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 46",
    "question": "Bản chất con người không phải là cái trừu tượng cố hữu của cá nhân riêng biệt, trong tính hiện thực của nó bản chất con người là tổng hòa những quan hệ xã hội. Ai đã nói?",
    "options": [
      "C. Mác.",
      "V.I. Lênin.",
      "Ph. Ăngghen.",
      "C.Mác – V.I.Lênin."
    ],
    "answer": "C. Mác."
  },
  {
    "id": 171,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 47",
    "question": "Bản chất con người là:",
    "options": [
      "Tổng hòa những quan hệ xã hội.",
      "Kết quả quá trình tiến hóa và phát triển lâu dài của giới tự nhiên.",
      "Sự tác động vào giới tự nhiên.",
      "Luôn bị chi phối bởi các nhân tố xã hội và quy luật xã hội."
    ],
    "answer": "Tổng hòa những quan hệ xã hội."
  },
  {
    "id": 172,
    "chapterId": "c3",
    "chapter": "Chương 3: Chủ nghĩa duy vật lịch sử",
    "header": "Câu 48",
    "question": "Giá trị của triết học duy tâm là:",
    "options": [
      "Đề cao lĩnh vực tinh thần của con người.",
      "Đánh giá đúng lĩnh vực tinh thần của con người.",
      "Đề cao tư duy của con người.",
      "Ba nhận định trên đều đúng."
    ],
    "answer": "Đề cao lĩnh vực tinh thần của con người."
  },
  {
    "id": 173,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 1",
    "question": "Sự sản xuất xã hội bao gồm những phương diện nào?",
    "options": [
      "A. Sản xuất vật chất, sản xuất tinh thần và sản xuất ra bản thân con người",
      "B. Sáng tạo ra hoạt động lao động và ngôn ngữ",
      "C. Sản xuất vật chất đáp ứng nhu cầu của con người",
      "D. Tạo cho con người, tạo ra công cụ lao động"
    ],
    "answer": "A. Sản xuất vật chất, sản xuất tinh thần và sản xuất ra bản thân con người"
  },
  {
    "id": 174,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 2",
    "question": "Quan hệ nào sau đây quy định địa vị kinh tế - xã hội của các tập đoàn người trong sản xuất?",
    "options": [
      "A. Quan hệ giữa những người tiêu dùng với nhau",
      "B. Quan hệ sản xuất",
      "C. Quan hệ lao động",
      "D. Quan hệ phân phối và tiêu thụ"
    ],
    "answer": "B. Quan hệ sản xuất"
  },
  {
    "id": 175,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 3",
    "question": "Sự phù hợp của quan hệ sản xuất với lực lượng sản xuất quy định vấn đề gì sau đây?",
    "options": [
      "A. Quy định yêu cầu nguồn nhân lực của nền sản xuất xã hội",
      "B. Quy định tổ chức sản xuất của nền sản xuất xã hội",
      "C. Quy định mục đích, xu hướng phát triển của nền sản xuất xã hội",
      "D. Quy định giá tiên của một sản phẩm"
    ],
    "answer": "C. Quy định mục đích, xu hướng phát triển của nền sản xuất xã hội"
  },
  {
    "id": 176,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 4",
    "question": "Cơ sở hạ tầng được hình thành như thế nào trong quá trình sản xuất sản xuất vật chất của xã hội",
    "options": [
      "A. Đấu tranh giai cấp",
      "B. Mâu thuẫn trong xã hội",
      "C. Một cách chủ quan",
      "D. Một cách khách quan"
    ],
    "answer": "D. Một cách khách quan"
  },
  {
    "id": 177,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 5",
    "question": "Trong xã hội có đối kháng giai cấp, kiến trúc thượng tầng mang tính chất gì?",
    "options": [
      "A. Tính chất độc lập",
      "B. Tính chất cạnh tranh",
      "C. Tính chất linh hoạt trước nền kinh tế thay đổi",
      "D. Tính chất đối kháng"
    ],
    "answer": "D. Tính chất đối kháng"
  },
  {
    "id": 178,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 6",
    "question": "Kiến trúc thượng tầng củng cố, hoàn thiện và bảo vệ vấn đề gì?",
    "options": [
      "A. Cơ sở hạ tầng sinh ra nó",
      "B. Bảo vệ chính trị nội bộ",
      "C. Bảo vệ đất nước hòa bình",
      "D. Bảo vệ người dân trong xã hội"
    ],
    "answer": "A. Cơ sở hạ tầng sinh ra nó"
  },
  {
    "id": 179,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 7",
    "question": "Chọn đáp án đúng: Phạm trù hình thái kinh tế - xã hội trong mỗi giai đoạn lịch sử nhất định có kết cấu xã hội gồm những yếu tố cơ bản, phổ biến nào?",
    "options": [
      "A. Lực lượng sản xuất, kiến trúc thượng tầng",
      "B. Lực lượng sản xuất, quan hệ sản xuất và kiến trúc thượng tầng",
      "C. Lực lượng sản xuất và quan hệ sản xuất",
      "D. Qan hệ sản xuất và kiến trúc thượng tầng"
    ],
    "answer": "B. Lực lượng sản xuất, quan hệ sản xuất và kiến trúc thượng tầng"
  },
  {
    "id": 180,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 8",
    "question": "Trong thời kỳ quá độ lên chủ nghĩa xã hội, hai vấn đề nào sau đây phải được tiến hành từng bước với những hình thức quy mô thích hợp?",
    "options": [
      "A. Cơ sở hạ tầng và nhận thức của con người",
      "B. Kiến trúc thượng tầng và văn hóa xã hội",
      "C. Cơ sở hạ tầng và kiến trúc thượng tầng xã hội chủ nghĩa",
      "D. Gia đình văn hóa và con cháu hiếu thuận"
    ],
    "answer": "C. Cơ sở hạ tầng và kiến trúc thượng tầng xã hội chủ nghĩa"
  },
  {
    "id": 181,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 9",
    "question": "Ý thức xã hội bao gồm những yếu tố nào?",
    "options": [
      "A. Kinh tế và chính trị của xã hội cũ",
      "B. Trình độ giáo dục và sự hiểu biết của bản thân",
      "C. Nhận thức của bản thân và gia đình",
      "D. Tâm lý xã hội và hệ tư tưởng xã hội"
    ],
    "answer": "D. Tâm lý xã hội và hệ tư tưởng xã hội"
  },
  {
    "id": 182,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 10",
    "question": "Con người bị tha hóa là con người như thế nào?",
    "options": [
      "A. Con người bị đánh mất mình trong lao động",
      "B. Con người không có tư duy, trí tuệ",
      "C. Con người không có thể lực và trí lực",
      "D. Con người chưa đủ 18 tuổi đối với Nam và 16 tuổi đối với Nữ.",
      "TIẾP THEO"
    ],
    "answer": "A. Con người bị đánh mất mình trong lao động"
  },
  {
    "id": 183,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 1",
    "question": "Mục đích của học tập, nghiên cứu những nguyên lý cơ bản chủ nghĩa Mác – Lênin để:",
    "options": [
      "Nắm vững những quan điểm khoa học, cách mạng, nhân văn.",
      "Hiểu rõ cơ sở lý luận của tư tưởng Hồ Chí Minh.",
      "Xây dựng niềm tin lý tưởng cách mạng để xây dựng và bảo vệ Tổ quốc.",
      "Ba phương án trên."
    ],
    "answer": "Ba phương án trên."
  },
  {
    "id": 184,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 2",
    "question": "Mối liên hệ phổ biến dùng để:",
    "options": [
      "a. Chỉ các mối liên hệ tồn tại ở nhiều sự vật hiện tượng của thế giới",
      "b. Chỉ các mối liên hệ phát triển ở nhiều sự vật hiện tượng của thế giới",
      "c. Chỉ sự chuyển hóa lẫn nhau của nhiều sự vật hiện tượng của thế giới.",
      "d. Chỉ sự quy định, tác động của nhiều sự vật hiện tượng của thế giới."
    ],
    "answer": "a. Chỉ các mối liên hệ tồn tại ở nhiều sự vật hiện tượng của thế giới"
  },
  {
    "id": 185,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 3",
    "question": "Các sự vật hiện tượng tồn tại biệt lập, tách rời nhau không có mối liên hệ với nhau là thuộc quan điểm:",
    "options": [
      "a. Siêu hình",
      "b. Biện chứng",
      "c. Duy tâm",
      "d. Duy vật cổ đại."
    ],
    "answer": "a. Siêu hình"
  },
  {
    "id": 186,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 4",
    "question": "Các sự trong thế giới vật chất vừa tồn tại độc lập, vừa quy định liên hệ tác động lẫn nhau. Được hiểu là quan điểm:",
    "options": [
      "a. Biện chứng",
      "b. Duy tâm",
      "c. Duy vật cổ đại",
      "d. Siêu hình"
    ],
    "answer": "a. Biện chứng"
  },
  {
    "id": 187,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 5",
    "question": "Tính khách quan, tính phổ biến và tính đa dạng phong phú của các mối liên hệ, được hiểu là:",
    "options": [
      "a. Tính chất của các mối liên hệ",
      "b. Ý nghĩa phương pháp luận của các mối liên hệ",
      "c. Tính chất của sự phát triển.",
      "d. Nguyên lý về sự phát triển của các mối liên hệ"
    ],
    "answer": "a. Tính chất của các mối liên hệ"
  },
  {
    "id": 188,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 6",
    "question": "Nguyên lý về mối liên hệ phổ biến gắn liền với:",
    "options": [
      "a. 6 cặp phạm trù.",
      "b. 3 quy luật.",
      "c. Chủ nghĩa duy vật biện chứng.",
      "d. Chủ nghĩa duy vật lịch sử."
    ],
    "answer": "a. 6 cặp phạm trù."
  },
  {
    "id": 189,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 7",
    "question": "Nguyên lý về sự phát triển gắn liền với:",
    "options": [
      "a. 6 cặp phạm trù.",
      "b. 3 quy luật.",
      "c. Chủ nghĩa duy vật biện chứng.",
      "d. Chủ nghĩa duy vật lịch sử."
    ],
    "answer": "b. 3 quy luật."
  },
  {
    "id": 190,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 8",
    "question": "Nhận định nào sai về tính da dạng, phong phú của sự phát triển?",
    "options": [
      "a. Phát triển là quá trình bắt nguồn từ bản thân sự vật, hiện tượng.",
      "b. Phát triển là khuynh hướng chung của mọi sự vật hiện tượng.",
      "c. Phát triển có quá trình không hoàn toàn giống nhau.",
      "d. Phát triển khác nhau khi tồn tại những không gian và thời gian khác nhau."
    ],
    "answer": "a. Phát triển là quá trình bắt nguồn từ bản thân sự vật, hiện tượng."
  },
  {
    "id": 191,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 9",
    "question": "Nhận định nào sai về tính khách quan của sự phát triển?",
    "options": [
      "a. Là các quá trình phát triển diễn ra trong mọi lĩnh vực.",
      "b. Là quá trình bắt nguồn từ bản thân sự vật hiện tượng.",
      "c. Là quá trình giải quyết mâu thuẫn.",
      "d. Biểu hiện trong nguồn gốc của sự phát triển."
    ],
    "answer": "a. Là các quá trình phát triển diễn ra trong mọi lĩnh vực."
  },
  {
    "id": 192,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 10",
    "question": "Chọn đáp án đúng nhất để điền vào phần còn thiếu: …phản ánh những mặt, những thuộc tính, những mối liên hệ chung, cơ bản nhất thuộc 1 lĩnh vực nhất định.",
    "options": [
      "a. Phạm trù",
      "b. Triết học",
      "c. Chủ nghĩa Mác – Lênin",
      "d. Phạm trù triết học."
    ],
    "answer": "a. Phạm trù"
  },
  {
    "id": 193,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 11",
    "question": "Chọn đáp án đúng nhất để điền vào phần còn thiếu: …là phản ánh những mặt, những thuộc tính, những mối liên hệ cơ bản và phổ biến của toàn bộ thế giới hiện thực bao gồm tự nhiên, xã hội và tư duy.",
    "options": [
      "a. Phạm trù",
      "b. Triết học",
      "c. Chủ nghĩa Mác – Lênin",
      "d. Phạm trù triết học."
    ],
    "answer": "d. Phạm trù triết học."
  },
  {
    "id": 194,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 12",
    "question": "Chọn câu đúng nhất. Bản chất của ý thức là gì?",
    "options": [
      "Ý thức là sự phản ánh hiện thực khách quan vào bộ óc người 1 cách năng động sáng tạo.",
      "Ý thức là hình ảnh chủ quan của thế giới khách quan.",
      "Ý thức là một hiện tượng xã hội và mang bản chất xã hội. Sự ra đời, tồn tại của ý thức chịu sự chi phối không chỉ các quy luật tự nhiên mà còn là của các quy luật xã hội.",
      "Các câu trên đều đúng."
    ],
    "answer": "Các câu trên đều đúng."
  },
  {
    "id": 195,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 13",
    "question": "Ý thức là gì?",
    "options": [
      "- Là sự phản ánh trung thực hiện thực khách quan.",
      "- Là sự phản ánh năng động, sáng tạo hiện thực khách quan.",
      "- Là thuộc tính mọi dạng vật chất.",
      "- Các đáp án trên sai."
    ],
    "answer": "- Là sự phản ánh năng động, sáng tạo hiện thực khách quan."
  },
  {
    "id": 196,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 14",
    "question": "Ai mới có ý thức?",
    "options": [],
    "answer": "Con người có ý thức"
  },
  {
    "id": 197,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 15",
    "question": "Chủ nghĩa duy vật biện chứng kế thừa và phát triển trường phái triết học:",
    "options": [
      "Chủ nghĩa duy vật cổ đại (ngây thơ, chất phác).",
      "Chủ nghĩa duy vật siêu hình.",
      "Chủ nghĩa duy vật biện chứng.",
      "Các phán đoán trên đúng"
    ],
    "answer": "Các phán đoán trên đúng"
  },
  {
    "id": 198,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 16",
    "question": "Chủ nghĩa duy vật triết học bao gồm trường phái nào?",
    "options": [
      "Chủ nghĩa duy vật cổ đại, siêu hình và biện chứng."
    ],
    "answer": "Chủ nghĩa duy vật cổ đại, siêu hình và biện chứng."
  },
  {
    "id": 199,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 17",
    "question": "Chọn phương án sai: Chủ nghĩa Mác – Lê nin là:",
    "options": [
      "Là học thuyết của Mác, Ăng ghen và Lênin về xây dựng chủ nghĩa cộng sản."
    ],
    "answer": "Là học thuyết của Mác, Ăng ghen và Lênin về xây dựng chủ nghĩa cộng sản."
  },
  {
    "id": 200,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 18",
    "question": "Khoa học nào là hạt nhân của thế giới quan?",
    "options": [
      "Toán học",
      "Chính trị học",
      "Khoa học tự nhiên",
      "Triết học"
    ],
    "answer": "Triết học"
  },
  {
    "id": 201,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 19",
    "question": "Theo quan điểm của chủ nghĩa duy vật biện chứng:",
    "options": [
      "Thế giới thống nhất ở tính vật chất của nó."
    ],
    "answer": "Thế giới thống nhất ở tính vật chất của nó."
  },
  {
    "id": 202,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 20",
    "question": "Môn nào không thuộc chủ nghĩa Mác?",
    "options": [
      "Lịch sử các Đảng cộng sản."
    ],
    "answer": "Lịch sử các Đảng cộng sản."
  },
  {
    "id": 203,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 21",
    "question": "Nguồn gốc tự nhiên của ý thức:",
    "options": [
      "Là bộ óc người cùng với thế giới bên ngoài tác động lên bộ óc người."
    ],
    "answer": "Là bộ óc người cùng với thế giới bên ngoài tác động lên bộ óc người."
  },
  {
    "id": 204,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 22",
    "question": "Nguồn gốc xã hội của ý thức:",
    "options": [
      "Ý thức ra đời cùng với quá trình hình thành bộ óc con người nhờ có lao động, ngôn ngữ và những quan hệ xã hội"
    ],
    "answer": "Ý thức ra đời cùng với quá trình hình thành bộ óc con người nhờ có lao động, ngôn ngữ và những quan hệ xã hội"
  },
  {
    "id": 205,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 23",
    "question": "Những điều kiện, tiền đề sự ra đời chủ nghĩa Mác:",
    "options": [
      "Sự củng cố phát triển của phương thức sản xuất TBCN trong điều kiện cách mạng công nghiệp",
      "Sự xuất hiện của giai cấp vô sản trên vũ đài lịch sử với tính cách là 1 lực lượng chính trị xã hội độc lập",
      "Thực tiễn cách mạng của giai cấp vô sản là cơ sở chủ yếu nhất cho sự ra đời triết học mác.",
      "Tất cả trên đúng."
    ],
    "answer": "Tất cả trên đúng."
  },
  {
    "id": 206,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 24",
    "question": "Quan điểm của chủ nghĩa duy vật biện chứng, nguồn gốc xã hội của ý thức là:",
    "options": [
      "- Lao động và ngôn ngữ",
      "- Nhận thức",
      "- Lao động",
      "- Ngôn ngữ"
    ],
    "answer": "- Lao động và ngôn ngữ"
  },
  {
    "id": 207,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 25",
    "question": "Thế giới thống nhất ở cái gì?",
    "options": [],
    "answer": "Thống nhất ở tính vật chất của nó."
  },
  {
    "id": 208,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 26",
    "question": "Triết học Mác – Lê nin là gì?",
    "options": [
      "Là hệ thống lý luận chung nhất của con người về thế giới, về vị trí vai trò của con người trong thế giới ấy."
    ],
    "answer": "Là hệ thống lý luận chung nhất của con người về thế giới, về vị trí vai trò của con người trong thế giới ấy."
  },
  {
    "id": 209,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 27",
    "question": "Đối tượng của triết học Mác – Lênin là gì? (chọn câu đúng nhất)",
    "options": [
      "Nghiên cứu thế giới trong tính chỉnh thể và tìm ra bản chất quy luật của nó",
      "Nghiên cứu thế giới siêu hình",
      "Nghiên cứu những quy luật của thế giới tự nhiên",
      "Nghiên cứu quy luật tinh thần."
    ],
    "answer": "Nghiên cứu thế giới trong tính chỉnh thể và tìm ra bản chất quy luật của nó"
  },
  {
    "id": 210,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 28",
    "question": "Lượng của sự vật là gì? Chọn câu đúng nhất",
    "options": [
      "Là phạm trù triết học chỉ tính qui định khách quan vốn có của sự vật về mặt số lượng, quy mô.",
      "Là số lượng các sự vật.",
      "Là phạm trù triết học.",
      "Là phạm trù khoa học để đo lường sự vật."
    ],
    "answer": "Là phạm trù triết học chỉ tính qui định khách quan vốn có của sự vật về mặt số lượng, quy mô."
  },
  {
    "id": 211,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 29",
    "question": "Độ được hiểu như thế nào?",
    "options": [
      "Là thể hiện sự thống nhất giữa lượng và chất của sự vật, để chỉ khoảng giới hạn trong đó sự thay đổi về lượng của sự vật chưa làm thay đổi căn bản về chất của sự vật ấy."
    ],
    "answer": "Là thể hiện sự thống nhất giữa lượng và chất của sự vật, để chỉ khoảng giới hạn trong đó sự thay đổi về lượng của sự vật chưa làm thay đổi căn bản về chất của sự vật ấy."
  },
  {
    "id": 212,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 30",
    "question": "Mâu thuẫn nào tồn tại trong suốt quá trình vận động và phát triển của sự vật hiện tượng?",
    "options": [],
    "answer": "Mâu thuẫn cơ bản"
  },
  {
    "id": 213,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 31",
    "question": "Mâu thuẫn nổi lên hàng đầu ở 1 giai đoạn phát triển của sự vật và chi phối các mâu thuẫn khác trong giai đoạn đó gọi là mâu thuẫn gì?",
    "options": [
      "Là mâu thuẫn chủ yếu"
    ],
    "answer": "Là mâu thuẫn chủ yếu"
  },
  {
    "id": 214,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 32",
    "question": "Mâu thuẫn đối kháng tồn tại ở:",
    "options": [],
    "answer": "Xã hội có giai cấp đối kháng."
  },
  {
    "id": 215,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 33",
    "question": "Mối quan hệ biện chứng giữa tồn tại xã hội và ý thức xã hội thể hiện như thế nào?",
    "options": [
      "Tồn tại xã hội quyết định ý thức xã hội, ý thức xã hội độc lập tương đối với tồn tại xã hội, tác động trở lại tồn tại xã hội."
    ],
    "answer": "Tồn tại xã hội quyết định ý thức xã hội, ý thức xã hội độc lập tương đối với tồn tại xã hội, tác động trở lại tồn tại xã hội."
  },
  {
    "id": 216,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 34",
    "question": "Nhận định nào dưới đây là sai về phạm trù chất:",
    "options": [
      "Chất là do bản thân sự vật quy định",
      "Chất chỉ tính quy định khách quan vốn có",
      "Chất là sự thống nhất hữu cơ",
      "Chất là phạm trù triết học"
    ],
    "answer": "Chất là do bản thân sự vật quy định"
  },
  {
    "id": 217,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 35",
    "question": "Phép biện chứng duy vật là gì?",
    "options": [
      "Phép biện chứng là khoa học về những quy luật phổ biến của sự vận động và phát triển của tự nhiên, của xã hội loài người và của tư duy."
    ],
    "answer": "Phép biện chứng là khoa học về những quy luật phổ biến của sự vận động và phát triển của tự nhiên, của xã hội loài người và của tư duy."
  },
  {
    "id": 218,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 36",
    "question": "Quan hệ giữa chất và lượng (chọn câu sai)",
    "options": [
      "Là sự thay đổi về lượng và sự thay đổi về chất của sự vật là độc lập tương đối, không quan hệ tác động lẫn nhau."
    ],
    "answer": "Là sự thay đổi về lượng và sự thay đổi về chất của sự vật là độc lập tương đối, không quan hệ tác động lẫn nhau."
  },
  {
    "id": 219,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 37",
    "question": "Nhận định nào sau đây nhận định về phạm trù chất là sai?",
    "options": [
      "Chất là do bản thân sự vật quy định",
      "Chất chỉ tính quy định khách quan vốn có của sự vật",
      "Chất là sự thống nhất hữu cơ của những thuộc tính",
      "Chất là phạm trù triết học."
    ],
    "answer": "Chất là do bản thân sự vật quy định"
  },
  {
    "id": 220,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 38",
    "question": "Quy luật từ sự thay đổi về lượng dẫn đến thay đổi về chất nói lên đặc tính nào của sự phát triển:",
    "options": [
      "Cách thức sự vận động và phát triển"
    ],
    "answer": "Cách thức sự vận động và phát triển"
  },
  {
    "id": 221,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 39",
    "question": "Quy luật phủ định của phủ định nói lên đặc tính nào của sự phát triển?",
    "options": [
      "Khuynh hướng sự vận động và phát triển"
    ],
    "answer": "Khuynh hướng sự vận động và phát triển"
  },
  {
    "id": 222,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 40",
    "question": "Quy luật thống nhất và đấu tranh của các mặt đối lập nói lên đặc tính nào của sự vận động và phát triển?",
    "options": [
      "Nguồn gốc và động lực của sự phát triển"
    ],
    "answer": "Nguồn gốc và động lực của sự phát triển"
  },
  {
    "id": 223,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 41",
    "question": "Sự phủ định biện chứng theo hình thức nào? (chọn phương án đúng nhất):",
    "options": [
      "Theo không gian 3 chiều.",
      "Theo đường thẳng.",
      "Theo đường xoắn ốc.",
      "Theo đường tròn."
    ],
    "answer": "Theo đường xoắn ốc."
  },
  {
    "id": 224,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 42",
    "question": "Chọn phương án sai: Sự thống nhất và đấu tranh của các mặt đối lập là:",
    "options": [
      "Mọi sự vật hiện tượng tồn tại do chứa đựng những mặt, những khuynh hướng thống nhất với nhau không có mâu thuẫn."
    ],
    "answer": "Mọi sự vật hiện tượng tồn tại do chứa đựng những mặt, những khuynh hướng thống nhất với nhau không có mâu thuẫn."
  },
  {
    "id": 225,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 43",
    "question": "Chọn phương án đúng nhất - Đấu tranh của các mặt đối lập là:",
    "options": [],
    "answer": "Tuyệt đối"
  },
  {
    "id": 226,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 44",
    "question": "Theo quan điểm duy vật biện chứng, vận động là:",
    "options": [
      "- Mọi quá trình diễn ra trong vũ trụ kể từ sự thay đổi vị trí đơn giản cho đến tư duy.",
      "- Vận động là phương thức tồn tại của vật chất, là thuộc tính cố hữu của vật chất.",
      "- Bao gồm tất cả mọi sự thay đổi.",
      "- Cả 3 đều đúng."
    ],
    "answer": "- Cả 3 đều đúng."
  },
  {
    "id": 227,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 45",
    "question": "Thực tiễn là gì?",
    "options": [
      "Là hoạt động vật chất có mục đích mang tính lịch sử xã hội của con người nhằm cải tạo tự nhiên và xã hội."
    ],
    "answer": "Là hoạt động vật chất có mục đích mang tính lịch sử xã hội của con người nhằm cải tạo tự nhiên và xã hội."
  },
  {
    "id": 228,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 46",
    "question": "Tiêu chuẩn của chân lý là:",
    "options": [],
    "answer": "Thực tiễn"
  },
  {
    "id": 229,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 47",
    "question": "Trong đời sống xã hội, quy luật lượng – chất được thực hiện với điều kiện gì?",
    "options": [],
    "answer": "Hoạt động có ý thức của con người"
  },
  {
    "id": 230,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 48",
    "question": "Từ nguyên lý về mối liên hệ phổ biến của phép biện chứng duy vật, rút ra phương pháp luận nào cho hoạt động lý luận và thực tiễn?",
    "options": [
      "-Quan điểm toàn diện.",
      "-Quan điểm phát triển.",
      "-Quan điểm lịch sử, cụ thể.",
      "-Quan điểm toàn diện, lịch sử cụ thể."
    ],
    "answer": "-Quan điểm toàn diện, lịch sử cụ thể."
  },
  {
    "id": 231,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 49",
    "question": "Việc không dám thực hiện những bước nhảy cần thiết khi tích lũy về lượng đã đạt giới hạn độ là biểu hiện của xu hướng:",
    "options": [
      "- Hữu khuynh.",
      "- Tả khuynh và hữu khuynh."
    ],
    "answer": "- Hữu khuynh."
  },
  {
    "id": 232,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 50",
    "question": "Việc không tôn trọng quá trình tích lũy về lượng ở mức độ cần thiết cho sự biến đổi về chất là biểu hiện của xu hướng nào?",
    "options": [
      "- Hữu khuynh.",
      "- Tả khuynh."
    ],
    "answer": "- Tả khuynh."
  },
  {
    "id": 233,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 51",
    "question": "Mặt đối lập là:",
    "options": [
      "Những mặt có khuynh hướng biến đổi trái ngược nhau trong cùng một sự vật.",
      "Những mặt nằm chung trong cùng sự vật.",
      "Mọi sự vật hiện tượng đều hình thành bởi sự thống nhất của các mặt đối lập.",
      "Những mặt khác nhau là mặt đối lập."
    ],
    "answer": "Những mặt có khuynh hướng biến đổi trái ngược nhau trong cùng một sự vật."
  },
  {
    "id": 234,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 52",
    "question": "Phép biện chứng duy vật bao gồm những nguyên lý cơ bản nào? Chọn câu trả lời đúng.",
    "options": [
      "Nguyên lý về mối liên hệ phổ biến và sự phát triển.",
      "Nguyên lý về sự vận động và phát triển.",
      "Nguyên lý tính hệ thống và cấu trúc.",
      "Nguyên lý về mối liên hệ."
    ],
    "answer": "Nguyên lý về mối liên hệ phổ biến và sự phát triển."
  },
  {
    "id": 235,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 53",
    "question": "Cơ sở hạ tầng của xã hội bao gồm:",
    "options": [
      "Quan hệ sản xuất thống trị.",
      "Tàn dư của xã hội cũ.",
      "Mầm mống của xã hội tương lai.",
      "Các phán đoán trên đúng."
    ],
    "answer": "Các phán đoán trên đúng."
  },
  {
    "id": 236,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 54",
    "question": "Cấu trúc của kiến trúc thượng tầng (KTTT) bao gồm những yếu tố nào?",
    "options": [
      "Toàn bộ những quan điểm chính trị, pháp quyền, triết học, văn hóa nghệ thuật, tôn giáo…và những thiết chế xã hội tương ứng như các đoàn thể, nhà nước, đảng phái."
    ],
    "answer": "Toàn bộ những quan điểm chính trị, pháp quyền, triết học, văn hóa nghệ thuật, tôn giáo…và những thiết chế xã hội tương ứng như các đoàn thể, nhà nước, đảng phái."
  },
  {
    "id": 237,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 55",
    "question": "Hình thái kinh tế xã hội là gì?",
    "options": [
      "Là phạm trù của chủ nghĩa duy vật lịch sử để chỉ 1 xã hội ở mỗi giai đoạn lịch sử nhất định."
    ],
    "answer": "Là phạm trù của chủ nghĩa duy vật lịch sử để chỉ 1 xã hội ở mỗi giai đoạn lịch sử nhất định."
  },
  {
    "id": 238,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 56",
    "question": "Kiến trúc thượng tầng là gì?",
    "options": [
      "Là những quan điểm, tư tưởng và các thiết chế của xã hội được hình thành trên cơ sở hạ tầng."
    ],
    "answer": "Là những quan điểm, tư tưởng và các thiết chế của xã hội được hình thành trên cơ sở hạ tầng."
  },
  {
    "id": 239,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 57",
    "question": "Mối quan hệ biện chứng giữa cơ sở hạ tầng với kiến trúc thượng tầng thể hiện như thế nào?",
    "options": [
      "CSHT quyết định KTTT và KTTT có sự tác động trở lại."
    ],
    "answer": "CSHT quyết định KTTT và KTTT có sự tác động trở lại."
  },
  {
    "id": 240,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 58",
    "question": "Nguồn gốc kinh tế của sự vận động và phát triển của hình thái kinh tế xã hội là:",
    "options": [
      "Sự mâu thuẫn giữa LLSX với QHSX."
    ],
    "answer": "Sự mâu thuẫn giữa LLSX với QHSX."
  },
  {
    "id": 241,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 59",
    "question": "Phương thức sản xuất là:",
    "options": [],
    "answer": "Cách thức của con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định."
  },
  {
    "id": 242,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 60",
    "question": "Quan hệ biện chứng giữa LLSX và QHSX thể hiện như thế nào?",
    "options": [
      "Là LLSX quyết định QHSX và QHSX có sự tác động trở lại."
    ],
    "answer": "Là LLSX quyết định QHSX và QHSX có sự tác động trở lại."
  },
  {
    "id": 243,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 61",
    "question": "QHSX bao gồm các yếu tố nào?",
    "options": [
      "- Quan hệ về mọi mặt giữa người lao động và người chủ",
      "- Quan hệ sở hữu với TLSX",
      "- Quan hệ trong phân phối sản phẩm"
    ],
    "answer": "- Quan hệ về mọi mặt giữa người lao động và người chủ"
  },
  {
    "id": 244,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 62",
    "question": "Sự thống nhất giữa LLSX ở 1 trình độ nhất định và quan hệ sản xuất tương ứng tạo thành:",
    "options": [
      "- Phương thức sản xuất.",
      "- Kiến trúc thượng tầng.",
      "- Cơ sở hạ tầng.",
      "- Hình thái kinh tế xã hội."
    ],
    "answer": "- Phương thức sản xuất."
  },
  {
    "id": 245,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 63",
    "question": "Toàn bộ các yếu tố của LLSX bao gồm:",
    "options": [
      "- Là tư liệu sản xuất và người lao động.",
      "- Là TLLĐ và đối tượng lao động.",
      "- Là người lao động và công cụ lao động."
    ],
    "answer": "- Là tư liệu sản xuất và người lao động."
  },
  {
    "id": 246,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 64",
    "question": "Trong 3 mặt của QHSX thì mặt nào là cơ bản?",
    "options": [
      "Quan hệ sở hữu TLSX."
    ],
    "answer": "Quan hệ sở hữu TLSX."
  },
  {
    "id": 247,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 65",
    "question": "Sự thống nhất giữa LLSX ở 1 trình độ nhất định và QHSX tương ứng tạo thành:",
    "options": [
      "- Phương thức sản xuất",
      "- Cơ sở hạ tầng",
      "- Kiến trúc thượng tầng (KTTT)."
    ],
    "answer": "- Phương thức sản xuất"
  },
  {
    "id": 248,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 66",
    "question": "Chọn câu sai: QHSX bao gồm các yếu tố nào dưới đây",
    "options": [
      "- Quan hệ phân phối sản phẩm.",
      "- Quan hệ trong tổ chức và quản lý sản xuất.",
      "- Quan hệ sở hữu với TLSX.",
      "- Quan hệ mọi mặt giữa người lao động và người chủ."
    ],
    "answer": "- Quan hệ mọi mặt giữa người lao động và người chủ."
  },
  {
    "id": 249,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 67",
    "question": "Yếu tố hàng đầu của LLSX là:",
    "options": [
      "Người lao động.",
      "Tư liệu sản xuất.",
      "Đối tượng lao động.",
      "Công cụ lao động."
    ],
    "answer": "Người lao động."
  },
  {
    "id": 250,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 68",
    "question": "Văn hóa đào tạo của trường Đại học FPT là:",
    "options": [
      "Tôn, đổi, đồng, chí, gương, sáng",
      "Tổ chức việc tự học của sinh viên.",
      "Học thật, thi thật, thành công thật.",
      "Phương án a,c đúng."
    ],
    "answer": "Phương án a,c đúng."
  },
  {
    "id": 251,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 69",
    "question": "Mối liên hệ phổ biến dùng để:",
    "options": [
      "a. Chỉ các mối liên hệ tồn tại ở nhiều sự vật hiện tượng của thế giới",
      "b. Chỉ các mối liên hệ phát triển ở nhiều sự vật hiện tượng của thế giới",
      "c. Chỉ sự chuyển hóa lẫn nhau của nhiều sự vật hiện tượng của thế giới.",
      "d. Chỉ sự quy định, tác động của nhiều sự vật hiện tượng của thế giới."
    ],
    "answer": "a. Chỉ các mối liên hệ tồn tại ở nhiều sự vật hiện tượng của thế giới"
  },
  {
    "id": 252,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 70",
    "question": "Các sự vật hiện tượng tồn tại biệt lập, tách rời nhau không có mối liên hệ với nhau là thuộc quan điểm:",
    "options": [
      "a. Siêu hình",
      "b. Biện chứng",
      "c. Duy tâm",
      "d. Duy vật cổ đại."
    ],
    "answer": "a. Siêu hình"
  },
  {
    "id": 253,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 71",
    "question": "Các sự trong thế giới vật chất vừa tồn tại độc lập, vừa quy định liên hệ tác động lẫn nhau. Được hiểu là quan điểm:",
    "options": [
      "a. Biện chứng",
      "b. Duy tâm",
      "c. Duy vật cổ đại",
      "d. Siêu hình"
    ],
    "answer": "a. Biện chứng"
  },
  {
    "id": 254,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 72",
    "question": "Tính khách quan, tính phổ biến và tính đa dạng phong phú của các mối liên hệ, được hiểu là:",
    "options": [
      "a. Tính chất của các mối liên hệ",
      "b. Ý nghĩa phương pháp luận của các mối liên hệ",
      "c. Tính chất của sự phát triển.",
      "d. Nguyên lý về sự phát triển của các mối liên hệ"
    ],
    "answer": "a. Tính chất của các mối liên hệ"
  },
  {
    "id": 255,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 73",
    "question": "Nhận định nào sai về tính da dạng, phong phú của sự phát triển?",
    "options": [
      "a. Phát triển là quá trình bắt nguồn từ bản thân sự vật, hiện tượng.",
      "b. Phát triển là khuynh hướng chung của mọi sự vật hiện tượng.",
      "c. Phát triển có quá trình không hoàn toàn giống nhau.",
      "d. Phát triển khác nhau khi tồn tại những không gian và thời gian khác nhau."
    ],
    "answer": "a. Phát triển là quá trình bắt nguồn từ bản thân sự vật, hiện tượng."
  },
  {
    "id": 256,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 74",
    "question": "Nhận định nào sai về tính khách quan của sự phát triển?",
    "options": [
      "a. Là các quá trình phát triển diễn ra trong mọi lĩnh vực",
      "b. Là quá trình bắt nguồn từ bản thân sự vật hiện tượng.",
      "c. Là quá trình giải quyết mâu thuẫn.",
      "d. Biểu hiện trong nguồn gốc của sự phát triển."
    ],
    "answer": "a. Là các quá trình phát triển diễn ra trong mọi lĩnh vực"
  },
  {
    "id": 257,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 75",
    "question": "Chọn đáp án đúng nhất để điền vào phần còn thiếu: …phản ánh những mặt, những thuộc tính, những mối liên hệ chung, cơ bản nhất thuộc 1 lĩnh vực nhất định.",
    "options": [
      "a. Phạm trù",
      "b. Triết học",
      "c. Chủ nghĩa Mác – Lênin",
      "d. Phạm trù triết học."
    ],
    "answer": "a. Phạm trù"
  },
  {
    "id": 258,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 76",
    "question": "Chọn đáp án đúng nhất để điền vào phần còn thiếu: …là phản ánh những mặt, những thuộc tính, những mối liên hệ cơ bản và phổ biến của toàn bộ thế giới hiện thực bao gồm tự nhiên, xã hội và tư duy.",
    "options": [
      "a. Phạm trù",
      "b. Triết học",
      "c. Chủ nghĩa Mác – Lênin",
      "d. Phạm trù triết học."
    ],
    "answer": "d. Phạm trù triết học."
  },
  {
    "id": 259,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 77",
    "question": "Dùng để chỉ những mặt, những thuộc tính giống nhau ở nhiều sự vật hiện tượng. Được gọi là:",
    "options": [
      "a. Cái chung",
      "b. Cái riêng",
      "c. Cái đơn nhất",
      "d. Ba phương an trên đúng."
    ],
    "answer": "a. Cái chung"
  },
  {
    "id": 260,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 78",
    "question": "Phạm trù tất nhiên:",
    "options": [
      "a. Tất nhiên dùng chỉ cái do những nguyên nhân cơ bản bên trong của kết cấu vật chất quyết định.",
      "b. Tất nhiên dùng chỉ cái do những nguyên nhân cơ bản của kết cấu vật chất quyết định.",
      "c. Tất nhiên dùng chỉ sự tổng hợp tất cả những mặt, những yếu tố tạo nên sự vật, hiện tượng.",
      "d. Tất nhiên dùng chỉ cái nguyên nhân bên ngoài của nhiều hoàn cảnh bên ngoài quyết định."
    ],
    "answer": "a. Tất nhiên dùng chỉ cái do những nguyên nhân cơ bản bên trong của kết cấu vật chất quyết định."
  },
  {
    "id": 261,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 79",
    "question": "Phạm trù nội dung:",
    "options": [
      "a. Nội dung dùng để chỉ sự tổng hợp tất cả những mặt, những yếu tố, quá trình tạo nên sự vật hiện tượng.",
      "b. Nội dung dùng chỉ cái do những nguyên nhân cơ bản của kết cấu vật chất quyết định.",
      "c. Nội dung dùng chỉ sự tổng hợp khách quan tất cả những mặt, những yếu tố tạo nên mọi sự vật, hiện tượng.",
      "d. Nội dung dùng chỉ cái nguyên nhân bên ngoài của nhiều hoàn cảnh bên ngoài quyết định."
    ],
    "answer": "a. Nội dung dùng để chỉ sự tổng hợp tất cả những mặt, những yếu tố, quá trình tạo nên sự vật hiện tượng."
  },
  {
    "id": 262,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 80",
    "question": "Phạm trù bản chất:",
    "options": [
      "a. Bản chất dùng chỉ sự tổng hợp tất cả những mặt, những mối liên hệ, tương đối ổn định ở bên trong của sự vật hiện tượng.",
      "b. Bản chất dùng chỉ sự tổng hợp tất cả những mặt, những mối liên hệ, tương đối ổn định của sự vật hiện tượng.",
      "c. Bản chất dùng chỉ sự tổng hợp tất cả những mặt, những mối liên hệ, ổn định ở bên trong của sự vật hiện tượng.",
      "d. Bản chất dùng chỉ sự tổng hợp khách quan tất cả những mặt, những yếu tố tạo nên mọi sự vật, hiện tượng."
    ],
    "answer": "a. Bản chất dùng chỉ sự tổng hợp tất cả những mặt, những mối liên hệ, tương đối ổn định ở bên trong của sự vật hiện tượng."
  },
  {
    "id": 263,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 81",
    "question": "Phạm trù khả năng:",
    "options": [
      "a. Khả năng dùng chỉ cái chưa xuất hiện, chưa tồn tại trong thực tế, nhưng sẽ xuất hiện và tồn tại thực sự khi có các điều kiện tương ứng.",
      "b. Khả năng là chỉ những cái đang tồn tại trong thực tế và trong tư duy.",
      "c. Khả năng dùng chỉ sự tổng hợp tất cả những mặt, những mối liên hệ, tương đối ổn định của sự vật hiện tượng.",
      "d. Khả năng dùng chỉ cái xuất hiện, tồn tại trong thực tế khi có các điều kiện tương ứng."
    ],
    "answer": "a. Khả năng dùng chỉ cái chưa xuất hiện, chưa tồn tại trong thực tế, nhưng sẽ xuất hiện và tồn tại thực sự khi có các điều kiện tương ứng."
  },
  {
    "id": 264,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 82",
    "question": "Quy luật là:",
    "options": [
      "a. Những mối liên hệ khách quan.",
      "b. Bản chất, tất nhiên.",
      "c. Phổ biến và lặp đi lặp lại giữa các mặt.",
      "d. Ba phương án trên đúng."
    ],
    "answer": "d. Ba phương án trên đúng."
  },
  {
    "id": 265,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 83",
    "question": "Mâu thuẫn là gì:",
    "options": [
      "a. Dùng chỉ mối liên hệ thống nhất, đấu tranh và chuyển hóa giữa các mặt đối lập của mỗi sự vật hiện tượng.",
      "b. Dùng chỉ mối liên hệ đấu tranh và chuyển hóa giữa các mặt đối lập của mỗi sự vật hiện tượng.",
      "c. Dùng chỉ mối liên hệ ràng buộc, không tách rời nhau của mỗi sự vật hiện tượng.",
      "d. Dùng chỉ sự tác động qua lại và chuyển hóa lẫn nhau giữa các mặt đối lập của sự vật."
    ],
    "answer": "a. Dùng chỉ mối liên hệ thống nhất, đấu tranh và chuyển hóa giữa các mặt đối lập của mỗi sự vật hiện tượng."
  },
  {
    "id": 266,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 84",
    "question": "Đấu tranh giữa các mặt đối lập là:",
    "options": [
      "a. Sự tác động qua lại.",
      "b. Theo xu hướng bài trừ.",
      "c. Phủ định lẫm nhau.",
      "d. Ba nhận định trên đúng."
    ],
    "answer": "d. Ba nhận định trên đúng."
  },
  {
    "id": 267,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 85",
    "question": "Phủ định là gì?",
    "options": [
      "a. Là sự thay thế hình thái tồn tại này bằng hình thái tồn tại khác.",
      "b. Là sự thống nhất với nhau, ràng buộc không tách rời nhau.",
      "c. Là sự tác động qua lại chuyển hóa giữa các sự vật hiện tượng.",
      "d. Là mối liên hệ chuyển hóa lẫn nhau giữa các mặt đối lập."
    ],
    "answer": "a. Là sự thay thế hình thái tồn tại này bằng hình thái tồn tại khác."
  },
  {
    "id": 268,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 86",
    "question": "Quy luật phủ định của phủ định có ý nghĩa phương pháp luận:",
    "options": [
      "a. Phổ biến và là nguồn gốc, động lực cho phát triển.",
      "b. Khắc phục tư tưởng bảo thủ, trì trệ.",
      "c. Kế thừa có chọn lọc, cải tạo cái cũ, xây dựng cái mới phù hợp.",
      "d. Phương án b và c đúng."
    ],
    "answer": "d. Phương án b và c đúng."
  },
  {
    "id": 269,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 87",
    "question": "Ba hình thức hoạt động thực tiễn là:",
    "options": [
      "a. Hoạt động sản xuất vật chất, hoạt động chính trị xã hội và thực nghiệm khoa học.",
      "b. Hoạt động sản xuất vật chất, hoạt động chính trị xã hội và nghiên cứu khoa học.",
      "c. Hoạt động sản xuất, hoạt động xã hội và thực nghiệm khoa học.",
      "d. Hoạt động vật chất, hoạt động chính trị và thực nghiệm khoa học."
    ],
    "answer": "a. Hoạt động sản xuất vật chất, hoạt động chính trị xã hội và thực nghiệm khoa học."
  },
  {
    "id": 270,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 88",
    "question": "Nhận thức là gì?",
    "options": [
      "a. Là quá trình phản ánh tích cực tự giác và sáng tạo thế giới khách quan vào bộ óc con người.",
      "b. Là quá trình phản ánh tự giác và sáng tạo thế giới khách quan vào bộ óc con người.",
      "c. Là quá trình phản ánh tích cực và sáng tạo thế giới khách quan vào bộ óc con người.",
      "d. Là quá trình phản ánh tích cực, tự giác và sáng tạo thế giới vào bộ óc con người."
    ],
    "answer": "a. Là quá trình phản ánh tích cực tự giác và sáng tạo thế giới khách quan vào bộ óc con người."
  },
  {
    "id": 271,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 89",
    "question": "Từ trực quan sinh động đến tư duy trừu tượng và từ tư duy trừu tượng đến thực tiễn. Là câu nói của ai?",
    "options": [
      "a. V.I.Lênin.",
      "b. C.Mác",
      "c. Ph.Ăngghen.",
      "d. C.Mác và V.I.Lênin."
    ],
    "answer": "a. V.I.Lênin."
  },
  {
    "id": 272,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 90",
    "question": "Con người là gì?",
    "options": [
      "a. Là thực thể tự nhiên mang đặc tính xã hội.",
      "b. Là thực thể mang đặc tính xã hội.",
      "c. Là tổng hòa các mối quan hệ.",
      "d. Là phần ẩn bên trong không thấy được."
    ],
    "answer": "a. Là thực thể tự nhiên mang đặc tính xã hội."
  },
  {
    "id": 273,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 91",
    "question": "Bản tính tự nhiên của con người từ:",
    "options": [
      "a. Kết quả tiến hóa và phát triển lâu dài của giới tự nhiên.",
      "b. Con người là một bộ phận của giới tự nhiên.",
      "c. Nguồn gốc hình thành phát triển của tự nhiên mà còn có nguồn gốc xã hội.",
      "d. Phương án a và b đúng."
    ],
    "answer": "d. Phương án a và b đúng."
  },
  {
    "id": 274,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 92",
    "question": "Hai phương diện tự nhiên và xã hội của con người tồn tại trong tính:",
    "options": [
      "a. Thống nhất, quy định, tác động lẫn nhau.",
      "b. Kết quả quá trình tiến hóa và phát triển của giới tự nhiên.",
      "c. Sự tác động vào giới tự nhiên.",
      "d. Luôn luôn bị chi phối bởi các nhân tố xã hội và các quy luật xã hội."
    ],
    "answer": "a. Thống nhất, quy định, tác động lẫn nhau."
  },
  {
    "id": 275,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 93",
    "question": "Muốn giải phóng bản chất con người cần hướng vào sự:",
    "options": [
      "a. Giải phóng những quan hệ kinh tế, chính trị, văn hóa xã hội.",
      "b.Giải phóng con người không phụ thuộc về kinh tế.",
      "c.Giải phóng con người từ nô lệ thành người tự do.",
      "d.Giải phóng con người có quyền tự quyết."
    ],
    "answer": "a. Giải phóng những quan hệ kinh tế, chính trị, văn hóa xã hội."
  },
  {
    "id": 276,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 94",
    "question": "Từ quan niệm khoa học của chủ nghĩa Mác – Lênin về con người, rút ra ý nghĩa phương pháp luận là:",
    "options": [
      "a. Lý giải khoa học về con người từ những quan hệ kinh tế xã hội.",
      "b. Động lực cơ bản của sự tiến bộ và phát triển của xã hội.",
      "c. Giải phóng con người xóa bỏ áp bức bóc lột, bất công.",
      "d.Ba phương án trên đúng."
    ],
    "answer": "a. Lý giải khoa học về con người từ những quan hệ kinh tế xã hội."
  },
  {
    "id": 277,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 95",
    "question": "Hình thái là gì?",
    "options": [
      "a. Toàn thể hình thức biểu hiện bên ngoài có thể quan sát được.",
      "b. Hệ thống kiến trúc thượng tầng của xã hội.",
      "c. Sự phát triển kinh tế xã hội trong quá trình lịch sử.",
      "d. Sự vận động và phát triển của xã hội."
    ],
    "answer": "a. Toàn thể hình thức biểu hiện bên ngoài có thể quan sát được."
  },
  {
    "id": 278,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 96",
    "question": "Có mấy nội dung cấu thành của quá trình phát triển hình thái kinh tế xã hội?",
    "options": [
      "a. Có 3 nội dung.",
      "b.Có 4 nội dung.",
      "c.Có 5 nội dung.",
      "d.Có 2 nội dung."
    ],
    "answer": "a. Có 3 nội dung."
  },
  {
    "id": 279,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 97",
    "question": "Quá trình phát triển của các hình thái kinh tế xã hội là quá trình:",
    "options": [
      "a. Thay thế lẫn nhau giữa các hình thái kinh tế xã hội trong lịch sử nhân loại.",
      "b. Tác động tiêu diệt giữa các hình thái kinh tế xã hội trong lịch sử nhân loại.",
      "c. Thay thế lẫn nhau giữa các hình thái kinh tế trong mỗi con người.",
      "d. Thay thế ý chí chủ quan của con người giữa các hình thái kinh tế xã hội trong lịch sử nhân loại."
    ],
    "answer": "a. Thay thế lẫn nhau giữa các hình thái kinh tế xã hội trong lịch sử nhân loại."
  },
  {
    "id": 280,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 98",
    "question": "Để giải thích các hiện tượng trong đời sống xã hội, không nên xuất phát từ ý thức, tư tưởng chủ quan của con người. Được hiểu là:",
    "options": [
      "a. Giá trị khoa học của lý luận hình thái kinh tế xã hội.",
      "b.Giá trị lý luận của hình thái kinh tế xã hội.",
      "c. Phạm trù hình thái kinh tế xã hội.",
      "d. Quá trình lịch sử tự nhiên của sự phát triển kinh tế xã hội."
    ],
    "answer": "a. Giá trị khoa học của lý luận hình thái kinh tế xã hội."
  },
  {
    "id": 281,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 99",
    "question": "Phạm trù hình thái kinh tế xã hội dùng để làm gì?",
    "options": [
      "a. Chỉ xã hội ở từng giai đoạn lịch sử nhất định.",
      "b. Với 1 kiểu quan hệ sản xuất đặc trưng.",
      "c. Phù hợp với 1 trình độ nhất định của LLSX.",
      "d. Ba phương án trên đúng."
    ],
    "answer": "d. Ba phương án trên đúng."
  },
  {
    "id": 282,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 100",
    "question": "Lý luận về hình thái kinh tế xã hội có mấy lĩnh vực xã hội?",
    "options": [
      "a. Có 3 lĩnh vực xã hội.",
      "b.Có 4 lĩnh vực xã hội.",
      "c.Có 5 lĩnh vực xã hội.",
      "d.Có 2 lĩnh vực xã hội."
    ],
    "answer": "a. Có 3 lĩnh vực xã hội."
  },
  {
    "id": 283,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 101",
    "question": "Lý luận của hình thái kinh tế xã hội trong nghiên cứu về lĩnh vực xã hội:",
    "options": [
      "a. Xã hội không phải là sự kết hợp một cách ngẫu nhiên, máy móc giữa các cá nhân mà là 1 cơ thể sống động.",
      "b. Xã hội là sự kết hợp một cách ngẫu nhiên, máy móc giữa các tập thể trên cơ thể sống động.",
      "c.Không tuân theo ý chí chủ quan của con người mà tuân theo quy luật khách quan.",
      "d. Là quá trình thay thế lẫn nhau của các hình thái kinh tế xã hội."
    ],
    "answer": "a. Xã hội không phải là sự kết hợp một cách ngẫu nhiên, máy móc giữa các cá nhân mà là 1 cơ thể sống động."
  },
  {
    "id": 284,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 102",
    "question": "Tồn tại xã hội là:",
    "options": [
      "a. Dùng chỉ phương diện sinh hoạt vật chất.",
      "b. Các điều kiện sinh hoạt vật chất.",
      "c. Ý thức xã hội và ý thức cá nhân có sự thống nhất biện chứng không đồng nhất.",
      "d. Phương án a và b đúng"
    ],
    "answer": "d. Phương án a và b đúng"
  },
  {
    "id": 285,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 103",
    "question": "Phán đoán được chia thành:",
    "options": [
      "a. Phán đoán đơn nhất, phán đoán đặc thù và phán đoán phổ biến.",
      "b. Phán đơn và phán đoán đặc thù.",
      "c. Tri giác, biểu tượng và suy lý.",
      "d.Tư tưởng và hệ tư tưởng của xã hội."
    ],
    "answer": "a. Phán đoán đơn nhất, phán đoán đặc thù và phán đoán phổ biến."
  },
  {
    "id": 286,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 104",
    "question": "Ý thức xã hội là gì?",
    "options": [
      "a. Dùng chỉ toàn bộ sinh hoạt tinh thần.",
      "b.Dùng chỉ toàn bộ sinh hoạt vật chất.",
      "c. Dùng chỉ các điều kiện sinh hoạt vật chất của xã hội.",
      "d. Phương án b và c đúng."
    ],
    "answer": "a. Dùng chỉ toàn bộ sinh hoạt tinh thần."
  },
  {
    "id": 287,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 105",
    "question": "Giữa ý thức xã hội và ý thức cá nhân có sự:",
    "options": [
      "a. Thống nhất biện chứng nhưng không đồng nhất.",
      "b.Thống nhất với nhau nhưng không đồng nhất.",
      "c.Thống nhất biện chứng với nhau nhưng đồng nhất.",
      "d.Quan hệ với nhau trong sinh hoạt tinh thần."
    ],
    "answer": "a. Thống nhất biện chứng nhưng không đồng nhất."
  },
  {
    "id": 288,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 106",
    "question": "Theo trình độ phản ánh của ý thức có:",
    "options": [
      "a. Ý thức xã hội thông thường và ý thức lý luận.",
      "b. Ý thức chính trị và ý thức pháp quyền.",
      "c. Ý thức đạo đức và ý thức tôn giáo.",
      "d. Phương án b và c đúng."
    ],
    "answer": "a. Ý thức xã hội thông thường và ý thức lý luận."
  },
  {
    "id": 289,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 107",
    "question": "Tâm lý xã hội là:",
    "options": [
      "a. Toàn bộ đời sống tình cảm, tâm trạng, khát vọng, ý chí của cộng đồng người nhất định.",
      "b. Toàn bộ đời sống xã hội, tâm trạng, khát vọng, ý chí của 1 con người nhất định.",
      "c. Hệ tư tưởng xã hội phản ánh trình độ của ý thức xã hội.",
      "d. Toàn bộ tri thức, quan niệm, quan điểm của con người trong cộng đồng xã hội."
    ],
    "answer": "a. Toàn bộ đời sống tình cảm, tâm trạng, khát vọng, ý chí của cộng đồng người nhất định."
  },
  {
    "id": 290,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 108",
    "question": "Hệ tư tưởng xã hội là:",
    "options": [
      "a. Toàn bộ các hệ thống quan niệm, quan điểm xã hội.",
      "b. Toàn bộ đời sống tình cảm, tâm trạng, khát vọng, ý chí của cộng đồng người nhất định.",
      "c. Toàn bộ đời sống xã hội, tâm trạng, khát vọng, ý chí của 1 con người nhất định.",
      "d. Hệ tư tưởng xã hội phản ánh trình độ của ý thức xã hội."
    ],
    "answer": "a. Toàn bộ các hệ thống quan niệm, quan điểm xã hội."
  },
  {
    "id": 291,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 109",
    "question": "Tồn tại xã hội sẽ quyết định:",
    "options": [
      "a. Ý thức xã hội.",
      "b. Sự hình thành và phát triển của xã hội.",
      "c. Tính độc lập của ý thức xã hội.",
      "d. Tâm lý xã hội."
    ],
    "answer": "a. Ý thức xã hội."
  },
  {
    "id": 292,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 110",
    "question": "Tính độc lập tương đối của ý thức xã hội có mấy nội dung?",
    "options": [
      "a. Có 5 nội dung.",
      "b.Có 4 nội dung.",
      "c.Có 3 nội dung.",
      "d.Có 2 nội dung."
    ],
    "answer": "a. Có 5 nội dung."
  },
  {
    "id": 293,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 111",
    "question": "Ý thức xã hội thường:",
    "options": [
      "a. Lạc hậu so với tồn tại xã hội.",
      "b.Quyết định sự tồn tại xã hội.",
      "c.Hiện đại hơn so với tồn tại xã hội.",
      "d. Độc lập quyết định sự tồn tại của xã hội."
    ],
    "answer": "a. Lạc hậu so với tồn tại xã hội."
  },
  {
    "id": 294,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 112",
    "question": "Ý thức xã hội có thể:",
    "options": [
      "a. Vượt trước tồn tại xã hội.",
      "b. Quyết định sự tồn tại xã hội.",
      "c.Hiện đại hơn so với tồn tại xã hội.",
      "d. Độc lập quyết định sự tồn tại của xã hội."
    ],
    "answer": "a. Vượt trước tồn tại xã hội."
  },
  {
    "id": 295,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 113",
    "question": "Ý thức xã hội có tính:",
    "options": [
      "a. Kế thừa trong sự phát triển của nó.",
      "b. Bảo thủ, lạc hậu của thói quen.",
      "c. Hiện đại hơn so với tồn tại xã hội.",
      "d. Độc lập quyết định sự tồn tại của xã hội."
    ],
    "answer": "a. Kế thừa trong sự phát triển của nó."
  },
  {
    "id": 296,
    "chapterId": "c3",
    "chapter": "Chương 3: Bổ sung kiến thức",
    "header": "Câu 114",
    "question": "Ý thức xã hội có khả năng:",
    "options": [
      "a. Tác động trở lại tồn tại xã hội.",
      "b. Bảo thủ, lạc hậu của thói quen.",
      "c. Phát triển hiện đại hơn so với tồn tại xã hội.",
      "d. Độc lập quyết định sự tồn tại của xã hội."
    ],
    "answer": "a. Tác động trở lại tồn tại xã hội."
  },
  {
    "id": 297,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 1.1",
    "question": "Triết học giải quyết mấy vấn đề và có mấy mặt?",
    "options": [
      "Có 1 vấn đề và có 2 mặt."
    ],
    "answer": "Có 1 vấn đề và có 2 mặt."
  },
  {
    "id": 298,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 1.2",
    "question": "Định nghĩa vật chất của Lênin đã giải quyết mấy vấn đề?",
    "options": [
      "Giải quyết 3 vấn đề (Là 3)."
    ],
    "answer": "Giải quyết 3 vấn đề (Là 3)."
  },
  {
    "id": 299,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 1.3",
    "question": "Lơxíp và Đêmôcrit đã cho rằng vật chất là gì?",
    "options": [
      "Vật chất là nước.",
      "Vật chất là lửa.",
      "Vật chất là nguyên tử."
    ],
    "answer": "Vật chất là nguyên tử."
  },
  {
    "id": 300,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 1.4",
    "question": "Nhận thức cảm tính bao gồm các hình thức nào?",
    "options": [
      "Cảm giác, tri giác và biểu tượng (Còn gọi là biểu trưng)."
    ],
    "answer": "Cảm giác, tri giác và biểu tượng (Còn gọi là biểu trưng)."
  },
  {
    "id": 301,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 1.5",
    "question": "Nhận thức lý tính gồm các hình thức nào?",
    "options": [
      "Khái niệm, phán đoán và suy luận (Còn gọi là suy lý)."
    ],
    "answer": "Khái niệm, phán đoán và suy luận (Còn gọi là suy lý)."
  },
  {
    "id": 302,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 1",
    "question": "Sản xuất xã hội bao gồm những nội dung nào?",
    "options": [
      "Sản xuất vật chất; sản xuất tinh thần và sản xuất ra chính bản thân con người."
    ],
    "answer": "Sản xuất vật chất; sản xuất tinh thần và sản xuất ra chính bản thân con người."
  },
  {
    "id": 303,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 2",
    "question": "C.Mác đã có những phát kiến vĩ đại nào?",
    "options": [
      "Chủ nghĩa duy vật lịch sử; Học thuyết giá trị thặng dư và sứ mệnh lịch sử của giai cấp công nhân."
    ],
    "answer": "Chủ nghĩa duy vật lịch sử; Học thuyết giá trị thặng dư và sứ mệnh lịch sử của giai cấp công nhân."
  },
  {
    "id": 304,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 3",
    "question": "(Chọn phương án sai) – Quan hệ sản xuất bao gồm các yếu tố nào?",
    "options": [
      "Quan hệ về mọi mặt giữa người lao động và người chủ."
    ],
    "answer": "Quan hệ về mọi mặt giữa người lao động và người chủ."
  },
  {
    "id": 305,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 4",
    "question": "Nhà nước nào là kiểu nhà nước đặc biệt?",
    "options": [
      "Nhà nước vô sản."
    ],
    "answer": "Nhà nước vô sản."
  },
  {
    "id": 306,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 5",
    "question": "(Chọn phương án đúng nhất) - Lực lượng sản xuất bao gồm?",
    "options": [
      "Người lao động và tư liệu sản xuất."
    ],
    "answer": "Người lao động và tư liệu sản xuất."
  },
  {
    "id": 307,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 6",
    "question": "Yếu tố nào là yếu tố thường xuyên biến đổi trong lực lượng sản xuất?",
    "options": [
      "Công cụ lao động."
    ],
    "answer": "Công cụ lao động."
  },
  {
    "id": 308,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 7",
    "question": "Phạm trù hình thái kinh tế xã hội dùng để làm gì?",
    "options": [
      "Chỉ xã hội ở từng giai đoạn lịch sử nhất định; Với 1 kiểu quan hệ sản xuất đặc trưng và Phù hợp với 1 trình độ nhất định của lực lượng sản xuất."
    ],
    "answer": "Chỉ xã hội ở từng giai đoạn lịch sử nhất định; Với 1 kiểu quan hệ sản xuất đặc trưng và Phù hợp với 1 trình độ nhất định của lực lượng sản xuất."
  },
  {
    "id": 309,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 8",
    "question": "Quan hệ sản xuất bao gồm những thành phần nào?",
    "options": [
      "Có quan hệ sở hữu về tư liệu sản xuất; quan hệ về tổ chức quản lý sản xuất và quan hệ phân phối sản phẩm."
    ],
    "answer": "Có quan hệ sở hữu về tư liệu sản xuất; quan hệ về tổ chức quản lý sản xuất và quan hệ phân phối sản phẩm."
  },
  {
    "id": 310,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 9",
    "question": "Yếu tố cơ bản nào tạo thành tồn tại xã hội?",
    "options": [
      "Dân số và mật độ dân số; Điều kiện tự nhiên, hoàn cảnh địa lý và Phương thức sản xuất vật chất."
    ],
    "answer": "Dân số và mật độ dân số; Điều kiện tự nhiên, hoàn cảnh địa lý và Phương thức sản xuất vật chất."
  },
  {
    "id": 311,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 10",
    "question": "Quan hệ biện chứng giữa lực lượng sản xuất và quan hệ sản xuất thể hiện như thế nào?(Lựa chọn phương án đúng nhất).",
    "options": [
      "Lực lượng sản xuất quyết định quan hệ sản xuất và quan hệ sản xuất có sự tác động trở lại."
    ],
    "answer": "Lực lượng sản xuất quyết định quan hệ sản xuất và quan hệ sản xuất có sự tác động trở lại."
  },
  {
    "id": 312,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 11",
    "question": "Cấu trúc của kiến trúc thượng tầng bao gồm những yếu tố nào (Chọn câu đúng nhất)?",
    "options": [
      "Toàn bộ những quan điểm chính trị, pháp quyền, triết học, đạo đức, tôn giáo, nghệ thuật …và những thiết chế xã hội tương ứng như nhà nước, đảng phái, giao hội, các đoàn thể."
    ],
    "answer": "Toàn bộ những quan điểm chính trị, pháp quyền, triết học, đạo đức, tôn giáo, nghệ thuật …và những thiết chế xã hội tương ứng như nhà nước, đảng phái, giao hội, các đoàn thể."
  },
  {
    "id": 313,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 12",
    "question": "Ý thức xã hội là gì?(Chọn phương án đúng nhất)",
    "options": [
      "Chỉ toàn bộ sinh hoạt tinh thần của xã hội."
    ],
    "answer": "Chỉ toàn bộ sinh hoạt tinh thần của xã hội."
  },
  {
    "id": 314,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 13",
    "question": "Ý thức xã hội có tính như thế nào?",
    "options": [
      "Kế thừa trong sự phát triển của nó."
    ],
    "answer": "Kế thừa trong sự phát triển của nó."
  },
  {
    "id": 315,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 14",
    "question": "Tính chất của chân lý là?",
    "options": [
      "Tính khách quan; tính cụ thể và tính tương đối, tuyệt đối."
    ],
    "answer": "Tính khách quan; tính cụ thể và tính tương đối, tuyệt đối."
  },
  {
    "id": 316,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 15",
    "question": "Khi cơ sở kinh tế thay đổi thì toàn bộ cái kiến trúc thượng tầng đồ sộ cũng bị đảo lộn ít nhiều nhanh chóng, câu nói trên ai đã nói?",
    "options": [
      "C.Mác."
    ],
    "answer": "C.Mác."
  },
  {
    "id": 317,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 16",
    "question": "Sản xuất vật chất là quá trình mà trong đó con người sử dụng … tác động …; từ còn thiếu là?",
    "options": [
      "Công cụ lao động/trực tiếp hay gián tiếp vào tự nhiên."
    ],
    "answer": "Công cụ lao động/trực tiếp hay gián tiếp vào tự nhiên."
  },
  {
    "id": 318,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 17",
    "question": "Chọn đáp án đúng nhất – Phạm trù hình thái kinh tế - xã hội trong mỗi giai đoạn lịch sử nhất định có kết cấu xã hội gồm những yếu tố cơ bản, phổ biến nào?",
    "options": [
      "Lực lượng sản xuất; quan hệ sản xuất và kiến trúc thượng tầng."
    ],
    "answer": "Lực lượng sản xuất; quan hệ sản xuất và kiến trúc thượng tầng."
  },
  {
    "id": 319,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 18",
    "question": "Trước khi hình thành dân tộc, loài người đã trải qua:",
    "options": [
      "Thị tộc; bộ lạc và bộ tộc."
    ],
    "answer": "Thị tộc; bộ lạc và bộ tộc."
  },
  {
    "id": 320,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 19",
    "question": "Nguồn gốc kinh tế của sự vận động và phát triển của hình thái kinh tế - xã hội là?(Chọn phương án đúng nhất)",
    "options": [
      "Mâu thuẫn giữa lực lượng sản xuất với quan hệ sản xuất."
    ],
    "answer": "Mâu thuẫn giữa lực lượng sản xuất với quan hệ sản xuất."
  },
  {
    "id": 321,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 20",
    "question": "Bản chất con người là?",
    "options": [
      "Tổng hòa những quan hệ xã hội."
    ],
    "answer": "Tổng hòa những quan hệ xã hội."
  },
  {
    "id": 322,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 21",
    "question": "Giai cấp là gì?",
    "options": [
      "Là những tập đoàn người to lớn; Khác nhau về địa vị, về hưởng thụ; Về quan hệ tư liệu sản xuất và tổ chức lao động."
    ],
    "answer": "Là những tập đoàn người to lớn; Khác nhau về địa vị, về hưởng thụ; Về quan hệ tư liệu sản xuất và tổ chức lao động."
  },
  {
    "id": 323,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 22",
    "question": "Quá trình phát triển của các hình thái kinh tế xã hội là quá trình:",
    "options": [
      "Thay thế lẫn nhau giữa các hình thái kinh tế xã hội trong lịch sử nhân loại."
    ],
    "answer": "Thay thế lẫn nhau giữa các hình thái kinh tế xã hội trong lịch sử nhân loại."
  },
  {
    "id": 324,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 23",
    "question": "Hình thái là gì?",
    "options": [
      "Toàn thể hình thức biểu hiện bên ngoài có thể quan sát được."
    ],
    "answer": "Toàn thể hình thức biểu hiện bên ngoài có thể quan sát được."
  },
  {
    "id": 325,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 24",
    "question": "Cơ sở hạ tầng của xã hội bao gồm?",
    "options": [
      "Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng."
    ],
    "answer": "Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng."
  },
  {
    "id": 326,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 25",
    "question": "Phán đoán được chia thành những phán đoán nào?",
    "options": [
      "Phán đoán đơn nhất; Phán đoán đặc thù và phán đoán phổ biến."
    ],
    "answer": "Phán đoán đơn nhất; Phán đoán đặc thù và phán đoán phổ biến."
  },
  {
    "id": 327,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 26",
    "question": "Phương thức sản xuất là gì?",
    "options": [
      "Là cách thức của con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định."
    ],
    "answer": "Là cách thức của con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định."
  },
  {
    "id": 328,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 27",
    "question": "Tồn tại xã hội sẽ quyết định?",
    "options": [
      "Ý thức xã hội."
    ],
    "answer": "Ý thức xã hội."
  },
  {
    "id": 329,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 28",
    "question": "Sự thống nhất giữa lực lượng sản xuất ở một trình độ nhất định và quan hệ sản xuất tương ứng tạo thành:",
    "options": [
      "Phương thức sản xuất."
    ],
    "answer": "Phương thức sản xuất."
  },
  {
    "id": 330,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 29",
    "question": "Theo trình độ phản ánh của ý thức thì ý thức có:",
    "options": [
      "Ý thức xã hội thông thường và ý thức lý luận."
    ],
    "answer": "Ý thức xã hội thông thường và ý thức lý luận."
  },
  {
    "id": 331,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 30",
    "question": "Từ trực quan sinh động đến tư duy trừu tượng và từ tư duy trừu tượng đến thực tiễn, là câu nói của ai?",
    "options": [
      "V.I.Lênin."
    ],
    "answer": "V.I.Lênin."
  },
  {
    "id": 332,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 31",
    "question": "Con người bị quyết định bởi các hệ thống quy luật nào?",
    "options": [
      "Các quy luật tự nhiên; Các quy luật xã hội và các quy luật tâm lý, ý thức."
    ],
    "answer": "Các quy luật tự nhiên; Các quy luật xã hội và các quy luật tâm lý, ý thức."
  },
  {
    "id": 333,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 32",
    "question": "Ý thức xã hội và ý thức cá nhân có sự:",
    "options": [
      "Thống nhất biện chứng nhưng không đồng đều."
    ],
    "answer": "Thống nhất biện chứng nhưng không đồng đều."
  },
  {
    "id": 334,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 34",
    "question": "Chọn phương án đúng nhất – Con người là?",
    "options": [
      "Thực thể sinh học và thực thể xã hội."
    ],
    "answer": "Thực thể sinh học và thực thể xã hội."
  },
  {
    "id": 335,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 35",
    "question": "Cơ sở hạ tầng được hình thành như thế nào trong quá trình sản xuất vật chất của xã hội?",
    "options": [
      "Một cách khách quan."
    ],
    "answer": "Một cách khách quan."
  },
  {
    "id": 336,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 36",
    "question": "Trong 3 mặt của quan hệ sản xuất thì mặt quan hệ nào là cơ bản?",
    "options": [
      "Quan hệ sở hữu tư liệu sản xuất."
    ],
    "answer": "Quan hệ sở hữu tư liệu sản xuất."
  },
  {
    "id": 337,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 37",
    "question": "Điểm khác biệt căn bản của xã hội loài người với xã hội loài vật ở chỗ loài vật chỉ hái lượm, trong khi con người lại sản xuất. Câu nói trên ai đã nói?",
    "options": [
      "Ph.Ăngghen."
    ],
    "answer": "Ph.Ăngghen."
  },
  {
    "id": 338,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 38",
    "question": "Nhà nước có mấy chức năng?",
    "options": [
      "Có 2 chức năng."
    ],
    "answer": "Có 2 chức năng."
  },
  {
    "id": 339,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 39",
    "question": "Muốn giải phóng bản chất con người cần hướng vào sự?",
    "options": [
      "Giải phóng những quan hệ kinh tế, chính trị, văn hóa xã hội."
    ],
    "answer": "Giải phóng những quan hệ kinh tế, chính trị, văn hóa xã hội."
  },
  {
    "id": 340,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 40",
    "question": "Toàn bộ các yếu tố của lực lượng sản xuất bao gồm?",
    "options": [
      "Tư liệu sản xuất và người lao động."
    ],
    "answer": "Tư liệu sản xuất và người lao động."
  },
  {
    "id": 341,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 41",
    "question": "Ý thức xã hội thường như thế nào?",
    "options": [
      "Thường lạc hậu hơn so với tồn tại xã hội."
    ],
    "answer": "Thường lạc hậu hơn so với tồn tại xã hội."
  },
  {
    "id": 342,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 42",
    "question": "Kiến trúc thượng tầng củng cố, hoàn thiện và bảo vệ vấn đề gì?",
    "options": [
      "Cơ sở hạ tầng đã sinh ra nó."
    ],
    "answer": "Cơ sở hạ tầng đã sinh ra nó."
  },
  {
    "id": 343,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 43",
    "question": "Nền kinh tế Việt Nam hiện nay coi kinh tế tư nhân như thế nào?",
    "options": [
      "Là động lực quan trọng."
    ],
    "answer": "Là động lực quan trọng."
  },
  {
    "id": 344,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 44",
    "question": "Sản xuất xã hội bao gồm?",
    "options": [
      "Sản xuất vật chất; Sản xuất tinh thần và sản xuất ra chính bản thân con người."
    ],
    "answer": "Sản xuất vật chất; Sản xuất tinh thần và sản xuất ra chính bản thân con người."
  },
  {
    "id": 345,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 45",
    "question": "Kiến trúc thượng tầng là gì?",
    "options": [
      "Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng."
    ],
    "answer": "Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng."
  },
  {
    "id": 346,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 46",
    "question": "Tính độc lập tương đối của ý thức xã hội có mấy nội dung?",
    "options": [
      "Có 5 nội dung."
    ],
    "answer": "Có 5 nội dung."
  },
  {
    "id": 347,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 47",
    "question": "Hình thái kinh tế - xã hội là gì?(chọn phương án đúng nhất)",
    "options": [
      "Là phạm trù của chủ nghĩa duy vật lịch sử để chỉ một xã hội ở mỗi giai đoạn lịch sử nhất định."
    ],
    "answer": "Là phạm trù của chủ nghĩa duy vật lịch sử để chỉ một xã hội ở mỗi giai đoạn lịch sử nhất định."
  },
  {
    "id": 348,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 48",
    "question": "Hai phương diện tự nhiên và xã hội của con người tồn tại trong tính:",
    "options": [
      "Thống nhất, quy định, tác động lẫn nhau."
    ],
    "answer": "Thống nhất, quy định, tác động lẫn nhau."
  },
  {
    "id": 349,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 49",
    "question": "Sứ mệnh lịch sử của giai cấp công nhân là?",
    "options": [
      "Xóa bỏ chế độ tư bản chủ nghĩa; Xây dựng chủ nghĩa xã hội và xây dựng chủ nghĩa cộng sản."
    ],
    "answer": "Xóa bỏ chế độ tư bản chủ nghĩa; Xây dựng chủ nghĩa xã hội và xây dựng chủ nghĩa cộng sản."
  },
  {
    "id": 350,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 50",
    "question": "Mục đích mà Đảng Cộng sản Việt Nam phát triển công nghiệp hóa, hiện đại hóa là phát triển?",
    "options": [
      "Lực lượng sản xuất."
    ],
    "answer": "Lực lượng sản xuất."
  },
  {
    "id": 351,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 51",
    "question": "Giai cấp công nhân là 1 tập đoàn …, hình thành và phát triển cùng với quá trình phát triển của nền …; từ con thiếu là?",
    "options": [
      "Xã hội ổn định/công nghiệp hiện đại."
    ],
    "answer": "Xã hội ổn định/công nghiệp hiện đại."
  },
  {
    "id": 352,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 52",
    "question": "Chức năng của nhà nước là?",
    "options": [
      "Thống trị chính trị và chức năng xã hội."
    ],
    "answer": "Thống trị chính trị và chức năng xã hội."
  },
  {
    "id": 353,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 53",
    "question": "Ý thức xã hội có khả năng như thế nào?",
    "options": [
      "Tác động trở lại tồn tại xã hội."
    ],
    "answer": "Tác động trở lại tồn tại xã hội."
  },
  {
    "id": 354,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 54",
    "question": "Từ quan niệm khoa học của chủ nghĩa Mác – Lê nin về con người, rút ra ý nghĩa phương pháp luận như thế nào?",
    "options": [
      "Lý giải khoa học về con người từ những quan hệ kinh tế xã hội."
    ],
    "answer": "Lý giải khoa học về con người từ những quan hệ kinh tế xã hội."
  },
  {
    "id": 355,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 55",
    "question": "Sự thống nhất giữa lực lượng sản xuất ở một trình độ nhất định với quan hệ sản xuất tương ứng tạo thành?",
    "options": [
      "Phương thức sản xuất."
    ],
    "answer": "Phương thức sản xuất."
  },
  {
    "id": 356,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 56",
    "question": "Con người bị tha hóa là con người như thế nào?",
    "options": [
      "Là con người bị đánh mất mình trong lao động."
    ],
    "answer": "Là con người bị đánh mất mình trong lao động."
  },
  {
    "id": 357,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 57",
    "question": "Tâm lý xã hội là?",
    "options": [
      "Toàn bộ đời sống tình cảm, tâm trạng, khát vọng, ý chí của cộng đồng người nhất định."
    ],
    "answer": "Toàn bộ đời sống tình cảm, tâm trạng, khát vọng, ý chí của cộng đồng người nhất định."
  },
  {
    "id": 358,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 58",
    "question": "Dân tộc là một cộng đồng người ổn định được hình thành trong lịch sử trên cơ sở một …, một ngôn ngữ thống nhất, một nền kinh tế thống nhất, một nền văn hóa tâm lý, tính cách bền vững với một nhà nước và … thống nhất. Từ còn thiếu là?",
    "options": [
      "Lãnh thổ thống nhất/pháp luật."
    ],
    "answer": "Lãnh thổ thống nhất/pháp luật."
  },
  {
    "id": 359,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 59",
    "question": "Ý thức xã hội là gì?",
    "options": [
      "Dùng chỉ toàn bộ sinh hoạt tinh thần."
    ],
    "answer": "Dùng chỉ toàn bộ sinh hoạt tinh thần."
  },
  {
    "id": 360,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 60",
    "question": "Cách mạng xã hội phụ thuộc vào?",
    "options": [
      "Nhân tố chủ quan; Điều kiện khách quan và thời cơ cách mạng."
    ],
    "answer": "Nhân tố chủ quan; Điều kiện khách quan và thời cơ cách mạng."
  },
  {
    "id": 361,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 61",
    "question": "Quan hệ nào dưới đây quy định địa vị kinh tế - xã hội của các tập đoàn người trong sản xuất?",
    "options": [
      "Quan hệ sản xuất."
    ],
    "answer": "Quan hệ sản xuất."
  },
  {
    "id": 362,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 62",
    "question": "Tồn tại xã hội là gì?",
    "options": [
      "Dùng chỉ phương diện sinh hoạt vật chất và các điều kiện sinh hoạt vật chất."
    ],
    "answer": "Dùng chỉ phương diện sinh hoạt vật chất và các điều kiện sinh hoạt vật chất."
  },
  {
    "id": 363,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 63",
    "question": "Sản xuất là hoạt động có … và không ngừng … nhằm thỏa mãn … tồn tại và phát triển của con người. Từ còn thiếu là?",
    "options": [
      "Mục đích/sáng tạo/nhu cầu."
    ],
    "answer": "Mục đích/sáng tạo/nhu cầu."
  },
  {
    "id": 364,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 64",
    "question": "Có mấy hình thức hoạt động thực tiễn?",
    "options": [
      "Có 3 hình thức."
    ],
    "answer": "Có 3 hình thức."
  },
  {
    "id": 365,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 65",
    "question": "Bản tính tự nhiên của con người là từ…?",
    "options": [
      "Kết quả tiến hóa và phát triển lâu dài của giới tự nhiên và nguồn gốc hình thành phát triển của tự nhiên mà còn có nguồn gốc xã hội."
    ],
    "answer": "Kết quả tiến hóa và phát triển lâu dài của giới tự nhiên và nguồn gốc hình thành phát triển của tự nhiên mà còn có nguồn gốc xã hội."
  },
  {
    "id": 366,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 65",
    "question": "1-Hoặc hỏi dạng sau: Bản tính tự nhiên của con người là kết quả của quá trình:",
    "options": [
      "Tiến hóa và phát triển lâu dài của giới tự nhiên.",
      "Tiến hóa của giới tự nhiên.",
      "Phát triển lâu dài của giới tự nhiên.",
      "Phát triển của giới tự nhiên."
    ],
    "answer": "Tiến hóa và phát triển lâu dài của giới tự nhiên."
  },
  {
    "id": 367,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 66",
    "question": "Ý thức xã hội có thể:",
    "options": [
      "Vượt trước tồn tại xã hội."
    ],
    "answer": "Vượt trước tồn tại xã hội."
  },
  {
    "id": 368,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 67",
    "question": "Phương thức sản xuất là gì?",
    "options": [
      "Là cách thức con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định."
    ],
    "answer": "Là cách thức con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định."
  },
  {
    "id": 369,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 68",
    "question": "Để dân tộc hình thành phải hội tụ đủ mấy điều kiện?",
    "options": [
      "Phải có 2 điều kiện."
    ],
    "answer": "Phải có 2 điều kiện."
  },
  {
    "id": 370,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 69",
    "question": "Ý thức xã hội bao gồm những yếu tố nào?",
    "options": [
      "Tâm lý xã hội và hệ tư tưởng xã hội."
    ],
    "answer": "Tâm lý xã hội và hệ tư tưởng xã hội."
  },
  {
    "id": 371,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 70",
    "question": "Bản chất con người không phải là cái trừu tượng cố hữu của cá nhân riêng biệt, trong tính hiện thực của nó bản chất con người là tổng hòa những quan hệ xã hội. Ai đã nói câu nói trên?",
    "options": [
      "C.Mác"
    ],
    "answer": "C.Mác"
  },
  {
    "id": 372,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 71",
    "question": "Hình thái kinh tế xã hội gồm những thành phần nào?",
    "options": [
      "Kiến trúc thượng tầng; Lực lượng sản xuất và quan hệ sản xuất."
    ],
    "answer": "Kiến trúc thượng tầng; Lực lượng sản xuất và quan hệ sản xuất."
  },
  {
    "id": 373,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 72",
    "question": "Trong lịch sử xã hội, loài người đã có những cuộc đấu tranh giai cấp nào?",
    "options": [
      "Đấu tranh giai cấp nông dân với giai cấp địa chủ; Đáu tranh giai cấp vô sản với giai cấp tư sản và đấu tranh của giai cấp nô lệ với chủ nô."
    ],
    "answer": "Đấu tranh giai cấp nông dân với giai cấp địa chủ; Đáu tranh giai cấp vô sản với giai cấp tư sản và đấu tranh của giai cấp nô lệ với chủ nô."
  },
  {
    "id": 374,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 73",
    "question": "Điều kiện để dân tộc hình thành là phải?",
    "options": [
      "Chống thiên nhiên và chống giặc ngoại xâm."
    ],
    "answer": "Chống thiên nhiên và chống giặc ngoại xâm."
  },
  {
    "id": 375,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 74",
    "question": "Nhận thức là gì?",
    "options": [
      "Là quá trình phản ánh tích cực tự giác và sáng tạo thế giới khách quan vào bộ óc con người."
    ],
    "answer": "Là quá trình phản ánh tích cực tự giác và sáng tạo thế giới khách quan vào bộ óc con người."
  },
  {
    "id": 376,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 75",
    "question": "Yếu tố chủ thể hàng đầu của lực lượng sản xuất là?",
    "options": [
      "Người lao động."
    ],
    "answer": "Người lao động."
  },
  {
    "id": 377,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 76",
    "question": "Ý thức thông thường là tòan bộ những tri thức, quan niệm của con người trong cộng đồng người được hình thành … từ hoạt động … chưa được hệ thống hóa, khái quát hóa thành lý luận. Từ còn thiếu là ?",
    "options": [
      "Trực tiếp/thực tiễn."
    ],
    "answer": "Trực tiếp/thực tiễn."
  },
  {
    "id": 378,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 77",
    "question": "Yếu tố hàng đầu của lực lượng sản xuất là ai?",
    "options": [
      "Người lao động."
    ],
    "answer": "Người lao động."
  },
  {
    "id": 379,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 78",
    "question": "Đặc trưng của giai cấp là?",
    "options": [
      "Khác nhau về quan hệ và vai trò; Khác nhau về địa vị và khác nhau về quy mô số lượng của cải."
    ],
    "answer": "Khác nhau về quan hệ và vai trò; Khác nhau về địa vị và khác nhau về quy mô số lượng của cải."
  },
  {
    "id": 380,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 79",
    "question": "Dựa vào trình độ và phương thức phản ánh tồn tại xã hội thì ý thức xã hội được chia thành?",
    "options": [
      "Tâm lý xã hội và hệ tư tưởng xã hội."
    ],
    "answer": "Tâm lý xã hội và hệ tư tưởng xã hội."
  },
  {
    "id": 381,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 80",
    "question": "Sự sản xuất xã hội bao gồm những phương diện nào?",
    "options": [
      "Sản xuất vật chất, sản xuất tinh thần và sản xuất ra chính bản thân con người."
    ],
    "answer": "Sản xuất vật chất, sản xuất tinh thần và sản xuất ra chính bản thân con người."
  },
  {
    "id": 382,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 81",
    "question": "Cơ sở hạ tầng của xã hội bao gồm các yếu tố nào?",
    "options": [
      "Quan hệ sản xuất thống trị; Quan hệ sản xuất tàn dư của xã hội cũ và quan hệ sản xuất mầm mống của xã hội tương lai."
    ],
    "answer": "Quan hệ sản xuất thống trị; Quan hệ sản xuất tàn dư của xã hội cũ và quan hệ sản xuất mầm mống của xã hội tương lai."
  },
  {
    "id": 383,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 82",
    "question": "Lý luận hình thái kinh tế xã hội có mấy lĩnh vực xã hội?",
    "options": [
      "Có 3 lĩnh vực xã hội."
    ],
    "answer": "Có 3 lĩnh vực xã hội."
  },
  {
    "id": 384,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 83",
    "question": "Trong thời kỳ quá độ lên chủ nghĩa xã hội, hai vấn đề nào phải được tiến hành từng bước với những hình thức quy mô thích hợp?",
    "options": [
      "Cơ sở hạ tầng và kiến trúc thượng tầng xã hội chủ nghĩa."
    ],
    "answer": "Cơ sở hạ tầng và kiến trúc thượng tầng xã hội chủ nghĩa."
  },
  {
    "id": 385,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 84",
    "question": "Ý thức xã hội có mấy nội dung?",
    "options": [
      "Có 5 nội dung."
    ],
    "answer": "Có 5 nội dung."
  },
  {
    "id": 386,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 85",
    "question": "Con người là gì?",
    "options": [
      "Con người là thực thể tự nhiên mang đặc tính xã hội."
    ],
    "answer": "Con người là thực thể tự nhiên mang đặc tính xã hội."
  },
  {
    "id": 387,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 86",
    "question": "Đảng Cộng sản Việt Nam chủ trương xây dựng Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam phải là?",
    "options": [
      "Nhà nước pháp quyền xã hội chủ nghĩa."
    ],
    "answer": "Nhà nước pháp quyền xã hội chủ nghĩa."
  },
  {
    "id": 388,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 87",
    "question": "Lý luận của hình thái kinh tế xã hội khi nghiên cứu về lĩnh vực xã hội là?",
    "options": [
      "Xã hội không phải là sự kết hợp một cách ngẫu nhiên, máy móc giữa các cá nhân là là một cơ thể sống động."
    ],
    "answer": "Xã hội không phải là sự kết hợp một cách ngẫu nhiên, máy móc giữa các cá nhân là là một cơ thể sống động."
  },
  {
    "id": 389,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 88",
    "question": "Trong 3 mặt của quan hệ sản xuất thì mặt nào là cơ bản nhất?",
    "options": [
      "Quan hệ về sở hữu tư liệu sản xuất."
    ],
    "answer": "Quan hệ về sở hữu tư liệu sản xuất."
  },
  {
    "id": 390,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 89",
    "question": "Lịch sử xã hội loài người đã và đang trải qua mấy phương thức sản xuất?",
    "options": [
      "5 phương thức sản xuất."
    ],
    "answer": "5 phương thức sản xuất."
  },
  {
    "id": 391,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 90",
    "question": "Kiến trúc thượng tầng là gì?",
    "options": [
      "Là những quan điểm, tư tưởng và các thiết chế của xã hội được hình thành trên cơ sở hạ tầng."
    ],
    "answer": "Là những quan điểm, tư tưởng và các thiết chế của xã hội được hình thành trên cơ sở hạ tầng."
  },
  {
    "id": 392,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 91",
    "question": "Có mấy nội dung cấu thành của quá trình phát triển hình thái kinh tế xã hội?",
    "options": [
      "Có 3 nội dung."
    ],
    "answer": "Có 3 nội dung."
  },
  {
    "id": 393,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 92",
    "question": "Hoạt động sản xuất vật chất, hoạt động chính trị xã hội và hoạt động thực nghiệm khoa học, trong đó hoạt động nào là cơ bản mang tính quyết định cho sự tồn tại và phát triển của con người?",
    "options": [
      "Là hoạt động sản xuất vật chất."
    ],
    "answer": "Là hoạt động sản xuất vật chất."
  },
  {
    "id": 394,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 93",
    "question": "Đặc trưng của Nhà nước là?",
    "options": [
      "Quản lý dân trên một vùng lãnh thổ; Có hệ thống thuế khóa và có hệ thống quyền lực chuyên nghiệp."
    ],
    "answer": "Quản lý dân trên một vùng lãnh thổ; Có hệ thống thuế khóa và có hệ thống quyền lực chuyên nghiệp."
  },
  {
    "id": 395,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 94",
    "question": "Sự phù hợp của quan hệ sản xuất với lực lượng sản xuất quy định vấn đề gì sau đây?",
    "options": [
      "Quy định mục đích, xu hướng phát triển của nền sản xuất xã hội."
    ],
    "answer": "Quy định mục đích, xu hướng phát triển của nền sản xuất xã hội."
  },
  {
    "id": 396,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 95",
    "question": "Sản xuất là hoạt động có … và không ngừng … nhằm thỏa mãn … tồn tại và phát triển của con người. Từ còn thiếu lần lượt là?",
    "options": [
      "Mục đích/sáng tạo/nhu cầu."
    ],
    "answer": "Mục đích/sáng tạo/nhu cầu."
  },
  {
    "id": 397,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 96",
    "question": "Nhà nước có mấy đặc trưng?",
    "options": [
      "Nhà nước có 3 đặc trưng."
    ],
    "answer": "Nhà nước có 3 đặc trưng."
  },
  {
    "id": 398,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 97",
    "question": "Trong xã hội có đối kháng giai cấp thì kiến trúc thượng tầng mang tính chất như thế nào?",
    "options": [
      "Mang tính đối kháng."
    ],
    "answer": "Mang tính đối kháng."
  },
  {
    "id": 399,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 98",
    "question": "Để giải thích các hiện tượng trong đời sống xã hội, không nên xuất phát từ ý thức, tư tưởng chủ quan của con người, được hiểu là?",
    "options": [
      "Giá trị khoa học của lý luận hình thái kinh tế xã hội."
    ],
    "answer": "Giá trị khoa học của lý luận hình thái kinh tế xã hội."
  },
  {
    "id": 400,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 99",
    "question": "Hệ tư tưởng của xã hội là?",
    "options": [
      "Toàn bộ các hệ thống quan niệm, quan điểm xã hội."
    ],
    "answer": "Toàn bộ các hệ thống quan niệm, quan điểm xã hội."
  },
  {
    "id": 401,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 100",
    "question": "Bản tính tự nhiên của con người là kết quả của quá trình:",
    "options": [
      "Tiến hóa và phát triển lâu dài của giới tự nhiên."
    ],
    "answer": "Tiến hóa và phát triển lâu dài của giới tự nhiên."
  },
  {
    "id": 402,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 101",
    "question": "Mối quan hệ biện chứng giữa cơ sở hạ tầng và kiến trúc thượng tầng thể hiện như thế nào?",
    "options": [
      "Cơ sở hạ tầng quyết định kiến trúc thượng tầng và kiến trúc thượng tầng có sự tác động trở lại cơ sở hạ tầng."
    ],
    "answer": "Cơ sở hạ tầng quyết định kiến trúc thượng tầng và kiến trúc thượng tầng có sự tác động trở lại cơ sở hạ tầng."
  },
  {
    "id": 403,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 102",
    "question": "Phương pháp cách mạng là có những phương pháp cách mạng nào?",
    "options": [
      "Phương pháp cách mạng bạo lực và phương pháp cách mạng hòa bình."
    ],
    "answer": "Phương pháp cách mạng bạo lực và phương pháp cách mạng hòa bình."
  },
  {
    "id": 404,
    "chapterId": "c3",
    "chapter": "Chương 3: Hỏi - Đáp trọng tâm ôn thi",
    "header": "C 103",
    "question": "Quan hệ sản xuất bao gồm những yếu tố nào – lựa chọn phương án sai?",
    "options": [
      "Quan hệ mọi mặt giữa người lao động và người chủ."
    ],
    "answer": "Quan hệ mọi mặt giữa người lao động và người chủ."
  }
];

  // 1. STATE
  const state = {
    allQuestions: typeof FLASHCARD_DATA !== 'undefined' ? FLASHCARD_DATA : [],
    filteredQuestions: [],
    currentIndex: 0,
    isFlipped: false,
    activeFilter: 'all',
    searchQuery: '',
    currentMode: 'flashcard', // 'flashcard' | 'quiz' | 'list'
    isShuffled: false,
    isAutoplay: false,
    autoplayInterval: null,
    soundEnabled: localStorage.getItem('mln_sound') !== 'false',
    theme: localStorage.getItem('mln_theme') || 'dark',
    cardFontSize: localStorage.getItem('mln_card_font_size') || 'normal', // 'normal' | 'large' | 'xlarge'

    // Persistent user progress
    starred: new Set(JSON.parse(localStorage.getItem('mln_starred') || '[]')),
    status: JSON.parse(localStorage.getItem('mln_status') || '{}'), // id -> 'mastered' | 'review'

    // Quiz Mode state
    quiz: {
      questions: [],
      currentIndex: 0,
      score: 0,
      streak: 0,
      answered: false,
      selectedCount: parseInt(localStorage.getItem('mln_quiz_count') || '20', 10)
    }
  };

  // 2. DOM ELEMENTS
  const els = {
    html: document.documentElement,
    badgeTotalCount: document.getElementById('badge-total-count'),
    
    // Mode tabs
    tabFlashcard: document.getElementById('tab-flashcard'),
    tabQuiz: document.getElementById('tab-quiz'),
    tabList: document.getElementById('tab-list'),
    viewFlashcard: document.getElementById('view-flashcard'),
    viewQuiz: document.getElementById('view-quiz'),
    viewList: document.getElementById('view-list'),

    // Global tools
    btnSoundToggle: document.getElementById('btn-sound-toggle'),
    iconSoundOn: document.querySelector('.icon-sound-on'),
    iconSoundOff: document.querySelector('.icon-sound-off'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    iconMoon: document.querySelector('.icon-moon'),
    iconSun: document.querySelector('.icon-sun'),
    btnShortcuts: document.getElementById('btn-shortcuts'),
    shortcutsModal: document.getElementById('shortcuts-modal'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    toast: document.getElementById('app-toast'),

    // Toolbar
    searchInput: document.getElementById('search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    chapterFilterPills: document.getElementById('chapter-filter-pills'),
    pills: document.querySelectorAll('.pill'),

    // Counts
    countAll: document.getElementById('count-all'),
    countC1: document.getElementById('count-c1'),
    countC2: document.getElementById('count-c2'),
    countC3: document.getElementById('count-c3'),
    countStarred: document.getElementById('count-starred'),
    countReview: document.getElementById('count-review'),
    countMastered: document.getElementById('count-mastered'),

    // Progress bar
    currentRangeText: document.getElementById('current-range-text'),
    statMasteredBadge: document.getElementById('stat-mastered-badge'),
    statReviewBadge: document.getElementById('stat-review-badge'),
    statPercentBadge: document.getElementById('stat-percent-badge'),
    progressFillMastered: document.getElementById('progress-fill-mastered'),
    progressFillReview: document.getElementById('progress-fill-review'),

    // Flashcard
    cardScene: document.getElementById('card-scene'),
    flashcard: document.getElementById('flashcard'),
    cardFront: document.querySelector('.card-front'),
    cardBack: document.querySelector('.card-back'),
    cardChapterBadge: document.getElementById('card-chapter-badge'),
    cardQHeader: document.getElementById('card-q-header'),
    cardQuestionText: document.getElementById('card-question-text'),
    cardOptionsHint: document.getElementById('card-options-hint'),
    cardHintList: document.getElementById('card-hint-list'),
    cardAnswerText: document.getElementById('card-answer-text'),
    cardAnswerBreakdown: document.getElementById('card-answer-breakdown'),
    cardBreakdownList: document.getElementById('card-breakdown-list'),
    btnCardFont: document.getElementById('btn-card-font'),
    btnCardBackFont: document.getElementById('btn-card-back-font'),
    btnCardTts: document.getElementById('btn-card-tts'),
    btnCardBackTts: document.getElementById('btn-card-back-tts'),
    btnCardStar: document.getElementById('btn-card-star'),
    btnCardBackStar: document.getElementById('btn-card-back-star'),
    btnRateBad: document.getElementById('btn-rate-bad'),
    btnRateGood: document.getElementById('btn-rate-good'),

    // Card controls
    btnPrevCard: document.getElementById('btn-prev-card'),
    btnNextCard: document.getElementById('btn-next-card'),
    btnFlipCard: document.getElementById('btn-flip-card'),
    btnShuffle: document.getElementById('btn-shuffle'),
    btnAutoplay: document.getElementById('btn-autoplay'),
    iconPlay: document.querySelector('.icon-play'),
    iconPause: document.querySelector('.icon-pause'),
    autoplayText: document.getElementById('autoplay-text'),

    // Quiz elements
    quizSizePills: document.getElementById('quiz-size-pills'),
    btnQuizRestart: document.getElementById('btn-quiz-restart'),
    quizScoreVal: document.getElementById('quiz-score-val'),
    quizStreakVal: document.getElementById('quiz-streak-val'),
    quizCurrentNum: document.getElementById('quiz-current-num'),
    quizCard: document.getElementById('quiz-card'),
    quizBadge: document.getElementById('quiz-badge'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    quizOptionsContainer: document.getElementById('quiz-options-container'),
    quizFeedbackBox: document.getElementById('quiz-feedback-box'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackDesc: document.getElementById('feedback-desc'),
    btnQuizNext: document.getElementById('btn-quiz-next'),

    // List mode elements
    listTotalCount: document.getElementById('list-total-count'),
    btnExpandAll: document.getElementById('btn-expand-all'),
    questionsAccordionList: document.getElementById('questions-accordion-list')
  };

  // 3. SOUND SYNTHESIS (Web Audio API - Zero external files)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  function playFlipSound() {
    playTone(340, 'triangle', 0.12, 0.08);
  }

  function playCorrectSound() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  function playWrongSound() {
    playTone(180, 'sawtooth', 0.25, 0.12);
  }

  function playClickSound() {
    playTone(450, 'sine', 0.06, 0.04);
  }

  // 4. TEXT TO SPEECH (Vietnamese)
  function speakVietnamese(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát âm.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    
    // Attempt to find Vietnamese voice
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoice) utterance.voice = viVoice;

    window.speechSynthesis.speak(utterance);
  }

  // 5. THEME & AUDIO TOGGLES
  function initTheme() {
    els.html.setAttribute('data-theme', state.theme);
    if (state.theme === 'light') {
      els.iconMoon.classList.add('hide');
      els.iconSun.classList.remove('hide');
    } else {
      els.iconMoon.classList.remove('hide');
      els.iconSun.classList.add('hide');
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mln_theme', state.theme);
    initTheme();
    playClickSound();
    showToast(`Đã chuyển sang giao diện ${state.theme === 'dark' ? 'Tối' : 'Sáng'}`);
  }

  function initSound() {
    if (state.soundEnabled) {
      els.iconSoundOn.classList.remove('hide');
      els.iconSoundOff.classList.add('hide');
    } else {
      els.iconSoundOn.classList.add('hide');
      els.iconSoundOff.classList.remove('hide');
    }
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem('mln_sound', state.soundEnabled);
    initSound();
    showToast(`Âm thanh: ${state.soundEnabled ? 'Bật' : 'Tắt'}`);
  }

  // 6. TOAST
  let toastTimer = null;
  function showToast(msg, duration = 2000) {
    clearTimeout(toastTimer);
    els.toast.textContent = msg;
    els.toast.classList.remove('hide');
    toastTimer = setTimeout(() => {
      els.toast.classList.add('hide');
    }, duration);
  }

  // 7. FILTER & SEARCH
  function updateCounts() {
    const total = state.allQuestions.length;
    const c1 = state.allQuestions.filter(q => q.chapterId.startsWith('c1')).length;
    const c2 = state.allQuestions.filter(q => q.chapterId.startsWith('c2')).length;
    const c3 = state.allQuestions.filter(q => q.chapterId.startsWith('c3')).length;
    const starCount = state.starred.size;
    
    let masteredCount = 0;
    let reviewCount = 0;
    Object.values(state.status).forEach(st => {
      if (st === 'mastered') masteredCount++;
      if (st === 'review') reviewCount++;
    });

    els.countAll.textContent = total;
    els.countC1.textContent = c1;
    els.countC2.textContent = c2;
    els.countC3.textContent = c3;
    els.countStarred.textContent = starCount;
    els.countReview.textContent = reviewCount;
    els.countMastered.textContent = masteredCount;

    // Progress stats
    els.statMasteredBadge.textContent = `✅ Đã thuộc: ${masteredCount}`;
    els.statReviewBadge.textContent = `❌ Cần ôn: ${reviewCount}`;
    const percent = Math.round((masteredCount / Math.max(total, 1)) * 100);
    els.statPercentBadge.textContent = `${percent}% hoàn thành`;
    els.progressFillMastered.style.width = `${(masteredCount / total) * 100}%`;
    els.progressFillReview.style.width = `${(reviewCount / total) * 100}%`;
  }

  function applyFilterAndSearch() {
    let result = [...state.allQuestions];

    // Filter by Chapter / Category
    if (state.activeFilter === 'c1') {
      result = result.filter(q => q.chapterId.startsWith('c1'));
    } else if (state.activeFilter === 'c2') {
      result = result.filter(q => q.chapterId.startsWith('c2'));
    } else if (state.activeFilter === 'c3') {
      result = result.filter(q => q.chapterId.startsWith('c3'));
    } else if (state.activeFilter === 'starred') {
      result = result.filter(q => state.starred.has(q.id));
    } else if (state.activeFilter === 'review') {
      result = result.filter(q => state.status[q.id] === 'review');
    } else if (state.activeFilter === 'mastered') {
      result = result.filter(q => state.status[q.id] === 'mastered');
    }

    // Search query
    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(item => {
        const inQuestion = item.question.toLowerCase().includes(q);
        const inAnswer = item.answer.toLowerCase().includes(q);
        const inHeader = item.header.toLowerCase().includes(q);
        const inOptions = item.options.some(opt => opt.toLowerCase().includes(q));
        return inQuestion || inAnswer || inHeader || inOptions;
      });
    }

    // Shuffle if toggled
    if (state.isShuffled) {
      result = shuffleArray([...result]);
    }

    state.filteredQuestions = result;
    state.currentIndex = 0;
    state.isFlipped = false;
    els.flashcard.classList.remove('flipped');

    updateFlashcardView();
    updateListView();
    updateProgressIndicator();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 8. FLASHCARD VIEW RENDERING
  function updateProgressIndicator() {
    const total = state.filteredQuestions.length;
    if (total === 0) {
      els.currentRangeText.textContent = '0 / 0 câu';
    } else {
      els.currentRangeText.textContent = `${state.currentIndex + 1} / ${total} câu`;
    }
  }

  function updateFlashcardView() {
    const list = state.filteredQuestions;
    if (list.length === 0) {
      els.cardChapterBadge.textContent = 'Trống';
      els.cardQHeader.textContent = '';
      els.cardQuestionText.textContent = 'Không tìm thấy câu hỏi nào phù hợp với bộ lọc hoặc tìm kiếm của bạn.';
      els.cardOptionsHint.classList.add('hide');
      els.cardAnswerText.textContent = 'Hãy chọn bộ lọc "Tất cả" hoặc xóa từ khóa tìm kiếm.';
      els.cardAnswerBreakdown.classList.add('hide');
      updateProgressIndicator();
      return;
    }

    const item = list[state.currentIndex];
    const isStarred = state.starred.has(item.id);

    // Front Face
    els.cardChapterBadge.textContent = `${item.chapter} • ${item.header}`;
    els.cardQHeader.textContent = item.header;
    els.cardQuestionText.textContent = item.question;

    // Star icon state
    if (isStarred) {
      els.btnCardStar.classList.add('starred');
      els.btnCardBackStar.classList.add('starred');
    } else {
      els.btnCardStar.classList.remove('starred');
      els.btnCardBackStar.classList.remove('starred');
    }

    // Options hint on front (if multiple choice)
    if (item.options && item.options.length >= 2) {
      els.cardOptionsHint.classList.remove('hide');
      els.cardHintList.innerHTML = item.options.map(opt => `<li>${escapeHtml(opt)}</li>`).join('');
    } else {
      els.cardOptionsHint.classList.add('hide');
    }

    // Back Face
    els.cardAnswerText.textContent = item.answer;

    // Breakdown list on back
    if (item.options && item.options.length >= 2) {
      els.cardAnswerBreakdown.classList.remove('hide');
      els.cardBreakdownList.innerHTML = item.options.map(opt => {
        const isCorrect = (opt.trim() === item.answer.trim()) || opt.includes(item.answer);
        return `<li class="${isCorrect ? 'is-correct' : ''}">${isCorrect ? '✓ ' : ''}${escapeHtml(opt)}</li>`;
      }).join('');
    } else {
      els.cardAnswerBreakdown.classList.add('hide');
    }

    // Reset flip
    if (state.isFlipped) {
      state.isFlipped = false;
      els.flashcard.classList.remove('flipped');
    }

    updateProgressIndicator();
    requestAnimationFrame(adjustCardHeight);
  }

  function initCardFontSize() {
    els.flashcard.setAttribute('data-card-font', state.cardFontSize);
  }

  function cycleCardFontSize() {
    const modes = ['normal', 'large', 'xlarge'];
    const nextIdx = (modes.indexOf(state.cardFontSize) + 1) % modes.length;
    state.cardFontSize = modes[nextIdx];
    localStorage.setItem('mln_card_font_size', state.cardFontSize);
    initCardFontSize();
    setTimeout(adjustCardHeight, 50);
    playClickSound();

    const labels = {
      normal: 'Vừa (Mặc định)',
      large: 'Lớn (115%)',
      xlarge: 'Rất lớn (130%)'
    };
    showToast(`Cỡ chữ thẻ: ${labels[state.cardFontSize]}`);
  }

  function adjustCardHeight() {
    if (!els.cardFront || !els.cardBack) return;
    const baseMin = window.innerWidth <= 768 ? 460 : 480;

    // Measure front content
    const frontHeader = els.cardFront.querySelector('.card-header');
    const frontBody = els.cardFront.querySelector('.card-body');
    const frontFooter = els.cardFront.querySelector('.card-footer');

    // Measure back content
    const backHeader = els.cardBack.querySelector('.card-header');
    const backBody = els.cardBack.querySelector('.card-body');
    const backFooter = els.cardBack.querySelector('.card-footer');

    const frontNeeded = (frontHeader?.offsetHeight || 0) + (frontBody?.scrollHeight || 0) + (frontFooter?.offsetHeight || 0) + 70;
    const backNeeded = (backHeader?.offsetHeight || 0) + (backBody?.scrollHeight || 0) + (backFooter?.offsetHeight || 0) + 70;

    const targetH = Math.max(baseMin, frontNeeded, backNeeded);
    els.cardScene.style.minHeight = `${targetH}px`;
    els.flashcard.style.minHeight = `${targetH}px`;
  }

  function flipCard() {
    state.isFlipped = !state.isFlipped;
    els.flashcard.classList.toggle('flipped', state.isFlipped);
    playFlipSound();
  }

  function nextCard() {
    if (state.filteredQuestions.length === 0) return;
    if (state.currentIndex < state.filteredQuestions.length - 1) {
      state.currentIndex++;
    } else {
      state.currentIndex = 0; // wrap around
    }
    updateFlashcardView();
    playClickSound();
  }

  function prevCard() {
    if (state.filteredQuestions.length === 0) return;
    if (state.currentIndex > 0) {
      state.currentIndex--;
    } else {
      state.currentIndex = state.filteredQuestions.length - 1;
    }
    updateFlashcardView();
    playClickSound();
  }

  function toggleStarCurrent() {
    if (state.filteredQuestions.length === 0) return;
    const item = state.filteredQuestions[state.currentIndex];
    if (state.starred.has(item.id)) {
      state.starred.delete(item.id);
      showToast('Đã bỏ lưu câu hỏi ⭐');
    } else {
      state.starred.add(item.id);
      showToast('Đã lưu câu hỏi vào danh sách ⭐');
    }
    localStorage.setItem('mln_starred', JSON.stringify([...state.starred]));
    updateCounts();
    updateFlashcardView();
    playClickSound();
  }

  function rateCurrentCard(rating) {
    if (state.filteredQuestions.length === 0) return;
    const item = state.filteredQuestions[state.currentIndex];
    state.status[item.id] = rating;
    localStorage.setItem('mln_status', JSON.stringify(state.status));
    updateCounts();

    if (rating === 'mastered') {
      playCorrectSound();
      showToast('Tuyệt vời! Đã đánh dấu: Đã thuộc ✅');
    } else {
      playWrongSound();
      showToast('Đã lưu vào danh sách Cần ôn lại ❌');
    }

    setTimeout(() => {
      nextCard();
    }, 400);
  }

  function toggleAutoplay() {
    state.isAutoplay = !state.isAutoplay;
    if (state.isAutoplay) {
      els.btnAutoplay.classList.add('active');
      els.iconPlay.classList.add('hide');
      els.iconPause.classList.remove('hide');
      els.autoplayText.textContent = 'Dừng';
      showToast('Đã bật Tự chạy (Autoplay)');
      runAutoplayCycle();
    } else {
      stopAutoplay();
    }
  }

  function stopAutoplay() {
    state.isAutoplay = false;
    clearTimeout(state.autoplayInterval);
    els.btnAutoplay.classList.remove('active');
    els.iconPlay.classList.remove('hide');
    els.iconPause.classList.add('hide');
    els.autoplayText.textContent = 'Tự chạy';
  }

  function runAutoplayCycle() {
    if (!state.isAutoplay) return;
    // Step 1: Wait 4 seconds on front, then flip
    state.autoplayInterval = setTimeout(() => {
      if (!state.isAutoplay) return;
      if (!state.isFlipped) flipCard();
      // Step 2: Wait 4 seconds on back, then next card
      state.autoplayInterval = setTimeout(() => {
        if (!state.isAutoplay) return;
        nextCard();
        runAutoplayCycle();
      }, 4000);
    }, 4000);
  }

  // 9. QUIZ MODE
  function initQuiz(customCount) {
    const count = customCount || state.quiz.selectedCount || 20;
    state.quiz.selectedCount = count;
    localStorage.setItem('mln_quiz_count', count);

    // Update active pill UI
    if (els.quizSizePills) {
      const pills = els.quizSizePills.querySelectorAll('.quiz-size-pill');
      pills.forEach(p => {
        p.classList.toggle('active', parseInt(p.getAttribute('data-count'), 10) === count);
      });
    }

    let pool = [...state.filteredQuestions];
    if (pool.length < count) {
      // If current filter has fewer questions than requested count, pull from all questions
      pool = [...state.allQuestions];
    }
    state.quiz.questions = shuffleArray([...pool]).slice(0, count);
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    state.quiz.streak = 0;
    state.quiz.answered = false;

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const qData = state.quiz.questions[state.quiz.currentIndex];
    state.quiz.answered = false;

    els.quizScoreVal.textContent = state.quiz.score;
    els.quizStreakVal.textContent = state.quiz.streak;
    els.quizCurrentNum.textContent = `${state.quiz.currentIndex + 1} / ${state.quiz.questions.length}`;

    els.quizBadge.textContent = `${qData.chapter} • ${qData.header}`;
    els.quizQuestionText.textContent = qData.question;
    els.quizFeedbackBox.classList.add('hide');

    // Build choices
    let options = [];
    if (qData.options && qData.options.length >= 2) {
      options = [...qData.options];
    } else {
      // Generate distractors from other questions in data
      const distractors = state.allQuestions
        .filter(item => item.id !== qData.id && item.answer && item.answer !== qData.answer)
        .map(item => item.answer);
      const shuffledDistractors = shuffleArray(distractors).slice(0, 3);
      options = shuffleArray([qData.answer, ...shuffledDistractors]);
    }

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    els.quizOptionsContainer.innerHTML = options.map((opt, i) => {
      return `
        <button class="quiz-opt-btn" data-opt="${escapeHtml(opt)}">
          <span class="quiz-opt-prefix">${letters[i] || (i + 1)}</span>
          <span class="quiz-opt-text">${escapeHtml(opt)}</span>
        </button>
      `;
    }).join('');

    // Attach click handlers
    const optButtons = els.quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => handleQuizAnswer(btn, qData, optButtons));
    });
  }

  function handleQuizAnswer(selectedBtn, qData, allButtons) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;

    const chosenText = selectedBtn.getAttribute('data-opt').trim();
    const correctText = qData.answer.trim();
    const isCorrect = (chosenText === correctText) || chosenText.includes(correctText) || (correctText.includes(chosenText) && chosenText.length > 5);

    // Disable all options
    allButtons.forEach(btn => {
      btn.disabled = true;
      const optVal = btn.getAttribute('data-opt').trim();
      if ((optVal === correctText) || optVal.includes(correctText)) {
        btn.classList.add('correct');
      }
    });

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      state.quiz.score += 10;
      state.quiz.streak++;
      playCorrectSound();
      showQuizFeedback(true, qData.answer);
    } else {
      selectedBtn.classList.add('wrong');
      state.quiz.streak = 0;
      playWrongSound();
      showQuizFeedback(false, qData.answer);
      // Mark for review in user progress
      state.status[qData.id] = 'review';
      localStorage.setItem('mln_status', JSON.stringify(state.status));
      updateCounts();
    }

    els.quizScoreVal.textContent = state.quiz.score;
    els.quizStreakVal.textContent = state.quiz.streak;
  }

  function showQuizFeedback(isCorrect, correctAnswer) {
    els.feedbackIcon.textContent = isCorrect ? '🎉' : '❌';
    els.feedbackTitle.textContent = isCorrect ? 'Chính xác! (+10 điểm)' : 'Chưa đúng rồi!';
    els.feedbackDesc.textContent = `Đáp án đúng: ${correctAnswer}`;
    els.quizFeedbackBox.classList.remove('hide');
  }

  function nextQuizQuestion() {
    if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
      state.quiz.currentIndex++;
      renderQuizQuestion();
    } else {
      // Quiz completed!
      const totalPossible = state.quiz.questions.length * 10;
      showToast(`Hoàn thành Trắc nghiệm! Điểm của bạn: ${state.quiz.score} / ${totalPossible} 🏆`, 4000);
      initQuiz();
    }
  }

  // 10. LIST / LOOKUP VIEW
  function updateListView() {
    const list = state.filteredQuestions;
    els.listTotalCount.textContent = `Hiển thị ${list.length} / ${state.allQuestions.length} câu hỏi`;

    if (list.length === 0) {
      els.questionsAccordionList.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Không tìm thấy câu hỏi nào. Thử từ khóa khác.
        </div>
      `;
      return;
    }

    els.questionsAccordionList.innerHTML = list.map(item => {
      const isStarred = state.starred.has(item.id);
      return `
        <div class="list-item-card" id="list-card-${item.id}">
          <div class="list-item-header" data-id="${item.id}">
            <div class="list-item-title-wrap">
              <div class="list-item-meta">
                <span>${escapeHtml(item.chapter)}</span> • <span>${escapeHtml(item.header)}</span>
              </div>
              <div class="list-item-q">${escapeHtml(item.question)}</div>
            </div>
            <div class="list-item-actions">
              <button class="list-star-btn ${isStarred ? 'starred' : ''}" data-id="${item.id}" title="Lưu câu hỏi">
                ⭐
              </button>
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div class="list-item-body">
            <div class="list-answer-box">
              <div class="list-answer-label">Đáp án chính xác:</div>
              <div class="list-answer-text">${escapeHtml(item.answer)}</div>
            </div>
            ${item.options && item.options.length >= 2 ? `
              <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-secondary);">
                <strong>Các phương án:</strong>
                <ul style="margin: 0.25rem 0 0 1.25rem;">
                  ${item.options.map(opt => `<li>${escapeHtml(opt)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Toggle card expansion
    const headers = els.questionsAccordionList.querySelectorAll('.list-item-header');
    headers.forEach(h => {
      h.addEventListener('click', (e) => {
        if (e.target.closest('.list-star-btn')) return;
        const card = h.closest('.list-item-card');
        card.classList.toggle('open');
        playClickSound();
      });
    });

    // Star toggle in list
    const starBtns = els.questionsAccordionList.querySelectorAll('.list-star-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if (state.starred.has(id)) {
          state.starred.delete(id);
          btn.classList.remove('starred');
          showToast('Đã bỏ lưu ⭐');
        } else {
          state.starred.add(id);
          btn.classList.add('starred');
          showToast('Đã lưu ⭐');
        }
        localStorage.setItem('mln_starred', JSON.stringify([...state.starred]));
        updateCounts();
        playClickSound();
      });
    });
  }

  let allExpanded = false;
  function toggleExpandAll() {
    allExpanded = !allExpanded;
    const cards = els.questionsAccordionList.querySelectorAll('.list-item-card');
    cards.forEach(c => c.classList.toggle('open', allExpanded));
    els.btnExpandAll.textContent = allExpanded ? 'Đóng tất cả đáp án' : 'Mở tất cả đáp án';
    playClickSound();
  }

  // 11. MODE SWITCHING
  function switchMode(mode) {
    state.currentMode = mode;

    els.tabFlashcard.classList.toggle('active', mode === 'flashcard');
    els.tabQuiz.classList.toggle('active', mode === 'quiz');
    els.tabList.classList.toggle('active', mode === 'list');

    els.viewFlashcard.classList.toggle('active', mode === 'flashcard');
    els.viewQuiz.classList.toggle('active', mode === 'quiz');
    els.viewList.classList.toggle('active', mode === 'list');

    if (mode === 'quiz') {
      initQuiz();
    } else if (mode === 'flashcard') {
      updateFlashcardView();
    } else if (mode === 'list') {
      updateListView();
    }

    playClickSound();
  }

  // 12. UTILITIES
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 13. EVENT LISTENERS
  function setupEventListeners() {
    // Mode tabs
    els.tabFlashcard.addEventListener('click', () => switchMode('flashcard'));
    els.tabQuiz.addEventListener('click', () => switchMode('quiz'));
    els.tabList.addEventListener('click', () => switchMode('list'));

    // Sound & Theme
    els.btnSoundToggle.addEventListener('click', toggleSound);
    els.btnThemeToggle.addEventListener('click', toggleTheme);

    // Shortcuts modal
    els.btnShortcuts.addEventListener('click', () => {
      els.shortcutsModal.classList.remove('hide');
      playClickSound();
    });
    els.btnCloseModal.addEventListener('click', () => {
      els.shortcutsModal.classList.add('hide');
    });
    els.shortcutsModal.addEventListener('click', (e) => {
      if (e.target === els.shortcutsModal) els.shortcutsModal.classList.add('hide');
    });

    // Search
    els.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      els.btnClearSearch.classList.toggle('hide', !state.searchQuery);
      applyFilterAndSearch();
    });

    els.btnClearSearch.addEventListener('click', () => {
      els.searchInput.value = '';
      state.searchQuery = '';
      els.btnClearSearch.classList.add('hide');
      applyFilterAndSearch();
      els.searchInput.focus();
    });

    // Filter pills
    els.pills.forEach(pill => {
      pill.addEventListener('click', () => {
        els.pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeFilter = pill.getAttribute('data-filter');
        applyFilterAndSearch();
        playClickSound();
      });
    });

    // Flashcard interactions
    els.flashcard.addEventListener('click', (e) => {
      if (e.target.closest('.card-tool-btn') || e.target.closest('.rate-btn')) return;
      flipCard();
    });

    els.btnFlipCard.addEventListener('click', flipCard);
    els.btnNextCard.addEventListener('click', nextCard);
    els.btnPrevCard.addEventListener('click', prevCard);

    // Shuffle
    els.btnShuffle.addEventListener('click', () => {
      state.isShuffled = !state.isShuffled;
      els.btnShuffle.classList.toggle('active', state.isShuffled);
      showToast(state.isShuffled ? 'Đã bật đảo câu ngẫu nhiên 🔀' : 'Đã tắt đảo ngẫu nhiên');
      applyFilterAndSearch();
      playClickSound();
    });

    // Autoplay
    els.btnAutoplay.addEventListener('click', toggleAutoplay);

    // Rating
    els.btnRateBad.addEventListener('click', (e) => {
      e.stopPropagation();
      rateCurrentCard('review');
    });
    els.btnRateGood.addEventListener('click', (e) => {
      e.stopPropagation();
      rateCurrentCard('mastered');
    });

    // Star buttons
    els.btnCardStar.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStarCurrent();
    });
    els.btnCardBackStar.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStarCurrent();
    });

    // Font size toggle buttons
    if (els.btnCardFont) {
      els.btnCardFont.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleCardFontSize();
      });
    }
    if (els.btnCardBackFont) {
      els.btnCardBackFont.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleCardFontSize();
      });
    }

    // Text to speech
    els.btnCardTts.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.filteredQuestions.length > 0) {
        speakVietnamese(state.filteredQuestions[state.currentIndex].question);
      }
    });

    els.btnCardBackTts.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.filteredQuestions.length > 0) {
        speakVietnamese(state.filteredQuestions[state.currentIndex].answer);
      }
    });

    // Window resize - recompute card height if needed
    window.addEventListener('resize', () => {
      if (state.currentMode === 'flashcard') {
        adjustCardHeight();
      }
    });

    // Quiz question count pills
    if (els.quizSizePills) {
      const pills = els.quizSizePills.querySelectorAll('.quiz-size-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const count = parseInt(pill.getAttribute('data-count'), 10);
          if (count === state.quiz.selectedCount && state.quiz.questions.length === count) return;
          initQuiz(count);
          playClickSound();
          showToast(`Đã bắt đầu bài trắc nghiệm ${count} câu 📝`);
        });
      });
    }

    // Quiz restart button
    if (els.btnQuizRestart) {
      els.btnQuizRestart.addEventListener('click', () => {
        initQuiz(state.quiz.selectedCount);
        playClickSound();
        showToast(`Đã tạo bộ đề mới (${state.quiz.selectedCount} câu) 🔀`);
      });
    }

    // Quiz next
    els.btnQuizNext.addEventListener('click', nextQuizQuestion);

    // List expand all
    els.btnExpandAll.addEventListener('click', toggleExpandAll);

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // If typing in search box, ignore hotkeys
      if (document.activeElement === els.searchInput) {
        if (e.key === 'Escape') els.searchInput.blur();
        return;
      }

      if (e.key === 'Escape') {
        els.shortcutsModal.classList.add('hide');
        return;
      }

      if (state.currentMode === 'flashcard') {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          flipCard();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextCard();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevCard();
        } else if (e.key === '1') {
          e.preventDefault();
          rateCurrentCard('review');
        } else if (e.key === '3') {
          e.preventDefault();
          rateCurrentCard('mastered');
        } else if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleStarCurrent();
        } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          cycleCardFontSize();
        } else if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          els.btnShuffle.click();
        } else if (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleAutoplay();
        }
      }

      if (e.key === '?') {
        els.shortcutsModal.classList.toggle('hide');
      }
    });
  }

  // 14. SECURITY / ANTI-INSPECT PROTECTION
  function setupSecurityProtection() {
    // 1. Disable Right-Click Context Menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showToast('⚠️ Chuột phải đã bị khóa để bảo mật đề thi.');
      return false;
    }, true);

    // 2. Disable Content Dragging
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    }, true);

    // 3. Disable DevTools & View Source Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

      // F12 key
      const isF12 = e.key === 'F12' || e.keyCode === 123;

      // Ctrl + Shift + I/J/C or Cmd + Option + I/J/C (Developer Tools)
      const isDevToolsCombo = (e.ctrlKey || (isMac && e.metaKey)) && 
                              (e.shiftKey || (isMac && e.altKey)) && 
                              ['i', 'j', 'c'].includes(e.key.toLowerCase());

      // Ctrl + U or Cmd + Option + U (View Source)
      const isViewSource = (e.ctrlKey || (isMac && (e.metaKey && e.altKey))) && 
                           e.key.toLowerCase() === 'u';

      // Ctrl + S (Save Page)
      const isSavePage = (e.ctrlKey || (isMac && e.metaKey)) && 
                         e.key.toLowerCase() === 's';

      if (isF12 || isDevToolsCombo || isViewSource) {
        e.preventDefault();
        e.stopPropagation();
        showToast('⚠️ Tính năng kiểm tra (DevTools / View Source) đã bị khóa.');
        return false;
      }

      if (isSavePage) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);
  }

  // 15. INITIALIZE
  function init() {
    initTheme();
    initSound();
    initCardFontSize();
    updateCounts();
    applyFilterAndSearch();
    setupEventListeners();
    setupSecurityProtection();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
