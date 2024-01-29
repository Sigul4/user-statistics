import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentReportComponent } from './user-assessment-report.component';

describe('UserAssessmentReportComponent', () => {
  let component: UserAssessmentReportComponent;
  let fixture: ComponentFixture<UserAssessmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssessmentReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
