import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserTableState } from '../models/user.model';
import { ApiResponseWithData } from '../api-response.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    apiResponse: ApiResponseWithData<User[]> | null = null;

    constructor(
        private http: ApiService,
        private router: Router
    ) { }    

    tableState: UserTableState = {
        page: 1,
        pageSize: 10,
        filters: {
            username: '',
            phone: ''
        }
    };

    pageSizeOptions = [10, 20, 50];

    get displayedUsers(): User[] {
        return this.users;
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.onSearch();
        }
    }

    ngOnInit() {
        this.loadUsers();
    }    loadUsers() {
        let url = 'User/Users?CurrentPage=' + this.tableState.page;

        if (this.tableState.filters.username?.trim()) {
            url += `&Username=${encodeURIComponent(this.tableState.filters.username.trim())}`;
        }

        if (this.tableState.filters.phone?.trim()) {
            url += `&Phone=${encodeURIComponent(this.tableState.filters.phone.trim())}`;
        }

        this.http.get<User[]>(url)
            .subscribe({
                next: (response) => {
                    this.apiResponse = response;
                    if (response.success) {
                        this.users = response.response;
                    }
                },
                error: (error) => {
                    console.error('Error loading users:', error);
                }
            });
    }

    onSearch() {
        this.tableState.page = 1; // Reset to first page when searching
        this.loadUsers();
    }

    onPageChange(page: number) {
        this.tableState.page = page;
        this.loadUsers();
    }

    onPageSizeChange(pageSize: number) {
        if (pageSize !== this.tableState.pageSize) {
            this.tableState.pageSize = pageSize;
            this.tableState.page = 1;
            this.loadUsers();
        }
    }    onNewUser() {
        this.router.navigate(['/dashboard/users/add']);
    }    onEdit(user: User) {
        this.router.navigate(['/dashboard/users/edit'], {
            queryParams: { userId: user.id }
        });
    }

    formatDate(date: string): string {
        if (!date) return '---';
        return new Date(date).toLocaleString('fa-IR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}