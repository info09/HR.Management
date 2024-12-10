import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto, DepartmentService, PositionDto } from '@proxy/departments';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { UtilityService } from '../shared/services/utility.service';
import { PositionService } from '@proxy/positions';
import { ProjectDto, ProjectService } from '@proxy/projects';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  public form: FormGroup;

  selectedEntity = {} as ProjectDto;
  btnDisabled = false;

  constructor(
    private projectService: ProjectService,
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
    startDate: [{ type: 'required', message: 'Bạn phải nhập ngày kickoff dự án' }],
  };

  saveChange() {
    this.toggleBlockUI(true);
    if (this.utilityService.isEmpty(this.config.data?.id)) {
      this.projectService
        .create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
        });
    } else {
      this.projectService
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
    this.projectService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: ProjectDto) => {
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
      name: new FormControl(
        this.selectedEntity.name || null,
        Validators.compose([Validators.required, Validators.maxLength(250)])
      ),
      code: new FormControl(this.selectedEntity.code || null, Validators.required),
      startDate: new FormControl(
        this.selectedEntity.startDate == null
          ? null
          : new Date(this.selectedEntity.startDate) || null,
        Validators.required
      ),
      endDate: new FormControl(
        this.selectedEntity.endDate == null ? null : new Date(this.selectedEntity.endDate) || null
      ),
      budget: new FormControl(this.selectedEntity.budget || null),
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
