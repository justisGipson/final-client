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
        color: '#FFF0FF',
        fontSize: '14pt'

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
      .then(res => res.json())
      .then(data => this.props.tokenHandler(data.sessionToken))
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value}, () => console.log(this.state))
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
    let signupField = this.state.login
      ? null
      : (
        <div>
          <Label htmlFor="username"></Label><br/>
          <Input type="text" id="username" onChange={this.handleChange} value={this.state.username} placeholder='Username:'/><br/>
        </div>
      )

    return(
      <Form style={styles.card} onSubmit={this.handleSubmit}>
        <FormGroup>
          <h1>{title}</h1>
          <Label htmlFor="email"></Label><br/>
          <Input type="text" id="email" onChange={this.handleChange} value={this.state.email} placeholder='Email:'/><br/>
          {signupField}
          <Label htmlFor="password"></Label><br/>
          <Input type="password" id="password" onChange={this.handleChange} value={this.state.password} placeholder='Password:'/><br/>
          <ButtonGroup>
            <Button outline color="secondary" size="lg" onClick={this.loginToggle}>Signup</Button><br/>
            <Button outline color="secondary" size="lg" type="submit">Submit</Button>
          </ButtonGroup>
        </FormGroup>
      </Form>
    )
  }
}

export default Radium(Auth);