import {
  LOGIN,
  LOGOUT,
  CLEAR_USER,
  LOADING,
  SET_USER,
  SET_SINGLE_USER,
} from "../Action";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || null),
  createdUser: null,
  singleUser: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    case SET_USER:
      return {
        ...state,
        createdUser: payload,
      };
    case SET_SINGLE_USER:
      return {
        ...state,
        singleUser: payload,
      };
    case CLEAR_USER: {
      return {
        ...state,
        user: null,
        createdUser: null,
        singleUser: null,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
export default userReducer;
