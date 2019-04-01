import React,{Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import avatar from '../icons/person.svg';

class ListQuestions extends Component{
    render(){
        const questionsArray = this.props.questionsArray;
        const usersArray = this.props.users;

        return(
            <div className="home-outer">
                <ul className="questions">
                    {questionsArray.map(q => 
                        <li key={q.id}>
                            {usersArray.filter(u => u.id === q.author).map(u => 
                                <div key={u.id}>
                                    <img src={avatar} alt={u.name} />
                                    <h3>{u.name}</h3>
                                </div>
                            )}
                            <h4>Would you rather...</h4>
                            {q.optionOne.text}<br/>
                            <strong>OR</strong><br/>
                            {q.optionTwo.text}<br/>
                           
                            <Link to={`/questions/${q.id}`}>View Poll</Link>

                            {/* <Route path={`/questions/:${q.id}`}>
                                <Question question_id={q.id}/>
                            </Route> */}
                            
                            {/* <button onClick={() => {this.props.history.push(`/questions/:${q.id}`)}}>View Poll</button> */}
                            
                            <hr/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return({
        questions: state.questions,
        users: state.users,
        questionsArray: ownProps.questionsArray
    })
}
    
export default withRouter(connect(mapStateToProps)(ListQuestions));