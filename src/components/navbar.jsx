import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './register';
import LandingPage from './landingpage';
import Login from './login';
import TournamentPage from './tournamentpage';
import Teams from './teams';
import Users from './users';
import ErrorPage from './error';
import logo from '../images/logo.svg'
import Tournaments from './tournaments';
import TournamentCreate from './tournamentcreate';
import Profile from './profile';
import TournamentEdit from './tournamentedit';

class NavBar extends Component {
  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this); 
    this.handleLogin = this.handleLogin.bind(this); 
}
handleLogin(){
  this.props.loginHandler(); 
}
handleLogout(){
    localStorage.clear();
    this.props.logOutHandler(); 
}

  render(){
    const role = localStorage.getItem("role");
    const logged = this.props.currState.loggedIn;
  return (
    <Router>
      <header className="sticky-top">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
  <img className="navbar-brand svglogo unselectable"src={logo} alt="logo"></img>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
    <ul className="navbar-nav ">
      <li className="nav-item float-sm-right">
        <Link to="/" className="text-light nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/tournaments" className="text-light nav-link">Tournaments</Link>
      </li>
      {(role === "Admin"||role==="Moderator")&&logged?
      <li className="nav-item">
        <Link to="/users" className="text-light nav-link">Users</Link>
      </li>:null}
      {role !== null?
      <li className="nav-item">
        <Link to="/teams" className="text-light nav-link">Teams</Link>
      </li>:null}
      {logged?
        <li>
          <div className="text-light nav-link font-weight-bold bg-secondary top-panel1">Current user: {localStorage.getItem("username")}</div>
        </li>
        :null
      }
      {logged?
        <li>
          <div className="text-light nav-link font-weight-bold bg-secondary top-panel2">Role: {localStorage.getItem("role")}</div>
        </li>
        :null
      }
      {logged?
        
        <li>
          <button className="ml-2 nav-link text-dark font-weight-bold btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </li>
        :null
      }
      {!logged?
      <li className="nav-item">
        <Link to="/register" className="text-light nav-link">Register</Link>
      </li>:null}
      {!logged?
      <li className="nav-item">
        <Link to="/login" className="text-light nav-link">Login</Link>
      </li>:null}
    </ul>
  </div>
</nav>
</header>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/profile" component = {Profile}/>
          <Route exact path="/gameacc" component = {Profile}/>
          <Route exact path="/register" component = {Register}/>
          <Route exact path="/teams" component = {Teams}/>
          <Route exact path="/users" component = {Users}/>
          <Route path="/login">
            <Login loginHandler={this.handleLogin}/>
          </Route>
          <Route exact path="/tournaments" component = {Tournaments}/>
          <Route exach path="/tournament/:id" component={TournamentPage}/>
          <Route exach path="/tournaments/create" component={TournamentCreate}/>
          <Route exach path="/tournaments/edit/:id" component={TournamentEdit}/>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/404" component = {ErrorPage}/>
        </Switch>
    </Router>
  );
  }
}

export default NavBar;
