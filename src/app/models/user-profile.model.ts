export interface UserProfile {
  consultingUsers?: any[];
  firstName?: string;
  middleName?: string;
  lastName?: string;
  altFirstName?: string;
  altLastName?: string;
  credentialsCd?: string;
  userId?: string;
  password?: string;
  confirmPassword?: string;
  passwordChanged?: boolean;
  contactChanged?: boolean;
  commCenterFlg?: boolean;
  basicImplantFlg?: string;
  basicTreatingFlg?: string;
  hfClinicGuestFlg?: string;
  assignedLocations?: string;
  availableLocations?: string | null;
  implantFlg?: string;
  referrerFlg?: string;
  mainLocId?: number | string;
  mainContactFlg?: string;
  contactInfo?: object;
  securityStamp?: string;
  credentials?: number | null;
  departmentNameCd?: string;
  department?: string | null;
  administratorFlg?: string;
  canEnrollPatientFlg?: string;
  paComplianceFlg?: object | string | boolean;
  notificationReportFlg?: object | string;
  canEnroll?: boolean;
  canSeeGDC?: boolean;
  showCommCenter?: boolean;
  userRecordId?: number;
  logonUserName?: string;
  effectiveUserRecordId?: number | null;
  effectiveUserName?: string;
  individualTypeCd?: number;
  customerAccountId?: number;
  customerId?: number | null;
  customerType?: string;
  customerTypeCd?: number;
  clinicCountryCd?: number;
  legalJurisdiction?: string;
  customerApplicationId?: number | null;
  locale?: string;
  dateFormat?: string;
  timeFormat?: string;
  clinicUserTZ?: string;
  weightUnitCode?: string | null;
  dateFormatLabel?: string;
  rpEnabled?: boolean;
  techSupportDmrOnly?: boolean;
  accountTypeCd?: number | null;
  sjmAccountId?: number | null;
  numberFormatCd?: number | null;
  termsAndCondAcceptanceFlg?: boolean;
  customerAccountLocationIdList?: any;
  billingReportIntervalCd?: number | null;
  userRoles?: string[] | any;
  userType?: string | null;
  effectiveUserRoles?: any;
  clinicCountry?: string;
  customerName?: string;
  displayName?: string;
  pressureEnabled?: boolean;
  techSupportHfsOnly?: boolean;
  webAppVersionNumber?: any;
  cmemsSiteId?: any;
  admin?: boolean;
  emailAddress?: string;
  userTypeCd?: any;
  treatingUsers?: any[];
  hfDemoUrl?: string;
  hfDemoUserName?: string;
  hfDemoPassword?: string;
  userAgreementInfoList?: UserAgreementInfoList[];
  defaultPlFilterCd?: number;
  defaultPlFilter?: string;
  plPADCountPreferenceCd?: number;
  plPADCountPreference?: string;
  cardiacOutputEnabled?: boolean;
  numberFormatDesc?: string;
  gdprRestrictedCountries?: number[] | any;
  gdprRestrictedFlag?: boolean;
  freeFormMessagingFlg?: boolean;
  billingEnabledFlg?: string;
  comanageFlg?: boolean;
  customVoiceEnabled?: boolean;
  customTextEnabled?: boolean;
  siteshipsMigrated?: boolean;
  canEnrollPAP?: boolean;
  myMerlinRegFlg?: boolean;
  myMerlinMedMgmtFlg?: boolean;
  myMerlinSendReadingsFlg?: boolean;
  complianceDays?: number | null;
  confBillableDataDays?: number;
  guideHFRTC?: boolean;
  guideHFSAS?: boolean;
  hfMonitorTrial?: boolean;
  hfPassportTrial?: boolean;
  hfIntlct2Trial?: boolean;
  hfCmouspmsTrial?: boolean;
  emrDownloadFlg?: string;
  displayBillingPopup?: any;
  switchFlag?: boolean | undefined;
  currentDeploymentRegion?: string;
  clientIpAddress?: any;
  myMerlinEnableReadingDataToAppFlg?: boolean;
  clinicId?: number | null | undefined;
  dynamicRxEnableFlag?: boolean;
}

export interface UserProfiles {
  exp?: number;
  name: string;
  given_name: string;
  extension_App: string;
  extension_Role: string;
}

export interface UserAgreementInfoList {
  documentMasterId: number;
  versionToBeEnforced: string | null;
  documentType: string | null;
  blobStoragePath: string;
  userRecordId: string | null | number;
  agreedDateTime: string | null;
  activeFlag: string | null;
  documentLabel: string;
  userAgreementId: number;
  toolTipFlg: string;
  sortOrder: number;
}

export interface UserAgreementData {
  userAgreementRequest: UserAgreementRequest[];
  signature: string;
}

export interface UserAgreementRequest {
  documentMasterId: number;
  versionToBeEnforced: string | null;
  activeFlag: string | null;
  documentType: string | null;
  userAgreementId: number;
}
export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
  httpStatusCode: number;
  msgCode: { [key: string]: string[] };
}

export interface UserClinicCardioMems {
  myMerlinRegFlg: boolean;
  myMerlinMedMgmtFlg: boolean;
  myMerlinSendReadingsFlg: boolean;
  freeFormMessagingFlg: boolean;
}
