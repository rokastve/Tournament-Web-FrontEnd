import React, {Component} from 'react';

class Error extends Component {
  render(){
  return (
    <div class="alert alert-danger" role="alert">
    Error has happened, to go back to main page <a href="/" class="alert-link">click this text</a>.
  </div>
    
  )
  }
}

export default Error;
