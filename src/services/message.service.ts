import { apiService } from './api.service';
import type {
  IMessage,
  IMessageCreateDTO,
  IMessageUpdateDTO,
  IPaginatedResult,
  IPaginationOptions,
} from '../interfaces/message.interfaces.ts';

class MessageService {
  /**
   * GET /chats/:chatId/messages?page=1&limit=30
   */
  async getAllByChatId(
    chatId: string,
    options: IPaginationOptions,
  ): Promise<IPaginatedResult<IMessage>> {
    const { data } = await apiService.get<IPaginatedResult<IMessage>>(`/chats/${chatId}/messages`, {
      params: options,
    });
    return data;
  }

  /**
   * POST /chats/:chatId/messages
   */
  async create(chatId: string, dto: IMessageCreateDTO): Promise<IMessage> {
    const { data } = await apiService.post<IMessage>(`/chats/${chatId}/messages`, dto);
    return data;
  }

  /**
   * PUT /messages/:id
   */
  async update(messageId: string, dto: IMessageUpdateDTO): Promise<IMessage> {
    const { data } = await apiService.put<IMessage>(`/messages/${messageId}`, dto);
    return data;
  }

  /**
   * DELETE /messages/:id
   */
  async delete(messageId: string): Promise<void> {
    await apiService.delete(`/messages/${messageId}`);
  }
}

export const messageService = new MessageService();
