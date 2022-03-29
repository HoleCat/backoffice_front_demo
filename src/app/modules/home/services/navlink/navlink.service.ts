import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class NavlinkService {

  public links = new BehaviorSubject<any[]>(
    [
      {description:'Portada video',link:'inicio'},
      {description:'Galeria 0',link:'presentacion'},
      {description:'Galeria 1',link:'galeria'},
      {description:'Nosotros',link:'nosotros'},
      {description:'Galeria 2',link:'galeriados'},
      {description:'Noticias',link:'noticias'},
      {description:'Proyectos',link:'proyectos'},
      {description:'Contacto',link:'contacto'},
    ]
  );


  go_to(link) {
    document.querySelector('#'+link).scrollIntoView();
  }

  public link = new BehaviorSubject<any>({description:'Portada video',link:'../'});

  links$:Observable<any[]> = this.links.asObservable();
  link$:Observable<any[]> = this.link.asObservable();

  constructor() {}

  set_links(links){
    this.links.next(links);
  }
  set_link(link){
    this.link.next(link);
  }

}
