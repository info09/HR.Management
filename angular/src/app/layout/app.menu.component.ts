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
          { label: 'Chi nhánh', icon: 'pi pi-fw pi-circle', routerLink: ['/department'] },
          { label: 'Vị trí', icon: 'pi pi-fw pi-circle', routerLink: ['/position'] },
        ],
      },
    ];
  }
}
