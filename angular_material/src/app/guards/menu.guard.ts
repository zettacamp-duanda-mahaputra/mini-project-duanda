import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class MenuGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
            const token = this.authService.getToken()
            const role = this.authService.getRole()
            const isAdmin = token && role == 'Admin' 

        if (!isAdmin) {
            return this.router.navigate(['Homepage']);
        }

        return true;
    }
}
