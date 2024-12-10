import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { UtilityService } from '../shared/services/utility.service';
import { EmployeeDto, EmployeeService, genderTypeOptions } from '@proxy/employees';
import { DomSanitizer } from '@angular/platform-browser';
import { DepartmentInListDto, DepartmentService, PositionInListDto } from '@proxy/departments';
import { PositionService } from '@proxy/positions';

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

  public thumbnailImage;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private utilityService: UtilityService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.buildForm();
    this.loadGenderType();
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
    var departments = this.departmentService.getListAll();
    var positions = this.positionService.getListAll();
    this.toggleBlockUI(true);
    forkJoin({ departments, positions })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          var departments = res.departments as DepartmentInListDto[];
          var positions = res.positions as PositionInListDto[];

          departments.forEach(element => {
            this.departments.push({
              value: element.id,
              label: element.name,
            });
          });

          positions.forEach(element => {
            this.positions.push({
              value: element.id,
              label: element.name,
            });
          });

          if (this.utilityService.isEmpty(this.config.data?.id)) {
            this.toggleBlockUI(false);
          } else {
            this.loadFormDetail(this.config.data?.id);
          }
        },
      });
  }

  loadFormDetail(id: string) {
    this.toggleBlockUI(true);
    this.employeeService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: EmployeeDto) => {
          this.selectedEntity = res;
          this.loadThumbnail(this.selectedEntity.thumbnailPicture);
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
      civilId: new FormControl(this.selectedEntity.civilId || null, Validators.required),
      firstName: new FormControl(this.selectedEntity.firstName || null, Validators.required),
      lastName: new FormControl(this.selectedEntity.lastName || null, Validators.required),
      dateOfBirth: new FormControl(
        this.selectedEntity.dateOfBirth == null
          ? null
          : new Date(this.selectedEntity.dateOfBirth) || null,
        Validators.required
      ),
      genderType: new FormControl(this.selectedEntity.genderType || null, Validators.required),
      phoneNumber: new FormControl(this.selectedEntity.phoneNumber || null, Validators.required),
      email: new FormControl(this.selectedEntity.email || null, Validators.required),
      address: new FormControl(this.selectedEntity.address || null, Validators.required),
      departmentId: new FormControl(this.selectedEntity.departmentId || null, Validators.required),
      positionId: new FormControl(this.selectedEntity.positionId || null, Validators.required),
      hireDate: new FormControl(
        this.selectedEntity.hireDate == null
          ? null
          : new Date(this.selectedEntity.hireDate) || null,
        Validators.required
      ),
      salary: new FormControl(this.selectedEntity.salary || null, Validators.required),
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
      thumbnailPictureName: new FormControl(this.selectedEntity.thumbnailPicture || null),
      thumbnailPictureContent: new FormControl(null),
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({
          thumbnailPictureName: file.name,
          thumbnailPictureContent: reader.result,
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  loadThumbnail(fileName: string) {
    this.employeeService
      .getThumbnailImage(fileName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: string) => {
          var fileExt = this.selectedEntity.thumbnailPicture?.split('.').pop();
          this.thumbnailImage = this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/${fileExt};base64, ${response}`
          );
        },
      });
  }

  loadGenderType() {
    genderTypeOptions.forEach(element => {
      this.genderTypes.push({
        value: element.value,
        label: element.key == 'Male' ? 'Nam' : 'Nữ',
      });
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
