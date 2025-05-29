import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {
    name: 'کاربر نمونه',
    avatar: 'assets/profile-placeholder.png'
  };
  menuItems = [
    { title: 'داشبورد', route: '/dashboard/overview', icon: '🏠' },
    { title: 'کاربران', route: '/dashboard/users', icon: '👥' },
    { title: 'تنظیمات', route: '/dashboard/settings', icon: '⚙️' },
    { title: 'گزارشات', route: '/dashboard/reports', icon: '📊' }
  ];

  ngOnInit() {
    // Component initialization logic
  }
}
