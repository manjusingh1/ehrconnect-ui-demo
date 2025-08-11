import { InjectionToken } from "@angular/core";

export const MsalGaurdConfig = {
  MSAL_INSTANCE: new InjectionToken("testinstance"),
  MSAL_GUARD_CONFIG: new InjectionToken("testgaurdconfig"),
  MSAL_INTERCEPTOR_CONFIG: new InjectionToken("testinterceptroconfig"),
};

describe("MsalBaseComponent", () => {});
