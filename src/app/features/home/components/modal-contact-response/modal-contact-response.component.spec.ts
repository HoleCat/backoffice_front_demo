import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactResponseComponent } from './modal-contact-response.component';

describe('ModalContactResponseComponent', () => {
  let component: ModalContactResponseComponent;
  let fixture: ComponentFixture<ModalContactResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContactResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContactResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
