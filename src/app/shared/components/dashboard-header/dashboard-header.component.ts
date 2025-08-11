import { CommonModule, DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { UserProfiles } from "../../../models/user-profile.model";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AppMsalService } from "../../../app-msal.service";

@Component({
  selector: "app-dashboard-header",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
  ],
  templateUrl: "./dashboard-header.component.html",
  styleUrl: "./dashboard-header.component.scss",
  providers: [DatePipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  currentDate!: string;
  @Output() logOutEmitter = new EventEmitter();
  @Input() loginDisplay = false;
  userProfile!: UserProfiles;
  public isExpanded = false;

  navItems1 = [
    { label: "Team", link: "/teams", icon: "teams" },
    { label: "Notifications", link: "/notifications", icon: "notifications" },
    { label: "Mail", link: "/mail", icon: "mail" },
    { label: "User", link: "/user", icon: "user" },
  ];

  navItems = [
    { label: "Dashboard", link: "/bam/dash-board" },
    { label: "By Clinics", link: "/bam/by-clinics" },
    { label: "Live Status", link: "/bam/live-status" },
    { label: "Clinic Config", link: "/bam/clinic-config" },
    { label: "My Profile", link: "/bam/my-profile" },
  ];
  constructor(
    private datePipe: DatePipe,
    private appMsalService: AppMsalService,
  ) {
    this.userProfile = window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
      : null;
    this.currentDate = this.getFormattedDate();
  }

  getFormattedDate(): string {
    return this.datePipe.transform(new Date(), "dd MMMM, yyyy") || "";
  }

  logout(): void {
    this.appMsalService.logoutUser();
    history.pushState(null, "");
    window.localStorage.clear();
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
