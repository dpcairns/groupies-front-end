import React, { Component } from 'react'
import request from 'superagent'
import './SignUp.css'

export default class LogIn extends Component {

    state = {
        
        username: '',
        password: '',
        email: '',
        city: '',
        loading: false
            
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        if(!this.state.loading){
            this.setState({loading: true})
            await request
                // this call should probably live in api.js
                .post(`https://vast-ravine-67223.herokuapp.com/api/auth/signup`, {
                    display_name: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    location: this.state.city
                })
                // why not use async/await here?
                .then(signUp => {
                    localStorage.setItem('user', JSON.stringify(signUp.body));
                    this.props.history.push('/concerts');
                })
                .catch(err => {
                    alert(err)
                })
            this.setState({loading: false})
        }
    }

    render() {
        console.log(this.props, 'signup props');
        
        return (
            <div className="signup-container">
                <form className="signup-form" onSubmit={ this.handleSignUp }>
                    <input type="text" value={ this.state.username} onChange={(e) => this.setState({ username: e.target.value})} placeholder="Username" required/>
                    <br />
                    <input type="email" value={ this.state.email} onChange={(e) => this.setState({ email: e.target.value})} placeholder="Email" required/>
                    <br />
                    <input type="password" value={ this.state.password} onChange={(e) => this.setState({ password: e.target.value})} placeholder="Password" required/>
                    <br />
                    <input type="text" value={ this.state.city} onChange={(e) => this.setState({ city: e.target.value})} placeholder="City" required/>
                    <br />
                    <button id="signup-button" >Sign up</button>  
                    <br />
                
                </form>
            </div>
        )
    }
}
