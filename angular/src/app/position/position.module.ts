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
import { PositionRoutingModule } from './position-routing.module';
import { PositionDetailComponent } from './position-detail.component';
import { PositionComponent } from './position.component';

@NgModule({
  declarations: [PositionComponent, PositionDetailComponent],
  imports: [
    SharedModule,
    PositionRoutingModule,
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
  entryComponents: [PositionDetailComponent],
})
export class PositionModule {}
