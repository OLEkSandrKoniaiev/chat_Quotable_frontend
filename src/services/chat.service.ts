import { apiService } from './api.service';
import type { IChat, IChatCreateDTO, IChatUpdateDTO } from '../interfaces/chat.interfaces.ts';

class ChatService {
  async getAll(query?: string): Promise<IChat[]> {
    const params = query ? { q: query } : {};
    const response = await apiService.get('/chats', { params });
    return response.data;
  }

  async getById(id: string): Promise<IChat> {
    const response = await apiService.get(`/chats/${id}`);
    return response.data;
  }

  async create(dto: IChatCreateDTO): Promise<IChat> {
    const response = await apiService.post('/chats', dto);
    return response.data;
  }

  async update(id: string, dto: IChatUpdateDTO): Promise<IChat> {
    const response = await apiService.put(`/chats/${id}`, dto);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(`/chats/${id}`);
  }
}

export const chatService = new ChatService();
