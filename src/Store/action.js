// src/store/actions.js

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user.name));
    localStorage.setItem('role', JSON.stringify(user.role));
    return {
      type: 'SET_USER_NAME',
      payload: user,
    };
  };
  
  export const clearUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return {
      type: 'CLEAR_USER',
    };
  };
  