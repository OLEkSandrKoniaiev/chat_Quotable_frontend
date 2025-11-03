import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IMessage,
  IPaginatedResult,
  IPaginationOptions,
} from '../../interfaces/message.interfaces.ts';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message'],

  endpoints: (builder) => ({
    /**
     * GET /chats/:chatId/messages
     */
    getMessagesByChatId: builder.query<
      IPaginatedResult<IMessage>,
      { chatId: string; options: IPaginationOptions }
    >({
      query: ({ chatId, options }) => ({
        url: `chats/${chatId}/messages`,
        params: options,
      }),
      providesTags: (_result, _error, { chatId }) => [{ type: 'Message', id: `LIST-${chatId}` }],
    }),

    // TODO: 'createMessage',
  }),
});

export const { useGetMessagesByChatIdQuery } = messageApi;
