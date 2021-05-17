import { FormControl, Box, TextField, Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';


const Wizart = () => {
    const wizartSteps = useSelector( state => state.WizartReducer);

    return (
        <Box>
            {
               wizartSteps.map(wizart => (
                   <WizartStep key={wizart.id} title={wizart.title} value={wizart.value} />
               ))
            }
        </Box>
    )
}

const WizartStep = ({
    id,
    title,
    value
}) => {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Box>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField id={id} label={title} value={value} />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <Button variant="contained" color="primary">
                        Tiếp
                    </Button>
                </FormControl>
            </Box>
        </Grid>
    )
}

export default Wizart;