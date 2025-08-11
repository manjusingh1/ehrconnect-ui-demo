export interface GetData {
  ehrIntegrationId: number;
  abbottAppName: string | number;
  middleware: string;
  sendingApplication: string;
  receivingApp: string;
  sendingFacility: string;
  receivingFacility: string;
  middlewareUrl: string;
  authorizationUrl: string;
  authClientId: string;
  authSecret: string;
  jwksUrl: string;
}

export interface GetExportData {
  authorizationUrl?: any;
  authClientId?: any;
  authSecret?: any;
  middlewareUrl?: any;
  isDeleted?: boolean;
  comments?: string;
  id: number;
  abbotAppId: number;
  mwId: number | string;
  type: string;
  sendingApp: string;
  receivingApp: string;
  receivingFacility: string | number;
  sendingFacility: string;
  messageType: string;
  messageFormat: string;
  senderClientId: string;
  senderSecret: string;
  senderVerificationUrl: string;
  receiverUrl: string;
  receiverOauthUrl: string;
  receiverClientId: string;
  receiverSecret: string;
  jsonVersion: string;
}

export interface GetExportTableData {
  createdBy: null;
  updatedBy: null;
  createdAt: null;
  updatedAt: null;
  isDeleted: null;
  comments: null;
  id: number;
  abbotAppId: number;
  mwId: number | string;
  type: string;
  sendingApp: string;
  receivingApp: string;
  receivingFacility: null | string;
  sendingFacility: string;
  messageType: string;
  messageFormat: string;
  senderClientId: string;
  senderSecret: string;
  senderVerificationUrl: string;
  receiverUrl: string;
  receiverOauthUrl: null | string;
  receiverClientId: null;
  receiverSecret: null;
  jsonVersion: string;
  sendingAppCode: string;
  receivingAppCode: string;
  middleWareName: string;
  receivingFacilityCode: null | string;
  sendingFacilityName: null | string;
  receivingFacilityName: null | string;
}

export interface GetAbbottApp {
  isDeleted: null;
  comments: null;
  id: number;
  displayName: string;
  aliasName: string;
  buId: number;
  startDate: null;
  endDate: null;
}

export interface DashboardTableDataResponse {
  success: string;
  httpStatusCode: number;
  msgCode: null;
  message: null;
  data: DashboardTableData[];
}

export interface DashboardTableData {
  abbottAppName: string;
  mwName: string;
  clinicName: string;
  ehrName: string;
  createdAt: Date;
  statusCount: number;
  status: string;
}

export interface AppInfoDTOList {
  reveivingFacilityCode: string;
  reveivingFacility: string;
  reveivingAppCode: string;
  recevingApp: RecevingApp;
  middleWareCode: MiddleWare;
  middleWareName: MiddleWare;
}

export enum MiddleWare {
  Mirth = "Mirth",
}

export enum RecevingApp {
  Cerner = "CERNER",
  Epic = "EPIC",
  Meditech = "MEDITECH",
}

export enum Category {
  EhrSystem = "EHR_SYSTEM",
}

export enum CreatedBy {
  Admin = "admin",
}

export interface ChildDropdownValues {
  reveivingFacilityCode: string;
  receivingFacilityCode: string;
  reveivingFacility: string;
  reveivingAppCode: string;
  recevingApp: string;
  receivingApp?: string;
  middleWareCode: string;
  middleWareName: string;
  reveivingApp?: string;
  receivingFacility?: string;
}
