import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';

@Component({
  selector: 'app-horizontal-gallery-section',
  templateUrl: './horizontal-gallery-section.component.html',
  styleUrls: ['./horizontal-gallery-section.component.css']
})
export class HorizontalGallerySectionComponent implements OnInit {

  files : any[] = [];

  constructor(
    public galleryservice: GalleryService,
  ) { }

  change_interaction: number = 0;
  
  ngOnInit(): void {
    this.galleryservice.getSecondary().subscribe(files => {
      this.files = files;
    });
    setInterval(() => {
      let selected = this.files.find(file => file.active == true);  
      let index = this.files.indexOf(selected);
      if(index == (this.files.length - 1)){
        this.files[0].active = true;
        this.files[index].active = false;
      }
      else if(this.files.length > 1) {
        this.files[index + 1].active = true;
        this.files[index].active = false;
      }
    }, 5000);
  }

  change_file(i:number){
    this.files.find(file => file.active == true).active = false;
    this.files[i].active = true;
  }

}
