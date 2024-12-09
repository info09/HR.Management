import { NgModule } from '@angular/core';
import { DepartmentComponent } from './department.component';
import { SharedModule } from 'primeng/api';
import { DepartmentRoutingModule } from './department-routing.module';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DepartmentDetailComponent } from './department-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ManagerSharedModule } from '../shared/modules/manager-shared.module';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [DepartmentComponent, DepartmentDetailComponent],
  imports: [
    SharedModule,
    DepartmentRoutingModule,
    PanelModule,
    TableModule,
    PaginatorModule,
    BlockUIModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    EditorModule,
    ManagerSharedModule,
    BadgeModule,
    ImageModule,
    ConfirmDialogModule,
  ],
  entryComponents: [DepartmentDetailComponent],
})
export class DepartmentModule {}
