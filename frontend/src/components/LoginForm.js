import React, { Component, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { login } from "../actions/auth";
import "../App.css";
import axios from "axios";

const LoginForm = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (useSelector((state) => state.auth.isAuthenticated)) {
    return <Navigate to="/" />;
  }

  return (
    <section className="muted-wrap">
      <div className='container pt-5'>
        <div className="shelter-block">
          <h1>Login</h1>
          <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
                required
              />
            </div>
            <button className='btn btn-warning' type='submit'>Login</button>
          </form>
        </div>
        <p className="text-center mt-3">Don't have an account with us? <Link to='/signup' className="text-default">Sign up</Link></p>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
