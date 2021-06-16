import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  CanActivateChild, 
  Router, 
  RouterStateSnapshot 
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              // canActivate can run both asynchronously, returning an observable or a promise, or synchronously:
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Return this promise because if we return something inside of the promise, it will give us back another promise:
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false; // return false preven the original navigation from happening anyways.
          }
        }
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                  // canActivate can run both asynchronously, returning an observable or a promise, or synchronously:
                  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}