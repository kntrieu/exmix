export const setWizartStepValue = (data) => {
    return {
        type: 'SET_WIZART_STEP_VALUE',
        data: data
    }
}

export const setStepToCompleted = (data) => {
    return {
        type: 'SET_WIZART_STEP_COMPLETED',
        data: data
    }
}

export const setStepToUncompleted = (data) => {
    return {
        type: 'SET_WIZART_STEP_UN_COMPLETED',
        data: data
    }
}

export const setStepToCurrentStep = (data) => {
    return {
        type: 'SET_WIZART_STEP_CURRENT',
        data: data
    }
}

export const setStepToNotCurrentStep = (data) => {
    return {
        type: 'SET_WIZART_STEP_NOT_CURRENT',
        data: data
    }
}
