import { createAction } from "redux-actions";
import axios from 'axios';

// Действия для юзера
export const changeMode = createAction("CHANGE_MODE");

export const setUserRequest = createAction("SET_USER_REQUEST");
export const setUserSuccess = createAction("SET_USER_SUCCESS");
export const setUserFailure = createAction("SET_USER_FAILURE");
export const setUserError = createAction("SET_USER_ERROR");

export const addUser = ({ user }) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const readyUser = await axios.post('http://localhost:4000/users', user);
    dispatch(setUserSuccess({ user: readyUser.data }));
  } catch (e) {
    dispatch(setUserFailure());
  }
}

export const loginUser = ({ currUser }) => async (dispatch) => {
  const data = await axios.get('http://localhost:4000/users');
  const users = data.data;

  users.forEach(user => {
    if (user.mail === currUser.mail) {
      if (user.password === currUser.password) {
        dispatch(setUserSuccess({ user }));
      }
    }
    dispatch(setUserFailure());
  });
}

export const logoutUser = () => async (dispatch) => {
  dispatch(setUserSuccess({
    user: {
      name: 'none',
      mode: 'sign-in'
    }
  }));
}

// действия для контента(задач)
export const fetchPostsRequest = createAction('FETCH_POST_REQUEST');
export const fetchPostsSuccess = createAction('FETCH_POST_SUCCESS');
export const fetchPostsFailure = createAction('FETCH_POST_FAILURE');

export const deteteItemSuccess = createAction('DELETE_ITEM_SUCCESS');
export const addItemSuccess = createAction('ADD_ITEM_SUCCESS');
export const editItemSuccess = createAction('EDIT_ITEM_SUCCESS');

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());

  try {
    const data = await axios.get('http://localhost:4000/contacts');
    dispatch(fetchPostsSuccess({ items: data.data }));
  } catch (e) {
    dispatch(fetchPostsFailure());
    throw e;
  }
}

export const deleteItem = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:4000/contacts/${id}`);
  dispatch(deteteItemSuccess(id));
}

export const addItem = (item) => async (dispatch) => {
  const readyItem = await axios.post(`http://localhost:4000/contacts`, item);
  dispatch(addItemSuccess({ item: readyItem.data }));
}

export const editItem = (item) => async (dispatch) => {
  await axios.patch(`http://localhost:4000/contacts/${item.id}`, item);
  dispatch(editItemSuccess({ item }));
}

