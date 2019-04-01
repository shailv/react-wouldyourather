import React, {Component} from 'react';

class UserSelection extends Component{
    login = (e) => {
        e.preventDefault();
        this.props.setLoggedInUser(this.select.value);
    }
    render(){
        const users = this.props.users;
        return(
            <div>
                {users && users.length > 0 && 
                <div>
                    <select ref={(selectedUser) => this.select = selectedUser}>
                        {users.map(user => 
                        <option key={user.id} value={user.id}>{user.name}</option>
                        )}
                    </select><br/>
                    <button onClick={this.login}>Login</button>
                </div>
                }
            </div>
        )
    }
}

export default UserSelection;