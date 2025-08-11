import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiCallService } from "./api-call.service";
import { APIRoutes } from "./app-api-routes";
import {
  UserProfileResponse,
  UserProfile,
  UserAgreementData,
} from "../models/user-profile.model";

@Injectable({
  providedIn: "root",
})
export class UserProfileService {
  getUserProfileUrl: string;
  menuAuthorization: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private apiCallService: ApiCallService,
    private apiRoutes: APIRoutes,
  ) {
    this.getUserProfileUrl = this.apiCallService.getUserProfileUrl;
    this.baseUrl = this.apiCallService.BASEAPIM_URL;
  }

  getUserProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(
      this.getUserProfileUrl + "?scope=ui",
    );
  }

  setUserAuthorization(userDetails: UserProfile | null) {
    this.menuAuthorization.next(userDetails);
  }

  getUserAvatarName(userDetails: any) {
    return (
      (userDetails?.firstName
        ? userDetails?.firstName?.charAt(0)?.toUpperCase()
        : "") +
      " " +
      (userDetails?.lastName
        ? userDetails?.lastName?.charAt(0)?.toUpperCase()
        : "")
    );
  }

  getHFSUserAvatarName(userDetails: any) {
    let userName = "";
    const array = userDetails?.displayName?.split(",");
    array?.forEach((item: string) => {
      userName = userName + item.trim().charAt(0) + " ";
    });
    return userName.trim();
  }

  loginHistory(payload: any): Observable<any> {
    return this.http.post(
      this.apiRoutes.CLINIC_API_ROUTES.USERPROFILE.getPublishAuditHistoryEventUrl(),
      payload,
    );
  }

  // ==========TO DO======================//
  // getIpAddress() {
  //   return this.http.get('https://ipinfo.io/json');
  // }

  UpdateUserAgreement(payload: UserAgreementData): Observable<any> {
    return this.http.put(
      this.apiRoutes.CLINIC_API_ROUTES.USERPROFILE.getUserProfileAgreementUrl(),
      payload,
    );
  }
}
