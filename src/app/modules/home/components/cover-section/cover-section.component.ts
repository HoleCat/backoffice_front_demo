import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';

@Component({
  selector: 'app-cover-section',
  templateUrl: './cover-section.component.html',
  styleUrls: ['./cover-section.component.css']
})
export class CoverSectionComponent implements OnInit {

  file : any;

  constructor(
    public galleryservice: GalleryService,
  ) { }

  ngOnInit(): void {
    this.galleryservice.getCover().subscribe(file => {
      this.file = file;
    });
  }

}
