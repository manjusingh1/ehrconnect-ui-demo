import { Inject, Injectable } from "@angular/core";
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";
import { environment } from "../environments/environment";
// import { UserAccessControlService } from './services/user-access-control.service';

@Injectable({
  providedIn: "root",
})
export class AppMsalService {
  constructor(
    private msalService: MsalService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    // private userAccessControlService: UserAccessControlService,
  ) {}

  logoutUser(): void {
    if (this.msalGuardConfig?.interactionType === InteractionType.Popup) {
      this.msalService.logoutPopup({
        postLogoutRedirectUri: environment.redirectUri,
        mainWindowRedirectUri: environment.redirectUri,
      });
    } else {
      const userProfile = JSON.parse(
        window.sessionStorage.getItem("userProfile") as string,
      );
      const navUrl = environment.logoutRedirectURI;
      this.msalService.logoutRedirect({
        postLogoutRedirectUri: navUrl,
      });
    }
    window.sessionStorage.clear();
    // this.userAccessControlService.resetUserDetails();
  }
}
