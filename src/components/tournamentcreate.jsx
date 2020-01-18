import React, {Component} from 'react';
import TournamentList from './tournamentlist';
import axios from 'axios'
import {Redirect} from "react-router-dom";

class TournamentCreate extends Component {
    state = {
        Name: '',
        Description: '',
        capacity: 0,
        Region: 'EUW',
        Start: '',
        alert: '',
        alertName: '',
        Logo: 'https://www.wpclipart.com/travel/US_Road_Signs/info/temporary.png',
        showing: false,
        loggedIn: false,
        
    };
    token = localStorage.getItem("token")||'';
    changeEvent = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    showMsg = (msg, alertName) =>{
        this.setState({showing: true})
        this.setState({alert: msg})
        this.setState({alertName: alertName})
    }
    config = {
        headers: {'Authorization': "bearer " + this.token}
    };
    loginSubmit = e =>{
        e.preventDefault();
        console.log(this.state);
        axios.post('https://localhost:44312/api/tournament', 
           this.state
        ,this.config)
          .then(response => {
            this.showMsg("Success", 'alert-success');
          })
          .catch(error =>{
            console.log(error.response);
            //this.showMsg(error.response.data?error.response.data:null, 'alert-danger');
          })
    }
  render(){
    const token = localStorage.getItem("token")||'';
    const showing = this.state.showing;
  return (
    <div className="container">
          {showing?
    <div className={'alert '+ this.state.alertName} role="alert">
    {this.state.alert}
    </div>:null}
    <form className='form' onSubmit={this.loginSubmit}>
    <div class="row">
                    
                <div className='form-field col-md-12'>
                    <h3>Name</h3>
                    <input name='Name' type='text' value={this.state.name} onChange={this.changeEvent}/>
                </div>
                <div className='form-field col-md-12'>
                    <h3>Description</h3>
                    <input name='Description' type='text' value={this.state.description} onChange={this.changeEvent}/>
                </div>
                <div className='form-field col-md-12'>
                <h3>Logo</h3>
                    <input name='Logo' type='text' value={this.state.Logo} onChange={this.changeEvent}/>
                </div>
                <div className='form-field col-md-12'>
                    <h3>Region</h3>
                    <select name="Region" value={this.state.value} onChange={this.changeEvent}>
                    <option value="EUW">EUW</option>
                    <option value="EUNE">EUNE</option>
                    <option value="NA">NA</option>
                    <option value="OCE">OCE</option>
                    </select>
                </div>
                <div className='form-field col-md-12'>
                    <h3>Capacity</h3>
                    <input name='capacity' type='number' value={this.state.password} onChange={this.changeEvent}/>
                </div> 
                <div className='form-field col-md-12'>
                    <h3>Start Date</h3>
                    <input name='Start' type="datetime-local" value={this.state.password} onChange={this.changeEvent}/>
                </div>
                <br/>
                <div className='form-field col-md-12'>
                    <input className='submit-button ' type='submit' value='Create'/>
                </div>
</div>
            </form>
            </div>
  )
  }
}

export default TournamentCreate;
