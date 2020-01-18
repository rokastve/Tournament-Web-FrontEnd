import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";

class TournamentItem extends Component {
  render(){
    const date = new Date(this.props.data.start);
    const str = date.toISOString().slice(0, 16).replace(/-/g, "/").replace("T", " ");
    const role = localStorage.getItem("role")?localStorage.getItem("role"):null;
  return (
    
  <div className="col-md-4 col-sm-12">
    <div className="card">
      <div className="img-hover-zoom img-hover-zoom--xyz">
    <img className="card-img-top tournament-logo" src={this.props.data.logo} alt={this.props.data.name+"Tournament logo"}/>
    </div>
        <div className="card-body">
          <h3 className="card-title">{this.props.data.name}</h3>
          <p className="card-text">{this.props.data.description}</p>
          <p>Start Date: {str}</p>
          <p>Current teams: {this.props.data.participants.length}/{this.props.data.capacity}</p>
          {role?
          (<Link to={"/tournament/"+this.props.data.id} className="btn-primary btn tournament-button">Go to</Link>
        ):null}
        </div>
    </div>
    </div>
  );
  }
}

export default TournamentItem;
