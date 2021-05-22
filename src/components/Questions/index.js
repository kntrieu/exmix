import React from 'react';
import { FormGroup, FormControl, Box, TextField, Grid, Button, Typography, FormLabel} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const AddQuestions = () => {

    return (
        <>
            <Box>
                <Grid direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <QuestionForm />
                    </Grid>
                </Grid>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Box>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="primary" size="large" >
                                    Thêm câu hỏi
                                </Button>
                            </FormControl>
                        </Box>
                    </Grid>
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
                </Grid>
            </Box>
        </>
    )
}

const QuestionForm = () => {
    const questions = useSelector( state => state.QuestionsReducer);
    const currentId = questions.length === 0 ? 0 : questions.length;
    const [questionContent, updateQuestion] = useState('');
    const [answerA, updateAnswerA] = useState('');
    const [answerB, updateAnswerB] = useState('');
    const [answerC, updateAnswerC] = useState('');
    const [answerD, updateAnswerD] = useState('');
    // const onChange
     return (
         <Box>
             <FormGroup>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField id={currentId} 
                            value={questionContent} 
                            label={`Nhập nội dung câu hỏi ${currentId + 1}`}
                            variant="outlined" />
                </FormControl>
             </FormGroup>
             <FormGroup>
                 <Grid container spacing="3" direction="row">
                    <Grid item xs={6}>
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField variant="outlined" value={answerA} label="Đáp Án A" onChange/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField variant="outlined" value={answerB} label="Đáp Án B"/>
                        </FormControl>
                    </Grid>
                 </Grid>
                 <Grid container spacing="3" direction="row">
                    <Grid item xs={6}>
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField variant="outlined" value={answerC} label="Đáp Án C"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField variant="outlined" value={answerD} label="Đáp Án D"/>
                        </FormControl>
                    </Grid>
                 </Grid>
             </FormGroup>
             <FormGroup>

             </FormGroup>
         </Box>
     )
}



export default AddQuestions;