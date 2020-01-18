import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        Username: '',
        Password: '',
        alert: '',
        alertName: '',
        showing: false,
        token: ''
    };

    changeEvent = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    showMsg = (msg, alertName) =>{
        this.setState({showing: true})
        this.setState({alert: msg})
        this.setState({alertName: alertName})
    }
    registerSubmit = e =>{
        e.preventDefault();
        axios.post('https://localhost:44312/api/user', this.state)
          .then(response => {
            this.showMsg("Player Added", 'alert-success');
          })
          .catch(error =>{
            this.showMsg(error.response.data, 'alert-danger');
          })
    }

  render(){
    const { showing } = this.state;
  return (
      <div className="container">
          {showing?
    <div className={'alert '+ this.state.alertName} role="alert">
    {this.state.alert}
    </div>:null}
    <form className='form' onSubmit={this.registerSubmit}>
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
                    <input className='submit-button ' type='submit' value='Register'/>
                </div>
            </form>
            </div>
    )
  }
}

export default Register;
