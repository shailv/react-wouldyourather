import React from 'react';
import { connect } from 'react-redux';
import ListQuestions from './ListQuestions';

/**
 * @description Display answered and unanswered questions
 */
function Home(props) {
    const loggedInUser = props.loggedInUser;
    var answeredArray = {};
    var unansweredArray = {};

    //filter answered and unanswered questions
    if (loggedInUser.answers !== undefined) {
        const answers = Object.keys(loggedInUser.answers);
        answeredArray = (props.questions.filter(q => answers.includes(q.id)));
        unansweredArray = props.questions.filter(q => !answers.includes(q.id));
    }

    return (
        <div className="home-outer">
            <div className="home-columns">
                <h3>Answered Questions</h3>
                <ListQuestions questionsArray={answeredArray} users={props.users} />
            </div>
            <div className="home-columns">
                <h3>Unanswered Questions</h3>
                <ListQuestions questionsArray={unansweredArray} users={props.users} />
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    loggedInUser: state.loggedInUser,
    users: state.users,
    questions: state.questions
})

export default connect(mapStateToProps)(Home)

