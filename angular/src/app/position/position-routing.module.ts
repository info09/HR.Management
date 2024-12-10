import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PositionComponent } from './position.component';
import { PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
  {
    path: '',
    component: PositionComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HrManagementAdmin.Position',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionRoutingModule {}
