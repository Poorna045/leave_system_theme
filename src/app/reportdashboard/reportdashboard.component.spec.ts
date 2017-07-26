import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdashboardComponent } from './reportdashboard.component';

describe('ReportdashboardComponent', () => {
  let component: ReportdashboardComponent;
  let fixture: ComponentFixture<ReportdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
