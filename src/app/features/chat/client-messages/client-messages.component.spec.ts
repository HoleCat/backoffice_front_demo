import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMessagesComponent } from './client-messages.component';

describe('ClientMessagesComponent', () => {
  let component: ClientMessagesComponent;
  let fixture: ComponentFixture<ClientMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
