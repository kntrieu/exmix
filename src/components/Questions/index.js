import React from 'react';
import { 
    FormGroup, 
    FormControl, 
    Box, 
    Grid, 
    Button, 
    RadioGroup, 
    FormControlLabel,
    Radio,
    FormLabel
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewQuestion, updateQuestion as editQuestion } from '../../actions/Questions';
import {Link} from 'react-router-dom';
import { ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';

const QuestionForm = () => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.QuestionsReducer);
    const nextId = questions.length;
    const { questionId } = useParams();
    const questionObj = !questionId ? {
        id: nextId,
        content: '',
        answers: [
            {
                id: 'A',
			    label: 'A',
                content: '',
                correct: true
            },
            {
                id: 'B',
			    label: 'B',
                content: '',
                correct: false
            },
            {
                id: 'C',
			    label: 'C',
                content: '',
                correct: false
            },
            {
                id: 'D',
			    label: 'D',
                content: '',
                correct: false
            }
        ],
        correctAnswer: 'A'
    } : questions.find(item => item.id === parseInt(questionId));


    const [questionState, updateQuestion] = useState(questionObj);

    const onChangeQuestionContent = (value) => {
        const newQuestion = questionState;
        newQuestion.content = value;
        updateQuestion(newQuestion);
    }

    const onChangeQuestionAnswer = (newQuestionAnswers) => {
        const newQuestion = questionState;

        newQuestion.answers = newQuestionAnswers;
        updateQuestion(newQuestion);
    }

    const onChangeRadioGroups = (event) => {
        const value = event.currentTarget.value;
        const newQuestion = questionState;
        newQuestion.correctAnswer = value;
        newQuestion.answers.map(ans => {
            if(ans.id === value) {
                ans.correct = true;
            } else {
                ans.correct = false;
            }
            return ans;
        })

        updateQuestion(newQuestion);
    }

    const submitQuestion = () => {
        const func = questionId ? editQuestion : addNewQuestion;
        dispatch(func(questionState));
        window.location.pathname="/danh-sach-cau-hoi";
    }

    return (
        <>
            <Box>
                <ValidatorForm onSubmit={submitQuestion}>
                <Grid>
                    <Grid item>
                        <QuestionFormItem 
                            questionObj={questionState} 
                            onChangeQuestionContent={onChangeQuestionContent}
                            onChangeQuestionAnswer={onChangeQuestionAnswer} />
                    </Grid>
                    <Grid item >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Chọn đáp án đúng</FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue={questionObj.correctAnswer} onChange={(event) => onChangeRadioGroups(event) }>
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
                                    type="submit" >
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
                </ValidatorForm>
            </Box>
        </>
    )
}

const QuestionFormItem = ({questionObj , onChangeQuestionContent, onChangeQuestionAnswer}) => {
    const [questionContent, updateQuestion] = useState(questionObj.content);
    let answers = [...questionObj.answers];
    const [questionAnswer, updateQuestionAnswer] = useState(answers);
    const onChangeContent = (event) => {
        const value = event.currentTarget.value;
        updateQuestion(value);
        onChangeQuestionContent(value);
    }

    const onChangeAnswer = id => e => {
        let newArr = [...questionAnswer]; 
        let index = newArr.findIndex(item => item.id === id);
        newArr[index].content = e.target.value;
        updateQuestionAnswer(newArr); 
        onChangeQuestionAnswer(newArr);
    }

    return (
        <Box>
            <FormGroup>
                <FormControl margin="normal" fullWidth={true}>
                    <TextValidator
                        fullWidth
                        validators={['required']}
                        errorMessages={['Bạn cần phải nhập nội dung câu hỏi']}
                        value={questionContent}
                        label={`Nhập nội dung câu hỏi ${questionObj.id + 1}`}
                        variant="outlined" onChange={(event) => onChangeContent(event)} />
                </FormControl>
            </FormGroup>
            <FormGroup>
                {
                    questionAnswer.map((as, index) => (
                        <Grid container spacing={3} direction="row" alignItems="center" key={as.id}>
                            <Grid item xs={12}>
                                <FormControl margin="normal" fullWidth={true}>
                                    <TextValidator
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['Bạn cần phải nhập nội dung đáp án']}
                                        value={as.content}
                                        variant="outlined" 
                                        label={`Đáp Án ${as.id}`} 
                                        onChange={onChangeAnswer(as.id)} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    ))
                }
            </FormGroup>
        </Box>
    )
}



export default QuestionForm;