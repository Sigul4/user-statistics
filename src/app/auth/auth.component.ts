import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { take } from 'rxjs';
import { ACCESS_TOKEN, USER } from 'src/app/auth/auth.constants';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { DASHBOARD_PAGE_ROUTE } from 'src/app/shared/constants/routes.constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public loginForm!: FormGroup;
  public authPicture: SafeResourceUrl;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private localStorageService: LocalStorageService
  ) {
    this.authPicture = this.sanitizer.bypassSecurityTrustResourceUrl(
      'assets/images/illustratin.png'
    );
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Submit login form method
   * @returns {void}
   */
  public onSubmit(): void {
    const loginData = this.loginForm.value;
    this.authService.login(loginData)
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.localStorageService.set(ACCESS_TOKEN, response.token);
          this.localStorageService.set(USER, response);
          this.authService.redirectTo(DASHBOARD_PAGE_ROUTE);
        }
      });
  }
}
