import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PermissionGuard } from '@abp/ng.core';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HrManagementAdmin.Project',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
