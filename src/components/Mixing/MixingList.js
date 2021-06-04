import React from 'react';
import { 
    Box,
    Button,
    Grid,
    FormControl
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import ViewListIcon from '@material-ui/icons/ViewList';
import LoopIcon from '@material-ui/icons/Loop';
import PrintIcon from '@material-ui/icons/Print';
import { updateMixing } from '../../actions/Mixing';
import {shuffleQuestions} from '../../utils/calculatorHelper';
import { printCopies } from '../../utils/documentHelper';

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
            <Box>
                <Grid container spacing={3} direction="row" alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Link to="/danh-sach-cau-hoi" style={{ textDecoration: 'none' }}>
                            <FormControl margin="normal" fullWidth={true}>
                                <Button
                                    variant="contained"
                                    color="primary" size="large" startIcon={<ViewListIcon />} >
                                    Danh sách câu hỏi
                                </Button>
                            </FormControl>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl margin="normal" fullWidth={true}>
                            <Button
                                onClick={() => updateResults()}
                                variant="contained"
                                color="secondary" size="large" endIcon={<LoopIcon />} >
                                Trộn lại
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl margin="normal" fullWidth={true}>
                            <Button
                                onClick={ () => printDoc() }
                                variant="contained"
                                color="primary" size="large" endIcon={<PrintIcon />} >
                                Xuất đề
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MixingList;