import React, {Component} from 'react';
import TournamentList from './tournamentlist';
import {Redirect} from "react-router-dom";
class Tournaments extends Component {
    state={
        redirect:false
    }
    redirect= () =>{
        this.setState({ redirect: true })
    }
  render(){
    const role = localStorage.getItem("role")||'';
    if(this.state.redirect === true){
        return <Redirect to="/tournaments/create"/>
    }
  return (
    <div className="container">
        {role==="Admin"?(<div><b>New tournament: </b> <button type="button" className="btn btn-primary mt-2 mb-2" onClick={this.redirect}>Create</button></div>):null
        }     
        <TournamentList isMain={false}/>
    </div>
  )
  }
}

export default Tournaments;
