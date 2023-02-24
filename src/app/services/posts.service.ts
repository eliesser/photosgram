import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponsePosts, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private UserService: UserService) {}

  getPosts(pull: boolean = false) {
    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts++;

    return this.http.get<ResponsePosts>(
      `${URL}/posts/?pag=${this.paginaPosts}`
    );
  }

  crearPost(post: any) {
    const headers = new HttpHeaders({
      'x-token': this.UserService.token,
    });

    return new Promise((resolve) => {
      this.http
        .post(`${URL}/posts`, post, { headers })
        .subscribe((resp: any) => {
          this.nuevoPost.emit(resp['post']);
          resolve(true);
        });
    });
  }

  subirImage(img: string) {
    const formData = new FormData();

    const headers: any = {
      'x-token': this.UserService.token,
    };

    const file: Blob = this.convertBase64ToFile(img);

    formData.append('image', file);

    this.http
      .post(`${URL}/posts/upload`, formData, { headers })
      .subscribe((resp: any) => {});
  }

  convertBase64ToFile(img: string): Blob {
    const extension = img.split(';')[0].split('/')[1];

    return new File([this.convertDataUrlToBlob(img)], `image.${extension}`, {
      type: `image/${extension}`,
    });
  }

  convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  async getBase64FromUrl(url: string) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }
}
