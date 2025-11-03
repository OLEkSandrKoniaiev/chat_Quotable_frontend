import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './services/chatApi';
import { messageApi } from './services/messageApi';

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware).concat(messageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
