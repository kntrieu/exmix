import React, { useState } from 'react';
import { 
    FormControl, 
    Box,
    Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import LoopIcon from '@material-ui/icons/Loop';

const Mixing = () => {
    const [numOfCopies, updateNumOfCopies] = useState(3);
    const [copies, updateCopies] = useState([]);
    const questions = useSelector(state => state.QuestionsReducer);
    const wizartData = useSelector(state => state.WizartReducer);

    const onChangeNumOfCopies = (value) => {
        updateNumOfCopies(value);
    }

    const onSubmitForm = () => {
        alert(numOfCopies);
    }

    return (
        <Box>
            <ValidatorForm onSubmit={onSubmitForm}>
                <FormControl margin="normal" fullWidth={true}>
                    <TextValidator 
                        value={numOfCopies} 
                        label={'Nhập số lượng đề cần hoán vị'}
                        fullWidth
                        type="number"
                        errorMessages={['Giá trị bắt buộc phải nhập', 'Chỉ chấp nhận giá trị nhỏ nhất là 1', 'Chỉ chấp nhận giá trị lớn nhất là 10']}
                        validators={['required','minNumber:1', 'maxNumber:10']}
                        onChange={ (event) => onChangeNumOfCopies(event.currentTarget.value)}
                        variant="outlined" 
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        type="submit" 
                        size="large"
                        endIcon={<LoopIcon />}
                    >
                        Bắt đầu hoán vị
                    </Button>
                </FormControl>
            </ValidatorForm>
        </Box>
    )
}

export default Mixing;