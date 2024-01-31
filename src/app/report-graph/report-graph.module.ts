import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportGraphComponent } from './report-graph.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: ReportGraphComponent },
];

@NgModule({
  declarations: [
    ReportGraphComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class ReportGraphModule {}
