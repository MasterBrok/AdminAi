import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { EditPlayerViewModel } from '../models/player.model';

interface ShortEntity {
  id: string;
  value: string;
}

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  player!: EditPlayerViewModel;
  avatars: ShortEntity[] = [];
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const playerId = this.route.snapshot.queryParamMap.get('id');
    if (!playerId) {
      this.router.navigate(['/dashboard/players']);
      return;
    }
    this.loadPlayer(playerId);
    this.loadAvatars();
  }

  loadPlayer(id: string) {
    this.loading = true;
    this.apiService.get<EditPlayerViewModel>(`Player/GetDetail?playerId=${id}`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.player = response.response;
          } else {
            this.error = response.messages?.join(' ') || 'خطا در دریافت اطلاعات پلیر';
          }
        },
        error: (error) => {
          this.error = 'خطا در دریافت اطلاعات پلیر';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  loadAvatars() {
    this.apiService.get<ShortEntity[]>('Avatar/ShortPlayerAvatars')
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.avatars = response.response;
          }
        },
        error: (error) => {
          this.error = 'خطا در دریافت آواتارها';
        }
      });
  }

  getSelectedAvatarUrl(): string {
    const selected = this.avatars.find(a => a.id === this.player.avatarId);
    return selected?.value || '';
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.apiService.put('Player/Update', this.player)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/dashboard/players']);
          } else {
            this.error = response.messages?.join(' ') || 'خطا در ویرایش پلیر';
          }
        },
        error: (error) => {
          this.error = 'خطا در ویرایش پلیر';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  onCancel() {
    this.router.navigate(['/dashboard/players']);
  }
}
