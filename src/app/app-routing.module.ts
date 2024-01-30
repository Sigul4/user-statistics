import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DASHBOARD_PAGE_ROUTE, HOMEPAGE_ROUTE, LOGIN_PAGE_ROUTE, USER_ASSESSMENT_PAGE_ROUTE, USER_MANAGEMENT_PAGE_ROUTE } from './shared/constants/routes.constants';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: LOGIN_PAGE_ROUTE, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: DASHBOARD_PAGE_ROUTE, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard] },
  { path: USER_ASSESSMENT_PAGE_ROUTE, loadChildren: () => import('./user-assessment-report/user-assessment-report.module').then(m => m.UserAssessmentReportModule), canLoad: [AuthGuard] },
  { path: USER_MANAGEMENT_PAGE_ROUTE, loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule), canLoad: [AuthGuard] },
  { path: HOMEPAGE_ROUTE, redirectTo: LOGIN_PAGE_ROUTE, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
