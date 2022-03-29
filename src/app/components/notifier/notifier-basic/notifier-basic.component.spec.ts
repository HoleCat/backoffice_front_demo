import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierBasicComponent } from './notifier-basic.component';

describe('NotifierBasicComponent', () => {
  let component: NotifierBasicComponent;
  let fixture: ComponentFixture<NotifierBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifierBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifierBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
