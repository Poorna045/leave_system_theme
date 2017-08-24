import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffapprovalComponent } from './coffapproval.component';

describe('CoffapprovalComponent', () => {
  let component: CoffapprovalComponent;
  let fixture: ComponentFixture<CoffapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
