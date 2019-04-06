import React from 'react';
import { connect } from 'react-redux';
import avatar from '../icons/person.svg';

/**
 * @description Leaderboard with user scores
 */
function Leaderboard(props) {
    const users = props.users;
    //sort users by score
    users.sort(function (a, b) { return (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length) });
    return (
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
                        <div style={{ clear: 'both' }}></div>
                    </li>
                )}
            </ul>
        </div>
    )

}

export default connect((state) => ({
    users: state.users,
    questions: state.questions
}))(Leaderboard);