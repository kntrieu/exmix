import React, { useState } from 'react';
import { 
    Box,
    Button,
    Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const MixingList = () => {
    const copies = useSelector(state => state.MixingReducer);

    return (
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
    )
}

export default MixingList;