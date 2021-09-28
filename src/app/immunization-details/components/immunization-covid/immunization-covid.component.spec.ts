import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationCovidComponent } from './immunization-covid.component';

describe('ImmunizationCovidComponent', () => {
  let component: ImmunizationCovidComponent;
  let fixture: ComponentFixture<ImmunizationCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmunizationCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
