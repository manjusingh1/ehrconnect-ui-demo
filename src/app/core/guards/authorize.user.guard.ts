import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ClinicianUserRoles } from "../../msal-base/msal-base.component";
import { UserProfile } from "../../models/user-profile.model";

@Injectable({
  providedIn: "root",
})
export class AuthorizeUserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

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
    const isAdmin = _route.data["isAdmin"];
    const isHFSUSer = _route.data["isHFSUser"];
    const isTTSUser = _route.data["isTTSUser"];
    const expectedUserType = _route.data["userTypes"];
    if (isTTSUser === userDetails.techSupportDmrOnly) {
      return true;
    }
    if (
      isHFSUSer === userDetails.techSupportHfsOnly
      // && expectedUserType.includes(userDetails.userTypeCd) /** For HFS User userTypeCd is always null, so we don't required to validate the userTypeCd/individualTypeCd */
    ) {
      return true;
    }
    if (
      !userDetails.techSupportHfsOnly &&
      isAdmin === userDetails.admin &&
      expectedUserType.includes(userDetails.userTypeCd)
    ) {
      return true;
    }
    if (
      !userDetails.techSupportHfsOnly &&
      isTTSUser === userDetails.techSupportDmrOnly &&
      expectedUserType.includes(userDetails.userTypeCd)
    ) {
      return true;
    }
    if (
      _route.data["roles"].some((role: string) =>
        userDetails.userRoles.includes(role),
      ) &&
      _route.data["roles"].includes(ClinicianUserRoles.CONSULTING)
    ) {
      return true;
    }
    this.router.navigate(["/unauthorized"]);
    return false;
  }
}
