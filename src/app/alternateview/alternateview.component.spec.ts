import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateviewComponent } from './alternateview.component';

describe('AlternateviewComponent', () => {
  let component: AlternateviewComponent;
  let fixture: ComponentFixture<AlternateviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternateviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
