import { apiService } from './api.service';
import type { IChat, IChatCreateDTO, IChatUpdateDTO } from '../interfaces/chat.interfaces.ts';

class ChatService {
  /**
   * GET /chats
   * Retrieves all user chats or searches among them.
   * @param query - Optional search query
   */
  async getAll(query?: string): Promise<IChat[]> {
    const params = query ? { q: query } : undefined;
    const { data } = await apiService.get<IChat[]>('/chats', { params });
    return data;
  }

  /**
   * GET /chats/:chatId
   */
  async getById(chatId: string): Promise<IChat> {
    const { data } = await apiService.get<IChat>(`/chats/${chatId}`);
    return data;
  }

  /**
   * POST /chats
   */
  async create(dto: IChatCreateDTO): Promise<IChat> {
    const { data } = await apiService.post<IChat>('/chats', dto);
    return data;
  }

  /**
   * PUT /chats/:chatId
   */
  async update(chatId: string, dto: IChatUpdateDTO): Promise<IChat> {
    const { data } = await apiService.put<IChat>(`/chats/${chatId}`, dto);
    return data;
  }

  /**
   * [FormData] PUT /chats/:chatId
   */
  async uploadAvatar(chatId: string, file: File): Promise<IChat> {
    const formData = new FormData();
    formData.append('avatarUrl', file);

    const { data } = await apiService.put<IChat>(`/chats/${chatId}`, formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
    return data;
  }

  /**
   * DELETE /chats/:chatId
   */
  async delete(chatId: string): Promise<void> {
    await apiService.delete(`/chats/${chatId}`);
  }

  /**
   * PATCH /chats/:chatId/read
   */
  async markAsRead(chatId: string): Promise<void> {
    await apiService.patch(`/chats/${chatId}/read`);
  }
}

export const chatService = new ChatService();
