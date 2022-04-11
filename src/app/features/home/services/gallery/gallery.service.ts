import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }

  cover: any = 
    {
      path: "./assets/video/videoplayback.mp4",
      active: false
    }
  ;

  principal: any[] = [
    {
      path: "./assets/backgrounds/1.jpg",
      active: true
    },
    {
      path: "./assets/backgrounds/2.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/3.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/4.jpg",
      active: false
    }
  ]

  secondary: any[] = [
    {
      path: "./assets/backgrounds/1.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/2.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/3.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/4.jpg",
      active: false
    }
  ]

  parallax: any[] = [
    {
      path: "./assets/backgrounds/1.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/2.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/3.jpg",
      active: false
    },
    {
      path: "./assets/backgrounds/4.jpg",
      active: false
    }
  ]

  getCover() {
    return of(this.cover);
  }
  getParallax() {
    return of(this.parallax);
  }
  getPricipal() {
    return of(this.principal);
  }
  getSecondary() {
    return of(this.secondary);
  }
}
