import React from 'react';
import Container from '@material-ui/core/Container';
import ButtonAppBar from '../AppBar';
import Wizart from '../Wizart';
import AddQuestions from '../Questions';
import QuestionsList from '../Questions/QuestionsList'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainMargin: {
      marginTop: '50px',
    }
  }));

const Main = () => {
    const classes = useStyles();
    return (
        <Router>
            <ButtonAppBar/>
            <Container maxWidth="lg">
                <div id="main-content" className={classes.mainMargin}>
                    <Switch>
                        <Route path="/" exact component={Wizart} />
                        <Route path="/them-cau-hoi" exact component={AddQuestions} />
                        <Route path="/danh-sach-cau-hoi" exact component={QuestionsList} />
                    </Switch>
                </div>
            </Container>
        </Router>
    )
}

export default Main;

