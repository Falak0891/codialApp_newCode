import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../Actions/Auth';
export class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
      
    };
  }
  
  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };
  handleSave = (e)=>{
    e.preventDefault();
    const{name, password, confirmPassword} = this.state;
    const {user} = this.props.auth;
  
    this.props.dispatch(editUser(name,password,confirmPassword,user._id));
    
  };
  
  componentWillUnmount() {
    
     
    this.props.auth.error = null;
   
     
  };
  
  render() {
    const { user,error } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user-dp"
          />
        </div>
        {error && <div className='alert error-dailog'>{error}</div>}
        {error === false && (<div className='alert success-dailog'>Successfully Updated Profile!</div>)}
        <div className="field">
          <div className="field-lable">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-lable">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>
        {editMode && (
          <div className="field">
            <div className="field-lable">New Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange('password', e.target.value)}
              value={this.state.password}
            />
          </div>
        )}
        {editMode && (
          <div className="field">
            <div className="field-lable">Confirm Password</div>
            <input
              type="password"
              onChange={(e) =>
                this.handleChange('confirmPassword', e.target.value)
              }
              value={this.state.confirmPassword}
            />
          </div>
        )}
        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn" onClick={this.handleSave}>Save</button>
          ) : (
            <button
              className="button edit-btn"
              onClick={() => this.handleChange('editMode', true)}
            >
              Edit Profile
            </button>
          )}
          {editMode && (
            <div
              className="go-back"
              onClick={() => this.handleChange('editMode', false)}
            >
              Go back
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Setting);
