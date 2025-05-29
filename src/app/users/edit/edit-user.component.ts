import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ApiResponse } from '../../api-response.model';
import { UserDetail, Role, EditUserRequest } from './models/user-detail.model';
import { ShortEntity } from '../add/models/gender.model';

@Component({
    selector: 'app-edit-user',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    userDetail!: UserDetail;
    genders: ShortEntity[] = [];
    availableRoles: Role[] = [];
    loading = false;
    error = '';

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const userId = this.route.snapshot.queryParamMap.get('userId');
        if (!userId) {
            this.router.navigate(['/dashboard/users']);
            return;
        }

        this.loadUserDetail(userId);
        this.loadGenders();
    } loadUserDetail(userId: string) {
        this.loading = true;
        this.apiService.get<UserDetail>(`User/GetDetail?userId=${userId}`)
            .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.userDetail = response.response;
                        // نقش‌های موجود را به availableRoles اضافه می‌کنیم
                        this.availableRoles = [...this.userDetail.roles];
                        this.updateAvailableRoles();
                    } else {
                        this.error = response.messages?.join(' ') || 'خطا در بارگیری اطلاعات کاربر';
                    }
                },
                error: (error) => {
                    console.error('Error loading user details:', error);
                    this.error = 'خطا در بارگیری اطلاعات کاربر';
                },
                complete: () => {
                    this.loading = false;
                }
            });
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

    updateAvailableRoles() {
        this.availableRoles = this.userDetail.roles.filter(role =>
            !this.userDetail.currentRoles.some(cr => cr.id === role.id)
        );
    }

    addRole(role: Role) {
        this.userDetail.currentRoles.push(role);
        this.updateAvailableRoles();
    }

    removeRole(role: Role) {
        const index = this.userDetail.currentRoles.findIndex(r => r.id === role.id);
        if (index > -1) {
            this.userDetail.currentRoles.splice(index, 1);
            this.updateAvailableRoles();
        }
    }

    onSubmit() {
        this.loading = true;
        this.error = ''; 
        let request: EditUserRequest = {
            id: this.userDetail.id,
            userName: this.userDetail.userName,
            phone: this.userDetail.phone,
            email: this.userDetail.email,
            genderId: this.userDetail.genderId,
            emailConfirmed: this.userDetail.emailConfirmed,
            phoneConfirmed: this.userDetail.phoneConfirmed,
            currentRoles: this.userDetail.currentRoles
        };

        console.log(request);
        this.apiService.put('User/EditUser', request)
            .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.router.navigate(['/dashboard/users']);
                    } else {
                        this.error = response.messages?.join(' ') || 'خطا در ویرایش کاربر';
                    }
                },
                error: (error) => {
                    console.error('Error editing user:', error);
                    this.error = 'خطا در ویرایش کاربر';
                },
                complete: () => {
                    this.loading = false;
                }
            });
    }

    onCancel() {
        this.router.navigate(['/dashboard/users']);
    }
}
