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

const userFetchingState = handleActions(
  {
    [actions.setUserRequest]() {
      return "requested";
    },
    [actions.setUserSuccess]() {
      return "finished";
    },
    [actions.setUserFailure]() {
      return "failed";
    },
  },
  "none"
);

const user = handleActions(
  {
    [actions.changeMode](state, { payload: mode }) {
      return { mode, name: 'none' }
    },
    [actions.setUserSuccess](state, { payload: { user } }) {
      localStorage.userName = user.name;
      return { ...user };
    },
    [actions.setUserError](state, { payload: { mode } }) {
      return { err: true, mode: state.mode, name: 'none' }
    }
  },
  {
    name: localStorage.userName ? localStorage.userName : 'none',
    mode: 'sign-in',
    err: false
  }
)

const items = handleActions({
  [actions.fetchPostsSuccess](state, { payload: { items } }) {
    return items;
  },
  [actions.deteteItemSuccess](state, { payload: id }) {
    const newItems = state.filter(item => item.id !== id);
    return newItems;
  },
  [actions.addItemSuccess](state, { payload: { item } }) {
    return [...state, item];
  },
  [actions.editItemSuccess](state, { payload: { item } }) {
    const newState = state.map(itemCurr => {
      if (itemCurr.id === item.id) {
        return item;
      }
      return itemCurr;
    });
    return newState;
  },
}, [])

export default combineReducers({
  postsFetchingState,
  userFetchingState,
  user,
  items
});