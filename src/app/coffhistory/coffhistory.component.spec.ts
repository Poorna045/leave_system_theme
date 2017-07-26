import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffhistoryComponent } from './coffhistory.component';

describe('CoffhistoryComponent', () => {
  let component: CoffhistoryComponent;
  let fixture: ComponentFixture<CoffhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
