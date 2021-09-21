import {
    getMaxResults,
    shuffleIds,
    shuffleAnswers,
    checkDuplicate,
    shuffleQuestions
} from './calculatorHelper';

import mockQuestions from '../mocks/mockQuestions.json';

const mockArray = [3,5,1,6,4,2];
const definationArray = [
    [3,5,1,6,4,2],
    [1,2,3,4,5,6],
    [5,5,4,3,2,1]
];
const definationArray1 = [
    [5,4,7,6,4,2],
    [1,2,3,4,5,6],
    [5,5,4,3,2,1]
]
/**
 * Test function getMaxResults
 */
describe('=== Test function getMaxResults ===', () => {
    test('Return 6 result when input 3 / Trả về 6 nếu add 3', () => {
        let result = getMaxResults(3);
        expect(result).toBe(6);
    });
    
    test('Return 1 result when input 0 / Trả về 1 nếu add 0', () => {
        let result = getMaxResults(0);
        expect(result).toBe(1);
    });
    
    test('Return 1 result when no param / Trả về 1 nếu không có tham số', () => {
        let result = getMaxResults(0);
        expect(result).toBe(1);
    });
});
/**
 * End Test function getMaxResults
 */


/**
 * Test function shuffleIds
 */
describe('=== Test function shuffleIds ===', () => {

    test('Should return an ids array / Trả về một mảng các id', () => {
        let array = shuffleIds(mockQuestions);
        expect(array.length).toBe(mockQuestions.length);
        expect(typeof array[0]).toBe('number');
    });

    test('Should return empty array / Trả về một mảng rỗng', () => {
        let array = shuffleIds();
        expect(array.length).toBe(0);
    });

});
/**
 * End Test function shuffleIds
 */


/**
 * Test function shuffleAnswers
 */
 describe('=== Test function shuffleAnswers ===', () => {

    test('Should return null / Trả về null', () => {
        let obj = shuffleAnswers();
        expect(obj).toBe(null);
    });

    test('Should return an object / Trả về một object', () => {
        let obj = shuffleAnswers(mockQuestions[0]);
        expect(typeof obj).toBe('object');
    });

    test('Should return correctAswer / Trả về đáp án đúng', () => {
        let obj = shuffleAnswers(mockQuestions[0]);
        expect(typeof obj.correctAnswer).toBe('string');
    });

});
/**
 * End Test function shuffleAnswers
 */


/**
 * Test function checkDuplicate
 */
 describe('=== Test function checkDuplicate ===', () => {

    test('Should return undefined / Trả về undefined', () => {
        let obj = checkDuplicate();
        expect(obj).toBe(undefined);
    });

    test('Should return true / Trả về true', () => {
        let result = checkDuplicate(mockArray, definationArray);
        expect(result).toBe(true);
    });

    test('Should return false / Trả về false', () => {
        let result = checkDuplicate(mockArray, definationArray1);
        expect(result).toBe(false);
    });
});
/**
 * End Test function checkDuplicate
 */

/**
 * Test function shuffleQuestions
 */
 describe('=== Test function shuffleQuestions ===', () => {

    test('Should return array of 3 copies / Trả về 3 bộ câu hỏi', () => {
        let array = shuffleQuestions(mockQuestions, 3);
        expect(array.length).toBe(3);
    });
});
/**
 * End Test function shuffleQuestions
 */