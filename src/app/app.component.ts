import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavigationStart, Router, RouterOutlet } from "@angular/router";
import {
  MsalBroadcastService,
  MsalModule,
  MsalService,
} from "@azure/msal-angular";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from "@azure/msal-browser";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { environment } from "../environments/environment";
import { AppMsalService } from "./app-msal.service";
import { UserProfiles } from "./models/user-profile.model";
import { MsalBaseComponent } from "./msal-base/msal-base.component";
import { UserProfileService } from "./service/user-profile.service";
import { DashboardHeaderComponent } from "./shared/components/dashboard-header/dashboard-header.component";
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MsalModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    HeaderComponent,
    DashboardHeaderComponent,
  ],
  providers: [MsalBaseComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  isIframe = false;
  isLoading = true;
  role: string = "";
  subscription: any;
  browserRefresh!: boolean;

  private readonly _destroying$ = new Subject<void>();
  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private userProfileService: UserProfileService,
    private appMsalService: AppMsalService,
    private msalBaseComponent: MsalBaseComponent,
  ) {
    this.fetchAccessToken();
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS,
        ),
      )
      .subscribe((result: EventMessage) => {
        console.log("routing");
        const payload = result.payload as AuthenticationResult;
        window.sessionStorage.setItem(
          "activeAccount",
          JSON.stringify(payload.account),
        );
        this.msalService.instance.setActiveAccount(payload.account);
      });
    console.log("app");
  }

  fetchAccessToken() {
    if (window?.sessionStorage?.getItem("accessToken")?.length) {
      const userProfile = window.sessionStorage.getItem("userProfile")
        ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
        : null;
      this.navigateToApplication(userProfile?.extension_Role);
    } else {
    }
  }

  private navigateToApplication(isGuest: string, isNewUser?: boolean): void {
    console.log("isGuest", isGuest);
    this.role = isGuest;
    if (window.location.pathname.includes("/base")) {
      if (isNewUser) {
        this.router.navigateByUrl("/terms-and-conditions");
      } else if (isGuest == "Support") {
        this.router.navigateByUrl("/bam/dash-board");
      } else if (isGuest == "Admin") {
        this.router.navigateByUrl("/home");
      }
    }
  }

  setUserProfileSessionStorage(userData: UserProfiles): UserProfiles {
    const userProfile: UserProfiles = {
      extension_App: userData.extension_App,
      name: userData.name,
      extension_Role: userData.extension_Role,
      given_name: userData.given_name,
    };

    window.sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
    return userProfile;
  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !this.router.navigated;
        if (this.browserRefresh) {
          if (window?.sessionStorage?.getItem("expiresOn")?.length) {
            const expiresOn = window?.sessionStorage?.getItem("expiresOn");
            if (expiresOn) {
              this.msalBaseComponent.refreshAccessToken(new Date(expiresOn));
            }
          }
        }
      }
    });
  }

  // logOutEmitter(event: boolean) {
  //   if (event) {
  //     this.logout();
  //   }
  // }

  // logout(): void {
  //   this.appMsalService.logoutUser();
  //   history.pushState(null, '');
  //   window.localStorage.clear();
  // }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.msalService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.msalService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
