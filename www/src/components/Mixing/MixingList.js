import React from 'react';
import { 
    Box
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewListIcon from '@material-ui/icons/ViewList';
import LoopIcon from '@material-ui/icons/Loop';
import PrintIcon from '@material-ui/icons/Print';
import { updateMixing } from '../../actions/Mixing';
import {shuffleQuestions} from '../../utils/calculatorHelper';
import { printCopies } from '../../utils/documentHelper';
import BottomAction from '../BottomAction/BottomAction';
import Typography from '@material-ui/core/Typography';

const MixingList = () => {
    const copies = useSelector(state => state.MixingReducer);
    const wizart = useSelector(state => state.WizartReducer);
    const questions = useSelector(state => state.QuestionsReducer);
    const dispatch = useDispatch();

    const updateResults = () => {
        const tempQuestion = JSON.parse(JSON.stringify(questions));
        const newCopies = shuffleQuestions(tempQuestion, copies.length);
        if (newCopies.length > 0) {
            dispatch(updateMixing(newCopies));
        }
    }

    const printDoc = () => {
        printCopies(copies, wizart);
    }

    let actions = [];

    const fullActions = [
        {
            color: 'secondary',
            isSubmit: false,
            label: 'Trộn lại',
            size: 'large',
            endIcon: LoopIcon,
            onClick: updateResults
        },
        {
            color: 'primary',
            isSubmit: false,
            label: 'In',
            size: 'large',
            endIcon: PrintIcon,
            onClick: printDoc
        },
    ];

    if (copies.length > 0) {
        actions = [...fullActions];
    }

    const buildTable = (copies) => {
        let table = <Typography gutterBottom color={'primary'} variant="h6" component="h2">
                        Hiện tại bạn chưa có dữ liệu trộn, bạn cần nhập câu hỏi và sau đó trộn lại.
                    </Typography>

        if (copies.length > 0) {
            table = <TableContainer component={Paper} style={{maxHeight: 450}}>
                        <Table stickyHeader aria-label="Mix result">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Câu</TableCell>
                                    {
                                        copies.map((item, index) => {
                                            return (
                                                <TableCell key={index} align="center">Đáp án đề {index + 1}</TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    copies[0].map((item, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            {
                                                copies.map((ex, id) => {
                                                    return (
                                                        <TableCell key={id} align="center">
                                                            {ex[index].correctAnswer}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>;
        }

        return table;
    }

    return (
        <>
            <Box>
                {  buildTable(copies) }
            </Box>
            <BottomAction actions={actions} />
        </>
    )
}

export default MixingList;