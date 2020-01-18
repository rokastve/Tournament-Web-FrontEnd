import React, {Component} from 'react';
import Tournament from './tournamentitem';

class TournamentList extends Component {
    state = {
        test: []
      }
      
      componentDidMount() {
        fetch('https://localhost:44312/api/tournament')
        .then(res => res.json())
        .then((data) => {
          data.sort(function(a,b){
            return new Date(a.start) - new Date(b.start); //sorts by date ascending
          });
          this.setState({ test: data })
        })
        .catch(console.log)
      }
  render(){
  return (
    <div className="tournament-box">
      <div className="row">
        {this.props.isMain?this.state.test.slice(0,3).map(item => 
      <Tournament key={item.id} data={item}/>):this.state.test.map(item => 
      <Tournament key={item.id} data={item}/>)
      }
      </div>
      </div>
  )
  }
}

export default TournamentList;
