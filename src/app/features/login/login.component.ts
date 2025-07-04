import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  passwordVisible = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  redirectTo = '/vaovao/dashboard';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['redirectTo']) {
        this.redirectTo = params['redirectTo'];
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.error = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigateByUrl(this.redirectTo);
      },
      error: () => {
        this.error = 'Misy diso ny anarana na ny teny miafina';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
