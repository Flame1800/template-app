
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
    name: 'teest',
    mode: 'sign-in',
    err: false
  }
)

const items = handleActions({
  [actions.fetchPostsSuccess](state, { payload: { items } }) {
    return items;
  },
}, [])

export default combineReducers({
  postsFetchingState,
  user,
  items
});