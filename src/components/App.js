import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { handleInitialData } from '../actions/shared';
import {addLoggedinUser} from '../actions/loggedUser';
import {saveQuestion} from '../actions/questions';

import '../App.css';
import UserSelection from './UserSelection';
//import store from './store';
//import {_getUsers, _getQuestions,_saveQuestion} from '../_DATA';
import Home from './Home';
import Leaderboard from './Leaderboard';
import CreateQuestion from './CreateQuestion';
import Question from './Question';

class App extends Component {
  state = {
    users:{}, 
    loggedInUser:{},
    questions:{}
  };
  
  componentDidMount = () => {

    //const {dispatch} = this.props;
    this.props.dispatch(handleInitialData());

    /*Promise.all([
      _getUsers(),
      _getQuestions()
    ]).then((results) => {
        const allUsers = Object.values(results[0]);
        const userObject = Object.assign([],allUsers);
        const userArray = Object.keys(userObject).map(u=>userObject[u]);

        const allQuestions = Object.values(results[1]);
        const questionObject = Object.assign([],allQuestions);
        const questionArray = Object.keys(questionObject).map(u=>questionObject[u]);
        
        this.setState(() => ({
          users: userArray,
          questions: questionArray
        }))
      }
    )*/
  }
  
  setLoggedInUser = (user) =>{
    const thisUser = this.props.users.filter(u => u.id === user);
    console.log(thisUser);
    //this.setState(() => ({loggedInUser: thisUser[0]}));
    //this.props.loggedInUser = thisUser;
    this.props.dispatch(addLoggedinUser(thisUser));
    console.log(this.props);
  }
  // addQuestion = (questionData) =>{
  //   const question = {
  //     optionOneText: questionData.option1,
  //     optionTwoText: questionData.option2, 
  //     author: this.props.loggedInUser.id
  //   }
  //   Promise.all([
  //     _saveQuestion(question)
  //   ]).then((results) => {
  //     console.log(results);
  //     this.props.history.push('/');
  //   }).catch((results) => {
  //     console.log(results);
  //     alert("There was an error. Please try again.");
  //   })
    
  // }

  addQuestion = (questionData) =>{
    const question = {
      optionOneText: questionData.option1,
      optionTwoText: questionData.option2, 
      author: this.props.loggedInUser.id
    }
    this.props.dispatch(saveQuestion(question, (results)=> {
      console.log(results);
      this.props.history.push('/');
    }));

    // ]).then((results) => {
    //   console.log(results);
    //   this.props.history.push('/');
    // }).catch((results) => {
    //   console.log(results);
    //   alert("There was an error. Please try again.");
    // })
    
  }

  render() {
    //const {datastore} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          Would You Rather?
        </header>
        {
          (this.props.loggedInUser.length === 0) ?  
          (<div>
            <h1>LOGIN</h1>
            
            <UserSelection users={this.props.users} setLoggedInUser={this.setLoggedInUser}/>
          </div>) : (
            <div>
              <header className="App-header">
                <div style={{flex:'1'}}>
                  <Link to='/'>HOME</Link>&nbsp;
                  <Link to='/leaderboard'>LEADERBOARD</Link>&nbsp;
                  <Link to='/ask'>ASK A QUESTION</Link>&nbsp;
                </div>
                <div style={{flex:'1'}}>
                  Welcome {this.props.loggedInUser.name}
                </div>
            </header>
            
            <Route exact path="/" render={() => (
              <Home users={this.props.users} questions={this.props.questions} loggedInUser={this.props.loggedInUser}/>
            )}/>
            
            <Route path="/leaderboard" render={() =>(
              <Leaderboard users={this.props.users}/>
            )}/>
            <Route path="/ask" render={( {history} ) =>(
              <CreateQuestion addQuestion={this.addQuestion}/>
              
            )}/>
            <Route path={`/questions/:question_id`} component={Question} /> 
          </div>)
          }

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

const mapDispatchToProps = (dispatch) => {
  return{
    setLoggedInUser: (user) => dispatch(addLoggedinUser(user))
  }
}

export default withRouter(connect(mapStateToProps)(App))

/**
 * 
 * , (dispatch) => {
  return{
    setLoggedInUser: (user) => dispatch(actions.addLoggedinUser(user))
  }
}
 */