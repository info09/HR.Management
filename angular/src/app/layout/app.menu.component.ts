import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Trang chủ',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
      },
      {
        label: 'Thông tin chung',
        items: [
          {
            label: 'Chi nhánh',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/department'],
            permission: 'HrManagementAdmin.Department',
          },
          {
            label: 'Vị trí',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/position'],
            permission: 'HrManagementAdmin.Position',
          },
          {
            label: 'Dự án',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/project'],
            permission: 'HrManagementAdmin.Project',
          },
        ],
      },
      {
        label: 'Thông tin nhân viên',
        items: [
          {
            label: 'Nhân viên',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/employee'],
            permission: 'HrManagementAdmin.Employee',
          },
        ],
      },
      {
        label: 'Hệ thống',
        items: [
          {
            label: 'Quyền người dùng',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/system/role'],
            permission: 'AbpIdentity.Roles',
          },
          {
            label: 'Tài khoản người dùng',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/system/user'],
            permission: 'AbpIdentity.Users',
          },
        ],
      },
    ];
  }
}
