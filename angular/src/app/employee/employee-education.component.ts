import { educationLevelOptions } from './../proxy/employees/education-level.enum';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '@proxy/departments';
import { EmployeeDto, EmployeeService, graduationTypeOptions } from '@proxy/employees';
import { PositionService } from '@proxy/positions';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { UtilityService } from '../shared/services/utility.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeeEducationDto } from '@proxy/employees/educations';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
})
export class EmployeeEducationComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  btnDisabled = false;
  selectedEntity = {} as EmployeeEducationDto;
  educationLevels: any[] = [];
  graduationTypes: any[] = [];

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
    this.loadEducation();
    this.loadEducationLevel();
    this.loadGraduationType();
  }

  loadEducation() {
    this.toggleBlockUI(true);
    if (this.config.data?.employeeId !== 'undefined') {
      this.employeeService.getEducationByEmployeeId(this.config.data?.employeeId).subscribe({
        next: (res: EmployeeEducationDto) => {
          this.selectedEntity = res;
          if (res !== null) this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
    }
    this.toggleBlockUI(false);
  }

  validationMessages = {
    code: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    name: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    location: [{ type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' }],
  };

  private buildForm() {
    this.form = this.fb.group({
      level: new FormControl(this.selectedEntity.level || null, Validators.required),
      major: new FormControl(this.selectedEntity.major || null, Validators.required),
      schoolName: new FormControl(this.selectedEntity.schoolName || null, Validators.required),
      startYear: new FormControl(this.selectedEntity.startYear || null, Validators.required),
      endYear: new FormControl(this.selectedEntity.endYear || null, Validators.required),
      graduationType: new FormControl(
        this.selectedEntity.graduationType || null,
        Validators.required
      ),
    });
  }

  saveChange() {
    this.toggleBlockUI(true);
    this.employeeService
      .addEducationByEmployeeIdAndInput(this.config.data.employeeId, this.form.value)
      .subscribe({
        next: (res: EmployeeEducationDto) => {
          this.toggleBlockUI(false);
          this.ref.close(res);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  loadEducationLevel() {
    educationLevelOptions.forEach(element => {
      this.educationLevels.push({
        value: element.value,
        label: element.key,
      });
    });
  }

  loadGraduationType() {
    graduationTypeOptions.forEach(element => {
      this.graduationTypes.push({
        value: element.value,
        label: element.key,
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
