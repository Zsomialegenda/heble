import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

// adminGuard függvény, ami ellenőrzi, hogy a felhasználónak van-e jogosultsága (szerepkör: admin) és át tud navigálni az adott route-ra (adminpanel)
export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.getRole() === 'admin') {
    return true;
  } else {
    router.navigate(["/coaching"]);
    return false; 
  }
};
