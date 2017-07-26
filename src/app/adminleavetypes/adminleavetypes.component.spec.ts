import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleavetypesComponent } from './adminleavetypes.component';

describe('AdminleavetypesComponent', () => {
  let component: AdminleavetypesComponent;
  let fixture: ComponentFixture<AdminleavetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminleavetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminleavetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
