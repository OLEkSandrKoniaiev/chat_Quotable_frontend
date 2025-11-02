export interface IChat {
  _id: string;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChatCreateDTO {
  firstName: string;
  lastName?: string;
}

export interface IChatUpdateDTO {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}
