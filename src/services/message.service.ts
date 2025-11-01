import { apiService } from './api.service';
import type {
  IMessage,
  IMessageCreateDTO,
  IPaginatedResult,
  IPaginationParams,
} from '../interfaces/message.interfaces.ts';

class MessageService {
  async getMessagesByChat(
    chatId: string,
    params: IPaginationParams,
  ): Promise<IPaginatedResult<IMessage>> {
    const response = await apiService.get(`/chats/${chatId}/messages`, { params });
    return response.data;
  }

  async create(chatId: string, dto: IMessageCreateDTO): Promise<IMessage> {
    const response = await apiService.post(`/chats/${chatId}/messages`, dto);
    return response.data;
  }

  async getById(id: string): Promise<IMessage> {
    const response = await apiService.get(`/messages/${id}`);
    return response.data;
  }
}

export const messageService = new MessageService();
