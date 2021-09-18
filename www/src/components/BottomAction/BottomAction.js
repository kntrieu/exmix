import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
    Button,
    Grid,
    FormControl,
    Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        backgroundColor: theme.palette.grey[50],
        width: 'calc(100% - 240px)',
        minHeight: '75px'
    },
    marginLeftOut25: {
        marginLeft: '-25px',
    },
    marginLeftOut16: {
        marginLeft: '-16px',
        width: '100%'
    }
}));

const BottomAction = ({actions}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const cols = 12 / actions.length; //Chia số cột theo số buttons

    return (
        <Box boxShadow={5} className={classes.root + ' ' + ( matches ? classes.marginLeftOut25 : classes.marginLeftOut16)}>
            <Grid container spacing={3} direction="row" alignItems={'center'} style={{paddingLeft: '24px', paddingRight: '24px'}}>
                {
                    actions.map((action, index) => {
                        const mainItem = 
                        <FormControl margin="normal" fullWidth={true}>
                            <Button type={action.isSubmit ? 'submit' : 'button'}
                                    onClick={action.onClick}
                                    variant="contained"
                                    disabled={action.isDisable}
                                    color={action.color} size={!matches ? 'small' : action.size} 
                                    startIcon={ action.startIcon ? <action.startIcon /> : null } 
                                    endIcon={ action.endIcon ? <action.endIcon/> : null}>
                                {action.label}
                            </Button>
                        </FormControl>

                        if (action.link) {
                            return (
                                <Grid item xs={cols} key={index}>
                                    <Link to={action.link} style={{ textDecoration: 'none' }}>
                                    {mainItem}
                                    </Link>
                                </Grid>
                            )
                        }

                        return (
                            <Grid item xs={cols} key={index}>
                                {mainItem}
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
};

BottomAction.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        isSubmit: PropTypes.bool,
        label: PropTypes.string,
        size: PropTypes.string,
        onclick: PropTypes.func,
        startIcon: PropTypes.object,
        endIcon: PropTypes.object,
        link: PropTypes.string
    })).isRequired
}

export default BottomAction;