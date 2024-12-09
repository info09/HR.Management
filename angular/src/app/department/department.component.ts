import { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentDto, DepartmentInListDto, DepartmentService } from '@proxy/departments';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../shared/services/notification.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DepartmentDetailComponent } from './department-detail.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit, OnDestroy {
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
    private departmentService: DepartmentService,
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
    this.departmentService
      .getListFilter({
        keyword: this.keyword,
        skipCount: this.skipCount,
        maxResultCount: this.maxResultCount,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: PagedResultDto<DepartmentInListDto>) => {
          this.items = res.items;
          this.totalCount = res.totalCount;
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
    const ref = this.dialogService.open(DepartmentDetailComponent, {
      data: {
        id: id,
      },
      header: 'Cập nhật sản phẩm',
      width: '70%',
    });
    ref.onClose.subscribe((data: DepartmentDto) => {
      if (data) {
        this.loadData();
        this.selectedItems = [];
        this.notificationService.showSuccess('Cập nhật department thành công');
      }
    });
  }

  showAddModal() {
    const ref = this.dialogService.open(DepartmentDetailComponent, {
      header: 'Thêm mới sản phẩm',
      width: '70%',
    });
    ref.onClose.subscribe((data: DepartmentDto) => {
      if (data) {
        this.loadData();
        this.notificationService.showSuccess('Thêm department thành công');
      }
    });
  }

  deleteItems() {
    var ids = [];
    this.selectedItems.forEach(element => {
      ids.push(element.id);
    });
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      accept: () => this.deleteItemsConfirm(ids),
    });
  }

  deleteItemsConfirm(ids: string[]) {
    this.toggleBlockUI(true);
    this.departmentService
      .deleteMultile(ids)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Xóa thành công');
          this.toggleBlockUI(false);
          this.loadData();
        },
      });
  }

  pageChanged(event: any): void {
    this.skipCount = event.page * this.maxResultCount;
    this.maxResultCount = event.rows;
    this.loadData();
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
