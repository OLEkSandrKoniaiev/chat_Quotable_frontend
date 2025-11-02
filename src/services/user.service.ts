import { apiService } from './api.service';
import type {
  IAuthResponse,
  IUser,
  IUserCreateDTO,
  IUserLoginDTO,
  IUserUpdateDTO,
} from '../interfaces/user.interfaces.ts';

class UserService {
  /**
   * New user registration.
   * POST /users/register
   */
  async register(dto: IUserCreateDTO): Promise<IAuthResponse> {
    const { data } = await apiService.post<IAuthResponse>('/users/register', dto);
    return data;
  }

  /**
   * Login of an existing user.
   * POST /users/login
   */
  async login(dto: IUserLoginDTO): Promise<IAuthResponse> {
    const { data } = await apiService.post<IAuthResponse>('/users/login', dto);
    return data;
  }

  /**
   * Obtaining data about the current user based on their token.
   * GET /users/me
   */
  async getMe(): Promise<IUser> {
    const { data } = await apiService.get<IUser>('/users/me');
    return data;
  }

  /**
   * Updating user data.
   * PUT /users/:userId
   */
  async update(userId: string, dto: IUserUpdateDTO): Promise<IUser> {
    const { data } = await apiService.put<IUser>(`/users/${userId}`, dto);
    return data;
  }

  /**
   * [FormData] PUT /users/:userId
   */
  async uploadAvatar(userId: string, file: File): Promise<IUser> {
    const formData = new FormData();
    formData.append('avatarUrl', file);

    const { data } = await apiService.put<IUser>(`/users/${userId}`, formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
    return data;
  }
}

export const userService = new UserService();
