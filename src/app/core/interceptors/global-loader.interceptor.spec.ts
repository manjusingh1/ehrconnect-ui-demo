import { TestBed } from "@angular/core/testing";
import {
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { LoaderInterceptor } from "./global-loader.interceptor";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoaderService } from "../../pages/loader/services/loader.service";
import { Observable } from "rxjs";

describe("LoaderInterceptor", () => {
  let interceptor: LoaderInterceptor;
  let loadingService: LoaderService;

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
        LoaderService,
        LoaderInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });
    loadingService = TestBed.get(LoaderService);
    interceptor = TestBed.get(LoaderInterceptor);
  });

  it("should construct", async () => {
    const requestMock = new HttpRequest("GET", "/test");
    jest.spyOn(interceptor, "intercept");
    loadingService.setLoading(true);
    interceptor.intercept(requestMock, next);
    expect(interceptor.intercept).toHaveBeenCalled();
    expect(interceptor).toBeDefined();
  });

  it("should call intercept method", () => {
    const requestMock = new HttpRequest("GET", "/test");
    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(interceptor.intercept).toHaveBeenCalled();
    });
  });
});
