import { 
    Box,
    Grid,
 } from '@material-ui/core';
import React from 'react';
import HomeHeader from './HomeHeader';



const Home = () => {

    return (
        <Box>
            <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item xs={12}>
                    <HomeHeader />
                </Grid>
            </Grid>
        </Box>
    )
}


export default Home;