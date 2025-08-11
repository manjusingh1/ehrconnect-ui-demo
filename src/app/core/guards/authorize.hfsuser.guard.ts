import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserProfile } from "../../models/clinic-users.model";

@Injectable({
  providedIn: "root",
})
export class AuthorizeHFSUserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isUserTypeAdminBased(_route);
  }

  isUserTypeAdminBased(_route: ActivatedRouteSnapshot) {
    const userDetails: UserProfile =
      window.sessionStorage.getItem("userProfile") &&
      window.sessionStorage.getItem("userProfile") != null
        ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
        : {};
    const isHFSUSer = _route.data["isHFSUser"];
    if (isHFSUSer && userDetails.techSupportHfsOnly) {
      return true;
    } else {
      this.router.navigate(["/unauthorized"]);
      return false;
    }
  }
}
