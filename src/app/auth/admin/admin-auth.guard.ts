import { AdminService } from 'src/app/services/admin/admin.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.adminService.isLoggedIn()) {
        this.router.navigateByUrl("/admin-signin");
        this.adminService.deleteToken();
        return false;
      } else
    return true;
  }
  
}
