import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUserRequest } from './models/add-user.model';
import { ShortEntity } from './models/gender.model';
import { ApiService } from '../../api.service';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    user: AddUserRequest = {
        userName: '',
        email: '',
        password: '',
        genderId: '',
        avatarId: '',
        phoneNumber: ''
    };

    genders: ShortEntity[] = [];
    avatars: ShortEntity[] = [];
    loading = false;
    error = '';

    constructor(
        private apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadGenders();
        this.loadAvatars();
    }

    loadGenders() {
        this.apiService.get<ShortEntity[]>('Gender/ShortGenders')
            .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.genders = response.response;
                    }
                },
                error: (error) => {
                    console.error('Error loading genders:', error);
                    this.error = 'خطا در بارگذاری جنسیت‌ها';
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
                    console.error('Error loading avatars:', error);
                    this.error = 'خطا در بارگذاری آواتارها';
                }
            });
    }

    onSubmit() {
        this.loading = true;
        this.error = '';

        this.apiService.post('User/AddUser', this.user)
            .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.router.navigate(['/dashboard/users']);
                    } else {
                        this.error = response.messages?.join(' ') 
                        || 'خطا در ثبت کاربر';
                    }
                },
                error: (error) => {
                    console.error('Error adding user:', error);
                    this.error = 'خطا در ثبت کاربر';
                },
                complete: () => {
                    this.loading = false;
                }
            });
    }    onCancel() {
        this.router.navigate(['/dashboard/users']);
    }

    getSelectedAvatarUrl(): string {
        const selectedAvatar = this.avatars.find(a => a.id === this.user.avatarId);
        return selectedAvatar?.value || '';
    }

    getSelectedAvatarValue(): string {
        const selectedAvatar = this.avatars.find(a => a.id === this.user.avatarId);
        return selectedAvatar?.value || 'Avatar';
    }
}
