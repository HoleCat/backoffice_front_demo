import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryService } from '../../services/gallery/gallery.service';
import { NavlinkService } from '../../services/navlink/navlink.service';

@Component({
  selector: 'app-parallax-section',
  templateUrl: './parallax-section.component.html',
  styleUrls: ['./parallax-section.component.css']
})
export class ParallaxSectionComponent implements OnInit, OnDestroy {

  files : any[] = [];

  link : any;
  links : any[];

  constructor(
    public galleryservice: GalleryService,
    public navlinkservice: NavlinkService
  ) { }

  change_interaction: number = 0;
  
  galleryservicesubscription:Subscription;
  navlinkservicelinkssubscription:Subscription;
  navlinkservicelinksubscription:Subscription;
  ngOnInit(): void {
    this.navlinkservicelinksubscription=this.navlinkservice.link$.subscribe((link)=>{this.link = link});
    this.navlinkservicelinkssubscription=this.navlinkservice.links$.subscribe((links)=>{this.links = links});
    this.galleryservicesubscription=this.galleryservice.getParallax().subscribe(files => {
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

  ngOnDestroy(): void {
    this.navlinkservicelinkssubscription.unsubscribe();
    this.navlinkservicelinksubscription.unsubscribe();
    this.galleryservicesubscription.unsubscribe();
  }

  change_file(i:number){
    this.files.find(file => file.active == true).active = false;
    this.files[i].active = true;
  }

  scrollHandler($event) {
    console.log('Presentation sroll event',$event);
  }

}
