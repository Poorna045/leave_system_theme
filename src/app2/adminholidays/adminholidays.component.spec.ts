import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminholidaysComponent } from './adminholidays.component';

describe('AdminholidaysComponent', () => {
  let component: AdminholidaysComponent;
  let fixture: ComponentFixture<AdminholidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminholidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminholidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
