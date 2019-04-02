import React, {Component} from 'react';
import { connect } from 'react-redux';
import avatar from '../icons/person.svg';

class Leaderboard extends Component{
    render(){
        const users = this.props.users;

        return(
            <div className="home-outer">
                <ul className="score">
                {users.map(user => 
                    <li key={user.id}>
                        <div className="user-score" >
                            <img src={avatar} alt={user.name} />
                            <h3>{user.name}</h3>
                        </div>
                        <div className="user-score" >
                            <h4>Answered Questions: {user.questions.length}</h4>
                            <h4>Created Questions:  {Object.keys(user.answers).length}</h4>
                        </div>
                        <div className="user-score">
                            <h3>Score : {user.questions.length + Object.keys(user.answers).length}</h3>
                        </div>
                        <div style={{clear:'both'}}></div>
                    </li>
                )}
                </ul>
            </div>
        )
    }
}

export default connect((state) => ({
    users: state.users,
    questions: state.questions
}))(Leaderboard);