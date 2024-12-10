import { AuthService } from '@abp/ng.core';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleDto, RoleService } from '@proxy/systems/roles';
import { UserDto, UserService } from '@proxy/systems/users';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public roles: any[] = [];
  public countries: any[] = [];
  public provinces: any[] = [];
  selectedEntity = {} as UserDto;
  public avatarImage;
  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private roleService: RoleService,
    private userService: UserService,
    public authService: AuthService,
    private utilService: UtilityService,
    private fb: FormBuilder
  ) {}

  // Validate
  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }],
    surname: [{ type: 'required', message: 'Bạn phải URL duy nhất' }],
    email: [{ type: 'required', message: 'Bạn phải nhập email' }],
    userName: [{ type: 'required', message: 'Bạn phải nhập tài khoản' }],
    password: [
      { type: 'required', message: 'Bạn phải nhập mật khẩu' },
      {
        type: 'pattern',
        message: 'Mật khẩu ít nhất 8 ký tự, ít nhất 1 số, 1 ký tự đặc biệt, và một chữ hoa',
      },
    ],
    phoneNumber: [{ type: 'required', message: 'Bạn phải nhập số điện thoại' }],
  };

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.buildForm();

    var roles = this.roleService.getListAll();
    this.toggleBlockUI(true);
    forkJoin({ roles })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          var roles = response.roles as RoleDto[];
          roles.forEach(element => {
            this.roles.push({
              value: element.id,
              label: element.name,
            });
          });

          if (this.utilService.isEmpty(this.config.data?.id) == false) {
            this.loadFormDetails(this.config.data?.id);
          } else {
            this.setMode('create');
            this.toggleBlockUI(false);
          }
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  loadFormDetails(id: string) {
    this.toggleBlockUI(true);
    this.userService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: UserDto) => {
          this.selectedEntity = res;
          this.buildForm();
          this.setMode('update');
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  saveChange() {
    this.toggleBlockUI(true);
    if (this.utilService.isEmpty(this.config.data?.id)) {
      this.userService
        .create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.ref.close(this.form.value);
            this.toggleBlockUI(false);
          },
          error: () => {
            this.toggleBlockUI(false);
          },
        });
    } else {
      this.userService
        .update(this.config.data.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.ref.close(this.form.value);
            this.toggleBlockUI(false);
          },
          error: () => {
            this.toggleBlockUI(false);
          },
        });
    }
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.btnDisabled = true;
      this.blockedPanelDetail = true;
    } else {
      setTimeout(() => {
        this.btnDisabled = false;
        this.blockedPanelDetail = false;
      }, 1000);
    }
  }
  setMode(mode: string) {
    if (mode == 'update') {
      this.form.controls['userName'].clearValidators();
      this.form.controls['userName'].disable();
      this.form.controls['email'].clearValidators();
      this.form.controls['email'].disable();
      this.form.controls['password'].clearValidators();
      this.form.controls['password'].disable();
    } else if (mode == 'create') {
      this.form.controls['userName'].addValidators(Validators.required);
      this.form.controls['userName'].enable();
      this.form.controls['email'].addValidators(Validators.required);
      this.form.controls['email'].enable();
      this.form.controls['password'].addValidators(Validators.required);
      this.form.controls['password'].enable();
    }
  }
  buildForm() {
    this.form = this.fb.group({
      name: new FormControl(this.selectedEntity.name || null, Validators.required),
      surname: new FormControl(this.selectedEntity.surname || null, Validators.required),
      userName: new FormControl(this.selectedEntity.userName || null, Validators.required),
      email: new FormControl(this.selectedEntity.email || null, Validators.required),
      phoneNumber: new FormControl(this.selectedEntity.phoneNumber || null, Validators.required),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ])
      ),
    });
  }
}