import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import avatar from '../icons/person.svg';
import serializeForm from 'form-serialize';
import { saveQuestionAnswer } from '../actions/questions';

class ViewPoll extends Component{
    // constructor(props){
    //     super(props);
    //     //this.answerPoll = this.answerPoll.bind(this);
    // }
    answerPoll = (thisQuestion, e) => {
        e.preventDefault();

        const formValues = serializeForm(e.target,{hash:true});
        const userid = this.props.loggedInUser.id;
        const savedAnswer = {
            authedUser: userid, 
            qid: thisQuestion.id, 
            answer: formValues.answer
        }
        this.props.dispatch(saveQuestionAnswer(savedAnswer, ()=>{
             //redirect to homepage
             this.props.history.push('/');
         } ));
        //(user,questionID,answer, callback)
    }
    render(){
        console.log(this.props)
        var question_id = "";
        if(this.props.match !== null){
            question_id = (this.props.match.params.question_id).toString().replace(":","");
        }
        const thisQuestion = this.props.questions.filter(q => q.id === question_id)[0];
        const loggedUser = this.props.loggedInUser;
        console.log(thisQuestion)
        const optionOneLength = thisQuestion.optionOne.votes.length;
        const optionTwoLength = thisQuestion.optionTwo.votes.length;
        const optionOnePercent = optionOneLength/(this.props.users.length) * 100;
        const optionTwoPercent = optionTwoLength/(this.props.users.length) * 100;

        return(
            <div className="home-outer">
                {(thisQuestion !== undefined) && this.props.users.filter(u => u.id === thisQuestion.author).map(u => 
                <div className="view-poll" key={u.id}>
                    <div>
                        <img src={avatar} alt={u.name} /><h3>{u.name}  asked: </h3>
                    </div>
                   
                    {/* User has answered this question */}
                    {(Object.keys(loggedUser.answers).includes(question_id)) ? 

                    <div className="votes-outer">
                        <h3>Would you rather...</h3>
                        <div>
                            <strong>{thisQuestion.optionOne.text}</strong>
                            <div className="progress-bar-outer">
                                <div className="progress-bar" style={{width: optionOnePercent + '%'}}>&nbsp;</div>
                            </div>
                            <strong>{thisQuestion.optionOne.votes.length} / {this.props.users.length} votes</strong>
                        </div>
                        <div>
                            <strong>{thisQuestion.optionTwo.text}</strong>
                            <div className="progress-bar-outer">
                                <div className="progress-bar" style={{width: optionTwoPercent + '%'}}>&nbsp;</div>
                            </div>
                            <strong>{thisQuestion.optionTwo.votes.length} / {this.props.users.length} votes</strong>
                        </div>
                    </div>
                    :
                    <div>
                        {/* User has not answered this question */}
                        <form onSubmit={(e) => this.answerPoll(thisQuestion,e)}>
                            <input type="radio" value="optionOne" name="answer"/>{thisQuestion.optionOne.text}<br/>
                            <strong>OR</strong><br/>
                            <input type="radio" value="optionTwo" name="answer"/>{thisQuestion.optionTwo.text}<br/>
                            <button type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                    }

                
                </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state)=> ({
    questions: state.questions,
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default withRouter(connect(mapStateToProps)(ViewPoll));
