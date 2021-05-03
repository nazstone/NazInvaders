import { combineReducers } from 'redux';

const INITIAL_STATE = {
  city: null,
};

const prefReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'change_city':
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  pref: prefReducer,
});
