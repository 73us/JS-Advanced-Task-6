import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: IUser[] = [
    {
      id: 1,
      userName: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    },
  ];

  getUsers(): IUser[] {
    return this.users;
  }
  addUser(user: IUser): void {
    this.users.push(user);
  }
}
