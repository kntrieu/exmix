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

    const actions = [
        {
            color: 'primary',
            isSubmit: false,
            label: 'D/s câu hỏi',
            size: 'large',
            startIcon: ViewListIcon,
            link: '/danh-sach-cau-hoi'
        },
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
            label: 'Xuất đề',
            size: 'large',
            endIcon: PrintIcon,
            onClick: printDoc
        },

    ];

    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
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
                                    <TableRow key={index}>
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
                </TableContainer>
            </Box>
            <BottomAction actions={actions} />
        </>
    )
}

export default MixingList;