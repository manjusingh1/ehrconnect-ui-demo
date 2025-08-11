import { TestBed } from "@angular/core/testing";
import {
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpTokenInterceptor } from "./http.token.interceptor";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable } from "rxjs";

describe("HttpTokenInterceptor", () => {
  let interceptor: HttpTokenInterceptor;

  const next: HttpHandler = {
    handle: () =>
      Observable.create((subscriber: { complete: () => void }) => {
        subscriber.complete();
      }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        HttpTokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTokenInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.get(HttpTokenInterceptor);
  });
});
