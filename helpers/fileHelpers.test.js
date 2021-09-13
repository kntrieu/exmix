const extractQuestionsFromFile = require('./fileHelpers');
const questionNoAnswer = 'Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào thời gian nào?\n';
const oneQuestionArray = `
    Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào thời gian nào?\n
    Mùa xuân năm 39.\n
    Mùa xuân năm 41.\n
    Mùa xuân năm 40.\n
    Mùa xuân năm 42.[d]\n
`;
const twoQuestionsArray = `
    Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào thời gian nào?\n
    Mùa xuân năm 39.\n
    Mùa xuân năm 41.\n
    Mùa xuân năm 40.\n
    Mùa xuân năm 42.[d]\n
    [br]
    Để không bị phát hiện khi thua trận chạy về Tô Định đã làm gì?\n
    Cạo râu.\n
    Chui vào ống cống.\n
    Cắt tóc.[d]\n
    Cắt tóc, cạo râu.\n
`;

const oneAnswer = `
    Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào thời gian nào?\n
    Mùa xuân năm 39.\n
`;

const noCorrectAnswer = `
Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào thời gian nào?\n
Mùa xuân năm 39.\n
Mùa xuân năm 41.\n
Mùa xuân năm 40.\n
Mùa xuân năm 42.\n
`;

test('Return [] when missing parameter / Trả về mảng rỗng nếu truyền thiếu hoặc không đủ tham số', () => {
    let result = extractQuestionsFromFile();
    expect(result.length).toBe(0);

    let result1 = extractQuestionsFromFile('');
    expect(result1.length).toBe(0);

    let result2 = extractQuestionsFromFile('0');
    expect(result2.length).toBe(0);
});

test('Return [] if the file is blank / Trả về mảng rỗng nếu file không có nội dung', () => {
    let result = extractQuestionsFromFile('', '0');
    expect(result.length).toBe(0);
});

test('Return [] if there are no answers / Trả về mảng rỗng nếu câu hỏi không có phương án', () => {
    let result = extractQuestionsFromFile(questionNoAnswer, '0');
    expect(result.length).toBe(0);
});

test('Return 1 question if upload 1 question / Trả về 1 câu hỏi nếu nạp 1 câu hỏi', () => {
    let result = extractQuestionsFromFile(oneQuestionArray, '0');
    expect(result.length).toBe(1);
});

test('Return 2 questions if upload 2 questions / Trả về 2 câu hỏi nếu nạp 2 câu hỏi', () => {
    let result = extractQuestionsFromFile(twoQuestionsArray, '0');
    expect(result.length).toBe(2);
});

test('Return a question with one answer / Trả về câu hỏi với 1 phương án', () => {
    let result = extractQuestionsFromFile(oneAnswer, '0');
    let { answers } = result[0];
    expect(answers.length).toBe(1);
});

test('Return a question with no correct answer / Trả về câu hỏi và không có đáp án đúng', () => {
    let result = extractQuestionsFromFile(noCorrectAnswer, '0');
    let question = result[0];
    expect(question.correctAnswer).toBe('');
});