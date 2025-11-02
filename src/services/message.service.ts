import { apiService } from './api.service';

export interface IMessage {
  _id: string;
  chatId: string;
  sender: 'user' | 'bot';
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageCreateDTO {
  content: string;
}

export interface IMessageUpdateDTO {
  content: string;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  totalDocs: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

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
