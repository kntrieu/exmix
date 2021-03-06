import { FormControl, Box, TextField, Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { 
    setWizartStepValue,
    setStepToCompleted,
    setStepToNotCurrentStep,
    setStepToCurrentStep
} from '../../actions/Wizart';
import { NavigateNext, NavigateBefore} from '@material-ui/icons';
import { Link } from 'react-router-dom'
const Wizart = () => {
    const wizartSteps = useSelector( state => state.WizartReducer);
    const currentStepId = wizartSteps.find(item => item.isCurrentStep === true);
    const [currentStep, setCurrentStep] = useState(currentStepId);
    return (
        <Box>
            {
               wizartSteps.map(wizart => {
                   if (wizart.isCurrentStep) {
                     return <WizartStep 
                                id={wizart.id} 
                                key={wizart.id} 
                                title={wizart.title} 
                                value={wizart.value}
                                wizartLength={wizartSteps.length}
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep} />
                   }
                   return null;
                })
            }
        </Box>
    )
}

const WizartStep = ({
    id,
    title,
    wizartLength,
    setCurrentStep,
    value
}) => {
    
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(value);
    const onChangeInput = (event, stepId) => {
        const data = {
            value: event.currentTarget.value,
            stepId: stepId
        };

        dispatch(setWizartStepValue(data));
        setInputValue(event.currentTarget.value);
    };

    const onClickNext = (stepId) => {
        const data = {stepId};
        const nextStepId = stepId + 1;

        dispatch(setStepToCompleted(data));
        dispatch(setStepToNotCurrentStep(data));
        dispatch(setStepToCurrentStep({stepId: nextStepId}));

        //Trigger component update
        setCurrentStep(nextStepId);
    }

    const onClickPrev = (stepId) => {
        const data = {stepId};
        const prevStepId = stepId - 1;
        dispatch(setStepToNotCurrentStep(data));
        dispatch(setStepToCurrentStep({'stepId': prevStepId}));

        //Trigger component update
        setCurrentStep(prevStepId);
    }

    return (
        <Grid>
            <Box>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField value={inputValue} label={title} onChange={ (event) => onChangeInput(event, id) } />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <WizartControl 
                        stepId={id} 
                        onClickNext={onClickNext} 
                        onClickPrev={onClickPrev}
                        wizartLength={wizartLength}  />
                </FormControl>
            </Box>
        </Grid>
    )
}

const WizartControl = ({stepId, onClickNext, onClickPrev, wizartLength}) => {
    const col = stepId === 0 ? 12 : 6;
    const nextButton = stepId >= 0 && stepId < wizartLength - 1 ? 
        <Grid item xs={col}>
            <FormControl margin="normal" fullWidth={true}>
                <Button 
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => onClickNext(stepId)}
                    endIcon={<NavigateNext/>} >
                    Ti???p
                </Button>
            </FormControl>
        </Grid> : null;
    const previousButton = stepId > 0 ? 
        <Grid item xs={col}>
            <FormControl margin="normal" fullWidth={true}>
                <Button 
                    variant="contained" 
                    color="primary"
                    size="large" 
                    onClick={() => onClickPrev(stepId)} 
                    startIcon={<NavigateBefore/>}>
                    Tr??? l???i
                </Button>
            </FormControl>
        </Grid> : null;
    const finishButton = stepId === wizartLength - 1 ?
        <Grid item xs={col}>
            <Link to="/danh-sach-cau-hoi" style={{ textDecoration: 'none' }}>
                <FormControl margin="normal" fullWidth={true}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        endIcon={<NavigateNext />}>
                        Nh???p C??u H???i
                    </Button>
                </FormControl>
            </Link>
        </Grid> : null;
    const controls = 
    <Grid spacing={3} container direction="row" alignItems="center">
        {previousButton}
        {nextButton}
        {finishButton}
    </Grid>;

    return controls;
}

export default Wizart;