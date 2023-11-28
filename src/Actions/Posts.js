import { UPDATE_POSTS } from "./Action_Types";
import {APIUrls } from "../Helpers/Urls"
export function fetchPosts() {
  return (dispatch) => {
    let url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}
