import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class APIRoutes {
  private readonly BASEAPIM_URL = environment.api_url + "hf-cloud";

  public readonly PTM_API_ROUTES = {
    PTM_BASE_URL: `${this.BASEAPIM_URL}/patient-account`,
    PTM_PATIENT_NOTIFICATION_BASE_URL: `${this.BASEAPIM_URL}/patient-notification/patients`,
    PTM_ALL_PATIENTS_BASE_URL: `${this.BASEAPIM_URL}/patient-list/patients`,
    PTM_READINGS_BASE_URL: `${this.BASEAPIM_URL}/patient-transmission/patients`,
    NOTIFICATIONS: {
      getNotificationListUrl: (id?: string | number) =>
        `${this.PTM_API_ROUTES.PTM_PATIENT_NOTIFICATION_BASE_URL}/notification-list?${id ? `customerAccountId=${id}` : ""}`,
      getSingleNotificationListUrl: (id?: string | number) =>
        `${this.PTM_API_ROUTES.PTM_PATIENT_NOTIFICATION_BASE_URL}/${id}/notification-list`,
      getSingleNotificationListUrlV2: (id?: string | number) =>
        `${this.PTM_API_ROUTES.PTM_BASE_URL}/patient/${id}/patient-notification-list`,
    },
    ALL_PATIENTS: {
      getColumnsUrl: () =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/user-columns`,
      getActivePatientsUrl: () =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/active-patients`,
      getSecondaryPatientsUrl: (type: string) =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/patient-list?primaryFilter=${type}`,
      getPatientForConsultingUserUrl: () =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/consulting-patient-list`,
      getAllPatientsFilterCountUrl: () =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/count`,
    },
    SHARED_ROUTES: {
      getPriorityUrl: (patientId: number | string) =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/${patientId}/priority-flag`,
      getSubscribeUrl: (patientId: number | string) =>
        `${this.PTM_API_ROUTES.PTM_ALL_PATIENTS_BASE_URL}/${patientId}/subscription-flag`,
      getReminderListUrl: (patientId: string | number | undefined) =>
        `${this.PTM_API_ROUTES.PTM_PATIENT_NOTIFICATION_BASE_URL}/${patientId}/reminders`,
      getclearNotificationUrl: (patientId: string | number) =>
        `${this.PTM_API_ROUTES.PTM_PATIENT_NOTIFICATION_BASE_URL}/${patientId}/notifications`,
      getNotificationListsUrl: (patientId: string | number) =>
        `${this.PTM_API_ROUTES.PTM_BASE_URL}/patient/${patientId}/patient-notification-list`,
      getsaveUpdateStatusUrl: (patientId: string | number) =>
        `${this.PTM_API_ROUTES.PTM_PATIENT_NOTIFICATION_BASE_URL}/${patientId}/notification-status`,
      getRecentMessageInterventionsUrl: (patientId: number | string) =>
        `${this.PTM_API_ROUTES.PTM_PATIENT_NOTIFICATION_BASE_URL}/${patientId}/recent-message-interventions`,
    },
    READINGS: {
      getReadingStatusUrl: (
        patientId: number | string,
        readingId: number | string,
      ) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/${patientId}/readings/${readingId}/status-change`,
      getReadingWaveFormChartdataUrl: (readingId: number | string) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/readings/${readingId}/waveform`,
      getReadingWaveFormChartdataWithUrl: (url: string) =>
        `${this.BASEAPIM_URL}${url}`,
      getReadingWaveformDataUrl: (
        patientId: number | string,
        readingId: number | string,
      ) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/${patientId}/readings/${readingId}`,
      getSessionReportPdfUrl: (readingId: number | string) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/readings/${readingId}/report?data=enEN`,
      getReadingsUrl: (patientId: string | null, readingReader?: boolean) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/${patientId}/readings${readingReader ? "/header" : ""}`,
      getReadingHeaderUrl: (patientId: string | null) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/${patientId}/readings/header`,
      sendEmailUrl: (patientId: string | number) =>
        `${this.PTM_API_ROUTES.PTM_READINGS_BASE_URL}/${patientId}/email`,
    },
  };

  public readonly PAM_API_ROUTES = {
    PAM_BASE_URL: `${this.BASEAPIM_URL}/patient-account/patient`,
    PAM_BASE_V2_URL: `${this.BASEAPIM_URL}/patient-account/v2/patients`,
    PAM_ENROLLMENT_BASE_URL: `${this.BASEAPIM_URL}/patient-account/patient-enrollment`,
    PAM_PROFILE_BASE_URL: `${this.BASEAPIM_URL}/patient-account/patient-profile`,

    NOTIFICATIONS_PORTAL: {
      getPatientNotificationDetailsUrl: (id: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/notification-settings?patientId=${id}`,
      savePatientNotificationDetailsUrl: () =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/notification-settings`,
    },
    NOTES: {
      updateNotesUrl: () => `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/notes`,
    },
    MYCARDIO_MEMS: {
      getPatientRegisteredUrl: (patientID: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/${patientID}/patient-mobile-register-status`,
      getViewCareUserListUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/${patientId}/registered-users`,
      saveMyCardioDetailsUrl: () =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/patient-mobile-app-profile`,
    },
    RECENT_INTERVENTIONS: {
      getRecentInterventionsListUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/${patientId}/recent-interventions`,
      getRecentInterventionsDrxListUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_V2_URL}/${patientId}/recent-interventions`,
    },
    CLINIC_ASSIGNMENT: {
      getChangeClinicDataUrl: (id?: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/customers/${id}/clinic-assignment`,
      viewChangeClinicDataUrl: () =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/associated-clinics`,
    },
    CLINIC_TRAIL: {
      getClinicTrailDropdownDataUrl: (id: string | number) =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/${id}/clinic-trials`,
      saveClinicTrialUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/${patientId}/clinical-trials`,
      studyIdValidationUrl: (studyId: number | boolean) =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/clinical-trials/studyid/check?studyId=${studyId}`,
    },
    ENROLLMENT: {
      enrollPatientUrl: () => `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}`,
      findPatientUrl: () =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/patients`,
      getSerialNumber: (
        patientId: string | number,
        sensorSerialNumber: string | number,
      ) =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/sensors/check?patientId=${patientId}&srNumber=${sensorSerialNumber}`,
      getReEnrollmentDataUrl: (id: string | number) =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/${id}/re-enroll`,
      getBaselineCodeUrl: (baseLineCode: string | number) =>
        `${this.PAM_API_ROUTES.PAM_ENROLLMENT_BASE_URL}/baseline-code/check?baseLineCode=${baseLineCode}`,
    },
    PATIENT_PROFILE: {
      getPatientProfileDataUrl: (id: string | number) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${id}/profile`,
      updatePatientDetailsUrl: () =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/patients`,
      activatePatientUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${patientId}/activate`,
      saveInactivatePatientUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${patientId}/inactivate`,
      importPatientDataUrl: () =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/import-file`,
      downloadPatientDataUrl: (id: number | undefined) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${id}/export-file`,
      releasePatientUrl: (patientId?: string | number) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${patientId}/release`,
      patientInterventionUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_V2_URL}/${patientId}/latest-intervention`,
    },
    EXCEEDED_THRESHOLDS: {
      getExceededThresholdsUrl: (
        patientId: string | number,
        readingId: string | number,
      ) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${patientId}/exceeded-thresholds/${readingId}`,
    },
    PATIENT_MEASSAGES: {
      getDirectCallPatientsUrl: (patientsId: string) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/patient-direct-call?selectedIds=${patientsId}`,
      sendMultiplePatientMeassagesUrl: () =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/patient-direct-call`,
      sendPatientMeassagesUrl: (patientId: string | number) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${patientId}/direct-call`,
    },
    IMPLANT_REPORT: {
      getImplantReportDataUrl: (id: number | string) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${id}/implant-report-view`,
    },
    UPDATE_NEW_IMPLANT_FLAG: {
      getUpdateNewImplantFlagUrl: (id: number | string) =>
        `${this.PAM_API_ROUTES.PAM_PROFILE_BASE_URL}/${id}/update-new-impant-flag`,
    },
    BILLING: {
      getBillingReportsUrl: (id: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/${id}/billing-reports`,
      getBillingReportPDFUrl: (patientId: string | number, reportId: number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/billing-report/${patientId}/reports/${reportId}`,
    },
    SYMPTOM: {
      getSymptomsUrl: (id: string | number) =>
        `${this.PAM_API_ROUTES.PAM_BASE_URL}/${id}/symptoms`,
    },
  };

  public readonly PEM_API_ROUTES = {
    PEM_BASE_URL: `${this.BASEAPIM_URL}/patient-event/patients`,
    HFDTV_URL: "hfdtv",
    HFDTV_V2_URL: "v2/hfdtv",

    NOTES: {
      getNotesUrl: (patientId: string | number | undefined) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/notes`,
      getEditOrDeleteNotesUrl: (
        patientId?: string | number,
        hfNoteId?: string | number,
      ) => `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/notes/${hfNoteId}`,
    },
    DIAGNOSIS: {
      getDiagnosisUrl: (patientId?: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/diagnosis`,
      getEditDiagnosis: (
        patientId?: string | number,
        diagnosisId?: string | number,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/diagnosis/${diagnosisId}`,
    },
    HOSPITALIZATION: {
      getHospitalizationListUrl: (patientId?: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/hospitalization`,
      getEditHospitalizationUrl: (
        patientId?: string | number,
        hospitalizationId?: string | number,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/hospitalization/${hospitalizationId}`,
    },
    GOALSANDTHRESHOLD: {
      getGoalsAndThresholdsUrl: (patientId?: string | number | null) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/threshold`,
      deleteGoalsAndThresholdsUrl: (
        patientId: string | number | undefined,
        metricTypeCd: number,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/threshold/metric-type/${metricTypeCd}`,
    },
    PATIENTREVIEWANDBILLING: {
      getPatientBillingDetailsUrl: (patientId: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/billing`,
      getPatientBillingReviewDetailsUrl: (patientId: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/billing-review`,
    },
    DIRECTTRENDVIEWER: {
      getDirectTrendViewUrl: (patientId: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/hfdtv`,
      getDirectTrendViewUrlV2: (patientId: string | number, days: string) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/${this.PEM_API_ROUTES.HFDTV_V2_URL}${days ? 2 + days : ""}`,
      getTrendDTViewUrl: (patientId: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/v2/hfdtv/limitScope`,
    },
    MEDICATION: {
      getMedicationListUrl: (patientId: string | number | undefined) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/medication`,
      getMedicationIdURL: (
        patientId: string | number | undefined,
        medicationId: string | number | undefined,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/medication/${medicationId}`,
      editMedicationUrl: (patientId: string | number) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/medication`,
      deleteMedicationUrl: (
        patientId?: string | number,
        medicationId?: string | number,
        medicationChangeId?: string | number,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/medication?medicationId=${medicationId}&medicationChangeId=${medicationChangeId}`,
      savePatientConfirmedUrl: (
        patientId: string | number | undefined,
        medicationId: string | number | undefined,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/medication/${medicationId}/med-acknowledgment`,
    },
    RHC: {
      getImplantHistoryUrl: (id?: string | null) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${id}/rightheartcath`,
      getSaveImplantRecordUrl: (
        patientId?: string | number,
        patientSensorId?: string | number,
      ) =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/${patientId}/rightheartcath/${patientSensorId}`,
    },
    PASENSOR: {
      getPASensorSettingsUrl: () =>
        `${this.PEM_API_ROUTES.PEM_BASE_URL}/pa-sensor-settings`,
    },
  };

  public readonly CLINIC_API_ROUTES = {
    CLINIC_BASE_URL: `${this.BASEAPIM_URL}/clinic`,
    CUSTOMER_BASE_URL: `${this.BASEAPIM_URL}/customers`,
    LOOKUP_BASE_URL: `${this.BASEAPIM_URL}/lookup`,
    USER_PROFILE: `${this.BASEAPIM_URL}/clinic/users/profile`,
    SETTINGS_AUDIT_HISTORY: `${this.BASEAPIM_URL}/clinic/settings/audit/history`,
    MEDICAL: {
      getMedicalConditionListDataUrl: () =>
        `${this.CLINIC_API_ROUTES.CUSTOMER_BASE_URL}/medical-conditions/all`,
    },
    DRUGS: {
      getMedicationDrugListUrl: () =>
        `${this.CLINIC_API_ROUTES.CUSTOMER_BASE_URL}/drugs`,
    },
    PASENSOR: {
      getPASensorDetailsUrl: () =>
        `${this.CLINIC_API_ROUTES.CLINIC_BASE_URL}/settings/pa-sensor-settings`,
    },
    USERPROFILE: {
      getUserProfileAgreementUrl: () =>
        `${this.CLINIC_API_ROUTES.USER_PROFILE}/agreement`,
      getPublishAuditHistoryEventUrl: () =>
        `${this.CLINIC_API_ROUTES.USER_PROFILE}/audit`,
    },
    FETCHAUDITHISTORY: {
      getAuditHistoryClinicUrl: () =>
        `${this.CLINIC_API_ROUTES.SETTINGS_AUDIT_HISTORY}/clinics`,
      getAuditHistoryPatientUrl: () =>
        `${this.CLINIC_API_ROUTES.SETTINGS_AUDIT_HISTORY}/patients`,
    },
    LOOKUP: {
      getMedicationTypeListUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=Adjustment_Cd`,
      getMedicationUnitListUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=Med_Unit_Cd`,
      getMedicationFreqListUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=Med_Frequency_Cd`,
      getMedicationTabletListUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=Dosage_Form_Unit_Cd`,
      getInactivationReasonCodeUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=INACTIVE_REASON_CD`,
      getSensorLocationsListUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=Sensor_Location_Cd`,
      getICDCodesUrl: () =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/codes?qualifier=Icd_Pacemaker_Cd`,
      getPhoneCodesUrl: (evtVal: number) =>
        `${this.CLINIC_API_ROUTES.LOOKUP_BASE_URL}/phone-codes/${evtVal}`,
    },
  };
  public readonly HFS_API_ROUTES = {
    HFS_CLINIC: `${this.BASEAPIM_URL}/hfs-clinic`,
    getHFSUserPatientUrl: () => `${this.HFS_API_ROUTES.HFS_CLINIC}/patients`,
    getHFSUserClinicsUrl: () => `${this.HFS_API_ROUTES.HFS_CLINIC}/clinics`,
    getHFSUserClinicSubscriptionUrl: () =>
      `${this.HFS_API_ROUTES.HFS_CLINIC}/subscription`,
    getHFSUserCountriesUrl: () => `${this.HFS_API_ROUTES.HFS_CLINIC}/countries`,
  };
}
