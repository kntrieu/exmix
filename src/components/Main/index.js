import React from 'react';
import Container from '@material-ui/core/Container';
import ButtonAppBar from '../AppBar';
import Wizart from '../Wizart';
import QuestionForm from '../Questions';
import QuestionsList from '../Questions/QuestionsList';
import Mixing from '../Mixing';
import MixingList from '../Mixing/MixingList';
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
                        <Route path="/them-cau-hoi" exact component={QuestionForm} />
                        <Route path="/sua-cau-hoi/:questionId" component={QuestionForm}/> 
                        <Route path="/danh-sach-cau-hoi" exact component={QuestionsList} />
                        <Route path="/tron-cau-hoi" exact component={Mixing} />
                        <Route path="/ket-qua-tron" exact component={MixingList} />
                    </Switch>
                </div>
            </Container>
        </Router>
    )
}

export default Main;

