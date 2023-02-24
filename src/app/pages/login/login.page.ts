import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'freiteseliesser@hotmail.com',
    password: '123456',
  };

  registerUser: User = {
    email: 'freiteseliesser@hotmail.com',
    password: '123456',
    name: 'Eliesser Freites',
    avatar: 'av-1.png',
  };

  constructor(
    private UserService: UserService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {
    // this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }

    const valido = await this.UserService.login(
      this.loginUser.email,
      this.loginUser.password
    );

    if (valido) {
      // navegar al tabs
      // this.navCtrl.navigateRoot('/folder/Inbox', { animated: true });
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de user y contraseña no correctos
      this.uiService.alertaInformativa('User y contraseña no son correctos.');
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }

    const valido = await this.UserService.registro(this.registerUser);

    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de user y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    // this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    // this.slides.lockSwipes(true);
  }
}
