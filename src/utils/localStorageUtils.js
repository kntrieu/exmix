const wizartDataName = 'EXIX_WIZART';

export const setWizartData = (state) => {
    localStorage.setItem(wizartDataName, JSON.stringify(state));
}

export const getWizartData = () => {
    return JSON.parse(localStorage.getItem(wizartDataName));
}