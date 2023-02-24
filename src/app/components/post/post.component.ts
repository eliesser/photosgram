import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {
    imgs: [],
    _id: '',
    msg: '',
    coords: '',
    user: {
      avatar: '',
      _id: '',
      name: '',
      email: '',
      password: '',
    },
    created: '',
  };

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };

  constructor() {}

  ngOnInit() {}
}
