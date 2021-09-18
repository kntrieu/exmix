import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ButtonAppBar from '../AppBar';
import ExamForm from '../ExamForm/ExamForm';
import QuestionForm from '../Questions';
import QuestionsList from '../Questions/QuestionsList';
import UploadQuestion from '../UploadQuestion/UploadQuestion';
import Mixing from '../Mixing';
import MixingList from '../Mixing/MixingList';
import Home from '../Home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { ThemeProvider } from '@material-ui/core/styles';
import exmixThemes from '../../theme/theme';

const useStyles = makeStyles((theme) => ({
    mainMargin: {
        marginTop: 90,
        marginLeft: 240,
        marginBottom: 90,
    },
    root: {
        marginTop: 50,
        marginBottom: 80
    }
}));

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Main = () => {
    const classes = useStyles();
    const [notificationInf, setNotification] = useState({isOpen: false, message: '', timeout: 0, type: 'success'});
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [isMobileOpenSideBar, setIsMobileOpenSideBar] = useState(false);

    const showNotification = (message, timeout, type) => {
        if(!message || !timeout) return true;
        setNotification({isOpen: true, message: message, timeout: timeout, type: type});
    }

    const handleCloseNotification = () => {
        setNotification({isOpen: false, message: '', timeout: 0});
    };

    const handleDrawerToggle = () => {
        setIsMobileOpenSideBar(!isMobileOpenSideBar);
    };

    return (
        <ThemeProvider theme={exmixThemes}>
            <Router>
                <ButtonAppBar handleDrawerToggle={handleDrawerToggle}/>
                <Sidebar isMobileOpenSideBar={isMobileOpenSideBar} handleDrawerToggle={handleDrawerToggle} />
                <Container maxWidth="xl">
                    
                    <div id="main-content" className={matches ? classes.mainMargin : classes.root}>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/thong-tin-ki-thi" exact>
                                <ExamForm showNotification={showNotification}/>
                            </Route>
                            <Route path="/them-cau-hoi" exact>
                                <QuestionForm showNotification={showNotification} />
                            </Route>
                            <Route path="/sua-cau-hoi/:questionId">
                                <QuestionForm showNotification={showNotification} />
                            </Route> 
                            <Route path="/danh-sach-cau-hoi" exact>
                                <QuestionsList />
                            </Route>
                            <Route path="/tron-cau-hoi" exact>
                                <Mixing />
                            </Route>
                            <Route path="/ket-qua-tron" exact>
                                <MixingList />
                            </Route>
                            <Route path="/nap-cau-hoi" exact>
                                <UploadQuestion />
                            </Route>
                        </Switch>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={notificationInf.isOpen}
                        autoHideDuration={notificationInf.timeout}
                        onClose={handleCloseNotification}
                        message={notificationInf.message}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    >
                        <Alert onClose={handleCloseNotification} severity={notificationInf.type}>
                            {notificationInf.message}
                        </Alert>
                    </Snackbar>
                </Container>
            </Router>
        </ThemeProvider>
    )
}

export default Main;

