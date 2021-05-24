import React from 'react';
import { 
    FormGroup, 
    FormControl, 
    Box, 
    TextField, 
    Grid, 
    Button, 
    RadioGroup, 
    FormControlLabel,
    Radio,
    FormLabel
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewQuestion } from '../../actions/Questions';
import {Link} from 'react-router-dom';

const AddQuestions = () => {
    const questions = useSelector(state => state.QuestionsReducer);
    const nextId = questions.length;
    const questionObj = {
        id: nextId,
        content: '',
        answers: [
            {
                id: 'A',
                content: '',
            },
            {
                id: 'B',
                content: '',
            },
            {
                id: 'C',
                content: '',
            },
            {
                id: 'D',
                content: '',
            }
        ],
        correctAnswer: null
    };

    const [questionState, updateQuestion] = useState(questionObj);

    const onChangeQuestionContent = (event) => {
        const value = event.currentTarget.value;
        const newQuestion = questionState;
        newQuestion.content = value;
        updateQuestion(newQuestion);
    }

    const onChangeQuestionAnswer = (event, id) => {
        const value = event.currentTarget.value;
        const newAnswerValue = {
            id: id,
            content: value,
        };
        const newQuestion = questionState;

        newQuestion.answers[newQuestion.answers.findIndex(item => item.id === id)] = newAnswerValue;
        updateQuestion(newQuestion);
    }

    const onChangeRadioGroups = (event) => {
        const value = event.currentTarget.value;
        const newQuestion = questionState;
        newQuestion.correctAnswer = value;

        updateQuestion(newQuestion);
    }

    const dispatch = useDispatch();

    const submitQuestion = () => {
        dispatch(addNewQuestion(questionState));
        window.location.pathname="/danh-sach-cau-hoi";
    }

    return (
        <>
            <Box>
                <Grid>
                    <Grid item>
                        <QuestionForm 
                            questionObj={questionState} 
                            onChangeQuestionContent={onChangeQuestionContent}
                            onChangeQuestionAnswer={onChangeQuestionAnswer} />
                    </Grid>
                    <Grid item >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Chọn đáp án đúng</FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue="A" onChange={(event) => onChangeRadioGroups(event) }>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="A" />
                                <FormControlLabel value="B" control={<Radio color="primary" />} label="B" />
                                <FormControlLabel value="C" control={<Radio color="primary" />} label="C" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="D" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Box>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="primary" size="large"
                                    onClick={() => submitQuestion()} >
                                    Xong
                                </Button>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Link to="/danh-sach-cau-hoi" style={{ textDecoration: 'none' }}>
                                <FormControl margin="normal" fullWidth={true}>
                                    <Button
                                        variant="contained"
                                        color="secondary" size="large" >
                                        Hủy bỏ
                                    </Button>
                                </FormControl>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

const QuestionForm = ({questionObj , onChangeQuestionContent, onChangeQuestionAnswer}) => {
    

    return (
        <Box>
            <FormGroup>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        label={`Nhập nội dung câu hỏi ${questionObj.id + 1}`}
                        variant="outlined" onChange={(event) => onChangeQuestionContent(event)} />
                </FormControl>
            </FormGroup>
            <FormGroup>
                {
                    questionObj.answers.map(as => (
                        <Grid container spacing={3} direction="row" alignItems="center" key={as.id}>
                            <Grid item xs={12}>
                                <FormControl margin="normal" fullWidth={true}>
                                    <TextField 
                                        variant="outlined" 
                                        label={`Đáp Án ${as.id}`} 
                                        onChange={(event) => onChangeQuestionAnswer(event, as.id)} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    ))
                }
            </FormGroup>
        </Box>
    )
}



export default AddQuestions;