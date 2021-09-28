import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationOtherVaccineComponent } from './immunization-other-vaccine.component';

describe('ImmunizationOtherVaccineComponent', () => {
  let component: ImmunizationOtherVaccineComponent;
  let fixture: ComponentFixture<ImmunizationOtherVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmunizationOtherVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationOtherVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
