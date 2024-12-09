import { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentInListDto, DepartmentService } from '@proxy/departments';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  items = [];
  //Paging variables
  public skipCount: number = 0;
  public maxResultCount: number = 10;
  public totalCount: number;

  constructor(private departmentService: DepartmentService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.departmentService
      .getListFilter({
        keyword: '',
        skipCount: this.skipCount,
        maxResultCount: this.maxResultCount,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: PagedResultDto<DepartmentInListDto>) => {
          this.items = res.items;
          this.totalCount = res.totalCount;
        },
      });
  }

  pageChanged(event: any): void {
    this.skipCount = (event.page - 1) * this.maxResultCount;
    this.maxResultCount = event.rows;
    this.loadData();
  }
}
