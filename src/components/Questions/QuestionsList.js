import React from 'react';
import { 
    Box,
    Button,
    FormControl
} from '@material-ui/core';
import { useSelector } from 'react-redux';
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
                            {questions.map((question) => (
                                <TableRow key={question.id}>
                                    <TableCell align="center">{question.id + 1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {question.content}
                                    </TableCell>
                                    <TableCell align="center">{question.correctAnswer}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" title="Xóa câu hỏi">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton aria-label="edit" title="Sửa câu hỏi">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <Link to="/them-cau-hoi" style={{ textDecoration: 'none' }}>
                    <FormControl margin="normal" fullWidth={true}>
                        <Button
                            variant="contained"
                            color="primary" size="large" endIcon={<AddBoxIcon />} >
                            Thêm câu hỏi
                        </Button>
                    </FormControl>
                </Link>
            </Box>
        </>
    )
}

export default QuestionsList;