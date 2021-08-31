import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmDetailsComponent } from './imm-details.component';

describe('ImmDetailsComponent', () => {
  let component: ImmDetailsComponent;
  let fixture: ComponentFixture<ImmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
