import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../Actions/Posts';
import { Home, Navbar, Page404, Login, Signup, Setting } from './';
import { authenticateUser } from '../Actions/Auth';
import { history, getAuthTokenFromLocalStorage } from '../Helpers/Utils';
import UserProfile from './UserProfile';
import { fetchUserFriends } from '../Actions/Friends';

class App extends Component {
  componentDidMount() {
    let token = getAuthTokenFromLocalStorage();
    let user;
    if (token) {
      user = jwtDecode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          name: user.name,
          email: user.email,
          _id: user._id,
        })
      );
      this.props.dispatch(fetchUserFriends());
    }
    this.props.dispatch(fetchPosts());
  }

  render() {
    // console.log('props', this.props);
    //private router
    // const {posts, friends, auth} = this.props;

    const PrivateWrapper = () => {
      const { auth } = this.props;
      history.location = useLocation();
      // console.log('history.location', history.location);
      return auth.isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to={{ pathname: '/login' }} />
      );
    };

    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404 />} />
            <Route
              path="/"
              element={
                <Home
                  {...this.props}
                  // posts={posts}
                  // friends={friends}
                  // isLoggedin={auth.isLoggedin}
                />
              }
              // render={(props) => {
              //   return <Home {...props} posts={this.props.posts} />;
              // }}
            />
            <Route element={<PrivateWrapper />}>
              <Route path="/setting" element={<Setting />} />
              <Route path="/user">
                <Route path=":userId" element={<UserProfile />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
