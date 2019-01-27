import React, {Component} from 'react';
import Radium from 'radium';
import APIURL from '../../helpers/environment';
import {Button, ButtonGroup, Form, FormText, FormGroup, Label, Input} from 'reactstrap';

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
    font2: {
      fontFamily: "'Poppins', sans-serif",
      color: '#C0A478'
    },
    box: {
      backgroundColor: 'rgb(60, 82, 112, 0.9)',
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
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const url = this.state.login ? `${APIURL}/auth/login` : `${APIURL}/auth/signup`

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
      //.then(res => res.text())
      .then(res => res.json())
      //.then(text => console.log(text))
      .then(data => {
        this.props.setToken(data.sessionToken)
      })
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value}/*, () => console.log(this.state)*/)
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
          <Label htmlFor="username"></Label><br/>
          <Input type="text" id="username" onChange={this.handleChange} value={this.state.username} style={styles.font}  placeholder='Username:'/>
        </div>
      )

    return(
      <Form style={styles.card} onSubmit={this.handleSubmit}>
        <FormGroup style={styles.box}>
          <h1 style={styles.font1}>{title}</h1>
          <Label htmlFor="email"></Label><br/>
          <Input type="text" id="email" onChange={this.handleChange} value={this.state.email} style={styles.font} placeholder='Email:'/>
          <FormText style={styles.font2}>Must be a valid email address!</FormText>
          {signupField}
          <Label htmlFor="password"></Label>
          <Input type="password" id="password" onChange={this.handleChange} value={this.state.password} style={styles.font} placeholder='Password:'/><br/>
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