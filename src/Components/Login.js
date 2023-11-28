import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuthState, login } from '../Actions/Auth';
import { history } from '../Helpers/Utils';

export class Login extends Component {
  constructor(props) {
    super(props);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this); // required with simple function
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleEmailInput = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePasswordInput = (event) => {
    this.setState({ password: event.target.value });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { pathname } = history.location || {  pathname: '/'  };
    

    if(isLoggedIn){
      return <Navigate to={pathname}/>; 
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailInput}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordInput}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Login In...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
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

export default connect(mapStateToProps)(Login);
