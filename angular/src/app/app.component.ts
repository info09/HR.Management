import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { LOGIN_URL } from './shared/constants/urls.const';
import { TokenStorageService } from './shared/services/token.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet>
    <p-toast position="top-right"></p-toast>
    <p-confirmDialog
      header="Xác nhận"
      acceptLabel="Có"
      rejectLabel="Không"
      icon="pi pi-exclamation-triangle"
    ></p-confirmDialog>`,
})
export class AppComponent {
  menuMode = 'static';
  constructor(
    private primengConfig: PrimeNGConfig,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
    if (this.tokenService.getToken() == null) {
      this.router.navigate([LOGIN_URL]);
    }
  }
}
