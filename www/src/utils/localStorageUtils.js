import { DATA_NAME } from './constants';

export const setWizartData = (state) => {
    localStorage.setItem(DATA_NAME.WIZART, JSON.stringify(state));
}

export const getWizartData = () => {
    return JSON.parse(localStorage.getItem(DATA_NAME.WIZART));
}

export const setQuestionData = (state) => {
    localStorage.setItem(DATA_NAME.QUESTIONS, JSON.stringify(state));
}

export const getQuestionData = () => {
    const rawQuestions = localStorage.getItem(DATA_NAME.QUESTIONS);
    const questions = rawQuestions ? JSON.parse(rawQuestions) : [];
    return questions;
}

export const setDataByName = (name, state) => {
    localStorage.setItem(name, JSON.stringify(state));
}

export const getDataByName = (name) => {
    return JSON.parse(localStorage.getItem(name));
}