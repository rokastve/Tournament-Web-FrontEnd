import React, {Component} from 'react';
import TournamentList from './tournamentlist';

class LandingPage extends Component {
  render(){
  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>This is tournament website, there are some testing tournaments at the moment. You can create teams, register for tournaments.
        There are a lot of issues with current implementation. Please be patient.
      </p>
      <h1>Current Tournaments</h1>
      <p>There are three most current tournaments. For more tournaments go to our tournament list</p>
      <TournamentList isMain={true}/>
    </div>
  )
  }
}

export default LandingPage;
