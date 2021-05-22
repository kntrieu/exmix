import React from 'react';
import Container from '@material-ui/core/Container';
import ButtonAppBar from '../AppBar';
import Wizart from '../Wizart';
import AddQuestions from '../Questions';
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
            <Container maxWidth="sm">
                <div id="main-content" className={classes.mainMargin}>
                    <Switch>
                        <Route path="/" exact component={Wizart} />
                        <Route path="/addQuestions" exact component={AddQuestions} />
                    </Switch>
                </div>
            </Container>
        </Router>
    )
}

export default Main;

