export interface IChat {
  _id: string;
  firstName: string;
  lastName?: string;
  lastMessage?: string;
  lastMessageTimestamp?: Date;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatCreateDTO {
  firstName: string;
  lastName?: string;
}

export interface IChatUpdateDTO {
  firstName?: string;
  lastName?: string;
}
