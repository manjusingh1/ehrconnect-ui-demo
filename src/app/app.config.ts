import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
  withFetch,
} from "@angular/common/http";
import {
  BrowserAnimationsModule,
  provideAnimations,
  provideNoopAnimations,
} from "@angular/platform-browser/animations";
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from "@azure/msal-browser";
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from "@azure/msal-angular";
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from "chartjs-chart-financial";
import AnnotationPlugin from "chartjs-plugin-annotation";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import { environment } from "../environments/environment";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatNativeDateModule } from "@angular/material/core";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { HttpTokenInterceptor } from "./core/interceptors/http.token.interceptor";
import { LoaderInterceptor } from "./core/interceptors/global-loader.interceptor";
import { HttpErrorInterceptor } from "./core/interceptors/http-error.interceptor";
import { provideToastr } from "ngx-toastr";
import { rxStompServiceFactory } from "./rx-stomp-service-factory";
import { RxStompService } from "./rx-stomp.service";

export function loggerCallback(logLevel: LogLevel, message: string) {
  // console.log(logLevel, message);
}

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  let authValue = {
    clientId: environment.client_id,
    authority: environment.authority, // Use the direct authority URL here
    redirectUri: environment.redirectUri,
    knownAuthorities: [environment.knownAuthorities],
  };

  return new PublicClientApplication({
    auth: authValue,
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
      windowHashTimeout: 20000,
      iframeHashTimeout: 20000,
      loadFrameTimeout: 20000,
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    environment.scope,
    environment.scopePermissions.split(" "),
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [environment.openid, environment.profile],
    },
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    BrowserAnimationsModule,
    provideAnimations(),
    provideRouter(routes),
    provideToastr({
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    // importProvidersFrom(SocketIoModule.forRoot(config)),
    provideCharts(
      withDefaultRegisterables(
        CandlestickController,
        CandlestickElement,
        OhlcController,
        OhlcElement,
        DataLabelsPlugin,
        AnnotationPlugin,
      ),
      {
        defaults: {
          // For consistent rendering across CI and local envs
          font: { family: "Arial" },
        },
      },
    ),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      MatButtonModule,
      MatToolbarModule,
      MatListModule,
      MatMenuModule,
    ),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
