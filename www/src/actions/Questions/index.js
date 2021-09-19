export const addNewQuestion = (question) => {
    return {
        type: 'ADD_QUESTION',
        data: question
    }
}

export const deleteQuestion = (questionId) => {
    return {
        type: 'DELETE_QUESTION',
        data: questionId
    }
}

export const getQuestion = (id, isLogged) => {
    return {
        type: 'GET_QUESTION',
        data: {
            questionId: id,
            isLogged: isLogged
        }
    }
}

export const updateQuestion = (question) => {
    return {
        type: 'EDIT_QUESTION',
        data: question
    }
}

export const addQuestions = (questions) => {
    return {
        type: 'ADD_QUESTIONS',
        data: questions
    }
}