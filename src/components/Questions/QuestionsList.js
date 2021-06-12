import React from 'react';
import { 
    Box,
    TablePagination
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
import LoopIcon from '@material-ui/icons/Loop';
import BottomAction from '../BottomAction/BottomAction';

const useStyles = makeStyles( theme => ({
    table: {
        minWidth: 650,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));
  
const QuestionsList = () => {
    const classes = useStyles();
    const questions = useSelector( state => state.QuestionsReducer);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const actions = [
        {
            color: 'primary',
            isSubmit: false,
            label: 'Thêm Câu Hỏi',
            size: 'large',
            endIcon: AddBoxIcon,
            link: '/them-cau-hoi'
        },
        {
            color: 'secondary',
            isSubmit: false,
            label: 'Trộn Câu Hỏi',
            size: 'large',
            endIcon: LoopIcon,
            link: '/tron-cau-hoi'
        }

    ];

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
                            {questions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((question) => {
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
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={questions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage={'Số dòng hiển thị'}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
            <BottomAction actions={actions} />
        </>
    )
}

export default QuestionsList;