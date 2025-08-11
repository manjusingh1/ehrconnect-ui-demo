import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from "@azure/msal-angular";
import {
  AuthenticationResult,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  RedirectRequest,
} from "@azure/msal-browser";
import { jwtDecode } from "jwt-decode";
import { Observable, tap, timer } from "rxjs";
import { filter, switchMap, take } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { PrimaryLoaderComponent } from "../loader/primary-loader/primary-loader.component";
import { UserProfile, UserProfiles } from "../models/user-profile.model";
import { UserProfileService } from "../service/user-profile.service";

@Component({
  selector: "hf-workspace-msal-base",
  templateUrl: "./msal-base.component.html",
  styleUrls: ["./msal-base.component.scss"],
  standalone: true,
  imports: [CommonModule, PrimaryLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsalBaseComponent {
  loginDisplay = false;
  isLoading = true;
  roles: string = "";
  msalBroadcastInProgress$: Observable<InteractionStatus>;

  constructor(
    @Inject(MSAL_GUARD_CONFIG)
    private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private userProfileService: UserProfileService,
  ) {
    console.log("msal");
    this.msalBroadcastInProgress$ = this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      tap(() => {
        this.getAccessOrLogin();
      }),
    );
  }

  getAccessOrLogin() {
    this.setLoginDisplay();
    if (this.loginDisplay) {
      this.fetchAccessToken();
    } else {
      this.login();
    }
  }

  setLoginDisplay() {
    this.loginDisplay =
      this.msalService.instance.getAllAccounts().length > 0 ||
      (window.sessionStorage.getItem("accessToken") != null &&
        window.sessionStorage.getItem("accessToken") !== undefined);
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.msalService
          .loginPopup({
            ...this.msalGuardConfig.authRequest,
          } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.msalService.instance.setActiveAccount(response.account);
          });
      } else {
        this.msalService
          .loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.msalService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.msalService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest);
      } else {
        this.msalService.loginRedirect();
      }
    }
  }

  redirectToLandingPageTest(type?: any, isNewUser?: any, isImplantUer?: any) {
    console.log("type", type);
    if (window.location.pathname.includes("/base")) {
      if (isNewUser) {
        this.router.navigateByUrl("/terms-and-conditions");
      } else if (type === "Admin") {
        this.router.navigateByUrl("/home");
      } else if (type === "Support") {
        this.router.navigateByUrl("/bam/dash-board");
      }
    } else {
      const userDetails: UserProfile =
        window.sessionStorage.getItem("userProfile") &&
        window.sessionStorage.getItem("userProfile") != null
          ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
          : null;
      console.log("userDetails", userDetails);
    }
  }

  fetchAccessToken() {
    if (window?.sessionStorage?.getItem("accessToken")?.length) {
      console.log("2", this.roles);
      this.navigateToApplication(this.roles);
    } else {
      this.getSilentToken();
    }
  }

  getSilentToken(): void {
    this.msalService
      .acquireTokenSilent({
        scopes: this.generateScopes(),
      } as RedirectRequest)
      .pipe(
        switchMap((authenticationResult: AuthenticationResult) => {
          window.sessionStorage.setItem(
            "accessToken",
            authenticationResult.accessToken,
          );
          window.sessionStorage.setItem("guid", crypto.randomUUID() + "_");
          window.sessionStorage.setItem(
            "expiresOn",
            (authenticationResult.expiresOn ?? "").toString(),
          );
          this.refreshAccessToken(authenticationResult.expiresOn);
          console.log("3", this.roles);
          const decodedToken: any = jwtDecode(authenticationResult.accessToken);
          this.roles = decodedToken.extension_Role;
          this.setUserProfileSessionStorage(decodedToken);
          this.navigateToApplication(this.roles);
          return [];
        }),
        take(1),
      )
      .subscribe();
  }

  navigateToApplication(type?: any, isNewUser?: any, isImplantUer?: any) {
    this.redirectToLandingPageTest(type, isNewUser, isImplantUer);
  }

  refreshAccessToken(data: any): void {
    const endDate = data;
    const startDate = new Date();
    // subtracting a few milliseconds to maintain continuity and call refresh token a few seconds before it expires
    const timeDiff =
      endDate.getTime() -
      startDate.getTime() -
      Number(environment.refreshTokenReducedTime);
    const source = timer(timeDiff);

    // TODO :: take a look into this subscription with attention to app.component when it checks 'expiresOn'
    source.subscribe(() => {
      this.getSilentToken();
    });
  }

  generateScopes(): string[] {
    const returnArray: string[] = [];
    environment.scopePermissions
      .trim()
      .split(" ")
      .forEach((scopeUrl: string) => {
        returnArray.push(environment.scope);
      });
    return returnArray;
  }

  setUserProfileSessionStorage(userData: any) {
    console.log("userData", userData);
    const userProfile: UserProfiles = {
      extension_App: userData.extension_App,
      name: userData.name,
      extension_Role: userData.extension_Role,
      given_name: userData.given_name,
      exp: userData.exp,
    };

    window.sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
    return userProfile;
  }
}
