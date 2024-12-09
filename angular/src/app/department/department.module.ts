import { NgModule } from '@angular/core';
import { DepartmentComponent } from './department.component';
import { SharedModule } from 'primeng/api';
import { DepartmentRoutingModule } from './department-routing.module';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    SharedModule,
    DepartmentRoutingModule,
    PanelModule,
    TableModule,
    PaginatorModule,
    BlockUIModule,
  ],
})
export class DepartmentModule {}
