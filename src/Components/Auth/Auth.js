import React, {Component} from 'react';
import Radium from 'radium';
import APIURL from '../../helpers/environment';
import {Button, ButtonGroup, Form, FormGroup, Label, Input} from 'reactstrap';

const styles = {
    card: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: "'Poppins', sans-serif",
      color: '#c1c6cc'
    },
    font: {
      fontFamily: "'Poppins', sans-serif"
    },
    font1: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '3.8rem'
    },
    box: {
      backgroundColor: 'rgba(60, 82, 112, 0.9)',
      borderRadius: '1em',
      paddingLeft: '2em',
      paddingRight: '2em'
    }
}

class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      login: true,
      username: '',
      email: '',
      password: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const url = this.state.login ? `${APIURL}/auth/login` : `${APIURL}/auth/signup`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.setToken(data.sessionToken)
      })
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  loginToggle = (event) => {
    event.preventDefault();
    const login = this.state.login;
    this.setState({
      login: !login,
      username: '',
      email: '',
      password: ''
    })
  }

  render(){
    let title = this.state.login ? "gearLocker Login" : "Signup for gearLocker";
    let button = this.state.login ? "Signup" : "Login";
    let signupField = this.state.login
      ? null
      : (
        <div>
          <Label htmlFor="username" /><br/>
          <Input type="text" id="username" onChange={this.handleChange} value={this.state.username} style={styles.font}  placeholder='Username:' required minLength='4'/>
        </div>
      )
    
    return(
      <Form style={styles.card} onSubmit={this.handleSubmit}>
        <FormGroup style={styles.box}>
          <h1 style={styles.font1}>{title}</h1>
          <Label htmlFor="email" /><br/>
          <Input type="email" id="email" onChange={this.handleChange} value={this.state.email} style={styles.font} placeholder='Email:' required/>
          {signupField}
          <Label htmlFor="password" />
          <Input type="password" id="password" onChange={this.handleChange} value={this.state.password} style={styles.font} placeholder='Password:' required minLength='5' /><br/>
          <ButtonGroup>
            <Button className="btn btn-secondary" size="lg" style={styles.font} onClick={this.loginToggle}>{button}</Button>
            <Button className="btn btn-secondary" size="lg" style={styles.font} type="submit">Submit</Button>
          </ButtonGroup>
        </FormGroup>
      </Form>
    )
  }
}

export default Radium(Auth);
