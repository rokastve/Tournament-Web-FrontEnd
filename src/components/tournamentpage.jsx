import React, {Component} from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
  
  class TournamentPage extends Component {
    state = {
      test: [],
      Id: this.props.match.params.id,
      success: false,
      edit: false
    }
    config = {
      headers: {'Authorization': "bearer " + localStorage.getItem("token")}
  };
    delete= () =>{
      axios.delete(('https://localhost:44312/api/tournament/'+this.state.Id),this.config)
          .then(response => {
            this.setState({success: true})
          })
          .catch(error =>{
            console.log(error);
            //this.showMsg(error.response.data?error.response.data:null, 'alert-danger');
          })
    }
    editTournament=() =>{
      this.setState({edit: true})
    }

    componentDidMount() {
      fetch('https://localhost:44312/api/tournament/'+this.state.Id)
      .then(res => res.json())
      .then((data) => {
        this.setState({ test: data })
        this.setState({ppl: data.participants.length})
      })
      .catch(console.log)
    }
    render(){
      const role = localStorage.getItem("role");
        const Info = this.state.test;
        if(this.state.success===true){
          return<Redirect to="/tournaments"/>
        }
        
        if(this.state.edit===true){
          return<Redirect to={"/tournaments/edit/"+this.state.Id}/>
        }
    return (
      <div className="container">
        <h3>Name: {Info.name}</h3>
        <h3>Description: {Info.description}</h3>
        <h3>Region: {Info.region}</h3>
        <h3>Current Players: {this.state.ppl}/{Info.capacity}</h3>
        <h3>Start Date: {Info.start}</h3>
        <div className="row">
          {role==="Admin"?(
          <div className="col-2 col-md-1">
            <button type="button" className="btn btn-primary" onClick={this.editTournament}>Edit</button>
          </div>):null}
          {role==="Admin"?(
          <div className="col-2 col-md-1">
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter">Delete</button>
          </div>):null}
          <div className="col-10"></div>
          {this.state.test.participants?this.state.test.participants.map(item=> console.log("abc" + item.name)):null}
        </div> 
        
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Delete confirmation</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Do you really want to delete this tournament?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.delete}>Confirm</button>
      </div>
    </div>
  </div>
</div> 
      </div>      
      
    );
    }
  }

export default TournamentPage;
