import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiCallService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:4200",
    }),
  };

  // API urls

  BASEAPIM_URL = environment.api_url;
  HFCLOUD_URI = "hf-cloud/";
  CLINIC_URI = "clinic/";
  TREATMENT_PLAN = "treatment-plan/";
  LOOKUP_URI = "lookup/";
  CUSTOMERS_URI = "customers/";
  SETTINGS_URI = "settings/";
  USERS_URI = "users";
  PROFILE_URI = "profile";
  FORMULARY_URI = "formulary/";
  FAVORITES_URI = "favorites/";
  CATEGORIES_URI = "categories/";
  CLASSES_URI = "classes";
  DRUGS_URI = "drugs";
  DOSAGES_URI = "dosages";

  CLINIC_PROFILE_SERVICE = "clinic-profile-service/";
  CUSTOMIZE_TEXT_MESSAGES = "customer/customize-text-message/";
  CUSTOMIZE_TEXT_MESSAGES_DROPDWON = "codes/messages-languages";
  CUSTOMIZE_TEXT_MESSAGES_SAVE = "save-customTextSms";
  CUSTOMIZE_TEXT_MESSAGES_RELOAD = "reload-customized-sms";
  PASENSOR_SETTINGS = "pa-sensor-settings";
  PHONE_MESSAGE_SETTINGS = "phone-message-settings";
  THRESHOLD = "threshold";
  THRESHOLDS = "thresholds";
  NOTIFICATION_SETTINGS = "notification-settings";
  LOCATIONS = "locations";
  DRUGS_SERVICE = "drugs";
  MEDICAL_CONDITION_SERVICE = "medical-conditions";
  CODE_QUALIFIER = "codes?qualifier=";
  PHONE_CODES = "phone-codes/";
  USER_PROFILE = "/profile";
  PATIENT_ACCOUNT = "patient-account";
  PATIENT = "patient";
  PATIENTS = "patients";
  PATIENT_EVENT = "patient-event/";
  PATIENTS_MATCH_LIST = "/patient-account/patients";
  PATIENT_NOTIFICATION = "patient-account/v2/patients/notification-settings";
  DONUT_NOTIFICATION = "notification-dashboard-metrics";
  /** *************GET***************/
  getClinicProfileDetailsUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.PROFILE_URI;
  getCustomizeTextDetailsUrl =
    this.BASEAPIM_URL + this.HFCLOUD_URI + this.CLINIC_URI + this.SETTINGS_URI;
  getCustomizeTextReloadUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.CUSTOMIZE_TEXT_MESSAGES_RELOAD;
  getPASensorDetailsUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.PASENSOR_SETTINGS;
  getCustomizePhoneDetailsUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.PHONE_MESSAGE_SETTINGS;
  getCustomizePhoneDetailsUrl2 =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.PHONE_MESSAGE_SETTINGS;
  getThresholdDetailsUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.THRESHOLDS;
  getNotificationDetailUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.NOTIFICATION_SETTINGS;
  getLocationsListUrl =
    this.BASEAPIM_URL + this.HFCLOUD_URI + this.CLINIC_URI + this.LOCATIONS;
  getDrugsListUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CUSTOMERS_URI +
    this.DRUGS_SERVICE;
  getPatientMatchListUrl = this.BASEAPIM_URL + this.PATIENTS_MATCH_LIST;
  getMedicalConditionListUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CUSTOMERS_URI +
    this.MEDICAL_CONDITION_SERVICE;
  getClinicUsersUrl =
    this.BASEAPIM_URL + this.HFCLOUD_URI + this.CLINIC_URI + this.USERS_URI;
  getClinicDropDownList =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.LOOKUP_URI +
    this.CODE_QUALIFIER;
  getPhoneCodes =
    this.BASEAPIM_URL + this.HFCLOUD_URI + this.LOOKUP_URI + this.PHONE_CODES;
  getPatientData = this.BASEAPIM_URL + this.PATIENT_ACCOUNT;
  getUserProfileUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.USERS_URI +
    this.USER_PROFILE;

  /** *************POST***************/
  saveClinicProfileDetailsUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.PROFILE_URI;
  saveCustomizeTextMessagesUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    "text-message-settings";
  savePASensorUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    "v2/" +
    this.PASENSOR_SETTINGS;
  saveThresholdUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.THRESHOLDS;
  updateNotificationUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    this.NOTIFICATION_SETTINGS;
  sendTestSmsUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    "send-test-sms";
  sendTestIvrUrl =
    this.BASEAPIM_URL +
    this.HFCLOUD_URI +
    this.CLINIC_URI +
    this.SETTINGS_URI +
    "send-test-ivr";
  // ***************POST***************
  // saveClinicProfileDetailsUrl = this.baseURL + this.clinicProfileService + 'save-clinic-profile-details';
  // saveCustomizeTextMessagesUrl = this.baseURL + this.customizeTextMessagesSave;

  // JSON Urls
  BASE_JSON_URL = "assets/mock-data/";
  BASE_JSON_URL_LIVE = "http://127.0.0.1:5500/dist/hf-cloud/assets/mock-data/";

  // ***************GET-JSON***************
  sampleDataClinicProfileDetailsUrl =
    this.BASE_JSON_URL + "clinician/get-clinic-profile-details.json";
  customizeTextMessageUrlStep =
    this.BASE_JSON_URL + "clinician/customize-steps-new.json";
  sampleDataPASensorDetailsUrl =
    this.BASE_JSON_URL + "clinician/get-pa-sensor.json";
  customizePhoneMessageUrlStep =
    this.BASE_JSON_URL_LIVE +
    "clinician/customize-settings-phone-messages.json";

  // ***************POST-JSON***************
  /// constructor() {}

  // getRequest(endPoint:string,params = ''){
  // if(params)
  // return this._http.get(this.BASEAPIM_URL+endPoint+params);
  // else
  // return this._http.get(this.BASEAPIM_URL+endPoint);
  // }

  // postRequest(endPoint:string,reqBody:any){
  //   console.log(this.BASEAPIM_URL+endPoint);
  //   return this._http.post(this.BASEAPIM_URL+endPoint,reqBody);
  // }

  readingList = this.BASEAPIM_URL + "patient-transmission/readings/";

  treatmentPlanTemplateSettingsUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}treatment-plan-templates/${this.SETTINGS_URI}`;
  treatmentPlanTemplatesUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}treatment-plan-templates`;
  treatmentPlanUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.TREATMENT_PLAN}${this.PATIENT}`;
  treatmentPlanPatientUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.TREATMENT_PLAN}${this.PATIENT}`;
  treatmentPlanGoalsUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_EVENT}${this.PATIENTS}`;
  treatmentPlanTemplateDetailsUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}treatment-plan-template-details`;

  medicationCategoryUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FORMULARY_URI}${this.CATEGORIES_URI}`;

  medicationClassUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FORMULARY_URI}${this.CATEGORIES_URI}${this.CLASSES_URI}?categoryId=`;

  medicationDosageUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FORMULARY_URI}${this.CATEGORIES_URI}${this.CLASSES_URI}/${this.DRUGS_URI}/${this.DOSAGES_URI}?drugName=`;
  medicationDrugUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FORMULARY_URI}${this.CATEGORIES_URI}${this.CLASSES_URI}`;
  medicationDrugSearchUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FORMULARY_URI}${this.CATEGORIES_URI}${this.CLASSES_URI}/${this.DRUGS_URI}?q=`;
  medicationLookupUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.LOOKUP_URI}codes?qualifier=`;

  favoriteDrugUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FAVORITES_URI}${this.DRUGS_URI}`;
  favoriteDosageUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.FAVORITES_URI}${this.DRUGS_URI}/${this.DOSAGES_URI}?drugName=`;

  ousDrugUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CUSTOMERS_URI}v2/${this.DRUGS_URI}`;

  clinicNotificationsUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}v2/notification-settings`;
  patientNotificationsUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_NOTIFICATION}?patientId=`;
  patientNotifiactionPutUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_NOTIFICATION}`;
  donutNotificationUrl = `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_ACCOUNT}/${this.PATIENT}/${this.DONUT_NOTIFICATION}`;

  // Notifications
  public readonly NOTIFICATIONS = {
    getNotificationListUrl: (filter?: string) =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_ACCOUNT}/v2/${this.PATIENTS}/notification-list?filter=${filter}`,

    getNotificationFilterListUrl: (filter?: string, id?: string) =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_ACCOUNT}/v2/${this.PATIENTS}/notification-list?filter=${filter}&customerAccountId=${id}`,
  };

  // Patient BP Readings
  public readonly PATIENT_BP_READINGS = {
    getPatientBPReadingsUrl: (patientId: number) =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_ACCOUNT}/${this.PATIENT}/${patientId}/bp-readings`,
  };

  // Billing Reports
  public readonly BILLING_REPORTS = {
    getBillingReportsUrl: (id: string) =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}${this.CUSTOMERS_URI}${id}/billing-settings`,
    saveBillingReportsUrl: () =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.CLINIC_URI}${this.SETTINGS_URI}billing-settings`,
  };

  public readonly PATIENT_MEDICATION = {
    patientMedicationUrl: (patientId: number): string =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_EVENT}${this.PATIENTS}/${patientId}/medication`,
    patientMedicationV2Url: (patientId: string): string =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_EVENT}${this.PATIENTS}/${patientId}/v2/medication`,
    getMedicationIdURL: (
      patientId: string,
      medicationId: string | number | undefined,
    ): string =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_EVENT}${this.PATIENTS}/${patientId}/medication/${medicationId}`,
    savePatientConfirmedUrl: (
      patientId: string,
      medicationId: string | number | undefined,
    ): string =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_EVENT}${this.PATIENTS}/${patientId}/medication/${medicationId}/med-acknowledgment`,
    patientMedicationAdjustV2Url: (
      patientId: string,
      medicationId: string | number,
    ): string =>
      `${this.BASEAPIM_URL}${this.HFCLOUD_URI}${this.PATIENT_EVENT}${this.PATIENTS}/${patientId}/v2/medication/${medicationId}`,
    patientMedicationDrugUrl: (drugId: string | number | undefined): string =>
      `${this.BASEAPIM_URL}/customers/v2/drugs/${drugId}`,
  };

  // Medication dosages
  public readonly MEDICATION_DOSAGES = {
    getMedicationDosagesUrl: (
      drugName: string,
      tradeName?: string | null,
    ): string => {
      const url = `${this.medicationDosageUrl}${drugName}&tradeName=${tradeName ?? ""}`;
      return url;
    },
  };

  // Favorite dosages
  public readonly FAVORITE_DOSAGES = {
    getFavoriteDosagesUrl: (
      drugName: string,
      tradeName?: string | null,
    ): string => {
      const url = `${this.favoriteDosageUrl}${drugName}&tradeName=${tradeName ?? ""}`;
      return url;
    },
  };
}
