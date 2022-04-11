import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  files: any = [
    {
      path: "./assets/music/Along_Comes_Mary.mp3",
      name: "Along Comes Mary",
      artist: "Bloodhound Gang"
    },
    {
      path: "./assets/music/Pet_Sematary.mp3",
      name: "Pet Semantary",
      artist: "Ramones"
    },
    {
      path: "./assets/music/Nervous_Breakdown.mp3",
      name: "Nervous Breakdown",
      artist: "Black Flag"
    }
  ];

  getFiles() {
    return of(this.files);
  }
}
