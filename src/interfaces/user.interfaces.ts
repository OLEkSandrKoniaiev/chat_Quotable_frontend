export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserCreateDTO {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUserUpdateDTO {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
