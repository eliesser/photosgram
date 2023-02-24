import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryImageOptions,
  ImageOptions,
} from '@capacitor/camera';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    msg: '',
    coords: '',
    posicion: false,
  };

  constructor(
    private postsService: PostsService,
    private route: Router
  ) {}

  async crearPost() {
    const creado = await this.postsService.crearPost(this.post);

    this.post = {
      msg: '',
      coords: '',
      posicion: false,
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = '';
      return;
    }

    this.cargandoGeo = true;

    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Plugin geolocation not available');
      return;
    }

    Geolocation.getCurrentPosition()
      .then((resp: any) => {
        this.cargandoGeo = false;
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = coords;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  camara() {
    const options: ImageOptions = {
      quality: 60,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    };

    Camera.getPhoto(options).then(
      (imageData: any) => {
        const img = window.Ionic.WebView.convertFileSrc(imageData.dataUrl);
        this.postsService.subirImage(imageData.dataUrl);
        this.tempImages.push(img);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  libreria() {
    const options: GalleryImageOptions = {
      quality: 60,
    };

    Camera.pickImages(options).then(
      (imageData: any) => {
        imageData.photos.forEach((photo: any) => {
          const img = window.Ionic.WebView.convertFileSrc(photo.webPath);
          this.postsService.subirImage(photo.dataUrl);
          this.tempImages.push(img);
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
