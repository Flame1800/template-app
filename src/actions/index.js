
import { createAction } from "redux-actions";
import _ from "lodash";
import axios from 'axios';

// Действия для юзера
export const changeMode = createAction("CHANGE_MODE");

export const setUserRequest = createAction("SET_USER_REQUEST");
export const setUserSuccess = createAction("SET_USER_SUCCESS");
export const setUserFailure = createAction("SET_USER_FAILURE");
export const setUserError = createAction("SET_USER_ERROR");

const users = [
  {
    name: 'main',
    surName: 'admin',
    mail: 'admin@test.com',
    password: '123456'
  },
  {
    name: 'test',
    surName: 'user',
    mail: 'user@test.com',
    password: '123456'
  }
]


export const addUser = ({ user }) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const newUser = {
      mail: user.email,
      name: user.name,
      surName: user.surName,
      password: user.password,
      id: _.uniqueId()
    }
    dispatch(setUserSuccess({ user: newUser }));

  } catch (e) {
    dispatch(setUserFailure());
    //throw e;
  }
}

export const loginUser = ({ user }) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    users.forEach(userT => {

      if (userT.mail === user.mail && userT.password === user.password) {
        dispatch(setUserSuccess({ user: userT }));
      } else {
        dispatch(setUserError({ mode: true }));
      }
    })

  } catch (e) {
    dispatch(setUserFailure());
    throw e;
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch(setUserSuccess({
    user: {
      name: null,
      mode: 'sign-in'
    }
  }));
}



// действия для контента(задач)
export const fetchPostsRequest = createAction('FETCH_POST_REQUEST');
export const fetchPostsSuccess = createAction('FETCH_POST_SUCCESS');
export const fetchPostsFailure = createAction('FETCH_POST_FAILURE');

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());

  try {
    const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(fetchPostsSuccess({ posts: data.data }));
  } catch (e) {
    dispatch(fetchPostsFailure());
    throw e;
  }

}

