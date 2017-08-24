import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffComponent } from './coff.component';

describe('CoffComponent', () => {
  let component: CoffComponent;
  let fixture: ComponentFixture<CoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
