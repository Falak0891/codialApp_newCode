import React from 'react';
import { PostsList } from './';
import { FriendsList } from './';

function Home(props) {
  
  const { posts, friends, auth } = props;
  
  return (
    <div className="home">
      <PostsList posts={posts} />
      {auth.isLoggedIn && <FriendsList friends={friends} />}
    </div>
  );
}


export default Home;
