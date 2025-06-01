import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { EditGenderViewModel } from '../models/gender.model';
import { ShortEntity } from '../../users/add/models/gender.model';

@Component({
  selector: 'app-edit-gender',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-gender.component.html',
  styleUrls: ['./edit-gender.component.css']
})
export class EditGenderComponent implements OnInit {
  gender!: EditGenderViewModel;
  states: ShortEntity[] = [];
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const genderId = this.route.snapshot.queryParamMap.get('id');
    if (!genderId) {
      this.router.navigate(['/dashboard/genders']);
      return;
    }
    this.loadGender(genderId);
    this.loadStates();
  }

  loadGender(id: string) {
    this.loading = true;
    this.api.get<any>(`Gender/GetDetail?genderId=${id}`).subscribe({
      next: (res) => {
        if (res.success) {
          this.gender = {
            id: res.response.id,
            gender: res.response.gender,
            state: res.response.state
          };
        } else {
          this.error = res.messages?.join(' ') || 'خطا در دریافت اطلاعات جنسیت';
        }
      },
      error: () => {
        this.error = 'خطا در دریافت اطلاعات جنسیت';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  loadStates() {
    this.api.getShort<ShortEntity[]>('Types/States').subscribe({
      next: (res) => {
        if (res) {
          this.states = res;
        }
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.api.put('Gender/Edit', this.gender).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/dashboard/genders']);
        } else {
          this.error = res.messages?.join(' ') || 'خطا در ویرایش جنسیت';
        }
      },
      error: () => {
        this.error = 'خطا در ویرایش جنسیت';
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
