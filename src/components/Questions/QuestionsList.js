import React from 'react';
import { 
    Box,
    Button,
    FormControl,
    Grid
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LoopIcon from '@material-ui/icons/Loop';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
  
const QuestionsList = () => {
    const classes = useStyles();
    const questions = useSelector( state => state.QuestionsReducer);
    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell>Nội Dung Câu Hỏi</TableCell>
                                <TableCell align="center">Đáp án đúng</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map((question) => {
                                let correctAnswer = question.answers.find(item => item.correct).label + '. ' + question.answers.find(item => item.correct).content;
                                if (correctAnswer.length > 30) {
                                    correctAnswer = correctAnswer.substr(0, 30) + '...';
                                }
                                return (
                                    <TableRow key={question.id}>
                                        <TableCell width={'10%'} align="center">{question.id + 1}</TableCell>
                                        <TableCell width={'40%'}>
                                            {question.content}
                                        </TableCell>
                                        <TableCell width={'30%'} align="left">{correctAnswer}</TableCell>
                                        <TableCell width={'20%'} align="center">
                                            <IconButton aria-label="delete" title="Xóa câu hỏi">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                            <Link to={`/sua-cau-hoi/${question.id}`}>
                                                <IconButton aria-label="edit" title="Sửa câu hỏi">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <Grid container spacing={3} direction="row" alignItems="center">
                    <Grid item xs={6}>
                        <Link to="/them-cau-hoi" style={{ textDecoration: 'none' }}>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="primary" size="large" endIcon={<AddBoxIcon />} >
                                    Thêm câu hỏi
                                </Button>
                            </FormControl>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to="/tron-cau-hoi" style={{ textDecoration: 'none' }}>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="secondary" size="large" endIcon={<LoopIcon />} >
                                    Trộn câu hỏi
                                </Button>
                            </FormControl>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default QuestionsList;