// src/utils/auth.js

export const registerUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      return { error: 'User already exists' };
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  };
  
  export const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }
    return { error: 'Invalid credentials' };
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('currentUser');
  };
  
  export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  };
  