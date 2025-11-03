import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IChat, IChatCreateDTO, IChatUpdateDTO } from '../../interfaces/chat.interfaces.ts';

// import type { RootState } from '../store';

export const chatApi = createApi({
  reducerPath: 'chatApi',

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

  tagTypes: ['Chat'],

  endpoints: (builder) => ({
    /**
     * GET /chats?q=...
     */
    getChats: builder.query<IChat[], string>({
      query: (query) => (query ? `chats?q=${query}` : 'chats'),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Chat' as const, id: _id })),
              { type: 'Chat', id: 'LIST' },
            ]
          : [{ type: 'Chat', id: 'LIST' }],
    }),

    /**
     * GET /chats/:chatId
     */
    getChatById: builder.query<IChat, string>({
      query: (chatId) => `chats/${chatId}`,
      providesTags: (_result, _error, id) => [{ type: 'Chat', id }],
    }),

    /**
     * POST /chats
     */
    createChat: builder.mutation<IChat, IChatCreateDTO>({
      query: (dto) => ({
        url: 'chats',
        method: 'POST',
        body: dto,
      }),

      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),

    /**
     * DELETE /chats/:chatId
     */
    deleteChat: builder.mutation<void, string>({
      query: (chatId) => ({
        url: `chats/${chatId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),

    /**
     * PUT /chats/:chatId
     */
    updateChat: builder.mutation<IChat, { chatId: string; dto: IChatUpdateDTO }>({
      query: ({ chatId, dto }) => ({
        url: `chats/${chatId}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: (_result, _error, { chatId }) => [
        { type: 'Chat', id: 'LIST' },
        { type: 'Chat', id: chatId },
      ],
    }),

    /**
     * PUT /chats/:chatId/
     */
    uploadChatAvatar: builder.mutation<IChat, { chatId: string; file: File }>({
      query: ({ chatId, file }) => {
        const formData = new FormData();
        formData.append('avatarUrl', file);
        return {
          url: `chats/${chatId}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { chatId }) => [
        { type: 'Chat', id: 'LIST' },
        { type: 'Chat', id: chatId },
      ],
    }),

    /**
     * PATCH /chats/:chatId/read
     */
    markChatAsRead: builder.mutation<void, string>({
      query: (chatId) => ({
        url: `chats/${chatId}/read`,
        method: 'PATCH',
      }),

      async onQueryStarted(chatId, { dispatch, queryFulfilled }) {
        const listPatchResult = dispatch(
          chatApi.util.updateQueryData('getChats', '', (draft) => {
            const chat = draft.find((c) => c._id === chatId);
            if (chat) {
              chat.unreadCount = 0;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          listPatchResult.undo();
        }
      },

      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
  useUpdateChatMutation,
  useUploadChatAvatarMutation,
  useGetChatByIdQuery,
  useMarkChatAsReadMutation,
} = chatApi;
