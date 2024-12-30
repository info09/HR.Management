import { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentDto, DepartmentInListDto, DepartmentService } from '@proxy/departments';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../shared/services/notification.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { EmployeeEducationDetailComponent } from './employee-education-detail.component';
import { EmployeeService } from '@proxy/employees';
import { EmployeeEducationDto } from '@proxy/employees/educations';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
})
export class EmployeeEducationComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  items: DepartmentInListDto[] = [];
  public selectedItems: DepartmentInListDto[] = [];

  //Paging variables
  public skipCount: number = 0;
  public maxResultCount: number = 10;
  public totalCount: number;

  keyword: string = '';

  constructor(
    private employeeService: EmployeeService,
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.toggleBlockUI(true);
    this.employeeService
      .getEducationByEmployeeIdByEmployeeId(this.config.data.employeeId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: DepartmentInListDto[]) => {
          this.items = res;
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  showEditModal() {
    if (this.selectedItems.length == 0) {
      this.notificationService.showError('Bạn phải chọn một bản ghi');
      return;
    }
    const id = this.selectedItems[0].id;
    const ref = this.dialogService.open(EmployeeEducationDetailComponent, {
      data: {
        id: id,
        employeeId: this.config.data.employeeId,
      },
      header: 'Cập nhật học vấn',
      width: '70%',
    });
    ref.onClose.subscribe((data: EmployeeEducationDto) => {
      if (data) {
        this.loadData();
        this.selectedItems = [];
        this.notificationService.showSuccess('Cập nhật học vấn thành công');
      }
    });
  }

  showAddModal() {
    const ref = this.dialogService.open(EmployeeEducationDetailComponent, {
      header: 'Thêm mới học vấn',
      width: '70%',
    });
    ref.onClose.subscribe((data: EmployeeEducationDto) => {
      if (data) {
        this.loadData();
        this.notificationService.showSuccess('Thêm học vấn thành công');
      }
    });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }
}
