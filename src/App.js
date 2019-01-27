import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Sitebar from './Components/Navbar/Navbar';
import Auth from './Components/Auth/Auth';
import Locker from './Components/Locker/Locker';
// import GearTable from './Components/Locker/GearTable';
import Background from './assets/20170706_151624.jpg';

import{
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';

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
      this.setState({setToken: token})
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

  // getToLocker = () => {
  //   if(this.state.sessionToken === localStorage.getItem('token')) {
  //     return(
  //       <Switch>
  //         <Route path='/' exact>
  //           <Locker />
  //         </Route>
  //       </Switch>
  //     )
  //   } else {
  //     return (
  //     <Route path='/Auth'>
  //       <Auth setToken={this.setSessionState} />
  //     </Route>
  //     )
  //   }
  // }

  render() {
    const protectedViews = !this.state.sessionToken ? <Auth setToken={this.setSessionState} /> : <Locker />
    return (
      <Router>
      <div className="App" style={bgImage}>
        <Sitebar />
        {protectedViews}
        {/* <GearTable /> */}
        {/* {this.getToLocker()} */}
      </div>
      </Router>
    );
  }
}

export default Radium(App);