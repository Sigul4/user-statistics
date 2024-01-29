import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAssessmentReportComponent } from './user-assessment-report.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UserAssessmentReportComponent },
];

@NgModule({
  declarations: [
    UserAssessmentReportComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class UserAssessmentReportModule {}
