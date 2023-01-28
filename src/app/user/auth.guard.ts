import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    
    constructor(private authService: AuthService,
                private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isUserLoggedIn(segments.join('/'));
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
        return this.isUserLoggedIn(state.url);
    }

    isUserLoggedIn(url: string) {
        if(this.authService.currentUser) {
            return true;
        } else {
            this.authService.redirectUrl = url;
            this.router.navigate(['login']);
            return false;
        }
    }
}
