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
