const extractQuestionsFromFile = (fileString, currentId) => {

    if(!fileString || !currentId) {
        return [];
    }

    let questions = [];
    let rawArray = fileString.split('[br]');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (rawArray.length > 0) {
        rawArray.map((rawQues, index) => {
            let rawQuestionAnswers = rawQues.split('\n');


            //Remove empty element 
            rawQuestionAnswers = rawQuestionAnswers.filter(function (el) {
                return el.trim() != '';
            });

            if (rawQuestionAnswers.length >= 2) {
                let rawAnswers = [...rawQuestionAnswers];
                //remove fisrt element (question content)
                rawAnswers.shift();

                let hasCorrectAnswer = false;

                let questionObj = {
                    id: parseInt(currentId),
                    content: rawQuestionAnswers[0],
                    answers: [],
                    correctAnswer: ''
                };

                rawAnswers.map((answer, no) => {
                    let label = alphabet[no];
                    let id = alphabet[no];
                    let content = answer.trim();
                    let correct = content.indexOf('[d]') >= 0 && !hasCorrectAnswer;

                    if (correct) {
                        hasCorrectAnswer = true;
                        content = content.substring(0, content.indexOf('[d]'));
                        questionObj.correctAnswer = label;
                    }

                    let answerObj = {
                        id: id,
                        label: label,
                        content: content,
                        correct: correct
                    }

                    questionObj.answers.push(answerObj);

                    return answer;
                })

                questions.push(questionObj);
                currentId = parseInt(currentId) + 1;
            }
        });
    }

    return questions;
}

module.exports = extractQuestionsFromFile;