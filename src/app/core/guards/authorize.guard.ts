import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isRoleBased(_route);
  }

  isRoleBased(_route: ActivatedRouteSnapshot) {
    const userDetails =
      window.sessionStorage.getItem("userProfile") &&
      window.sessionStorage.getItem("userProfile") != null
        ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
        : {};

    const expectedRoles = _route.data["roles"];
    if (
      expectedRoles.some((role: string) => userDetails.userRoles.includes(role))
    ) {
      return true;
    }
    this.router.navigate(["/unauthorized"]);
    return false;
  }
}
