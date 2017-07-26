import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleavesdataComponent } from './empleavesdata.component';

describe('EmpleavesdataComponent', () => {
  let component: EmpleavesdataComponent;
  let fixture: ComponentFixture<EmpleavesdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleavesdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleavesdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
