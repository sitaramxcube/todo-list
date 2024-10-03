import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoSlice from './reducer/todoSlice';
import userSlice from './reducer/userSlice';
import loginSlice from './reducer/loginSlice';

// Combine all the slices (reducers)
const rootReducer = combineReducers({
  todo: todoSlice,
  users: userSlice,
  login: loginSlice,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  
    }),
});

export const persistor = persistStore(store);
export default store;
