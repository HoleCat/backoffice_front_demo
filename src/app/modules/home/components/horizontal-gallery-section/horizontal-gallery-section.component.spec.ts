import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGallerySectionComponent } from './horizontal-gallery-section.component';

describe('HorizontalGallerySectionComponent', () => {
  let component: HorizontalGallerySectionComponent;
  let fixture: ComponentFixture<HorizontalGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalGallerySectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
