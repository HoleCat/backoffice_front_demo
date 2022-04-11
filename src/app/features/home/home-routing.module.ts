import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { CoverSectionComponent } from './components/cover-section/cover-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { HorizontalGallerySectionComponent } from './components/horizontal-gallery-section/horizontal-gallery-section.component';
import { AboutUsSectionComponent } from './components/about-us-section/about-us-section.component';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { PresentationSectionComponent } from './components/presentation-section/presentation-section.component';

const routes: Routes = [
  {
    path:'',
    component: WrapperComponent,
    children: [
      {
        path: '',
        component: CoverSectionComponent
      },
      {
        path: 'presentacion',
        component: PresentationSectionComponent
      },
      {
        path: 'galeria',
        component: GallerySectionComponent
      },
      {
        path: 'nosotros',
        component: AboutUsSectionComponent
      },
      {
        path: 'galeriados',
        component: HorizontalGallerySectionComponent
      },
      {
        path: 'noticias',
        component: NewsSectionComponent
      },
      {
        path: 'proyectos',
        component: ProjectsSectionComponent
      },
      {
        path: 'contacto',
        component: ContactSectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
