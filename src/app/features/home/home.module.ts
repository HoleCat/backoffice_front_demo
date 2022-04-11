import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CoverSectionComponent } from './components/cover-section/cover-section.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AboutUsSectionComponent } from './components/about-us-section/about-us-section.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { PresentationSectionComponent } from './components/presentation-section/presentation-section.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { HorizontalGallerySectionComponent } from './components/horizontal-gallery-section/horizontal-gallery-section.component';
import { ModalContactResponseComponent } from './components/modal-contact-response/modal-contact-response.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { ParallaxSectionComponent } from './components/parallax-section/parallax-section.component';

@NgModule({
  declarations: [
    CoverSectionComponent,
    WrapperComponent,
    AboutUsSectionComponent,
    NewsSectionComponent,
    ProjectsSectionComponent,
    GallerySectionComponent,
    ContactSectionComponent,
    PresentationSectionComponent,
    ContactFormComponent,
    HorizontalGallerySectionComponent,
    ModalContactResponseComponent,
    ParallaxSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDividerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule
  ]
})
export class HomeModule { }
