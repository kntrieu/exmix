import React from 'react';
import { FormGroup, FormControl, Box, TextField, Grid, Button, Typography, FormLabel} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

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
        
    }

    return (
        <>
            <Box>
                <Grid>
                    <Grid item>
                        <QuestionForm questionObj={questionState} onChangeQuestionContent={onChangeQuestionContent} />
                    </Grid>
                </Grid>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Box>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="primary" size="large" >
                                    Xong
                                </Button>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="secondary" size="large" >
                                    Hủy bỏ
                                </Button>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

const QuestionForm = ({questionObj , onChangeQuestionContent}) => {
    

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
                                    <TextField variant="outlined" label={`Đáp Án ${as.id}`} value={as.content} />
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