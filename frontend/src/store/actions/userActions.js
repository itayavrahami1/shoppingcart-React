import { userService } from '../../services/userService';

// THUNK
export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.login(userCreds);
      dispatch({ type: 'SET_USER', user });
    } catch (err) {
      console.log('UserActions: err in Login', err);
      throw Error(err);
    }
  };
}
export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
  };
}
export function logout() {
  return async dispatch => {
    try {
      await userService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.log('UserActions: err in logout', err);
      dispatch({
        type: 'SEND_NOTIFICATION',
        notification: { msg: `Logout failed`, isSuccessed: false }
      });
    };
  }
}

// USER CART ACTIONS 

export function addToCart(userToUpdate) {
  return async dispatch => {
    const user = await userService.update(userToUpdate);
    dispatch({ type: 'SET_USER', user });
  };
}
