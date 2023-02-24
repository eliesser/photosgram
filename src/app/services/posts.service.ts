import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponsePosts, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';
// import {
//   FileTransfer,
//   FileUploadOptions,
//   FileTransferObject,
// } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private UserService: UserService,
    // private fileTransfer: FileTransfer
  ) {}

  getPosts(pull: boolean = false) {
    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts++;

    return this.http.get<ResponsePosts>(
      `${URL}/posts/?pag=${this.paginaPosts}`
    );
  }

  crearPost(post:any) {
    const headers = new HttpHeaders({
      'x-token': this.UserService.token,
    });

    return new Promise((resolve) => {
      this.http.post(`${URL}/posts`, post, { headers }).subscribe((resp: any) => {
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      });
    });
  }

  subirImage(img: string) {
    // const options: FileUploadOptions = {
    //   fileKey: 'image',
    //   headers: {
    //     'x-token': this.UserService.token,
    //   },
    // };

    // const fileTransfer: FileTransferObject = this.fileTransfer.create();

    // fileTransfer
    //   .upload(img, `${URL}/posts/upload`, options)
    //   .then((data:any) => {})
    //   .catch((err:any) => {
    //     console.log('error en carga', err);
    //   });
  }
}
