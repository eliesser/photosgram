import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

import { User } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = '';
  private user: User = {_id: ''};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/login`, data).subscribe(async (resp: any) => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = '';
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.token = '';
    this.user = { _id: '' };
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  registro(user: User) {
    return new Promise((resolve) => {
      this.http
        .post(`${URL}/user/create`, user)
        .subscribe(async (resp: any) => {
          if (resp['ok']) {
            await this.guardarToken(resp['token']);
            resolve(true);
          } else {
            this.token = '';
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  getUser() {
    if (!this.user._id) {
      this.validaToken();
    }

    return { ...this.user };
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });

      this.http.get(`${URL}/user/`, { headers }).subscribe((resp: any) => {
        if (resp['ok']) {
          this.user = resp['user'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  actualizarUser(user: User) {
    const headers = new HttpHeaders({
      'x-token': this.token,
    });

    return new Promise((resolve) => {
      this.http
        .put(`${URL}/user/update`, user, { headers })
        .subscribe((resp: any) => {
          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
