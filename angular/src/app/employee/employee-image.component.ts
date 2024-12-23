import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '@proxy/departments';
import { EmployeeDto, EmployeeService } from '@proxy/employees';
import { PositionService } from '@proxy/positions';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilityService } from '../shared/services/utility.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-image',
  templateUrl: './employee-image.component.html',
})
export class EmployeeImageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  public form: FormGroup;
  public thumbnailImage;
  selectedEntity = {} as EmployeeDto;
  btnDisabled = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.buildForm();
    this.loadFormDetail(this.config.data?.id);
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
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
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

  saveChange() {
    this.toggleBlockUI(true);
    this.employeeService.updateImageByIdAndInput(this.config.data?.id, this.form.value).subscribe({
      next: () => {
        this.toggleBlockUI(false);
        this.loadFormDetail(this.config.data?.id);
      },
      error: () => {
        this.toggleBlockUI(false);
      },
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

  private buildForm() {
    this.form = this.fb.group({
      thumbnailPictureName: new FormControl(this.selectedEntity.thumbnailPicture || null),
      thumbnailPictureContent: new FormControl(null),
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
