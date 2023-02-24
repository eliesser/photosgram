import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanLoad {
  constructor(private UserService: UserService) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.UserService.validaToken();
  }
}
