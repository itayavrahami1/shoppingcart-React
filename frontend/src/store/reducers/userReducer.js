let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: localLoggedinUser,
};

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'USER_REMOVE':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      };
    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'LOGOUT':
      return { ...state, loggedInUser: null };
    case 'ADD_TO_CART':
      return { ...state, loggedInUser: action.updatedUser};
      // return { ...state, loggedInUser: {...state.loggedInUser, cart: action.cart}};
    // case 'ADD_TO_CART':
    //   return { ...state, cart: [...state.cart, action.item] };
    // case 'ADD_TO_CART':
    //   return { ...state, cart: [...state.cart, action.item] };
    default:
      return state;
  }
}
