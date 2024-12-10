import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { NgModule } from '@angular/core';
import { PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HrManagementAdmin.Department',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
