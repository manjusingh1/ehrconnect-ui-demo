import { Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { DashboardComponent } from "./componenets/dashboard/dashboard.component";
import { FailedComponent } from "./shared/components/failed/failed.component";
import { ByClinicComponent } from "./componenets/dashboard/by-clinic/by-clinic.component";
import { LiveStatusComponent } from "./componenets/dashboard/live-status/live-status.component";
import { ClinicConfigComponent } from "./componenets/dashboard/clinic-config/clinic-config.component";
import { MyProfileComponent } from "./componenets/dashboard/my-profile/my-profile.component";
import { DashboardHeaderComponent } from "./shared/components/dashboard-header/dashboard-header.component";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./componenets/admin/home.component").then(
        (module) => module.HomeComponent,
      ),
    canActivate: [MsalGuard],
  },
  {
    path: "base",
    loadComponent: () =>
      import("./msal-base/msal-base.component").then(
        (m) => m.MsalBaseComponent,
      ),
    canActivate: [MsalGuard],
  },
  {
    path: "app-failed",
    component: FailedComponent,
  },
  {
    path: "bam",
    component: DashboardHeaderComponent,
    canActivate: [MsalGuard],
    children: [
      { path: "", redirectTo: "dash-board", pathMatch: "full" },
      {
        path: "dash-board",
        component: DashboardComponent,
        canActivate: [MsalGuard],
      },
      {
        path: "by-clinics",
        component: ByClinicComponent,
        canActivate: [MsalGuard],
      },
      {
        path: "live-status",
        component: LiveStatusComponent,
        canActivate: [MsalGuard],
      },
      {
        path: "clinic-config",
        component: ClinicConfigComponent,
        canActivate: [MsalGuard],
      },
      {
        path: "my-profile",
        component: MyProfileComponent,
        canActivate: [MsalGuard],
      },
    ],
  },
  { path: "", redirectTo: "base", pathMatch: "full" },
  { path: "**", redirectTo: "base", pathMatch: "full" },
];
