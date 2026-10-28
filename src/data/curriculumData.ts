import { Topic, QuizQuestion, Badge } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 1,
    title: 'Chủ đề 1: Ôn tập và bổ sung',
    subtitle: 'Số đến 100 000 • Biểu thức chứa chữ • Bài toán ba bước tính',
    iconName: 'Calculator',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 text-amber-900 border-amber-200',
    borderLight: 'border-amber-300',
    lessons: [
      {
        id: 1,
        topicId: 1,
        title: 'Bài 1 & 2: Ôn tập các số & phép tính đến 100 000',
        pageRange: 'Trang 6 - 11',
        summary: [
          'Các hàng gồm: hàng đơn vị, chục, trăm, nghìn, chục nghìn.',
          'Viết số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị. Ví dụ: 36 515 = 30 000 + 6 000 + 500 + 10 + 5.',
          'Thứ tự thực hiện biểu thức: Trong ngoặc trước, nhân/chia trước, cộng/trừ sau.'
        ],
        keyRules: [
          'Số liền trước bé hơn số đã cho 1 đơn vị: Số liền trước của a là (a - 1).',
          'Số liền sau lớn hơn số đã cho 1 đơn vị: Số liền sau của a là (a + 1).'
        ],
        examples: [
          {
            problem: 'Tính giá trị biểu thức: 57 670 - (29 653 - 2 653)',
            solution: 'Trong ngoặc: 29 653 - 2 653 = 27 000. Sau đó lấy: 57 670 - 27 000 = 30 670.',
            note: 'Tính trong ngoặc trước!'
          }
        ]
      },
      {
        id: 2,
        topicId: 1,
        title: 'Bài 3: Số chẵn, số lẻ',
        pageRange: 'Trang 12 - 13',
        summary: [
          'Số chẵn là số chia hết cho 2, có chữ số tận cùng là 0, 2, 4, 6, 8.',
          'Số lẻ là số không chia hết cho 2, có chữ số tận cùng là 1, 3, 5, 7, 9.',
          'Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị. Hai số lẻ liên tiếp cũng hơn kém nhau 2 đơn vị.'
        ],
        keyRules: [
          'Chỉ cần nhìn vào chữ số hàng đơn vị (chữ số cuối cùng) để biết ngay chẵn hay lẻ!'
        ],
        examples: [
          {
            problem: 'Số 42 135 là số chẵn hay số lẻ?',
            solution: 'Chữ số tận cùng là 5 (thuộc tập 1, 3, 5, 7, 9) nên 42 135 là số lẻ.'
          }
        ]
      },
      {
        id: 3,
        topicId: 1,
        title: 'Bài 4: Biểu thức chứa chữ',
        pageRange: 'Trang 14 - 18',
        summary: [
          'Biểu thức chứa một chữ: a + 4, 40 - b, 125 : m.',
          'Biểu thức chứa hai chữ: a + b, (a + b) x 2 (Chu vi hình chữ nhật P = (a + b) x 2).',
          'Biểu thức chứa ba chữ: a + b + c (Chu vi hình tam giác P = a + b + c).',
          'Mỗi lần thay chữ bằng số, ta tính được một giá trị của biểu thức.'
        ],
        keyRules: [
          'Chu vi hình vuông: P = a x 4',
          'Chu vi hình chữ nhật: P = (a + b) x 2 (cùng đơn vị đo)',
          'Chu vi hình tam giác: P = a + b + c (cùng đơn vị đo)'
        ],
        examples: [
          {
            problem: 'Tính chu vi hình chữ nhật có chiều dài a = 25 cm, chiều rộng b = 16 cm.',
            solution: 'P = (25 + 16) x 2 = 41 x 2 = 82 cm.'
          }
        ],
        interactiveTool: 'sum_diff_solver'
      },
      {
        id: 4,
        topicId: 1,
        title: 'Bài 5: Giải bài toán có ba bước tính',
        pageRange: 'Trang 19 - 21',
        summary: [
          'Đọc kĩ đề, xác định các đại lượng đã cho và đại lượng cần tìm.',
          'Vẽ sơ đồ đoạn thẳng tóm tắt để nhìn rõ mối quan hệ.',
          'Thực hiện tuần tự 3 bước: tính thành phần 1 -> tính thành phần 2 -> tính tổng hoặc kết quả yêu cầu.'
        ],
        keyRules: [
          'Cẩn thận phân biệt "nhiều hơn" (phép cộng) và "ít hơn" (phép trừ)!'
        ],
        examples: [
          {
            problem: 'Đội 1 trồng 60 cây. Đội 2 hơn Đội 1 là 20 cây. Đội 3 ít hơn Đội 2 là 10 cây. Hỏi cả ba đội trồng bao nhiêu cây?',
            solution: 'Bước 1: Đội 2 trồng: 60 + 20 = 80 cây. Bước 2: Đội 3 trồng: 80 - 10 = 70 cây. Bước 3: Cả ba đội: 60 + 80 + 70 = 210 cây.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Chủ đề 2: Góc và đơn vị đo góc',
    subtitle: 'Độ (°) • Góc nhọn • Góc vuông • Góc tù • Góc bẹt',
    iconName: 'Compass',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    borderLight: 'border-emerald-300',
    lessons: [
      {
        id: 5,
        topicId: 2,
        title: 'Bài 7: Đo góc, đơn vị đo góc',
        pageRange: 'Trang 23 - 25',
        summary: [
          'Độ là đơn vị đo góc, kí hiệu là ° (ví dụ 60 độ viết là 60°).',
          'Dùng thước đo góc hình bán nguyệt: Đặt tâm thước trùng đỉnh góc, một cạnh của góc nằm trên đường kính thước đi qua vạch số 0, cạnh kia đi qua vạch nào thì đó là số đo góc.'
        ],
        keyRules: [
          'Góc đỉnh O; cạnh OA, OB = 60° nghĩa là số đo góc tạo bởi OA và OB là 60°.'
        ],
        examples: [
          {
            problem: 'Khi kim giờ chỉ số 3, kim phút chỉ số 12, góc giữa 2 kim bằng bao nhiêu độ?',
            solution: 'Tạo thành góc vuông 90°.'
          }
        ],
        interactiveTool: 'angle_ruler'
      },
      {
        id: 6,
        topicId: 2,
        title: 'Bài 8: Góc nhọn, góc tù, góc bẹt',
        pageRange: 'Trang 26 - 32',
        summary: [
          'Góc vuông: Có số đo bằng 90° (dùng ê ke kiểm tra).',
          'Góc nhọn: Có số đo lớn hơn 0° và bé hơn 90° (bé hơn góc vuông).',
          'Góc tù: Có số đo lớn hơn 90° và bé hơn 180° (lớn hơn góc vuông).',
          'Góc bẹt: Có số đo bằng 180° (bằng 2 góc vuông, hai cạnh tạo thành đường thẳng).'
        ],
        keyRules: [
          'So sánh độ lớn: Góc nhọn < Góc vuông (90°) < Góc tù < Góc bẹt (180°).'
        ],
        examples: [
          {
            problem: 'Góc 120° là góc gì? Góc 45° là góc gì?',
            solution: '120° lớn hơn 90° nên là góc tù. 45° bé hơn 90° nên là góc nhọn.'
          }
        ],
        interactiveTool: 'angle_ruler'
      }
    ]
  },
  {
    id: 3,
    title: 'Chủ đề 3: Số có nhiều chữ số',
    subtitle: 'Lớp triệu, lớp nghìn, lớp đơn vị • Làm tròn số • So sánh',
    iconName: 'Layers',
    color: 'from-blue-600 to-indigo-600',
    bgLight: 'bg-blue-50 text-blue-900 border-blue-200',
    borderLight: 'border-blue-300',
    lessons: [
      {
        id: 7,
        topicId: 3,
        title: 'Bài 10 & 11: Số có sáu chữ số, số 1 000 000, Hàng và Lớp',
        pageRange: 'Trang 33 - 40',
        summary: [
          'Lớp đơn vị gồm 3 hàng: hàng đơn vị, hàng chục, hàng trăm.',
          'Lớp nghìn gồm 3 hàng: hàng nghìn, hàng chục nghìn, hàng trăm nghìn.',
          'Lớp triệu gồm 3 hàng: hàng triệu, hàng chục triệu, hàng trăm triệu.',
          '1 000 000 đọc là Một triệu. 1 000 000 000 đọc là Một tỉ.'
        ],
        keyRules: [
          'Mỗi lớp gồm 3 hàng theo thứ tự từ phải sang trái: đơn vị -> chục -> trăm.',
          'Khi đọc hoặc viết số, ta tách từng lớp (mỗi lớp 3 chữ số) để không bị nhầm!'
        ],
        examples: [
          {
            problem: 'Trong số 531 000 000, các chữ số 5, 3, 1 thuộc lớp nào?',
            solution: 'Thuộc lớp triệu (5 hàng trăm triệu, 3 hàng chục triệu, 1 hàng triệu).'
          }
        ],
        interactiveTool: 'place_value_board'
      },
      {
        id: 8,
        topicId: 3,
        title: 'Bài 13 & 14: Làm tròn số & So sánh số có nhiều chữ số',
        pageRange: 'Trang 45 - 49',
        summary: [
          'Khi làm tròn số đến hàng trăm nghìn: So sánh chữ số hàng chục nghìn với 5. Nếu bé hơn 5 thì làm tròn xuống, nếu bằng hoặc lớn hơn 5 thì làm tròn lên.',
          'So sánh hai số: Số nào có nhiều chữ số hơn thì lớn hơn. Nếu cùng số chữ số thì so sánh từng cặp chữ số ở cùng một hàng kể từ trái sang phải.'
        ],
        keyRules: [
          'Làm tròn đến hàng nào thì quan sát chữ số ở hàng liền sau bên phải của hàng đó.'
        ],
        examples: [
          {
            problem: 'Làm tròn số 2 712 615 đến hàng trăm nghìn.',
            solution: 'Hàng trăm nghìn là 7. Hàng chục nghìn là 1 (1 < 5) -> Làm tròn xuống thành 2 700 000.'
          }
        ]
      },
      {
        id: 9,
        topicId: 3,
        title: 'Bài 15: Dãy số tự nhiên',
        pageRange: 'Trang 50 - 52',
        summary: [
          'Dãy số tự nhiên: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...',
          'Số tự nhiên bé nhất là số 0. Không có số tự nhiên lớn nhất (dãy số tự nhiên kéo dài mãi mãi).',
          'Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.'
        ],
        keyRules: [
          'Số liền trước của n là n - 1 (với n > 0). Số liền sau của n là n + 1.'
        ],
        examples: [
          {
            problem: 'Có số tự nhiên lớn nhất không?',
            solution: 'Không có số tự nhiên lớn nhất vì nếu thêm 1 vào bất kì số nào ta cũng được số lớn hơn.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Chủ đề 4: Một số đơn vị đo đại lượng',
    subtitle: 'Yến, tạ, tấn • dm², m², mm² • Giây, thế kỉ',
    iconName: 'Scale',
    color: 'from-violet-600 to-purple-600',
    bgLight: 'bg-violet-50 text-violet-900 border-violet-200',
    borderLight: 'border-violet-300',
    lessons: [
      {
        id: 10,
        topicId: 4,
        title: 'Bài 17: Yến, tạ, tấn',
        pageRange: 'Trang 56 - 59',
        summary: [
          'Đơn vị đo khối lượng lớn: 1 yến = 10 kg.',
          '1 tạ = 10 yến = 100 kg.',
          '1 tấn = 10 tạ = 1 000 kg.'
        ],
        keyRules: [
          'Thứ tự từ lớn đến bé: Tấn -> Tạ -> Yến -> kg (mỗi đơn vị liên tiếp gấp hoặc kém nhau 10 lần).'
        ],
        examples: [
          {
            problem: '3 tấn 5 tạ = ? tạ; 4 tạ 20 kg = ? kg',
            solution: '3 tấn = 30 tạ, vậy 3 tấn 5 tạ = 35 tạ. 4 tạ = 400 kg, vậy 4 tạ 20 kg = 420 kg.'
          }
        ]
      },
      {
        id: 11,
        topicId: 4,
        title: 'Bài 18: Đề-xi-mét vuông, mét vuông, mi-li-mét vuông',
        pageRange: 'Trang 60 - 65',
        summary: [
          '1 m² = 100 dm²',
          '1 dm² = 100 cm²',
          '1 cm² = 100 mm²',
          '1 m² = 10 000 cm²'
        ],
        keyRules: [
          'Hai đơn vị đo diện tích liền kề gấp hoặc kém nhau 100 lần!'
        ],
        examples: [
          {
            problem: '2 m² 5 dm² = ? dm²',
            solution: '2 m² = 200 dm². Vậy 2 m² 5 dm² = 200 + 5 = 205 dm².'
          }
        ]
      },
      {
        id: 12,
        topicId: 4,
        title: 'Bài 19: Giây, thế kỉ',
        pageRange: 'Trang 66 - 69',
        summary: [
          '1 giờ = 60 phút; 1 phút = 60 giây.',
          '1 thế kỉ = 100 năm.',
          'Từ năm 1 đến năm 100 là thế kỉ I. Từ năm 101 đến năm 200 là thế kỉ II.',
          'Từ năm 1901 đến năm 2000 là thế kỉ XX. Từ năm 2001 đến năm 2100 là thế kỉ XXI.'
        ],
        keyRules: [
          'Mẹo tính thế kỉ: Với năm 4 chữ số (ví dụ 1980), lấy 2 chữ số đầu là 19, cộng 1 -> 20 (Thế kỉ XX). Nếu 2 số cuối là 00 (ví dụ 2000), giữ nguyên -> Thế kỉ XX.'
        ],
        examples: [
          {
            problem: 'Năm 2026 thuộc thế kỉ nào?',
            solution: 'Năm 2026 nằm trong khoảng từ năm 2001 đến năm 2100 nên thuộc thế kỉ XXI (thế kỉ 21).'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Chủ đề 5: Phép cộng và phép trừ',
    subtitle: 'Đặt tính số lớn • Giao hoán & Kết hợp • Tìm hai số biết Tổng và Hiệu',
    iconName: 'PlusCircle',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50 text-rose-900 border-rose-200',
    borderLight: 'border-rose-300',
    lessons: [
      {
        id: 13,
        topicId: 5,
        title: 'Bài 22 & 23: Phép cộng & phép trừ các số có nhiều chữ số',
        pageRange: 'Trang 76 - 81',
        summary: [
          'Đặt tính thẳng cột: hàng đơn vị thẳng hàng đơn vị, chục thẳng chục, trăm thẳng trăm...',
          'Thực hiện tính từ phải sang trái.',
          'Cộng có nhớ: Nhớ sang hàng tiếp theo bên trái. Trừ có nhớ: Nhớ 1 vào số trừ của hàng liền kề bên trái.'
        ],
        keyRules: [
          'Luôn cộng thêm phần nhớ vào hàng tiếp theo!'
        ],
        examples: [
          {
            problem: 'Đặt tính và tính: 327 456 + 190 835',
            solution: '6 + 5 = 11 viết 1 nhớ 1; 5 + 3 + 1 = 9; 4 + 8 = 12 viết 2 nhớ 1; 7 + 0 + 1 = 8; 2 + 9 = 11 viết 1 nhớ 1; 3 + 1 + 1 = 5. Kết quả = 518 291.'
          }
        ]
      },
      {
        id: 14,
        topicId: 5,
        title: 'Bài 24: Tính chất giao hoán và kết hợp của phép cộng',
        pageRange: 'Trang 82 - 85',
        summary: [
          'Tính chất giao hoán: a + b = b + a (khi đổi chỗ các số hạng thì tổng không thay đổi).',
          'Tính chất kết hợp: (a + b) + c = a + (b + c) (khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba).',
          'Áp dụng tính bằng cách thuận tiện: Nhóm các số có tổng là số tròn chục, tròn trăm, tròn nghìn.'
        ],
        keyRules: [
          '30 + 89 + 70 = (30 + 70) + 89 = 100 + 89 = 189.'
        ],
        examples: [
          {
            problem: 'Tính thuận tiện: 68 + 207 + 3',
            solution: '= (207 + 3) + 68 = 210 + 68 = 278.'
          }
        ]
      },
      {
        id: 15,
        topicId: 5,
        title: 'Bài 25: Tìm hai số khi biết Tổng và Hiệu của hai số đó',
        pageRange: 'Trang 86 - 88',
        summary: [
          'Đây là dạng toán quan trọng nhất học kì 1 lớp 4!',
          'Cách 1: Tìm số bé trước: Số bé = (Tổng - Hiệu) : 2 -> Số lớn = Số bé + Hiệu.',
          'Cách 2: Tìm số lớn trước: Số lớn = (Tổng + Hiệu) : 2 -> Số bé = Số lớn - Hiệu.'
        ],
        keyRules: [
          'Số bé = (Tổng - Hiệu) : 2',
          'Số lớn = (Tổng + Hiệu) : 2'
        ],
        examples: [
          {
            problem: 'Hai bạn Mai và Mi có tất cả 25 cái kẹo. Mai có nhiều hơn Mi 5 cái kẹo. Hỏi mỗi bạn có mấy cái kẹo?',
            solution: 'Tổng = 25, Hiệu = 5. Số kẹo của Mi (số bé) = (25 - 5) : 2 = 10 cái. Số kẹo của Mai (số lớn) = 10 + 5 = 15 cái.'
          }
        ],
        interactiveTool: 'sum_diff_solver'
      }
    ]
  },
  {
    id: 6,
    title: 'Chủ đề 6: Đường thẳng vuông góc, song song',
    subtitle: 'Vuông góc • Song song • Hình bình hành • Hình thoi',
    iconName: 'Shapes',
    color: 'from-cyan-600 to-blue-500',
    bgLight: 'bg-cyan-50 text-cyan-900 border-cyan-200',
    borderLight: 'border-cyan-300',
    lessons: [
      {
        id: 16,
        topicId: 6,
        title: 'Bài 27 & 29: Hai đường thẳng vuông góc & song song',
        pageRange: 'Trang 91 - 100',
        summary: [
          'Hai đường thẳng vuông góc tạo thành bốn góc vuông có chung một đỉnh. Dùng ê ke để kiểm tra hoặc vẽ.',
          'Hai đường thẳng song song không bao giờ cắt nhau dù kéo dài mãi về hai phía.'
        ],
        keyRules: [
          'Hai mép đối diện của cuốn sách giáo khoa là hình ảnh của hai đường thẳng song song.'
        ],
        examples: [
          {
            problem: 'Trong hình chữ nhật ABCD, hai cạnh nào vuông góc với nhau?',
            solution: 'Cạnh AB vuông góc với AD và BC; Cạnh CD vuông góc với AD và BC.'
          }
        ]
      },
      {
        id: 17,
        topicId: 6,
        title: 'Bài 31: Hình bình hành và Hình thoi',
        pageRange: 'Trang 105 - 110',
        summary: [
          'Hình bình hành có: hai cặp cạnh đối diện song song và bằng nhau.',
          'Hình thoi có: hai cặp cạnh đối diện song song và bốn cạnh bằng nhau. Hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường.'
        ],
        keyRules: [
          'Hình bình hành: AB // CD, AD // BC; AB = CD, AD = BC.',
          'Hình thoi: AB // CD, AD // BC; AB = BC = CD = DA; AC vuông góc BD.'
        ],
        examples: [
          {
            problem: 'Hình thoi ABCD có cạnh AB = 4 cm. Tính độ dài các cạnh còn lại.',
            solution: 'Vì hình thoi có 4 cạnh bằng nhau nên BC = CD = DA = 4 cm.'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Chủ đề 7: Ôn tập học kì 1',
    subtitle: 'Tổng hợp kiến thức toàn diện • Thi thử học kì 1',
    iconName: 'Award',
    color: 'from-amber-600 to-red-500',
    bgLight: 'bg-amber-50 text-amber-900 border-amber-200',
    borderLight: 'border-amber-300',
    lessons: [
      {
        id: 18,
        topicId: 7,
        title: 'Bài 33 - 37: Tổng ôn tập Học kì 1',
        pageRange: 'Trang 114 - 131',
        summary: [
          'Ôn tập đọc, viết, cấu tạo các số đến lớp triệu.',
          'Ôn tập phép cộng, phép trừ có nhớ và bài toán tìm hai số biết Tổng và Hiệu.',
          'Ôn tập nhận biết các loại góc (nhọn, vuông, tù, bẹt), đường thẳng vuông góc, song song, hình thoi, hình bình hành.',
          'Ôn tập bảng đơn vị đo khối lượng (yến, tạ, tấn), diện tích (dm², m², mm²) và thời gian (giây, thế kỉ).'
        ],
        keyRules: [
          'Luyện tập đề thi thử 10 câu để rèn tốc độ và nắm chắc điểm 10 kì 1!'
        ],
        examples: [
          {
            problem: 'Một thửa ruộng hình chữ nhật có nửa chu vi là 120 m, chiều dài hơn chiều rộng 20 m. Tính diện tích thửa ruộng.',
            solution: 'Nửa chu vi chính là Tổng = 120 m. Hiệu = 20 m. Chiều dài = (120 + 20) : 2 = 70 m. Chiều rộng = 70 - 20 = 50 m. Diện tích = 70 x 50 = 3500 m².'
          }
        ]
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ================= CHỦ ĐỀ 1 =================
  {
    id: 'q1_1',
    topicId: 1,
    lessonId: 1,
    question: 'Số "Bốn mươi hai nghìn năm trăm ba mươi" được viết là:',
    options: [
      { id: 'a', text: '42 530', isCorrect: true },
      { id: 'b', text: '42 053', isCorrect: false },
      { id: 'c', text: '40 253', isCorrect: false },
      { id: 'd', text: '42 503', isCorrect: false }
    ],
    explanation: 'Bốn mươi hai nghìn (42 nghìn), năm trăm (5 trăm), ba mươi (3 chục, 0 đơn vị) -> 42 530.',
    hint: 'Gồm 4 chục nghìn, 2 nghìn, 5 trăm và 3 chục.',
    difficulty: 'easy'
  },
  {
    id: 'q1_2',
    topicId: 1,
    lessonId: 1,
    question: 'Số thích hợp điền vào dấu ? trong biểu thức: 86 209 = 80 000 + 6 000 + ? + 9 là:',
    options: [
      { id: 'a', text: '20', isCorrect: false },
      { id: 'b', text: '200', isCorrect: true },
      { id: 'c', text: '2 000', isCorrect: false },
      { id: 'd', text: '2', isCorrect: false }
    ],
    explanation: 'Chữ số 2 đứng ở hàng trăm, có giá trị là 200.',
    hint: 'Xem chữ số 2 nằm ở hàng nào nhé bé!',
    difficulty: 'easy'
  },
  {
    id: 'q1_3',
    topicId: 1,
    lessonId: 2,
    question: 'Trong các số sau, dãy số nào gồm toàn các SỐ CHẴN?',
    options: [
      { id: 'a', text: '12, 108, 194, 656, 72', isCorrect: true },
      { id: 'b', text: '12, 315, 108, 71, 194', isCorrect: false },
      { id: 'c', text: '649, 113, 107, 315', isCorrect: false },
      { id: 'd', text: '72, 108, 113, 656', isCorrect: false }
    ],
    explanation: 'Các số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8. Các số 12, 108, 194, 656, 72 đều có tận cùng chẵn.',
    hint: 'Số chẵn có chữ số cuối là 0, 2, 4, 6 hoặc 8.',
    difficulty: 'easy'
  },
  {
    id: 'q1_4',
    topicId: 1,
    lessonId: 2,
    question: 'Số liền trước của một số lẻ luôn là:',
    options: [
      { id: 'a', text: 'Một số lẻ', isCorrect: false },
      { id: 'b', text: 'Một số chẵn', isCorrect: true },
      { id: 'c', text: 'Có thể là số chẵn hoặc số lẻ', isCorrect: false },
      { id: 'd', text: 'Không xác định được', isCorrect: false }
    ],
    explanation: 'Trong dãy số tự nhiên, các số chẵn và số lẻ xen kẽ nhau. Liền trước số lẻ (ví dụ 7) là số chẵn (6).',
    hint: 'Thử lấy ví dụ số 5: số liền trước là số 4.',
    difficulty: 'easy'
  },
  {
    id: 'q1_5',
    topicId: 1,
    lessonId: 3,
    question: 'Tính giá trị của biểu thức (a + b) x 2 với a = 15 cm, b = 27 cm:',
    options: [
      { id: 'a', text: '42 cm', isCorrect: false },
      { id: 'b', text: '69 cm', isCorrect: false },
      { id: 'c', text: '84 cm', isCorrect: true },
      { id: 'd', text: '54 cm', isCorrect: false }
    ],
    explanation: 'Thay a = 15, b = 27 vào biểu thức: (15 + 27) x 2 = 42 x 2 = 84 cm.',
    hint: 'Tính tổng trong ngoặc trước rồi nhân 2.',
    difficulty: 'medium'
  },
  {
    id: 'q1_6',
    topicId: 1,
    lessonId: 4,
    question: 'Mai mua 5 quyển vở, mỗi quyển 8 000 đồng và 2 hộp bút màu, mỗi hộp 25 000 đồng. Mai phải trả tất cả bao nhiêu tiền?',
    options: [
      { id: 'a', text: '33 000 đồng', isCorrect: false },
      { id: 'b', text: '65 000 đồng', isCorrect: false },
      { id: 'c', text: '90 000 đồng', isCorrect: true },
      { id: 'd', text: '80 000 đồng', isCorrect: false }
    ],
    explanation: 'Tiền mua vở: 5 x 8 000 = 40 000 đồng. Tiền mua bút màu: 2 x 25 000 = 50 000 đồng. Tổng: 40 000 + 50 000 = 90 000 đồng.',
    hint: 'Tính tiền mua vở trước rồi cộng tiền bút màu.',
    difficulty: 'medium'
  },

  // ================= CHỦ ĐỀ 2 =================
  {
    id: 'q2_1',
    topicId: 2,
    lessonId: 5,
    question: 'Đơn vị đo góc thông dụng là gì và kí hiệu như thế nào?',
    diagramType: 'angle',
    diagramData: { degrees: 60, note: 'Góc 60 độ (°)' },
    options: [
      { id: 'a', text: 'Mét (m)', isCorrect: false },
      { id: 'b', text: 'Độ (°)', isCorrect: true },
      { id: 'c', text: 'Gam (g)', isCorrect: false },
      { id: 'd', text: 'Lít (l)', isCorrect: false }
    ],
    explanation: 'Độ là đơn vị đo góc, kí hiệu là dấu tròn nhỏ trên đầu bên phải (°). Ví dụ: 60°.',
    hint: 'Kí hiệu tròn nhỏ trên đầu chữ số.',
    difficulty: 'easy'
  },
  {
    id: 'q2_2',
    topicId: 2,
    lessonId: 6,
    question: 'Góc có số đo lớn hơn góc vuông nhưng bé hơn góc bẹt được gọi là:',
    diagramType: 'angle',
    diagramData: { degrees: 120, note: 'Góc 120° lớn hơn góc vuông 90°' },
    options: [
      { id: 'a', text: 'Góc nhọn', isCorrect: false },
      { id: 'b', text: 'Góc tù', isCorrect: true },
      { id: 'c', text: 'Góc bẹt', isCorrect: false },
      { id: 'd', text: 'Góc tròn', isCorrect: false }
    ],
    explanation: 'Góc tù có số đo lớn hơn 90° (góc vuông) và bé hơn 180° (góc bẹt).',
    hint: 'Góc mở rộng hơn góc vuông nhưng chưa duỗi thẳng.',
    difficulty: 'easy'
  },
  {
    id: 'q2_3',
    topicId: 2,
    lessonId: 6,
    question: 'Quan sát đồng hồ dưới đây chỉ đúng 6 giờ. Hai kim đồng hồ tạo thành góc gì?',
    diagramType: 'clock',
    diagramData: { hour: 6, minute: 0, caption: 'Đồng hồ chỉ đúng 6 giờ', showAngleArc: true },
    options: [
      { id: 'a', text: 'Góc vuông (90°)', isCorrect: false },
      { id: 'b', text: 'Góc tù', isCorrect: false },
      { id: 'c', text: 'Góc bẹt (180°)', isCorrect: true },
      { id: 'd', text: 'Góc nhọn', isCorrect: false }
    ],
    explanation: 'Lúc 6 giờ, kim dài chỉ số 12 và kim ngắn chỉ số 6, tạo thành một đường thẳng dài có số đo 180°, chính là góc bẹt.',
    hint: 'Hai kim tạo thành một đường thẳng tắp thẳng đứng.',
    difficulty: 'medium'
  },
  {
    id: 'q2_4',
    topicId: 2,
    lessonId: 6,
    question: 'Đồng hồ dưới đây chỉ đúng 3 giờ. Hai kim đồng hồ tạo thành góc gì?',
    diagramType: 'clock',
    diagramData: { hour: 3, minute: 0, caption: 'Đồng hồ chỉ đúng 3 giờ' },
    options: [
      { id: 'a', text: 'Góc vuông (90°)', isCorrect: true },
      { id: 'b', text: 'Góc nhọn', isCorrect: false },
      { id: 'c', text: 'Góc tù', isCorrect: false },
      { id: 'd', text: 'Góc bẹt', isCorrect: false }
    ],
    explanation: 'Lúc 3 giờ, kim phút chỉ số 12 và kim giờ chỉ số 3, hai kim vuông góc với nhau và tạo thành góc vuông 90°.',
    hint: 'Dùng ê-ke đo vừa khít góc 3 giờ.',
    difficulty: 'easy'
  },
  {
    id: 'q2_5',
    topicId: 2,
    lessonId: 6,
    question: 'Góc có số đo 35° trong hình dưới đây là góc gì?',
    diagramType: 'angle',
    diagramData: { degrees: 35, note: 'Góc 35° bé hơn góc vuông' },
    options: [
      { id: 'a', text: 'Góc nhọn', isCorrect: true },
      { id: 'b', text: 'Góc vuông', isCorrect: false },
      { id: 'c', text: 'Góc tù', isCorrect: false },
      { id: 'd', text: 'Góc bẹt', isCorrect: false }
    ],
    explanation: 'Góc nhọn có số đo lớn hơn 0° và bé hơn 90°. 35° < 90° nên là góc nhọn.',
    hint: 'Góc nhọn bé hơn góc vuông 90°.',
    difficulty: 'easy'
  },

  // ================= CHỦ ĐỀ 3 =================
  {
    id: 'q3_1',
    topicId: 3,
    lessonId: 7,
    question: 'Lớp nghìn của số 514 293 gồm những chữ số nào?',
    diagramType: 'place_value',
    diagramData: { value: 514293, labels: ['Lớp nghìn: 514', 'Lớp đơn vị: 293'] },
    options: [
      { id: 'a', text: '2, 9, 3', isCorrect: false },
      { id: 'b', text: '5, 1, 4', isCorrect: true },
      { id: 'c', text: '5, 1, 2', isCorrect: false },
      { id: 'd', text: '1, 4, 2', isCorrect: false }
    ],
    explanation: 'Số 514 293 có lớp đơn vị là 293 và lớp nghìn là 514 (gồm hàng trăm nghìn 5, hàng chục nghìn 1, hàng nghìn 4).',
    hint: 'Lớp nghìn đứng trước 3 chữ số cuối cùng.',
    difficulty: 'easy'
  },
  {
    id: 'q3_2',
    topicId: 3,
    lessonId: 7,
    question: 'Chữ số 7 trong số 870 415 có giá trị là bao nhiêu?',
    options: [
      { id: 'a', text: '7 000', isCorrect: false },
      { id: 'b', text: '70 000', isCorrect: true },
      { id: 'c', text: '700 000', isCorrect: false },
      { id: 'd', text: '700', isCorrect: false }
    ],
    explanation: 'Chữ số 7 thuộc hàng chục nghìn nên có giá trị là 70 000 (bảy mươi nghìn).',
    hint: 'Chữ số 7 nằm ở hàng chục nghìn.',
    difficulty: 'easy'
  },
  {
    id: 'q3_3',
    topicId: 3,
    lessonId: 8,
    question: 'Khi làm tròn số 3 272 353 đến hàng TRĂM NGHÌN, ta được số nào?',
    options: [
      { id: 'a', text: '3 200 000', isCorrect: false },
      { id: 'b', text: '3 300 000', isCorrect: true },
      { id: 'c', text: '3 270 000', isCorrect: false },
      { id: 'd', text: '3 280 000', isCorrect: false }
    ],
    explanation: 'Hàng trăm nghìn là 2. Chữ số hàng chục nghìn liền sau là 7 (7 ≥ 5) nên làm tròn lên: 3 300 000.',
    hint: 'Hàng chục nghìn là 7 (lớn hơn 5) nên làm tròn lên.',
    difficulty: 'medium'
  },
  {
    id: 'q3_4',
    topicId: 3,
    lessonId: 8,
    question: 'Điền dấu so sánh thích hợp: 37 338 449 ... 37 839 449',
    options: [
      { id: 'a', text: '<', isCorrect: true },
      { id: 'b', text: '>', isCorrect: false },
      { id: 'c', text: '=', isCorrect: false }
    ],
    explanation: 'Cùng có 8 chữ số. So sánh chữ số ở hàng trăm nghìn: 3 < 8, vậy 37 338 449 < 37 839 449.',
    hint: 'So sánh chữ số hàng trăm nghìn: 3 và 8.',
    difficulty: 'easy'
  },
  {
    id: 'q3_5',
    topicId: 3,
    lessonId: 9,
    question: 'Phát biểu nào sau đây là ĐÚNG về dãy số tự nhiên?',
    options: [
      { id: 'a', text: 'Số 1 là số tự nhiên bé nhất', isCorrect: false },
      { id: 'b', text: 'Số 1 000 000 000 là số tự nhiên lớn nhất', isCorrect: false },
      { id: 'c', text: 'Số 0 là số tự nhiên bé nhất và không có số tự nhiên lớn nhất', isCorrect: true },
      { id: 'd', text: 'Dãy số tự nhiên bắt đầu từ số 1', isCorrect: false }
    ],
    explanation: 'Số tự nhiên bé nhất là 0. Dãy số tự nhiên không có số lớn nhất vì luôn có thể cộng thêm 1.',
    hint: 'Số tự nhiên bắt đầu từ số 0.',
    difficulty: 'easy'
  },

  // ================= CHỦ ĐỀ 4 =================
  {
    id: 'q4_1',
    topicId: 4,
    lessonId: 10,
    question: '3 tấn 5 tạ đổi ra ki-lô-gam (kg) bằng bao nhiêu?',
    diagramType: 'weights',
    options: [
      { id: 'a', text: '350 kg', isCorrect: false },
      { id: 'b', text: '3 500 kg', isCorrect: true },
      { id: 'c', text: '35 000 kg', isCorrect: false },
      { id: 'd', text: '305 kg', isCorrect: false }
    ],
    explanation: '3 tấn = 3 000 kg. 5 tạ = 500 kg. 3 000 + 500 = 3 500 kg.',
    hint: '1 tấn = 1 000 kg; 1 tạ = 100 kg.',
    difficulty: 'easy'
  },
  {
    id: 'q4_2',
    topicId: 4,
    lessonId: 10,
    question: 'Một con voi nặng 1 tấn 200 kg. Con voi đó nặng bao nhiêu yến?',
    diagramType: 'weights',
    options: [
      { id: 'a', text: '12 yến', isCorrect: false },
      { id: 'b', text: '120 yến', isCorrect: true },
      { id: 'c', text: '1 200 yến', isCorrect: false },
      { id: 'd', text: '102 yến', isCorrect: false }
    ],
    explanation: '1 tấn 200 kg = 1 200 kg. 1 yến = 10 kg nên 1 200 : 10 = 120 yến.',
    hint: 'Đổi hết sang kg (1 200 kg) rồi chia cho 10.',
    difficulty: 'medium'
  },
  {
    id: 'q4_3',
    topicId: 4,
    lessonId: 11,
    question: 'Điền số thích hợp: 4 m² 20 dm² = ... dm²',
    options: [
      { id: 'a', text: '42 dm²', isCorrect: false },
      { id: 'b', text: '420 dm²', isCorrect: true },
      { id: 'c', text: '4 020 dm²', isCorrect: false },
      { id: 'd', text: '402 dm²', isCorrect: false }
    ],
    explanation: '1 m² = 100 dm² nên 4 m² = 400 dm². 400 + 20 = 420 dm².',
    hint: '1 m² bằng 100 dm².',
    difficulty: 'easy'
  },
  {
    id: 'q4_4',
    topicId: 4,
    lessonId: 12,
    question: 'Chiến thắng Bạch Đằng của Ngô Quyền diễn ra năm 938. Năm đó thuộc thế kỉ nào?',
    options: [
      { id: 'a', text: 'Thế kỉ IX (thế kỉ 9)', isCorrect: false },
      { id: 'b', text: 'Thế kỉ X (thế kỉ 10)', isCorrect: true },
      { id: 'c', text: 'Thế kỉ XI (thế kỉ 11)', isCorrect: false },
      { id: 'd', text: 'Thế kỉ VIII (thế kỉ 8)', isCorrect: false }
    ],
    explanation: 'Từ năm 901 đến năm 1000 là thế kỉ thứ X (thế kỉ 10). Năm 938 thuộc thế kỉ X.',
    hint: 'Nằm trong khoảng từ 901 đến 1000.',
    difficulty: 'medium'
  },
  {
    id: 'q4_5',
    topicId: 4,
    lessonId: 12,
    question: 'Nam chạy một vòng quanh sân hết 2 phút 15 giây. Hỏi Nam chạy hết bao nhiêu giây?',
    options: [
      { id: 'a', text: '135 giây', isCorrect: true },
      { id: 'b', text: '215 giây', isCorrect: false },
      { id: 'c', text: '125 giây', isCorrect: false },
      { id: 'd', text: '75 giây', isCorrect: false }
    ],
    explanation: '1 phút = 60 giây. 2 phút = 120 giây. 120 + 15 = 135 giây.',
    hint: '2 x 60 + 15 = ?',
    difficulty: 'easy'
  },

  // ================= CHỦ ĐỀ 5 =================
  {
    id: 'q5_1',
    topicId: 5,
    lessonId: 13,
    question: 'Kết quả của phép tính 438 589 - 235 072 là:',
    options: [
      { id: 'a', text: '203 517', isCorrect: true },
      { id: 'b', text: '203 507', isCorrect: false },
      { id: 'c', text: '103 517', isCorrect: false },
      { id: 'd', text: '203 417', isCorrect: false }
    ],
    explanation: 'Trừ từng hàng từ phải sang trái: 9-2=7; 8-7=1; 5-0=5; 8-5=3; 3-3=0; 4-2=2 -> 203 517.',
    hint: 'Trừ thẳng cột từ phải sang trái.',
    difficulty: 'easy'
  },
  {
    id: 'q5_2',
    topicId: 5,
    lessonId: 14,
    question: 'Tính giá trị biểu thức bằng cách thuận tiện nhất: 372 + 290 + 10 + 28',
    options: [
      { id: 'a', text: '700', isCorrect: true },
      { id: 'b', text: '690', isCorrect: false },
      { id: 'c', text: '710', isCorrect: false },
      { id: 'd', text: '680', isCorrect: false }
    ],
    explanation: 'Nhóm: (372 + 28) + (290 + 10) = 400 + 300 = 700.',
    hint: 'Ghép cặp tròn trăm: (372 + 28) và (290 + 10).',
    difficulty: 'medium'
  },
  {
    id: 'q5_3',
    topicId: 5,
    lessonId: 15,
    question: 'Hai bạn Mai và Mi có tổng cộng 40 chiếc bút chì. Biết Mai có nhiều hơn Mi 10 chiếc. Hỏi Mai có bao nhiêu chiếc bút chì?',
    diagramType: 'tape_diagram',
    diagramData: { smallLabel: 'Mi (Số bé)', largeLabel: 'Mai (Số lớn)', diffVal: 10, totalVal: 40, unit: 'chiếc' },
    options: [
      { id: 'a', text: '15 chiếc', isCorrect: false },
      { id: 'b', text: '25 chiếc', isCorrect: true },
      { id: 'c', text: '30 chiếc', isCorrect: false },
      { id: 'd', text: '20 chiếc', isCorrect: false }
    ],
    explanation: 'Mai là Số lớn = (Tổng + Hiệu) : 2 = (40 + 10) : 2 = 50 : 2 = 25 chiếc.',
    hint: 'Số lớn = (Tổng + Hiệu) : 2.',
    difficulty: 'medium'
  },
  {
    id: 'q5_4',
    topicId: 5,
    lessonId: 15,
    question: 'Một hình chữ nhật có nửa chu vi là 36 cm, chiều dài hơn chiều rộng 8 cm. Chiều rộng của hình chữ nhật là:',
    diagramType: 'tape_diagram',
    diagramData: { smallLabel: 'Chiều rộng', largeLabel: 'Chiều dài', diffVal: 8, totalVal: 36, unit: 'cm' },
    options: [
      { id: 'a', text: '22 cm', isCorrect: false },
      { id: 'b', text: '14 cm', isCorrect: true },
      { id: 'c', text: '18 cm', isCorrect: false },
      { id: 'd', text: '16 cm', isCorrect: false }
    ],
    explanation: 'Nửa chu vi là Tổng = 36 cm. Chiều rộng là số bé = (36 - 8) : 2 = 28 : 2 = 14 cm.',
    hint: 'Số bé = (Tổng - Hiệu) : 2.',
    difficulty: 'hard'
  },

  // ================= CHỦ ĐỀ 6 =================
  {
    id: 'q6_1',
    topicId: 6,
    lessonId: 16,
    question: 'Đặc điểm của hai đường thẳng song song trong hình dưới đây là:',
    diagramType: 'shapes',
    diagramData: { shape: 'parallel_lines' },
    options: [
      { id: 'a', text: 'Cắt nhau tại 1 điểm', isCorrect: false },
      { id: 'b', text: 'Không bao giờ cắt nhau dù kéo dài mãi', isCorrect: true },
      { id: 'c', text: 'Tạo thành 4 góc vuông', isCorrect: false },
      { id: 'd', text: 'Luôn có độ dài bằng nhau', isCorrect: false }
    ],
    explanation: 'Hai đường thẳng song song không bao giờ cắt nhau dù kéo dài mãi về cả hai phía.',
    hint: 'Giống hai thanh ray tàu hỏa.',
    difficulty: 'easy'
  },
  {
    id: 'q6_2',
    topicId: 6,
    lessonId: 16,
    question: 'Để kiểm tra xem hai đường thẳng có vuông góc với nhau hay không, ta thường dùng thước gì?',
    options: [
      { id: 'a', text: 'Thước kẻ thẳng', isCorrect: false },
      { id: 'b', text: 'Thước ê-ke', isCorrect: true },
      { id: 'c', text: 'Com-pa', isCorrect: false },
      { id: 'd', text: 'Thước dây', isCorrect: false }
    ],
    explanation: 'Thước ê-ke có một góc vuông chuẩn, dùng để đo và kiểm tra góc vuông hoặc vẽ đường vuông góc.',
    hint: 'Chiếc thước hình tam giác có 1 góc vuông.',
    difficulty: 'easy'
  },
  {
    id: 'q6_3',
    topicId: 6,
    lessonId: 17,
    question: 'Hình nào dưới đây có bốn cạnh bằng nhau và hai đường chéo vuông góc với nhau?',
    diagramType: 'shapes',
    diagramData: { shape: 'rhombus' },
    options: [
      { id: 'a', text: 'Hình bình hành', isCorrect: false },
      { id: 'b', text: 'Hình thoi', isCorrect: true },
      { id: 'c', text: 'Hình chữ nhật', isCorrect: false },
      { id: 'd', text: 'Hình thang', isCorrect: false }
    ],
    explanation: 'Hình thoi có 4 cạnh bằng nhau, 2 cặp cạnh đối diện song song và 2 đường chéo vuông góc tại trung điểm.',
    hint: 'Bốn cạnh đều bằng nhau, trông như viên kim cương.',
    difficulty: 'easy'
  },
  {
    id: 'q6_4',
    topicId: 6,
    lessonId: 17,
    question: 'Hình bình hành ABCD dưới đây có đặc điểm nào?',
    diagramType: 'shapes',
    diagramData: { shape: 'parallelogram' },
    options: [
      { id: 'a', text: 'Có bốn góc vuông', isCorrect: false },
      { id: 'b', text: 'Có hai cặp cạnh đối diện song song và bằng nhau', isCorrect: true },
      { id: 'c', text: 'Có bốn cạnh bằng nhau', isCorrect: false },
      { id: 'd', text: 'Không có cặp cạnh nào song song', isCorrect: false }
    ],
    explanation: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau: AB = CD, AD = BC; AB // CD, AD // BC.',
    hint: 'Hai cặp cạnh đối diện song song và bằng nhau.',
    difficulty: 'medium'
  },

  // ================= CHỦ ĐỀ 7 =================
  {
    id: 'q7_1',
    topicId: 7,
    lessonId: 18,
    question: 'Số "Ba mươi lăm triệu tám trăm nghìn" có bao nhiêu chữ số 0?',
    diagramType: 'place_value',
    diagramData: { value: 35800000, labels: ['Lớp triệu: 35', 'Lớp nghìn: 800', 'Lớp đơn vị: 000'] },
    options: [
      { id: 'a', text: '4 chữ số 0', isCorrect: false },
      { id: 'b', text: '5 chữ số 0', isCorrect: true },
      { id: 'c', text: '6 chữ số 0', isCorrect: false },
      { id: 'd', text: '7 chữ số 0', isCorrect: false }
    ],
    explanation: 'Số đó viết là 35 800 000, có tất cả 5 chữ số 0.',
    hint: 'Viết số ra nháp: 35 800 000 rồi đếm.',
    difficulty: 'medium'
  },
  {
    id: 'q7_2',
    topicId: 7,
    lessonId: 18,
    question: 'Một lớp học có 32 học sinh, số học sinh nữ nhiều hơn số học sinh nam là 4 bạn. Số học sinh nữ của lớp là:',
    diagramType: 'tape_diagram',
    diagramData: { smallLabel: 'Nam (Số bé)', largeLabel: 'Nữ (Số lớn)', diffVal: 4, totalVal: 32, unit: 'bạn' },
    options: [
      { id: 'a', text: '14 bạn', isCorrect: false },
      { id: 'b', text: '18 bạn', isCorrect: true },
      { id: 'c', text: '20 bạn', isCorrect: false },
      { id: 'd', text: '16 bạn', isCorrect: false }
    ],
    explanation: 'Số học sinh nữ (số lớn) = (Tổng + Hiệu) : 2 = (32 + 4) : 2 = 36 : 2 = 18 bạn.',
    hint: 'Số lớn = (Tổng + Hiệu) : 2.',
    difficulty: 'medium'
  },
  {
    id: 'q7_3',
    topicId: 7,
    lessonId: 18,
    question: 'Mảnh vườn hình chữ nhật có chu vi 80 m, chiều dài hơn chiều rộng 10 m. Diện tích mảnh vườn đó là:',
    options: [
      { id: 'a', text: '375 m²', isCorrect: true },
      { id: 'b', text: '700 m²', isCorrect: false },
      { id: 'c', text: '400 m²', isCorrect: false },
      { id: 'd', text: '350 m²', isCorrect: false }
    ],
    explanation: 'Nửa chu vi: 80 : 2 = 40 m. Chiều dài: (40 + 10) : 2 = 25 m. Chiều rộng: 40 - 25 = 15 m. Diện tích = 25 x 15 = 375 m².',
    hint: 'Tìm nửa chu vi trước (40 m), sau đó tìm dài và rộng, rồi nhân lại.',
    difficulty: 'hard'
  },
  {
    id: 'q7_4',
    topicId: 7,
    lessonId: 18,
    question: 'Bác Ba chở 2 tấn 4 tạ thóc đi xay. Đổi khối lượng thóc đó sang yến là:',
    diagramType: 'weights',
    options: [
      { id: 'a', text: '24 yến', isCorrect: false },
      { id: 'b', text: '240 yến', isCorrect: true },
      { id: 'c', text: '2 400 yến', isCorrect: false },
      { id: 'd', text: '204 yến', isCorrect: false }
    ],
    explanation: '2 tấn = 200 yến; 4 tạ = 40 yến. Tổng cộng: 200 + 40 = 240 yến.',
    hint: '1 tấn = 100 yến; 1 tạ = 10 yến.',
    difficulty: 'medium'
  },
  {
    id: 'q7_5',
    topicId: 7,
    lessonId: 18,
    question: 'Hình nào dưới đây có hai đường chéo cắt nhau tại trung điểm của mỗi đường và vuông góc với nhau?',
    diagramType: 'shapes',
    diagramData: { shape: 'rhombus' },
    options: [
      { id: 'a', text: 'Hình chữ nhật', isCorrect: false },
      { id: 'b', text: 'Hình thoi', isCorrect: true },
      { id: 'c', text: 'Hình bình hành không đều', isCorrect: false },
      { id: 'd', text: 'Hình thang vuông', isCorrect: false }
    ],
    explanation: 'Hình thoi có hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường.',
    hint: 'Hình có bốn cạnh bằng nhau.',
    difficulty: 'medium'
  },
  {
    id: 'q7_6',
    topicId: 7,
    lessonId: 18,
    question: 'Giá trị biểu thức: 26 000 + 9 015 x 6 là:',
    options: [
      { id: 'a', text: '80 090', isCorrect: true },
      { id: 'b', text: '79 090', isCorrect: false },
      { id: 'c', text: '210 090', isCorrect: false },
      { id: 'd', text: '54 090', isCorrect: false }
    ],
    explanation: 'Nhân trước: 9 015 x 6 = 54 090. Sau đó cộng: 26 000 + 54 090 = 80 090.',
    hint: 'Nhân trước cộng sau!',
    difficulty: 'medium'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first_quiz',
    title: 'Khởi Đầu Tự Hào',
    description: 'Hoàn thành bài trắc nghiệm toán đầu tiên',
    icon: '🎯',
    category: 'quiz'
  },
  {
    id: 'perfect_10',
    title: 'Thần Đồng Điểm 10',
    description: 'Đạt điểm số tuyệt đối 100% trong một bài kiểm tra',
    icon: '🌟',
    category: 'quiz'
  },
  {
    id: 'streak_3',
    title: 'Chăm Chỉ Như Robot',
    description: 'Học tập 3 ngày liên tiếp không nghỉ',
    icon: '🔥',
    category: 'streak'
  },
  {
    id: 'master_angles',
    title: 'Bậc Thầy Góc Học',
    description: 'Nắm vững phân biệt góc nhọn, tù, bẹt và đơn vị đo góc',
    icon: '📐',
    category: 'mastery'
  },
  {
    id: 'master_sum_diff',
    title: 'Chiến Thần Tổng - Hiệu',
    description: 'Giải xuất sắc dạng toán tìm hai số khi biết Tổng và Hiệu',
    icon: '🧠',
    category: 'mastery'
  },
  {
    id: 'master_measures',
    title: 'Chuyên Gia Đo Lường',
    description: 'Thành thạo chuyển đổi yến tạ tấn, m² dm² mm² và thế kỉ',
    icon: '⚖️',
    category: 'mastery'
  },
  {
    id: 'game_champion',
    title: 'Quán Quân Trò Chơi',
    description: 'Đạt trên 100 điểm trong trò chơi Toán học',
    icon: '🏆',
    category: 'game'
  }
];
