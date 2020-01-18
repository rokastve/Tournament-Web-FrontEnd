import React, {Component} from 'react';
import './App.css';
import NavBar from './components/navbar';
import Footer from './components/footer';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);   
    this.handleLogin = this.handleLogin.bind(this);   
  }
  handleLogin(){
    this.setState({loggedIn: true});
  }
  handleLogout(){
    localStorage.clear(); 
    this.setState({loggedIn: false});
  }
  componentWillMount(){
    if(localStorage.getItem('token') != null){
        this.setState({loggedIn: true}); 
    }
    else{
        this.setState({loggedIn: false}); 
    } 
}
  render(){
  return (
    <div className="App">
      <NavBar currState={this.state} logOutHandler={this.handleLogout} loginHandler={this.handleLogin}/>
      <Footer/>
    </div>
  );
  }
}

export default App;
