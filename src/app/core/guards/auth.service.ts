import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserProfile } from "../../models/user-profile.model";
import { ClinicianUserRoles } from "../../msal-base/msal-base.component";

export type CheckUserRolesCallback = (
  _isDrugsMedical: boolean,
  _isOthertabs: boolean,
  isGuest: boolean,
  isHFSUser: boolean,
  isTTSUser: boolean,
  isImplant: boolean,
) => void;

export enum ClinicUserTypes {
  ALLIED_PROFESSIONAL = 41,
  PHYSICIAN = 42,
  ASSISTANT = 239,
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedInStatus = "";

  constructor(private router: Router) {}
  public isAuthenticated(): boolean {
    this.loggedInStatus =
      window.sessionStorage.getItem("accessToken") &&
      window.sessionStorage.getItem("accessToken") != null
        ? window.sessionStorage.getItem("accessToken") || ""
        : "";
    if (this.loggedInStatus && this.loggedInStatus.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public checkUserRoles(callback: CheckUserRolesCallback): void {
    const userDetails: UserProfile =
      window.sessionStorage.getItem("userProfile") &&
      window.sessionStorage.getItem("userProfile") != null
        ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
        : {
            userRecordId: 0,
            customerName: "",
            customerType: "",
            displayName: "",
            logonUserName: "",
            locale: "",
            rpEnabled: "",
            userRoles: [],
            admin: false,
            userTypeCd: 0,
            userType: "",
            techSupportHfsOnly: false,
            techSupportDmrOnly: false,
          };
    const enableDrugsMedical =
      userDetails.userRoles.find(
        (element: ClinicianUserRoles) =>
          element === ClinicianUserRoles.IMPLANTING,
      ) !== undefined ||
      userDetails.userRoles.find(
        (element: ClinicianUserRoles) =>
          element === ClinicianUserRoles.TREATING,
      ) !== undefined
        ? true
        : false;
    const isGuest =
      userDetails.userRoles.find(
        (element: ClinicianUserRoles) =>
          element === ClinicianUserRoles.CONSULTING,
      ) !== undefined
        ? true
        : false;
    const isHFSUser = userDetails?.techSupportHfsOnly;
    const isTTSUser = userDetails?.techSupportDmrOnly;
    const isImplant =
      userDetails.userRoles.find(
        (element: ClinicianUserRoles) =>
          element === ClinicianUserRoles.IMPLANTING,
      ) !== undefined &&
      userDetails.userRoles.find(
        (element: ClinicianUserRoles) =>
          element === ClinicianUserRoles.TREATING,
      ) === undefined;
    let enableOtherTabs;
    if (userDetails.admin) {
      if (
        userDetails.userTypeCd === ClinicUserTypes.PHYSICIAN ||
        userDetails.userTypeCd === ClinicUserTypes.ALLIED_PROFESSIONAL
      ) {
        enableOtherTabs = true;
      } else {
        enableOtherTabs = false;
      }
    } else {
      enableOtherTabs = false;
    }

    if (isTTSUser) {
      enableOtherTabs = true;
    }
    callback(
      enableDrugsMedical,
      enableOtherTabs,
      isGuest,
      isHFSUser as boolean,
      isTTSUser as boolean,
      isImplant,
    );
  }
}
