import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";

export const Encode_Decode = [
  { decodedValue: "<", encodedValue: "&lt;" },
  { decodedValue: ">", encodedValue: "&gt;" },
  { decodedValue: "&", encodedValue: "&amp;" },
  { decodedValue: "®", encodedValue: "&#0174;" },
];

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.has("No-Auth")) {
      const headers = req.headers.delete("No-Auth");
      const authReq = req.clone({ headers });
      return next.handle(authReq);
    }

    if (req.headers.has("Custom-Auth")) {
      const customAuthToken = localStorage.getItem("appToken");
      const headers = req.headers.delete("Custom-Auth");
      const authReq = req.clone({
        headers: headers.set("Authorization", `Bearer ${customAuthToken}`),
      });
      return next.handle(authReq);
    }

    const authToken = window.sessionStorage.getItem("accessToken");
    const userProfile = window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
      : null;

    const guid: string =
      `${window?.sessionStorage?.getItem("guid")}${Math.floor(new Date().getTime() / 1000).toString()}` ||
      "";

    if (authToken) {
      localStorage.setItem("token", authToken);
      let headersConfig = new HttpHeaders()
        .set("Authorization", `Bearer ${authToken}`)
        .set("Content-Type", "application/json")
        // .set("X-Request-ID", guid)
        // .set("ocp-apim-subscription-key", environment.abbottSubscriptionKey)
        .set("Accept", "application/json, application/pdf, application/text");
      // .set("X-API-VERSION", "1.0");

      if (userProfile) {
        const isHFSUSer = userProfile?.techSupportHfsOnly ?? false;
        const clinicId = localStorage.getItem("clinicId");
        const customerApplicationId = localStorage.getItem(
          "customerApplicationId",
        );
        if (isHFSUSer && clinicId && customerApplicationId) {
          headersConfig = headersConfig
            .set("x-customer-id", clinicId)
            .set("x-customer-application-id", customerApplicationId);
        }
      }
      if (req.url && req.url.indexOf("import-file") !== -1) {
        headersConfig = headersConfig.delete(
          "Content-Type",
          "application/json",
        );
        const request = req.clone({ headers: headersConfig });
        return next.handle(request);
      }
      const encodedValues = Encode_Decode;
      let data = JSON.parse(JSON.stringify(req.body));
      encodedValues.map((x) => {
        const regExp = new RegExp(x["decodedValue"], "g");
        data = JSON.parse(
          JSON.stringify(data).replace(regExp, x["encodedValue"]),
        );
      });
      const request = req.clone({
        headers: headersConfig,
        // body: Array.isArray(data) ? [...data] : { ...data },
      });

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (!event) {
              return event;
            }
            if (
              event.body != null &&
              !event.url?.includes("report?data") &&
              !event.url?.includes("export-file") &&
              !event.url?.includes("billing-report") &&
              typeof event.body !== "boolean"
            ) {
              event = event.clone({
                body: Array.isArray(event.body)
                  ? [...this.modifyBody(event.body)]
                  : { ...this.modifyBody(event.body) },
              });
            }
            return event;
          }
          return event;
        }),
      );
    } else {
      return next.handle(req);
    }
  }

  private modifyBody(body: any) {
    const encodedValues = Encode_Decode;
    let data = JSON.parse(JSON.stringify(body));
    encodedValues.map((x) => {
      const regExp = new RegExp(x["encodedValue"], "g");
      data = JSON.parse(
        JSON.stringify(data).replace(regExp, x["decodedValue"]),
      );
    });
    return data;
  }
}
