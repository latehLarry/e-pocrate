import { Router } from '@angular/router';
import { AdminService } from './../../services/admin/admin.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

    constructor(private adminService: AdminService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.headers.get('noauth')) {
      return next.handle(req.clone());
    } else {
      const clonereq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.adminService.getToken())
      });
      return next.handle(clonereq).pipe(
        tap(
          event => { },
          err => {
            if (err.error.auth == false) {
              this.router.navigateByUrl("/admin-signin");
            }
          }
        )
      )
    }
  }
    
}