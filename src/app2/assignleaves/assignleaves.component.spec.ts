import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignleavesComponent } from './assignleaves.component';

describe('AssignleavesComponent', () => {
  let component: AssignleavesComponent;
  let fixture: ComponentFixture<AssignleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
