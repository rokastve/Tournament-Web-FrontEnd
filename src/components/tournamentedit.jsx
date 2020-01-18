import React, {Component} from 'react';
import axios from 'axios';

class TournamentEdit extends Component {
    state ={
        Id: this.props.match.params.id,
        edited: false,
    }
    changeEvent = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    config = {
        headers: {'Authorization': "bearer " + localStorage.getItem("token")}
    };
    tournamentEdit = e =>{
        console.log("patchinu");
        console.log(this.config.headers)
        e.preventDefault();
        axios.put('https://localhost:44312/api/tournament/'+this.state.Id, this.state, this.config)
          .then(response =>{ console.log(response)
          })
          .catch(error =>{
            console.log(error.response);
          })
    }
    componentDidMount() {
        fetch('https://localhost:44312/api/tournament/'+this.state.Id)
        .then(res => res.json())
        .then(data => {
            this.setState({Title:data.name})
          this.setState({Name:data.name})
          this.setState({Description:data.description})
          this.setState({capacity:data.capacity})
          this.setState({Regions:data.region})
          this.setState({Start:data.start})
        })
        .catch(error => console.log(error))
      }
  render(){
  return (
      <div className="container">
    
  <h2>Tournament {this.state.Title} update</h2>
  <form className='form' onSubmit={this.tournamentEdit}>
  <             div className='form-field'>
                    <h3>Name</h3>
                    <input name='Name' type='text' value={this.state.Name} onChange={this.changeEvent}/>
                </div>
                <div className='form-field'>
                    <h3>Description</h3>
                    <input name='Description' type='text' value={this.state.Description} onChange={this.changeEvent}/>
                </div>
                <div className='form-field'>
                    <h3>Region</h3>
                    <select name="Region" value={this.state.region} onChange={this.changeEvent}>
                    <option value="EUW">EUW</option>
                    <option value="EUNE">EUNE</option>
                    <option value="NA">NA</option>
                    <option value="OCE">OCE</option>
                    </select>
                </div>
                <div className='form-field'>
                    <h3>Capacity</h3>
                    <input name='capacity' type='number' value={this.state.capacity} onChange={this.changeEvent}/>
                </div> 
                <div className='form-field'>
                    <h3>Start Date</h3>
                    <input name='Start' type="datetime-local" value={this.state.Start} onChange={this.changeEvent}/>
                </div>
                <br/>
                <div className='form-field'>
                    <input className='submit-button ' type='submit' value='Update'/>
                    </div>
                    </form>
                </div>
  )
  }
}

export default TournamentEdit;
