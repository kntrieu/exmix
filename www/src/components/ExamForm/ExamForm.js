import React, { useState } from 'react';
import {
    Box,
    FormGroup,
    Grid,
    FormControl,
} from '@material-ui/core/';
import { ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import {useDispatch, useSelector} from 'react-redux';
import {updateWizaData} from '../../actions/Wizart';
import BottomAction from '../BottomAction/BottomAction';
import DoneIcon from '@material-ui/icons/Done';


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

    const actions = [
        {
            color: 'primary',
            isSubmit: true,
            label: 'Lưu',
            size: 'large',
            startIcon: DoneIcon,
        }
    ];

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
                    </Grid>
                </Grid>
                <BottomAction actions={actions} />
            </ValidatorForm>
        </Box>
    )
}

export default ExamForm;