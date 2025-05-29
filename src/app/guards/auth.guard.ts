import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

export const authGuard = () => {
  const router = inject(Router);
  const apiService = inject(ApiService);

  if (apiService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/');
};
