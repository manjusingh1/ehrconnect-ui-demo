import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { UserProfile } from "../../models/user-profile.model";
import { ClinicianUserRoles } from "../../msal-base/msal-base.component";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  public userDetails: UserProfile;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.userDetails =
      window.sessionStorage.getItem("userProfile") &&
      window.sessionStorage.getItem("userProfile") !== null
        ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
        : {};
  }
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      if (this.userDetails.techSupportDmrOnly) {
        return this.authService.isAuthenticated();
      }
      if (
        this.userDetails.userRoles &&
        _route.data["roles"].some((role: string) =>
          this.userDetails.userRoles.includes(role),
        ) &&
        this.userDetails.userRoles.includes(ClinicianUserRoles.CONSULTING) &&
        _route.url[0].path !== "PEM" &&
        !_state.url.includes("implant-report")
      ) {
        this.router.navigate(["/unauthorized"]);
        return false;
      }
      return this.authService.isAuthenticated();
    } else {
      this.router.navigate(["/base"]);
      return this.authService.isAuthenticated();
    }
  }
}
