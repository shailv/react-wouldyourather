import React, {Component} from 'react';
import serializeForm from 'form-serialize';
//import { connect } from 'react-redux';

class CreateQuestion extends Component{
    constructor(props){
        super(props);
        this.state={
            validateOptions: true
        }

        this.addQuestion = this.addQuestion.bind(this);
    }
    
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
            <div>
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
        )
    }
}
export default CreateQuestion;

// export default connect = (state) =>({
//     question:state.question
// })(CreateQuestion);

