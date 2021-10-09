import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {

    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:2000/login', {
      username: this.state.username,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      this.props.history.push('/dashboard');
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (

    <div className="auth">
      <div className="auth-container">
         <div className="auth-logo">
      
         </div>
        <form action="" className="auth-form">
        <h1>Actimi Club <br/> </h1> <h3>Log in</h3>
        <div className="auth-input">
           <label for="email">
           Username
           </label>
           <TextField
            style = {{width: "100%"}}
            InputProps={{ disableUnderline: true }}
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          
        </div>
        <div className="auth-input">
          <label for="password">
            Password
          </label>
          <TextField
            style = {{width: "100%"}}
            InputProps={{ disableUnderline: true }}
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
        </div>

          <Button
            className="auth-btn"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.login}
          >
            Sign in
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
        </form>
      <div className="auth-bottom">
        Don't have an account yet?
        <Link href="/register">
            Register
          </Link>
      </div>
    </div>
  </div>


    
    

       
    );
  }
}
