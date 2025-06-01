import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ShortEntity } from '../users/add/models/gender.model';
import { Router } from '@angular/router';

interface Int32KeyValueViewModel {
  id: number;
  value: string;
}

interface GenderViewModel {
  id: string;
  gender: string;
  state?: number;
}

@Component({
  selector: 'app-genders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css']
})
export class GendersComponent implements OnInit {
  genders: GenderViewModel[] = [];
  states: ShortEntity[] = [];
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadStates();

  }

  loadStates() {
    this.api.getShort<ShortEntity[]>('Types/States').subscribe({
      next: (res) => {
        if (res) {
          this.states = res;
        }
        this.loadGenders();
      },
      error: () => {
        this.error = 'خطا در دریافت وضعیت‌ها';
        this.loadGenders();
      }
    });
  }

  loadGenders() {
    this.loading = true;
    this.api.get<any>('Gender/Genders').subscribe({
      next: (res) => {
        if (res.success) {
          this.genders = res.response;
        } else {
          this.error = res.messages?.join(' ') || 'خطا در دریافت لیست جنسیت‌ها';
        }
      },
      error: () => {
        this.error = 'خطا در دریافت لیست جنسیت‌ها';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getStateText(state: number | undefined): string {
    let found = this.states.find(s => Number(s.id) === state);
    return found?.value || 'نامشخص';
  }

  onEdit(gender: GenderViewModel) {
    this.router.navigate(['/dashboard/genders/edit'], { queryParams: { id: gender.id } });
  }

  onAdd() {
    this.router.navigate(['/dashboard/genders/add']);
  }
}
