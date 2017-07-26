import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtableComponent } from './rtable.component';

describe('RtableComponent', () => {
  let component: RtableComponent;
  let fixture: ComponentFixture<RtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
