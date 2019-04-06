import React, {Component} from 'react';
import serializeForm from 'form-serialize';

/**
 * @description Create a new question
 */
class CreateQuestion extends Component{
    constructor(props){
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.state={
            validateOptions: true
        }
    }
    
    /**
     * @description Send new question values to parent component
     * @param {Object} event
     */
    addQuestion(e){
        e.preventDefault();
        const formValues = serializeForm(e.target,{hash:true});
        if(!formValues.option1 || !formValues.option2){
            this.setState(()=>({validateOptions: false}));
            return false;
        }
        this.props.addQuestion(formValues);
    }
    render(){
        return(
            <div className="home-outer">
                <div className="add-question">
                <form onSubmit={this.addQuestion}>
                    <h4>Would you rather..</h4>
                    <strong>
                        Option 1 - <input type="text" name="option1" placeholder="Option 1"/><br/>
                        OR<br/>
                        Option 2 - <input type="text" name="option2" placeholder="Option 2"/>
                    </strong><br/> 
                    {!this.state.validateOptions && <div>*Please enter values in both options</div>}
                    <button type="submit" >Submit</button>

                </form>
                </div>
            </div>
        )
    }
}
export default CreateQuestion;