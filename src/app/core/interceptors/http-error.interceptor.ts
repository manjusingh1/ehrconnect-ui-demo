import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
// import { PRIMARY_URLS, SYSTEM_ERROR_CODES, Error_Handler_Label } from '../../shared/utils';
import { MatDialog } from "@angular/material/dialog";
// import { ExceptionSeverity } from '../../features/shared/models';
export enum ExceptionSeverity {
  Critical = "critical",
  Incident = "incident",
  Low = "low",
}

export const PRIMARY_URLS = [
  "profile?scope=ui",
  "notification-list",
  "active-patients",
  "patient-list?primaryFilter=InActive",
  "patient-list?primaryFilter=Scheduled",
  "patient-list?primaryFilter=Implanted",
  "patient-list",
  "consulting-patient-list",
  "patients",
  "enrollment",
  "profile",
  "notification-settings",
  "reload-customized-sms",
  "text-message-settings",
  "user-columns",
  "reminders",
  "re-enroll",
  "check",
];

export const SYSTEM_ERROR_CODES = [500, 502, 503, 504];

export const HTTP_METHOD_NAMES = {
  POST_METHOD: "POST",
  PUT_METHOD: "PUT",
  GET_METHOD: "GET",
};

export const Error_Handler_Label = "label.gb.sys_error_msg"; // Category 1
export const Error_Handler_Label_Monitor = "label.gb.sys_error_monitor"; // Category 2
export const Error_Handler_Label_Code = "label.gb.sys_error_Code"; // Category 3
export const DTV_ERROR_CODE = "HF-CPORTAL-DTV-001";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  readonly ROUTE_PROFILE = "/profile?scope=ui";
  readonly STATUS_CODES_TO_SHOW_ERROR_PAGE = SYSTEM_ERROR_CODES;
  readonly ROUTE_TO_SHOW_ERROR: string[] = PRIMARY_URLS;

  constructor(
    private injector: Injector,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const reqUrlLastIndex = request.url.substring(
          request.url.lastIndexOf("/") + 1,
        );
        let errorMsg = "";
        const errorLabel: string | undefined = error.error?.["msgCode"]
          ? Object.keys(error.error["msgCode"])[0]
          : undefined;
        const errorSeverity = String(error.error?.["severity"] ?? "");

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error}`;
        } else {
          // If no response from API because of APIM issue , UI should display Cat-1 error message
          // status code >= 500 , If no response from API because of APIM issue , UI should display Cat-1 error message except DTV
          if (
            errorLabel === Error_Handler_Label ||
            errorSeverity === ExceptionSeverity.Critical ||
            (!errorLabel &&
              error?.status > 499 &&
              reqUrlLastIndex !== "hfdtv" &&
              !reqUrlLastIndex.includes("report?data"))
          ) {
            if (this.dialog.openDialogs.length > 0) {
              this.dialog.closeAll();
            }
            this.router.navigate(["/error/base"]);
          }

          errorMsg = `Error Code: ${error?.status},  Message: ${error?.message}`;
          return throwError(() => error);
        }
        return throwError(() => new Error(errorMsg));
      }),
    );
  }
}
