import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: DepartmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
