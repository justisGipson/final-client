import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Sitebar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Locker from './Components/Locker/Locker';
import Background from './assets/20170706_151624.jpg';

import{ BrowserRouter as Router } from 'react-router-dom';

const bgImage = {
  backgroundImage: `url(${Background})`,
  height: '100vh',
  width: '100vw',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed'
}

class App extends Component {
  constructor(){
    super();
    this.setToken = (token) => {
      localStorage.setItem('token', token);
      this.setState({token})
    }
    this.state = {
      sessionToken: '',
      setToken: this.setToken
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if(token && !this.state.sessionToken){
      this.setState({sessionToken: token});
    }
  }

  logout = () => {
    this.setState({sessionToken: ''});
    localStorage.clear();
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({sessionToken: token});
  }

  render() {
    const protectedViews = !this.state.sessionToken ? <Auth setToken={this.setSessionState} /> : <Locker />
    return (
      <Router>
        <div className="App" style={bgImage}>
          <Sitebar />
            {protectedViews}
            <div>
              <Footer />
            </div>
        </div>
      </Router>
    );
  }
}

export default Radium(App);