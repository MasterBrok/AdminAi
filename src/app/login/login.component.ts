// login.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ApiResponse, ApiResponseWithData } from '../api-response.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  message: string | null = null;
  httpCode: number | null = null;

  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
    this.checkCookies();
  }

  checkCookies() {
    this.api.get('/checkCookies').subscribe((res: ApiResponse) => {
      this.httpCode = res.httpCode;
      this.message = res.messages?.join(' ');
    });
  }

  login() {
    this.loading = true;
    this.message = null;
    let body = {
      username: this.username,
      password: this.password
    }

    delay(5000);

    this.api.post('Account/Login', body).subscribe({
      next: (res) => {
        this.loading = false;
        this.httpCode = res.httpCode;
        if (res.httpCode === 200) {
          this.route.navigate(['/dashboard']);
        }
        else {
          this.message = `${res.messages?.join(' ')} (کد: ${res.httpCode})`;
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.error && err.error.messages) {
          this.message = `${err.error.messages.join(' ')} (کد: ${err.error.httpCode})`;
          this.httpCode = err.error.httpCode;
        } else {
          this.message = 'خطای ناشناخته از سرور';
        }
      }
    });
  }
  logout() {
    this.api.post('/logout', {}).subscribe((res: ApiResponse) => {
      this.httpCode = res.httpCode;
      this.message = res.messages?.join(' ');
      if (res.success && res.httpCode === 200) {
        window.location.reload();
      }
    });
  }
}
