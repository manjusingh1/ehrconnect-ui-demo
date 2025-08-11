import { TestBed } from "@angular/core/testing";

import { AppMsalService } from "./app-msal.service";
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptor,
  MsalService,
} from "@azure/msal-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MSALInstanceFactory,
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory,
} from "./app.module";

describe("AppMsalService", () => {
  let service: AppMsalService;
  const msalInstanse = {
    initializeWrapperLibrary: () => {},
    addEventCallback: () => {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MsalService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true,
        },
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useFactory: MSALGuardConfigFactory,
        },
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useFactory: MSALInterceptorConfigFactory,
        },
        { provide: Window, useValue: window },
        { provide: MSAL_INSTANCE, useValue: msalInstanse },
      ],
    });
    service = TestBed.inject(AppMsalService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
