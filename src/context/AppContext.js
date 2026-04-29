import React, { createContext, useReducer } from 'react';

const AppContext = createContext(null);

const initialState = {
  customers: [],
  orders: [],
  designs: [],
  isRefreshing: false,
  searchQuery: '',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [action.payload, ...state.customers] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter((c) => c.id !== action.payload),
      };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        ),
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload),
      };
    case 'SET_DESIGNS':
      return { ...state, designs: action.payload };
    case 'ADD_DESIGN':
      return { ...state, designs: [action.payload, ...state.designs] };
    case 'DELETE_DESIGN':
      return {
        ...state,
        designs: state.designs.filter((d) => d.id !== action.payload),
      };
    case 'SET_REFRESHING':
      return { ...state, isRefreshing: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
