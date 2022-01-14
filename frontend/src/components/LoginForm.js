import '../App.css';
import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {email: "", password: ""};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await axiosInstance.post('/token/obtain/', {
            password: this.state.password,
            username: this.state.email
        });
        axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response.data;
    } catch (error) {
        throw error;
    }
}

  render() {
      return (
          <div>
              Login
              <form onSubmit={this.handleSubmit}>
                  <label>
                      email:
                      <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                  </label>
                  <label>
                      Password:
                      <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                  </label>
                  <input type="submit" value="Submit"/>
              </form>
          </div>
      )
  }
}
export default Login;