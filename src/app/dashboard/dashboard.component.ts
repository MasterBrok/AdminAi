import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {
    name: 'Brok',
    avatar: 'assets/admin.png'
  };
  menuItems = [
    { title: 'داشبورد', route: '/dashboard/overview', icon: '🏠' },
    { title: 'کاربران', route: '/dashboard/users', icon: '👥' },
    { title: 'پلیرها', route: '/dashboard/players', icon: '🎮' },
    { title: 'جنسیت‌ها', route: '/dashboard/genders', icon: '🚻' },
    { title: 'فرمون', route: '/dashboard/steering', icon: '🕹️' }
  ];

  activeTheme = 'light';

  time: string = '';
  date: string = '';

  private palettes: Record<string, Record<string, string>> = {
    light: {
      '--primary-100': '#1976d2',
      '--primary-200': '#63a4ff',
      '--primary-300': '#e3f2fd',
      '--accent-100': '#ffd54f',
      '--accent-200': '#ffecb3',
      '--text-100': '#23272f',
      '--text-200': '#4b5563',
      '--bg-100': '#f5f7fa',
      '--bg-200': '#e2eafc',
      '--bg-300': '#c3cfe2',
      '--table-header-text': '#23272f',
      '--table-cell-text': '#23272f',
      '--scrollbar-bg': '#e2eafc',
      '--scrollbar-thumb': '#63a4ff',
      '--scrollbar-thumb-hover': '#1976d2',
    },
    dark: {
      '--primary-100': '#232526',
      '--primary-200': '#414345',
      '--primary-300': '#232526',
      '--accent-100': '#ff9800',
      '--accent-200': '#ffb74d',
      '--text-100': '#f5f7fa',
      '--text-200': '#bfc7d1',
      '--bg-100': '#18191a',
      '--bg-200': '#232526',
      '--bg-300': '#414345',
      '--table-header-text': '#ffd54f',
      '--table-cell-text': '#f5f7fa',
      '--scrollbar-bg': '#232526',
      '--scrollbar-thumb': '#414345',
      '--scrollbar-thumb-hover': '#ff9800',
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.setTheme(this.activeTheme);
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  setTheme(theme: string) {
    this.activeTheme = theme;
    const palette = this.palettes[theme];
    if (palette) {
      Object.entries(palette).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }

  updateClock() {
    const now = new Date();
    this.time = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.date = now.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  isDashboardHome(): boolean {
    return this.router.url === '/dashboard/overview' || this.router.url === '/dashboard';
  }
}
