import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNotificationComponent } from './basic-notification.component';

describe('BasicNotificationComponent', () => {
  let component: BasicNotificationComponent;
  let fixture: ComponentFixture<BasicNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
