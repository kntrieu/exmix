import React from 'react';
import Box from '@material-ui/core/Box';
import ButtonAppBar from '../AppBar';
import Wizart from '../Wizart';

const Main = () => {
    return (
        <Box>
            <ButtonAppBar/>
            <div id="main-content">
                <Wizart />
            </div>
        </Box>
    )
}

export default Main;

