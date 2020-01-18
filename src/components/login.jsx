import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);   
  }
  handleLogin(){
    this.props.loginHandler(); 
  }
    state = {
        Username: '',
        Password: '',
        alert: '',
        alertName: '',
        showing: false,
        loggedIn: false
    };

    changeEvent = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    showMsg = (msg, alertName) =>{
        this.setState({showing: true})
        this.setState({alert: msg})
        this.setState({alertName: alertName})
    }
    loginSubmit = e =>{
        e.preventDefault();
        axios.post('https://localhost:44312/api/auth', {Username:this.state.Username, Password:this.state.Password})
          .then(response => {
            localStorage.setItem("username", response.data.curr.username)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.curr.role)
            this.showMsg("Logged in", 'alert-success');
            this.handleLogin();
            this.setState({loggedIn: true})
          })
          .catch(error =>{
            //console.log(error.response);
            this.showMsg(error.response.data?error.response.data:null, 'alert-danger');
          })
    }
    



  render(){
    const { showing, loggedIn } = this.state;
    if(loggedIn === true){
      return (<Redirect to="/"/>);
  }
  return (
    
      <div className="container">
          {showing?
    <div className={'alert '+ this.state.alertName} role="alert">
    {this.state.alert}
    </div>:null}
    <form className='form' onSubmit={this.loginSubmit}>
                <div className='form-field'>
                    <h3>Username</h3>
                    <input name='Username' type='text' value={this.state.username} onChange={this.changeEvent}/>
                </div>
                <div className='form-field'>
                    <h3>Password</h3>
                    <input name='Password' type='password' value={this.state.password} onChange={this.changeEvent}/>
                </div>
                <br/>
                <div className='form-field'>
                    <input className='submit-button ' type='submit' value='Login'/>
                </div>

            </form>
            </div>
    )
  }
}

export default Login;
