import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: User = { _id: '', avatar: '' };

  constructor(
    private UserService: UserService,
    private uiService: UiServiceService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.user = this.UserService.getUser();
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) {
      return;
    }

    const actualizado = await this.UserService.actualizarUser(this.user);
    if (actualizado) {
      // toast con el msg de actualizado
      this.uiService.presentToast('Registro actualizado');
    } else {
      // toast con el error
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  logout() {
    this.postsService.paginaPosts = 0;
    this.UserService.logout();
  }
}
