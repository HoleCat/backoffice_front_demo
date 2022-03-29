import { TestBed } from '@angular/core/testing';

import { NotificationonService } from './notificationon.service';

describe('NotificationonService', () => {
  let service: NotificationonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
