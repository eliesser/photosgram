import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; */

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
    private route: Router // private camera: Camera
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
    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.CAMERA,
    // };
    // this.procesarImage(options);
  }

  libreria() {
    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    // };
    // this.procesarImage(options);
  }

  procesarImage(/* options: CameraOptions */) {
    // this.camera.getPicture(options).then(
    //   (imageData) => {
    //     // imageData is either a base64 encoded string or a file URI
    //     // If it's base64 (DATA_URL):
    //     const img = window.Ionic.WebView.convertFileSrc(imageData);
    //     this.postsService.subirImage(imageData);
    //     this.tempImages.push(img);
    //   },
    //   (err) => {
    //     // Handle error
    //   }
    // );
  }
}
