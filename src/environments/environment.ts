export const environment = {
  production: false,
  api_url: "https://ehrconnects/",
  client_id: "2a2660de-a4e0-4a28-bfac-77b7494232ff",
  scope: "2a2660de-a4e0-4a28-bfac-77b7494232ff",
  abbottSubscriptionKey: "01adfbc0fa9743018fa33eea7c1ec5b2",
  scopePermissions: "user.read",
  redirectUri: "http://localhost:4200",

  authority:
    "https://ehrconnecthcl.b2clogin.com/ehrconnecthcl.onmicrosoft.com/b2c_1_signin",
  policy: "B2C_1_signin",
  logoutRedirectURI: "http://localhost:4200/",
  knownAuthorities: "ehrconnecthcl.b2clogin.com",
  defaultLanguage: "en",
  openid: "openid",
  profile: "profile",
  XApiVersion: "1.0",

  // ====For Session idle time extension in Seconds===//
  sessionIdleTimeExten: 1800,
  // ====For Session time out notification in Seconds===//
  sessionTimeOutNotification: 300,
  // ====For calling refresh token before it gets expired===//
  refreshTokenReducedTime: 1000,
};
