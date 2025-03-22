import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

// authGuard függvény, ami ellenőrzi, hogy a felhasználónak van-e jogosultsága át navigálni az adott route-ra
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.loggedIn()) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false; 
  }
};
