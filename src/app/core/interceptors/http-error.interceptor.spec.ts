import { TestBed } from "@angular/core/testing";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpErrorInterceptor } from "./http-error.interceptor";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Observable, of } from "rxjs";
import { ErrorService } from "../../services/error.service";
import { NotificationService } from "../../services/notification.service";
import { MatDialog } from "@angular/material/dialog";

describe("HttpErrorInterceptor", () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let interceptor: HttpErrorInterceptor;

  const next: HttpHandler = {
    handle: () =>
      Observable.create((subscriber: { complete: () => void }) => {
        subscriber.complete();
      }),
  };

  class dialogMock {
    open() {
      return {
        beforeClosed: () => of({}),
        afterClosed: () => of(true),
        afterOpened: () => of(true),
        close: () => {},
      };
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ErrorService,
        NotificationService,
        HttpErrorInterceptor,
        { provide: MatDialog, useClass: dialogMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    interceptor = TestBed.get(HttpErrorInterceptor);
  });

  it("should construct", async () => {
    const requestMock = new HttpRequest("GET", "/test");
    jest.spyOn(interceptor, "intercept");
    interceptor.intercept(requestMock, next);
    expect(interceptor.intercept).toHaveBeenCalled();
    expect(interceptor).toBeDefined();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("should handle 403", async () => {
    const errorResponse = new HttpErrorResponse({
      error: "403 error",
      status: 403,
      statusText: "Not Found",
    });
    httpClient.get("/api").subscribe();
    const request = httpMock.expectOne("/api");
    request.error(new ErrorEvent("403 Error"), errorResponse);
  });

  it("should handle 500", async () => {
    const errorResponse = new HttpErrorResponse({
      error: "500 error",
      status: 500,
      statusText: "Internal Server Error",
    });
    interceptor.STATUS_CODES_TO_SHOW_ERROR_PAGE.indexOf(errorResponse?.status);
    httpClient.get("/api").subscribe();
    const request = httpMock.expectOne("/api");
    request.error(new ErrorEvent("500 Error"), errorResponse);
  });
});
