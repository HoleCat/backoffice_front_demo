import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleChipsComponent } from './example-chips.component';

describe('ExampleChipsComponent', () => {
  let component: ExampleChipsComponent;
  let fixture: ComponentFixture<ExampleChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
