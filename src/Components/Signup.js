import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { signup, startSignup , clearAuthState} from '../Actions/Auth';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleConfirmPassword = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  handleName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('state', this.state);

    let { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
      this.props.dispatch(startSignup());
      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    if(isLoggedIn){
      return <Navigate to='/'/>; 
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            onChange={this.handleEmail}
            value={this.state.email}
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="field">
          <input
            onChange={this.handlePassword}
            value={this.state.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="field">
          <input
            onChange={this.handleConfirmPassword}
            value={this.state.confirmPassword}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="field">
          <input
            onChange={this.handleName}
            value={this.state.name}
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button disabled={inProgress} onClick={this.handleFormSubmit}>
              Signing Up..
            </button>
          ) : (
            <button disabled={inProgress} onClick={this.handleFormSubmit}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Signup);
