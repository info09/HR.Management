import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { UtilityService } from '../shared/services/utility.service';
import { EmployeeDto, EmployeeService } from '@proxy/employees';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  public form: FormGroup;

  selectedEntity = {} as EmployeeDto;
  btnDisabled = false;

  departments: any[] = [];
  positions: any[] = [];
  genderTypes: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private utilityService: UtilityService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.buildForm();
    this.initFormData();
  }

  validationMessages = {
    code: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    name: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    location: [{ type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' }],
  };

  saveChange() {
    this.toggleBlockUI(true);
    if (this.utilityService.isEmpty(this.config.data?.id)) {
      this.employeeService
        .create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
        });
    } else {
      this.employeeService
        .update(this.config.data?.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
        });
    }
  }

  initFormData() {
    this.toggleBlockUI(true);
    if (this.utilityService.isEmpty(this.config.data?.id)) {
      this.toggleBlockUI(false);
    } else {
      this.loadFormDetail(this.config.data?.id);
    }
  }

  loadFormDetail(id: string) {
    this.toggleBlockUI(true);
    this.employeeService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: EmployeeDto) => {
          this.selectedEntity = res;
          this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  private buildForm() {
    this.form = this.fb.group({
      code: new FormControl(this.selectedEntity.code || null, Validators.required),
      firstName: new FormControl(this.selectedEntity.firstName || null, Validators.required),
      lastName: new FormControl(this.selectedEntity.lastName || null, Validators.required),
      dateOfBirth: new FormControl(this.selectedEntity.dateOfBirth || null, Validators.required),
      gender: new FormControl(this.selectedEntity.genderType || null, Validators.required),
      phoneNumber: new FormControl(this.selectedEntity.phoneNumber || null, Validators.required),
      email: new FormControl(this.selectedEntity.email || null, Validators.required),
      address: new FormControl(this.selectedEntity.address || null, Validators.required),
      departmentId: new FormControl(this.selectedEntity.departmentId || null, Validators.required),
      positionId: new FormControl(this.selectedEntity.positionId || null, Validators.required),
      hireDate: new FormControl(this.selectedEntity.hireDate || null, Validators.required),
      salary: new FormControl(this.selectedEntity.salary || null, Validators.required),
      status: new FormControl(this.selectedEntity.status || null, Validators.required),
      nationality: new FormControl(this.selectedEntity.nationality || null, Validators.required),
      maritalStatus: new FormControl(
        this.selectedEntity.maritalStatus || null,
        Validators.required
      ),
      educationLevel: new FormControl(
        this.selectedEntity.educationLevel || null,
        Validators.required
      ),
      bankAccountNumber: new FormControl(
        this.selectedEntity.bankAccountNumber || null,
        Validators.required
      ),
      taxCode: new FormControl(this.selectedEntity.taxCode || null, Validators.required),
      socialInsurance: new FormControl(
        this.selectedEntity.socialInsurance || null,
        Validators.required
      ),
    });
  }
  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
      this.btnDisabled = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
        this.btnDisabled = false;
      }, 1000);
    }
  }
}
