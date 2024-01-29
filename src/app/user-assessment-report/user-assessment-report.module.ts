import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAssessmentReportComponent } from './user-assessment-report.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class UserAssessmentReportModule {}
