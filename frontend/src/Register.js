import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (

      <div className="auth">
      <div className="auth-container">
         <div className="auth-logo">
      
         </div>
        <form action="" className="auth-form">
        <h1>Actimi Club </h1>
        <h3>Register</h3>
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


        <div className="auth-input">
          <label for="conf password">
            Confirm Password
          </label>
          <TextField
            style = {{width: "100%"}}
            InputProps={{ disableUnderline: true }}
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
        </div>

          <Button
            className="auth-btn"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
        </form>
        <div className="auth-bottom">
          Already have an account
          <Link href="/login">
              Sign in
            </Link>
       </div>
    </div>
  </div>

    );
  }
}
