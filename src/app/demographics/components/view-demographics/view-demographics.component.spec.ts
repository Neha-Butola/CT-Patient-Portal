import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDemographicsComponent } from './view-demographics.component';

describe('ViewDemographicsComponent', () => {
  let component: ViewDemographicsComponent;
  let fixture: ComponentFixture<ViewDemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDemographicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
