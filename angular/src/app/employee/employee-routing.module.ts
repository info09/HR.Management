import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HrManagementAdmin.Employee',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
