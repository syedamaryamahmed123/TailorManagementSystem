import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      if (token && userData) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { token, user: JSON.parse(userData) },
        });
      } else {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    } catch {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const response = await authApi.login(email, password);
      const { token, user } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      return { success: false, error: message };
    }
  };

  const register = async (data) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const response = await authApi.register(data);
      const { token, user } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // proceed with local logout even if API call fails
    }
    await AsyncStorage.multiRemove(['authToken', 'userData']);
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
