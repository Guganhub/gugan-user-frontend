// src/store/store.js

import { createStore } from 'redux';

const initialState = {
  user: localStorage.getItem('user') || '',
  role: localStorage.getItem('role') || '',
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, user: action.payload.name , role : action.payload.role };
    case 'CLEAR_USER':
      return { ...state, user: '' ,role : ''};
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
