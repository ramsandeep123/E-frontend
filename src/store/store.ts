import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/index';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }), // Explicitly include thunk
});

export type AppDispatch = typeof store.dispatch;

export default store;
