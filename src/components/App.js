import React, { Component } from 'react';
import {Route, Link, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import { handleInitialData } from '../actions/shared';
import {addLoggedinUser, userLogout} from '../actions/loggedUser';
import {saveQuestion} from '../actions/questions';

import UserSelection from './UserSelection';
import Home from './Home';
import Leaderboard from './Leaderboard';
import CreateQuestion from './CreateQuestion';
import Question from './Question';
import PageNotFound from './PageNotFound'
import '../App.css';

class App extends Component {
  state = {
    users:{}, 
    loggedInUser:{},
    questions:{}
  };
  
  componentDidMount = () => {
    this.props.dispatch(handleInitialData());
  }
  
  setLoggedInUser = (user) =>{
    const thisUser = this.props.users.filter(u => u.id === user);
    this.props.dispatch(addLoggedinUser(thisUser));
  }

  addQuestion = (questionData) =>{
    const question = {
      optionOneText: questionData.option1,
      optionTwoText: questionData.option2, 
      author: this.props.loggedInUser.id
    }
    this.props.dispatch(saveQuestion(question, (results)=> {
      this.props.history.push('/');
    }));
    
  }
  logout = (e) =>{
    e.preventDefault()
    this.props.dispatch(
      userLogout(this.props.loggedInUser, () => {
        this.props.history.push('/')
      }
    ))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Would You Rather?</h2>
        </header>
        <div className="border-top">
        {
          (Object.keys(this.props.loggedInUser).length === 0) ?  
          (
            <div className="login-outer">
              <h3>LOGIN</h3>
              <UserSelection users={this.props.users} setLoggedInUser={this.setLoggedInUser}/>
            </div>
          ) : (
            <div>
              <header className="App-header">
                <div className="menu">
                  <Link to='/'>HOME</Link>&nbsp;
                  <Link to='/leaderboard'>LEADERBOARD</Link>&nbsp;
                  <Link to='/add' className="last">ASK A QUESTION</Link>&nbsp;
                </div>
                <div className="menu-right">
                  Welcome {this.props.loggedInUser.name} 
                  <Link to='/logout' onClick={this.logout}>Logout</Link>
                </div>
            </header>
            
            <Switch>
              <Route exact path="/" render={() => (
                <Home users={this.props.users} questions={this.props.questions} loggedInUser={this.props.loggedInUser}/>
              )}/>
              
              <Route path="/leaderboard" render={() =>(
                <Leaderboard users={this.props.users}/>
              )}/>
              <Route path="/add" render={( {history} ) =>(
                <CreateQuestion addQuestion={this.addQuestion}/>
                
              )}/>
              <Route path={`/questions/:question_id`} component={Question} /> 
              <Route component={PageNotFound} />
            </Switch>
          </div>)
          }
</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    users: state.users,
    questions: state.questions
  }
}

export default withRouter(connect(mapStateToProps)(App));