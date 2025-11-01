export interface IMessage {
  _id: string;
  chatId: string;
  sender: 'user' | 'bot';
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageCreateDTO {
  sender: 'user' | 'bot';
  content: string;
}

export interface IPaginationParams {
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
