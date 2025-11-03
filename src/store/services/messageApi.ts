import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IMessage,
  IMessageCreateDTO,
  IMessageUpdateDTO,
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
  tagTypes: ['Message', 'Chat'],

  endpoints: (builder) => ({
    getMessagesByChatId: builder.query<
      IPaginatedResult<IMessage>,
      { chatId: string; options: IPaginationOptions }
    >({
      query: ({ chatId, options }) => ({
        url: `chats/${chatId}/messages`,
        params: options,
      }),

      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.chatId;
      },

      merge: (currentCache, newItems) => {
        currentCache.data.unshift(...newItems.data);
        currentCache.totalPages = newItems.totalPages;
        currentCache.currentPage = newItems.currentPage;
        currentCache.hasPrevPage = newItems.hasPrevPage;
      },

      providesTags: (_result, _error, { chatId }) => [{ type: 'Message', id: `LIST-${chatId}` }],
    }),

    /**
     * PUT /messages/:messageId
     */
    updateMessage: builder.mutation<IMessage, { messageId: string; dto: IMessageUpdateDTO }>({
      query: ({ messageId, dto }) => ({
        url: `messages/${messageId}`,
        method: 'PUT',
        body: dto,
      }),

      async onQueryStarted({ messageId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedMessage } = await queryFulfilled;

          dispatch(
            messageApi.util.updateQueryData(
              'getMessagesByChatId',
              { chatId: updatedMessage.chatId, options: { page: 1, limit: 30 } },
              (draft) => {
                const msg = draft.data.find((m) => m._id === messageId);
                if (msg) {
                  msg.content = updatedMessage.content;
                  msg.updatedAt = updatedMessage.updatedAt;
                }
              },
            ),
          );
        } catch {
          // patchResult.undo();
        }
      },
    }),

    /**
     * POST /chats/:chatId/messages
     */
    createMessage: builder.mutation<IMessage, { chatId: string; dto: IMessageCreateDTO }>({
      query: ({ chatId, dto }) => ({
        url: `chats/${chatId}/messages`,
        method: 'POST',
        body: dto,
      }),

      invalidatesTags: (_result, _error, { chatId }) => [
        { type: 'Message', id: `LIST-${chatId}` },
        { type: 'Chat', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetMessagesByChatIdQuery, useUpdateMessageMutation, useCreateMessageMutation } =
  messageApi;
