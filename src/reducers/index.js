
// import _ from "lodash";
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from "../actions/index.js";


const postsFetchingState = handleActions(
  {
    [actions.fetchPostsRequest]() {
      return "requested";
    },
    [actions.fetchPostsFailure]() {
      return "failed";
    },
    [actions.fetchPostsSuccess]() {
      return "finished";
    },
  },
  "none"
);

const user = handleActions(
  {
    [actions.changeMode](state, { payload: mode  }) {
      return { mode, name: null }
    },
    [actions.setUserSuccess](state, { payload: { user } }) {
      return user;
    },
    [actions.setUserError](state, { payload: { mode } }){
      return {err: true,  mode: state.mode, name: null}
    }
  },
  {
    name: null,
    mode: 'sign-in',
    err: false
  }
)

const posts = handleActions({
  [actions.fetchPostsSuccess](state, { payload: { posts } }) {
    return posts;
  },
  // [actions.addTask](state, {payload: {payload: {task}}}) {
  //   return [task, ...tasks];
  // }
}, [])

export default combineReducers({
  postsFetchingState,
  user,
  posts
});