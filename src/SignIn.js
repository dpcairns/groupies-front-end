import React, { Component } from 'react'
import request from 'superagent'
import './SignIn.css'


export default class SignIn extends Component {

    state = {
        usernameSignIn: '',
        passwordSignIn: '',
        isSignUp: false,
        loading: false
        
    }

    handleSignIn = async (e) => {
        e.preventDefault();
        if(!this.state.loading){
            this.setState({loading: true})
            await request
            // this call should probably live in api.js
                .post(`https://vast-ravine-67223.herokuapp.com/api/auth/signin`, {
                email: this.state.usernameSignIn,
                password: this.state.passwordSignIn,
                })
                // why not use async/await here?
                .then(signIn => {
                    localStorage.setItem('user', JSON.stringify(signIn.body));
                    this.props.history.push('/concerts');
                })
                .catch(err => {
                    alert(err)
                })
            this.setState({loading: false})
        }
    }


    render() {
        return (    
            <div className="signin-container">
                <form className="signin-form" onSubmit={this.handleSignIn}>
                    <input type="text" value={ this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value})} placeholder="Email" required/>
                    <br/>
                    <input type="password" value={ this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value})} placeholder="Password" required/>
                
                    <br/>   
                    <button type="submit">Sign In</button> 
                </form>    
                
            </div>
        )
    }
}