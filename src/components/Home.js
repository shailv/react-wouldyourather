import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListQuestions from './ListQuestions';

class Home extends Component {

    render() {
        const loggedInUser = this.props.loggedInUser;
        var answeredArray = {};
        var unansweredArray = {};
        if (loggedInUser.answers !== undefined) {
            const answers = Object.keys(loggedInUser.answers);
            answeredArray = (this.props.questions.filter(q => answers.includes(q.id)));
            unansweredArray = this.props.questions.filter(q => !answers.includes(q.id));
        }

        return (
            <div className="home-outer">
                <div className="home-columns">
                    <h3>Answered Questions</h3>
                    <ListQuestions questionsArray={answeredArray} users={this.users} />
                </div>
                <div className="home-columns">
                    <h3>Unanswered Questions</h3>
                    <ListQuestions questionsArray={unansweredArray} users={this.users} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedInUser: state.loggedInUser,
    users: state.users,
    questions: state.questions
})

export default connect(mapStateToProps)(Home)

