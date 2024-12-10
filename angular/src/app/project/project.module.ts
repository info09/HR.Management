import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ManagerSharedModule } from '../shared/modules/manager-shared.module';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ProjectComponent, ProjectDetailComponent],
  imports: [
    SharedModule,
    ProjectRoutingModule,
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
    CalendarModule,
  ],
  entryComponents: [ProjectComponent, ProjectDetailComponent],
})
export class ProjectModule {}
