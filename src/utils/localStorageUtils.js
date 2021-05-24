const wizartDataName = 'EXIX_WIZART';
const questionDataName = 'EXMIX_QUESTIONS';

export const setWizartData = (state) => {
    localStorage.setItem(wizartDataName, JSON.stringify(state));
}

export const getWizartData = () => {
    return JSON.parse(localStorage.getItem(wizartDataName));
}

export const setQuestionData = (state) => {
    localStorage.setItem(questionDataName, JSON.stringify(state));
}

export const getQuestionData = () => {
    return JSON.parse(localStorage.getItem(questionDataName));
}