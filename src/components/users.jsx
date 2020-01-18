import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';

class Users extends Component {
    state = {
        users: [],
        error: false,
        current: null
      }
    token= localStorage.getItem("token");
    config = {
        headers: {'Authorization': "bearer " + this.token}
    };
      remove = (id) =>{
          this.setState({current:id})
      }
      reset = () =>{
          this.setState({current:null})
      }
      confirm = () =>{
        axios.delete(('https://localhost:44312/api/player/'+this.state.current),this.config)
        .then(response => {
          this.setState({success: true})
        })
        .catch(error =>{
          console.log(error.response);
          //this.showMsg(error.response.data?error.response.data:null, 'alert-danger');
        })
      }
      componentDidMount() {
        fetch('https://localhost:44312/api/player',{ headers: {"Authorization" : `Bearer ${this.token}`} })
        .then(res => res.json())
        .then((data) => {
          this.setState({ users: data })
        })
        .catch(error =>{
            console.log(error)
            
            this.setState({ error: true })
        })
      }
  render(){
      const users = this.state.users;
      const error = this.state.error;
      if(error)
      {
        return <Redirect to="/404"/>
      }
  return (
      <div className="container">
          
      {users?users.map(item => 
      <div className="row mt-1">
       <div className="col-3 col-md-2">{item.username}</div> 
       <div className="col-3 col-md-2">{item.region}</div> 
       <button className="btn btn-danger col-3 col-md-2 " data-toggle="modal" data-target="#exampleModalCenter" onClick={(id) => { this.remove(item.id) }}>Remove</button> 
      </div>):null}

<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="modal-header">
<h5 className="modal-title" id="exampleModalLongTitle">Delete confirmation</h5>
<button onClick={() => { this.reset() }} type="button" className="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div className="modal-body">
Do you really want to delete this player?
</div>
<div className="modal-footer">
<button type="button" className="btn btn-secondary" data-dismiss="modal"onClick={() => { this.reset() }}>Cancel</button>
<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.confirm() }}>Confirm</button>
</div>
</div>
</div> 
</div>
</div>
  )
  }
}
export default Users;
