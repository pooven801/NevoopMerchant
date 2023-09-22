import * as ActionTypes from "@actions/ActionTypes";

const initialState = {
  login: false,
  notificationToken: "",
  data: null
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        data: action.data.data,
        login: action.data.data == null ? false : true
      };
    default:
      return state;
  }
}
