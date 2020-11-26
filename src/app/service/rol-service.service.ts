import { Injectable } from '@angular/core';
import { Role } from '../domain/rol';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public roles: Role[];

  constructor() {
    this.roles = [
      { id: 'A', name: 'Admin' },
      { id: 'U', name: 'User' }
    ];
  }

  public findAll(): Role[] {
    return this.roles;
  }
}
