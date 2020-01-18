import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Teams extends Component {
    state = {
        teams: [],
        error: false
      }
    token= localStorage.getItem("token");
      
      componentDidMount() {
        fetch('https://localhost:44312/api/team',{ headers: {"Authorization" : `Bearer ${this.token}`} })
        .then(res => res.json())
        .then((data) => {
          this.setState({ teams: data })
        })
        .catch(error =>{
            console.log(error)
            
            this.setState({ error: true })
        })
      }
  render(){
      const teams = this.state.teams;
      const error = this.state.error;
      if(error)
      {
        return <Redirect to="/404"/>
      }
  return (
      <div>
      {teams?teams.map(item => 
      <div>{item.name}</div>
      ):null}
      </div>
  )
  }
}

export default Teams;
