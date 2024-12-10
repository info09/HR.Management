import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    component: AppLayoutComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
    component: AppLayoutComponent,
  },
  {
    path: 'position',
    loadChildren: () => import('./position/position.module').then(m => m.PositionModule),
    component: AppLayoutComponent,
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
    component: AppLayoutComponent,
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    component: AppLayoutComponent,
  },
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
    component: AppLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
