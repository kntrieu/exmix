import React, {useState} from 'react';
import { 
    Box,
    TablePagination
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuestion } from '../../actions/Questions';
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
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles( theme => ({
    table: {
        minWidth: 650,
    },
    tableContainerHeight: {
        maxHeight: 450
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));
  
const QuestionsList = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState(useSelector( state => state.QuestionsReducer));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const dispatch = useDispatch();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (questionId) => {
        const index = questions.findIndex(question => question.id === questionId);
        //dispatch(deleteQuestion(questionId));
        if (index > -1) {
            questions.splice(index, 1);
            const newQuestions = [...questions];
            dispatch(deleteQuestion(questionId));
            setQuestions([...newQuestions]);
        }
    }

    const actions = [
        {
            color: 'primary',
            isSubmit: false,
            label: 'Th??m',
            size: 'large',
            endIcon: AddBoxIcon,
            link: '/them-cau-hoi'
        },
        {
            color: 'primary',
            isSubmit: false,
            label: 'N???p',
            size: 'large',
            endIcon: BackupIcon,
            link: '/nap-cau-hoi'
        }

    ];

    if (questions.length >= 5) {
        actions.push(
            {
                color: 'secondary',
                isSubmit: false,
                label: 'Tr???n',
                size: 'large',
                endIcon: LoopIcon,
                link: '/tron-cau-hoi'
            }
        );
    }

    return (
        <>
            <Box>
                <TableContainer component={Paper} className={classes.tableContainerHeight}>
                    <Table stickyHeader className={classes.table} aria-label="question list">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell>N???i Dung C??u H???i</TableCell>
                                <TableCell align="center">????p ??n ????ng</TableCell>
                                <TableCell align="center">H??nh ?????ng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((question, index) => {
                                let correctAnswer = question.answers.find(item => item.correct).label + '. ' + question.answers.find(item => item.correct).content;
                                if (correctAnswer.length > 30) {
                                    correctAnswer = correctAnswer.substr(0, 30) + '...';
                                }
                                return (
                                    <TableRow key={question.id}>
                                        <TableCell width={'10%'} align="center">{index + 1}</TableCell>
                                        <TableCell width={'40%'}>
                                            {question.content}
                                        </TableCell>
                                        <TableCell width={'30%'} align="left">{correctAnswer}</TableCell>
                                        <TableCell width={'20%'} align="center">
                                            <IconButton aria-label="delete" title="X??a" onClick={() => {handleDelete(question.id)}}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                            <Link to={`/sua-cau-hoi/${question.id}`}>
                                                <IconButton aria-label="edit" title="S???a">
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
                    labelRowsPerPage={'D??ng/trang'}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
            <BottomAction actions={actions} />
        </>
    )
}

export default QuestionsList;