import { configureStore } from "@reduxjs/toolkit";
import userReducer from './store/userSlide';

const rootReducer = {
  user: userReducer
}
const store = configureStore({
  reducer: rootReducer
});

export default store;