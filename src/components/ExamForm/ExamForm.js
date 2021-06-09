import React, { useState } from 'react';
import {
    Box,
    FormGroup,
    Grid,
    FormControl,
    Button
} from '@material-ui/core/';
import { ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import {useDispatch, useSelector} from 'react-redux';
import {updateWizaData} from '../../actions/Wizart';


const ExamForm = ({showNotification}) => {
    const wizartData = useSelector(state => state.WizartReducer);
    const [wizartDataState, updateWizart] = useState(JSON.parse(JSON.stringify(wizartData)));
    const dispatch = useDispatch();
    const onSubmitForm = () => {
        dispatch(updateWizaData(wizartDataState));
        showNotification('Lưu thông tin kì thi thành công!', 5000, 'success');
    };

    const onChangeInput = (event, id) => {
        let tempWizartDataState = JSON.parse(JSON.stringify(wizartDataState));
        let value = event.currentTarget.value;
        tempWizartDataState.map(wizart => {
            if (wizart.id === id) {
                wizart.value = value;
            };
            return wizart;
        });

        updateWizart(tempWizartDataState);
        
    };

    return (
        <Box>
            <ValidatorForm onSubmit={onSubmitForm}>
                <Grid>
                    <Grid item>
                        <FormGroup>
                            {
                                wizartDataState.map(wizart => {
                                    return (
                                        <FormControl margin="normal" fullWidth={true} key={wizart.id}>
                                            <TextValidator
                                                fullWidth
                                                value={wizart.value}
                                                validators={['required']}
                                                errorMessages={[`Bạn cần phải ${wizart.title.toLowerCase()}`]}
                                                label={wizart.title}
                                                type={wizart.type}
                                                onChange={(event) => onChangeInput(event, wizart.id)}
                                                variant="outlined" />
                                        </FormControl>
                                    )
                                })
                            }
                        </FormGroup>
                        <FormGroup>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button type="submit" variant="contained" color="primary">Lưu</Button>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </Box>
    )
}

export default ExamForm;