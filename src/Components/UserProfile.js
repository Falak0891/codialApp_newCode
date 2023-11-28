import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserProfile } from "../Actions/Profile";
import { addFriend, removeFriend } from "../Actions/Friends";
import { APIUrls } from "../Helpers/Urls";
import { getAuthTokenFromLocalStorage } from "../Helpers/Utils";

let state = {
  success: null,
  error: null,
  message: null
};

function UserProfile(props) {
  
  console.log("STATE>>>>>", state);
  const { userId } = useParams();
  let { success, error } = state;
  const { profile } = props;

  console.log("success error", success, error);

  useEffect(() => {
    // const userId = window.location.href.split("/")[4];
    console.log("USERID>>>>>", userId);
    if (userId) {
      //dispatch action
      props.dispatch(fetchUserProfile(userId));
    }
  }, []);

  const user = profile.user;
  // if (profile.inProgress) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  const checkIfUserIdisFriend = () => {
    const { friends } = props;
    //const userId = window.location.href.split("/")[4];

    const index = friends.map((friends) => friends.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleAddFriendClick = async () => {
    //const userId = window.location.href.split("/")[4];
    const url = APIUrls.addFriend(userId);
    console.log("url", url);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      console.log("this", state);
      
      // setState(prevState => {
      //   return {
      //     ...prevState,
      //     success: true,
      //   };
      // });
      state.success = true;
      console.log("success in response", state.message);
      props.dispatch(addFriend(data.data.friendship));
      
    } else {
      // setState(prevState => {
      //   return {
      //     ...prevState,
      //     success: null,
      //   };
      // });
      state.success = null;
    }
    console.log("this2", state);
  };

  const handleRemoveFriendClick = async () => {
    const userId = window.location.href.split("/")[4];
    const url = APIUrls.removeFriend(userId);
    console.log("url", url);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      // setState({
      //   success: true,
      //   message: data.message
      // });
      state.success = true;
      console.log("success in response", state.message);
      props.dispatch(removeFriend(userId));
    } else {
      // setState({
      //   success: null,
      //   error: data.message
      // });
      state.success = null;
    }
  };

  const isUserAFriend = checkIfUserIdisFriend();
  console.log("isUserAFriend", isUserAFriend);

  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user-dp"
        />
      </div>
      <div className="field">
        <div className="field-lable">Name</div>
        <div className="field-value">{user.name}</div>
      </div>
      <div className="field">
        <div className="field-lable">Email</div>
        <div className="field-value">{user.email}</div>
      </div>

      <div className="btn-grp">
        {!isUserAFriend ? (
          <button className="button save-btn" onClick={handleAddFriendClick}>
            Add Friend
          </button>
        ) : (
          <button className="button save-btn" onClick={handleRemoveFriendClick}>
            Remove Friend
          </button>
        )}
      </div>
      {state.success && (
        <div className="alert success-dailog">Friend added successfully</div>
      )}
      {state.error && <div className="alert error-dailog">{error}</div>}
    </div>
  );
}

// export class UserProfile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       success: null,
//       error: null,
//       message: ""
//     };
//   }
//   componentDidMount() {
//     const userId = window.location.href.split("/")[4];

//     if (userId) {
//       //dispatch action
//       this.props.dispatch(fetchUserProfile(userId));
//     }
//   }

//   checkIfUserIdisFriend = () => {
//     const { friends } = this.props;
//     const userId = window.location.href.split("/")[4];

//     const index = friends.map((friends) => friends.to_user._id).indexOf(userId);

//     if (index !== -1) {
//       return true;
//     }
//     return false;
//   };

//   handleAddFriendClick = async () => {
//     const userId = window.location.href.split("/")[4];
//     const url = APIUrls.addFriend(userId);
//     console.log("url", url);
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
//       }
//     };

//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (data.success) {
//       console.log("this", this.state);
//       this.setState({
//         success: true,
//         some: null,
//         message: "data.message"
//       });
//       console.log("success in response", this.state.message);
//       this.props.dispatch(addFriend(data.data.friendship));
//     } else {
//       this.setState({
//         success: null,
//         error: data.message
//       });
//     }
//     console.log("this2", this.state);
//   };
//   handleRemoveFriendClick = async () => {
//     const userId = window.location.href.split("/")[4];
//     const url = APIUrls.removeFriend(userId);
//     console.log("url", url);
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
//       }
//     };

//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (data.success) {
//       this.setState({
//         success: true,
//         message: data.message
//       });
//       console.log("success in response", this.state.message);
//       this.props.dispatch(removeFriend(userId));
//     } else {
//       this.setState({
//         success: null,
//         error: data.message
//       });
//     }
//   };

//   render() {
//     const { profile } = this.props;
//     const { success, error } = this.state;
//     console.log("success error", success, error);

//     const user = profile.user;
//     if (profile.inProgress) {
//       return (
//         <div>
//           <h1>Loading...</h1>
//         </div>
//       );
//     }
//     const isUserAFriend = this.checkIfUserIdisFriend();
//     console.log("isUserAFriend", isUserAFriend);
//     return (
//       <div className="settings">
//         <div className="img-container">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="user-dp"
//           />
//         </div>
//         <div className="field">
//           <div className="field-lable">Name</div>
//           <div className="field-value">{user.name}</div>
//         </div>
//         <div className="field">
//           <div className="field-lable">Email</div>
//           <div className="field-value">{user.email}</div>
//         </div>

//         <div className="btn-grp">
//           {!isUserAFriend ? (
//             <button
//               className="button save-btn"
//               onClick={this.handleAddFriendClick}
//             >
//               Add Friend
//             </button>
//           ) : (
//             <button
//               className="button save-btn"
//               onClick={this.handleRemoveFriendClick}
//             >
//               Remove Friend
//             </button>
//           )}
//         </div>
//         {success && (
//           <div className="alert success-dailog">Friend added successfully</div>
//         )}
//         {error && <div className="alert error-dailog">{error}</div>}
//       </div>
//     );
//   }
// }

function MapStateToProps({ profile, friends }) {
  return {
    profile,
    friends
  };
}
export default connect(MapStateToProps)(UserProfile);
