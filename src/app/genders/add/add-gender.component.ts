import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AddGenderViewModel } from '../models/gender.model';

@Component({
  selector: 'app-add-gender',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-gender.component.html',
  styleUrls: ['./add-gender.component.css']
})
export class AddGenderComponent {
  gender: AddGenderViewModel = { gender: '' };
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.api.post('Gender/Add', this.gender).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/dashboard/genders']);
        } else {
          this.error = res.messages?.join(' ') || 'خطا در افزودن جنسیت';
        }
      },
      error: () => {
        this.error = 'خطا در افزودن جنسیت';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/genders']);
  }
}
